import React, { Component } from 'react'
import Head from 'next/head'

import { getPlayerIndex, getMatchIndex } from '../lib/functions'

import SVGSprites from '../components/SVGSprites/SVGSprites'
import Header from '../components/Header/Header'
import Help from '../components/Help/Help'
import AddPlayersView from '../components/AddPlayersView/AddPlayersView'
import MatchView from '../components/MatchView/MatchView'
import StatsView from '../components/StatsView/StatsView'

export default class extends Component {
  state = {
    render: false,
    showPlayersView: true,
    showMatchView: false,
    showStatsView: false,
    players: [],
    playerId: 0,
    inputValue: '',
    inputError: '',
    currentPlayers: [],
    waitingPlayers: [],
    currentWinnerId: null,
    currentGateId: null,
    matches: [],
    matchesHistory: [],
    gameStats: {
      matchStart: '',
      totalMatches: 0,
      winnerPosition: {
        playerOne: 0,
        playerTwo: 0,
      },
    },
    currentMatchTime: '',
    crownSrc: 0,
    stateHistory: null,
  }

  componentDidMount() {
    this.setState({ render: true })
  }

  // Changes view to MatchView
  changeToMatchView = () => {
    const { players, gameStats } = this.state
    const date = new Date() // Set MatchStart Date
    const dateHuman = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const newGameStats = {
      ...gameStats,
      matchStart: dateHuman,
    }
    this.setState({ // Separate CurrentPlayers from WaitingPlayers
      currentPlayers: players.filter((e, i) => i <= 1),
      waitingPlayers: players.filter((e, i) => i > 1),
      currentGateId: players[players.length - 1].id,
    }, () => {
      this.startGate()
      this.setState({
        showPlayersView: false,
        showMatchView: true, // show MatchView
        currentMatchTime: date,
        gameStats: newGameStats,
      })
    })
  }

  // Simple back toMatchView
  backToMatchView = () => {
    this.setState({ showPlayersView: false, showMatchView: true, showStatsView: false })
  }

  // Changes view to StatsView
  changeToStatsView = () => {
    const { currentPlayers, waitingPlayers } = this.state
    const players = currentPlayers.concat(waitingPlayers)
    players.sort((a, b) => { // Sort players, looking for crowns or wins
      if (b.stats.totalCrowns === a.stats.totalCrowns) {
        return b.stats.wins - a.stats.wins
      }
      return b.stats.totalCrowns - a.stats.totalCrowns
    })
    this.setState({
      showMatchView: false,
      showStatsView: true,
      players,
    })
  }

  returnPlayerValue = value => ( // Get current input value
    this.setState({ inputValue: value, inputError: '' })
  )

  addPlayer = () => { // AddPlayer to the list
    const { players, inputValue } = this.state
    let { playerId } = this.state
    const playerName = inputValue.replace(/\s+/g, '')
    const playerNewId = `${playerId}-${playerName.substring(0, 3)}` // Generate ID

    let errorText = ''
    for (let i = 0; i < players.length; i++) { // Check for input error: taken name
      if (players[i].name === inputValue) {
        errorText = 'Name already taken'
        this.setState({ inputError: errorText })
        return
      }
    }
    if (inputValue === '') { // Check for input error: empty field
      errorText = `Name can't be empty`
      this.setState({ inputError: errorText })
      return
    }
    if (inputValue.length < 3) { // Check for input error: min chars
      errorText = 'At least 3 characters'
      this.setState({ inputError: errorText })
      return
    }
    players.push({ // Push new player
      name: playerName,
      id: playerNewId,
      crown: 0,
      gate: false,
      stats: {
        wins: 0,
        lost: 0,
        streak: 0,
        bestStreak: 0,
        totalGames: 0,
        totalCrowns: 0,
        timesGate: 0,
      },
    })
    this.setState({
      players,
      playerId: playerId += 1, // After setting the new player, change the next id
      inputValue: '',
      inputError: errorText,
    })
  }

  removePlayer = (id) => { // Delete player from the list
    const { players } = this.state
    this.setState({
      players: players.filter(e => e.id !== id),
    })
  }

  updatePlayers = (id) => { // Simple update player for MatchView
    this.updateMatchView(id)
  }

  updateMatchView = (id) => { // Get all info from functions and set the new state
    let newGameStats = this.saveGameStats(id)
    const { newCurrentPlayers, newWaitingPlayers } = this.updateNewMatch(id)
    const newLooser = this.updateLooser(id)
    const { winnerChanges, updateGate, newCrownSrc } = this.updateWinner(id)
    const winnerIndex = getPlayerIndex(newCurrentPlayers, id)
    const {
      matches,
      matchesHistory,
      time,
      date,
    } = this.saveMatch(id)
    newCurrentPlayers[winnerIndex] = winnerChanges
    if (updateGate) {
      newWaitingPlayers.forEach((e) => {
        e.gate = false
      })
      newCurrentPlayers.forEach((e) => {
        e.gate = false
      })
      newWaitingPlayers[newWaitingPlayers.length - 1].gate = true
    }

    newGameStats = {
      ...newGameStats,
      matchTime: time,
    }

    newWaitingPlayers.push(newLooser)

    this.storeState({
      currentWinnerId: this.state.currentWinnerId,
      currentPlayers: this.state.currentPlayers,
      waitingPlayers: this.state.waitingPlayers,
      matches: this.state.matches,
      matchesHistory: this.state.matchesHistory,
      gameStats: this.state.gameStats,
      crownSrc: this.state.crownSrc,
      currentMatchTime: this.state.currentMatchTime,
    })

    this.setState({
      currentWinnerId: winnerChanges.id,
      currentPlayers: newCurrentPlayers,
      waitingPlayers: newWaitingPlayers,
      matches,
      matchesHistory,
      gameStats: newGameStats,
      crownSrc: newCrownSrc,
      currentMatchTime: date,
    })
  }

  storeState = (state) => {
    this.setState({
      stateHistory: { ...state },
    })
  }

  restoreState = () => {
    const { stateHistory } = this.state
    if (!stateHistory) {
      return
    }
    this.setState({
      ...stateHistory,
      stateHistory: null,
    })
  }

  updateNewMatch = (id) => { // Updates NewMatch
    const { currentPlayers, waitingPlayers } = this.state
    const winnerIndex = getPlayerIndex(currentPlayers, id)
    const newCurrentPlayers = [...currentPlayers]
    if (winnerIndex === 1) { // If winner is on P2, push before
      newCurrentPlayers.unshift({
        ...waitingPlayers[0],
      })
    } else {
      newCurrentPlayers.push({ // If winner is on P1, push after
        ...waitingPlayers[0],
      })
    }
    const newPlayerId = waitingPlayers[0].id
    return ({
      newCurrentPlayers: newCurrentPlayers.filter(e => e.id === id || e.id === newPlayerId),
      newWaitingPlayers: waitingPlayers.filter(e => e.id !== newPlayerId),
    })
  }

  saveGameStats = (id) => { // Save the GameStats
    const { currentPlayers, gameStats } = this.state
    const winnerIndex = getPlayerIndex(currentPlayers, id)
    const newGameStats = { // Save matches quantity
      ...gameStats,
      totalMatches: gameStats.totalMatches + 1,
    }
    if (winnerIndex === 0) { // Save winner position
      newGameStats.winnerPosition = {
        ...newGameStats.winnerPosition,
        playerOne: newGameStats.winnerPosition.playerOne + 1,
      }
    } else {
      newGameStats.winnerPosition = {
        ...newGameStats.winnerPosition,
        playerTwo: newGameStats.winnerPosition.playerTwo + 1,
      }
    }

    return newGameStats
  }

  saveMatch = (id) => {
    const {
      currentPlayers,
      matches,
      matchesHistory,
      currentMatchTime,
    } = this.state

    const winner = currentPlayers.find(e => e.id === id)
    const looser = currentPlayers.find(e => e.id !== id)
    const currentWinnerIndex = getPlayerIndex(currentPlayers, id)
    const date = new Date()
    const time = Math.abs(date.getTime() - currentMatchTime.getTime()) / 1000;

    const newMatchItem = { // Save new match for history purposes
      matchTime: time,
      players: [
        {
          id: currentPlayers[0].id,
          name: currentPlayers[0].name,
          wins: 0,
        },
        {
          id: currentPlayers[1].id,
          name: currentPlayers[1].name,
          wins: 0,
        },
      ],
    }

    newMatchItem.players[currentWinnerIndex] = { // Add win to winner
      ...newMatchItem.players[currentWinnerIndex],
      wins: 1,
    }

    if (winner.gate) {
      newMatchItem.players[currentWinnerIndex] = { // Add gate if winner was gate
        ...newMatchItem.players[currentWinnerIndex],
        gate: true,
      }
    }

    if (looser.gate) {
      newMatchItem.players[currentWinnerIndex] = { // Add crown if looser was gate
        ...newMatchItem.players[currentWinnerIndex],
        crown: true,
      }
    }

    matchesHistory.push(newMatchItem)

    // Matches is an array of all the matches player
    // Instead of making a new match per match, if match exist it updates to the existing one
    const match = matches.find(e => e.matchId === `${winner.id}-${looser.id}` || e.matchId === `${looser.id}-${winner.id}`)

    if (!match) { // If it's a new match, add a new element
      const newMatch = {
        matchId: `${winner.id}-${looser.id}`,
        players: [
          {
            id: winner.id,
            name: winner.name,
            wins: 1,
          },
          {
            id: looser.id,
            name: looser.name,
            wins: 0,
          },
        ],
      }
      matches.push(newMatch)
      return ({
        matches,
        matchesHistory,
        time,
        date,
      })
    }

    // If match exist, find the match index and the player index to update
    const matchIndex = getMatchIndex(matches, `${winner.id}-${looser.id}`, `${looser.id}-${winner.id}`)
    const winnerIndex = getPlayerIndex(matches[matchIndex].players, winner.id)
    matches[matchIndex].players[winnerIndex] = {
      ...matches[matchIndex].players[winnerIndex],
      wins: matches[matchIndex].players[winnerIndex].wins += 1,
    }

    return ({
      matches,
      matchesHistory,
      time,
      date,
    })
  }

  updateLooser = (id) => { // Updating the looser
    const { currentPlayers } = this.state
    let looser = currentPlayers.find(e => e.id !== id)
    looser = {
      ...looser,
      crown: 0,
      stats: {
        ...looser.stats,
        lost: looser.stats.lost + 1,
        streak: 0,
        totalGames: looser.stats.totalGames + 1,
      },
    }
    return looser
  }

  updateWinner = (id) => { // Updating the winner
    const {
      players,
      currentPlayers,
      currentWinnerId,
      crownSrc,
    } = this.state
    let winner = currentPlayers.find(e => e.id === id)
    let updateGate = false // Set update gate to false
    winner = {
      ...winner,
      stats: {
        ...winner.stats,
        wins: winner.stats.wins + 1,
        streak: winner.stats.streak + 1,
        totalGames: winner.stats.totalGames + 1,
      },
    }
    if (winner.gate) { // If winner was gate, count it!
      winner.stats.timesGate += 1
    }
    // Winner first time winning so need a new gate!
    if (winner.stats.streak === 1 && currentWinnerId != null) {
      updateGate = true
    }
    // If winner has new streak best, update!
    if (winner.stats.streak > winner.stats.bestStreak) {
      winner.stats = {
        ...winner.stats,
        bestStreak: winner.stats.streak,
      }
    }
    let newCrownSrc = crownSrc // For changing the top crown when there's a new crown winner
    if (winner.stats.streak >= players.length - 1) {
      winner.crown = Math.floor(winner.stats.streak / (players.length - 1))
      if (winner.crown > winner.stats.totalCrowns) {
        winner.stats.totalCrowns += 1 // Add crown
        do {
          newCrownSrc = Math.floor(Math.random() * 3) + 1
        } while (newCrownSrc === crownSrc) // Change to new top crown!
      }
    }
    return ({
      winnerChanges: winner,
      updateGate,
      newCrownSrc,
    })
  }

  startGate = () => { // Only used first time we need a gate keeper (ChangeToMatchView)
    const { waitingPlayers, currentGateId } = this.state
    const newGateIndex = getPlayerIndex(waitingPlayers, currentGateId)
    waitingPlayers[newGateIndex] = {
      ...waitingPlayers[newGateIndex],
      gate: true,
    }
  }

  render() {
    const {
      render,
      showPlayersView,
      showMatchView,
      showStatsView,
      players,
      currentPlayers,
      waitingPlayers,
      inputValue,
      inputError,
      matches,
      matchesHistory,
      crownSrc,
      gameStats,
      stateHistory,
    } = this.state

    return (
      <div>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link key="manifest" rel="manifest" href="/static/manifest.json" />
          <link rel="stylesheet" href="./static/css/fonts.css" />
        </Head>
        <Help />
        <SVGSprites />
        {render &&
          <div className="container">
            <Header crownSrc={crownSrc} />
            {showPlayersView &&
              <AddPlayersView
                changeView={this.changeToMatchView}
                addPlayer={this.addPlayer}
                removePlayer={this.removePlayer}
                returnPlayerValue={this.returnPlayerValue}
                players={players}
                inputValue={inputValue}
                inputError={inputError}
              />
            }
            {showMatchView &&
              <MatchView
                waitingPlayers={waitingPlayers}
                currentPlayers={currentPlayers}
                updatePlayers={this.updatePlayers}
                changeView={this.changeToStatsView}
                matches={matches}
                onRestoreState={this.restoreState}
                canRestoreState={(stateHistory !== null)}
              />
            }
            {showStatsView &&
              <StatsView
                players={players}
                matches={matches}
                matchesHistory={matchesHistory}
                changeView={this.backToMatchView}
                gameStats={gameStats}
              />
            }
          </div>
        }
        <style jsx global>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          * {
            margin: 0;
            padding: 0;
            border: 0;
            list-style: none;
          }

          body {
            font-family: $ff;
            background-color: $black;
          }

          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            max-width: 600px;
            margin: 0 auto;
            padding: 0 0 #{$gutter * 3};
            box-sizing: border-box;
            @media(max-width: 768px) {
              padding: 0 10px #{$gutter * 3};
            }
          }

          .standard-flex {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
          }

          .text-center {
            text-align: center;
          }

          @for $i from 1 to 10 {
            .air-#{$i} {
              margin-bottom: #{ $i * $gutter};
            }
          }

          .standard-title {
            color: white;
            font-size: #{$gutter * 2};
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
            text-shadow: 1px 1px darken(white, 75%), 2px 2px darken(white, 75%), 3px 3px darken(white, 75%), 4px 4px darken(white, 75%), 5px 5px darken(white, 75%);
            @media(max-width: 768px) {
              font-size: 24px;
            }
          }

          .standard {
            &-subtitle, &-semititle {
              color: white;
              font-size: #{$gutter * 3};
              font-weight: bold;
              text-align: center;
              text-transform: uppercase;
              text-shadow: 1px 1px darken(white, 75%), 2px 2px darken(white, 75%), 3px 3px darken(white, 75%), 4px 4px darken(white, 75%), 5px 5px darken(white, 75%);
              @media(max-width: 768px) {
                font-size: 24px;
              }
            }
            &-semititle {
              font-size: #{$gutter * 2};
              @media(max-width: 768px) {
                font-size: 18px;
              }
            }
          }

          .standard-list-item {
            color: white;
            font-size: 18px;
            margin-bottom: 12px;
            padding: 12px 16px;
            list-style: none;
            position: relative;
            border: 0;
          }

          $player-colors : (
            0: (
              color: $cyan,
              percentage: 15%,
              border: 10%,
            ),
            1: (
              color: $pink,
              percentage: 10%,
              border: 5%,
            ),
            2: (
              color: $yellow,
              percentage: 15%,
              border: 10%,
            ),
            3: (
              color: $lila,
              percentage: 10%,
              border: 5%,
            ),
            4: (
              color: $darkPink,
              percentage: 10%,
              border: 5%,
            ),
            5: (
              color: $silver,
              percentage: 10%,
              border: 5%,
            ),
            6: (
              color: $orange,
              percentage: 15%,
              border: 10%,
            ),
            7: (
              color: $magenta,
              percentage: 15%,
              border: 10%,
            ),
            8: (
              color: $sky,
              percentage: 7%,
              border: 3%,
            ),
            9: (
              color: gold,
              percentage: 7%,
              border: 3%,
            ),
          );

          .item-with-color {
            border-top: 0 !important;
            border-left: 0 !important;
            &.big {
              background-color: $silver;
              border: 2px solid darken($silver, 5%);
              @include itemBorderBig(darken($silver, 10%));
              @each $player, $style in $player-colors {
                &.color-#{$player} {
                  background-color: map-get($style, color);
                  border: 2px solid darken(map-get($style, color), map-get($style, border));
                  @include itemBorderBig(darken(map-get($style, color), map-get($style, percentage)));
                }
              }
            }
            &.small {
              background-color: $silver;
              border: 2px solid darken($silver, 5%);
              @include itemBorderSmall(darken($silver, 10%));
              @each $player, $style in $player-colors {
                &.color-#{$player} {
                  background-color: map-get($style, color);
                  border: 2px solid darken(map-get($style, color), map-get($style, border));
                  @include itemBorderSmall(darken(map-get($style, color), map-get($style, percentage)));
                }
              }
            }
            &.no-background {
              background-color: transparent !important;
            }
          }

          .red-button {
            color: white;
            text-shadow: 1px 1px darken(white, 75%), 2px 2px darken(white, 75%), 3px 3px darken(white, 75%);
            text-align: center;
            width: 45px;
            height: 45px;
            background-color: $crimson;
            border: 2px solid darken($crimson, 10%);
            border-top: 0;
            border-left: 0;
            @include itemBorderSmall(darken($crimson, 15%));
            cursor: pointer;
            &:hover {
              transform: scale(1.1);
            }
            &:active {
              transform: scale(0.9);
            }
          }

        `}</style>
      </div>
    )
  }
}
