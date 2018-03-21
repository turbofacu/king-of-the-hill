import React, { Component } from 'react'
import Head from 'next/head'

import { getPlayerIndex, getMatchIndex } from '../lib/functions'

import SVGSprites from '../components/SVGSprites/SVGSprites'
import Header from '../components/Header/Header'
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
    currentPlayers: [],
    waitingPlayers: [],
    currentWinnerId: null,
    currentGateId: null,
    matches: [],
    inputValue: '',
    crownSrc: 0,
  }

  componentDidMount() {
    this.setState({ render: true })
  }

  changeToMatchView = () => {
    const { players } = this.state
    this.setState({
      currentPlayers: players.filter((e, i) => i < 2),
      waitingPlayers: players.filter((e, i) => i > 1),
      currentGateId: players[players.length - 1].id,
    }, () => {
      this.startGate()
      this.setState({ showPlayersView: false, showMatchView: true })
    })
  }

  backToMatchView = () => {
    this.setState({ showPlayersView: false, showMatchView: true, showStatsView: false })
  }

  changeToStatsView = () => {
    const { currentPlayers, waitingPlayers } = this.state
    const players = currentPlayers.concat(waitingPlayers)
    players.sort((a, b) => {
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


  addPlayer = () => {
    const { players, inputValue } = this.state
    let { playerId } = this.state
    const playerName = inputValue.replace(/\s+/g, '')
    const playerNewId = `${playerId}-${playerName.substring(0, 3)}`
    if (inputValue !== '') {
      players.push({
        name: playerName,
        id: playerNewId,
        crown: false,
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
      this.setState({ players, playerId: playerId += 1, inputValue: '' })
    }
  }

  removePlayer = (id) => {
    const { players } = this.state
    this.setState({
      players: players.filter(e => e.id !== id),
    })
  }

  returnPlayerValue = value => (
    this.setState({ inputValue: value })
  )

  updatePlayers = (id) => {
    this.updateMatchView(id)
  }

  updateMatchView = (id) => {
    const { newCurrentPlayers } = this.updateNewMatch(id)
    const { newWaitingPlayers } = this.updateNewMatch(id)
    const newLooser = this.updateLooser(id)
    const { winnerChanges, updateGate, newCrownSrc } = this.updateWinner(id)
    const winnerIndex = getPlayerIndex(newCurrentPlayers, id)
    const matches = this.saveMatch(id)
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
    newWaitingPlayers.push(newLooser)
    this.setState({
      currentWinnerId: winnerChanges.id,
      currentPlayers: newCurrentPlayers,
      waitingPlayers: newWaitingPlayers,
      matches,
      crownSrc: newCrownSrc,
    })
  }

  updateNewMatch = (id) => {
    const { currentPlayers, waitingPlayers } = this.state
    const newPlayerId = waitingPlayers[0].id
    currentPlayers.push({
      ...waitingPlayers[0],
    })
    return ({
      newCurrentPlayers: currentPlayers.filter(e => e.id === id || e.id === newPlayerId),
      newWaitingPlayers: waitingPlayers.filter(e => e.id !== newPlayerId),
    })
  }

  saveMatch = (id) => {
    const { currentPlayers, matches } = this.state
    const winner = currentPlayers.filter(e => e.id === id)
    const looser = currentPlayers.filter(e => e.id !== id)
    const match = matches.filter(e => e.matchId === `${winner[0].id}-${looser[0].id}` || e.matchId === `${looser[0].id}-${winner[0].id}`)

    if (!match[0]) {
      const newMatch = {
        matchId: `${winner[0].id}-${looser[0].id}`,
        players: [
          {
            id: winner[0].id,
            name: winner[0].name,
            wins: 1,
          },
          {
            id: looser[0].id,
            name: looser[0].name,
            wins: 0,
          },
        ],
      }
      matches.push(newMatch)
      return matches
    }

    const matchIndex = getMatchIndex(matches, `${winner[0].id}-${looser[0].id}`, `${looser[0].id}-${winner[0].id}`)
    const winnerIndex = getPlayerIndex(matches[matchIndex].players, winner[0].id)
    matches[matchIndex].players[winnerIndex] = {
      ...matches[matchIndex].players[winnerIndex],
      wins: matches[matchIndex].players[winnerIndex].wins += 1,
    }

    return matches
  }

  updateLooser = (id) => {
    const { currentPlayers } = this.state
    const looser = currentPlayers.filter(e => e.id !== id)
    looser[0] = {
      ...looser[0],
      crown: 0,
      stats: {
        ...looser[0].stats,
        lost: looser[0].stats.lost + 1,
        streak: 0,
        totalGames: looser[0].stats.totalGames + 1,
      },
    }
    return looser[0]
  }

  updateWinner = (id) => {
    const {
      players,
      currentPlayers,
      currentWinnerId,
      crownSrc,
    } = this.state
    const winner = currentPlayers.filter(e => e.id === id)
    let updateGate = false
    winner[0] = {
      ...winner[0],
      stats: {
        ...winner[0].stats,
        wins: winner[0].stats.wins + 1,
        streak: winner[0].stats.streak + 1,
        totalGames: winner[0].stats.totalGames + 1,
      },
    }
    if (winner[0].gate) {
      winner[0].stats.timesGate += 1
    }
    if (winner[0].stats.streak === 1 && currentWinnerId != null) {
      updateGate = true
    }
    if (winner[0].stats.streak > winner[0].stats.bestStreak) {
      winner[0].stats = {
        ...winner[0].stats,
        bestStreak: winner[0].stats.streak,
      }
    }
    let newCrownSrc = crownSrc
    if (winner[0].stats.streak >= players.length - 1) {
      winner[0].crown = Math.floor(winner[0].stats.streak / (players.length - 1))
      if (winner[0].crown > winner[0].stats.totalCrowns) {
        winner[0].stats.totalCrowns += winner[0].crown
        do {
          newCrownSrc = Math.floor(Math.random() * 3) + 1
        } while (newCrownSrc === crownSrc)
      }
    }
    console.log(newCrownSrc)
    return ({
      winnerChanges: winner[0],
      updateGate,
      newCrownSrc,
    })
  }

  startGate = () => {
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
      matches,
      crownSrc,
    } = this.state

    return (
      <div>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="./static/css/fonts.css" />
        </Head>
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
              />
            }
            {showMatchView &&
              <MatchView
                waitingPlayers={waitingPlayers}
                currentPlayers={currentPlayers}
                updatePlayers={this.updatePlayers}
                changeView={this.changeToStatsView}
              />
            }
            {showStatsView &&
              <StatsView
                players={players}
                matches={matches}
                changeView={this.backToMatchView}
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
            @media( max-width: 768px ) {
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
            @media( max-width: 768px ) {
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
              @media( max-width: 768px ) {
                font-size: 24px;
              }
            }
            &-semititle {
              font-size: #{$gutter * 2};
              @media( max-width: 768px ) {
                font-size: 18px;
              }
            }
          }

          $player-colors : (
            0: (
              color: $cyan,
              percentage: 25%,
            ),
            1: (
              color: $lila,
              percentage: 20%,
            ),
            2: (
              color: $crimson,
              percentage: 15%,
            ),
            3: (
              color: $yellow,
              percentage: 25%,
            ),
            4: (
              color: $pink,
              percentage: 15%,
            ),
            5: (
              color: $magenta,
              percentage: 15%,
            ),
            6: (
              color: $lime,
              percentage: 30%,
            ),
            7: (
              color: $orange,
              percentage: 15%,
            ),
            8: (
              color: $aquamarine,
              percentage: 15%,
            ),
            9: (
              color: $green,
              percentage: 15%,
            ),
          );

          .item-with-color {
            &.big {
              @each $player, $style in $player-colors {
                &.color-#{$player} {
                  background-color: map-get($style, color);
                  @include itemBorderBig(darken(map-get($style, color), map-get($style, percentage)));
                }
              }
            }
            &.small {
              @each $player, $style in $player-colors {
                &.color-#{$player} {
                  background-color: map-get($style, color);
                  @include itemBorderSmall(darken(map-get($style, color), map-get($style, percentage)));
                }
              }
            }
            &.no-background {
              background-color: transparent !important;
            }
          }

        `}</style>
      </div>
    )
  }
}
