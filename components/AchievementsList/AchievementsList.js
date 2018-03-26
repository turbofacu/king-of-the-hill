import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AchievementsItem from '../AchievementsItem/AchievementsItem'


export default class AchievementsList extends Component {
  static propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object),
    players: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    matches: [],
    players: [],
  }

  achievementTime = (matches, wins, badge, title, medal) => {
    const matchesOrder = [...matches]
    matchesOrder.sort((a, b) => a.matchTime - b.matchTime)
    const match = matchesOrder[0]
    let matchTime = (match.matchTime / 60).toFixed(2)
    matchTime = matchTime.replace('.', ':')
    const player = match.players.filter(e => e.wins === wins)
    const { name } = player[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} time={matchTime} />
    )
  }

  achievementWins = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => {
      if (b.stats.wins === a.stats.wins) {
        return b.stats.totalGames - a.stats.totalGames
      }
      return b.stats.wins - a.stats.wins
    })
    const { name } = playersOrder[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
    )
  }

  achievementLooser = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => {
      if (b.stats.lost === a.stats.lost) {
        return b.stats.totalGames - a.stats.totalGames
      }
      return b.stats.lost - a.stats.lost
    })
    const { name } = playersOrder[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
    )
  }

  achievementPlayed = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => b.stats.totalGames - a.stats.totalGames)
    const { name } = playersOrder[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
    )
  }

  achievementGate = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => b.stats.timesGate - a.stats.timesGate)
    const { name } = playersOrder[0]
    if (playersOrder[0].stats.timesGate !== 0) {
      return (
        <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
      )
    }
    return false
  }

  achievementCrowns = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => {
      if (b.stats.totalCrowns === a.stats.totalCrowns) {
        return b.stats.wins - a.stats.wins
      }
      return b.stats.totalCrowns - a.stats.totalCrowns
    })
    const { name } = playersOrder[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
    )
  }

  achievementStreak = (players, badge, title, medal) => {
    const playersOrder = [...players]
    playersOrder.sort((a, b) => {
      if (b.stats.bestStreak === a.stats.bestStreak) {
        return b.stats.totalCrowns - a.stats.totalCrowns
      }
      return b.stats.bestStreak - a.stats.bestStreak
    })
    const { name } = playersOrder[0]
    return (
      <AchievementsItem name={name} title={title} badge={badge} medal={medal} />
    )
  }

  render() {
    const { players, matches } = this.props
    return (
      <ul className="achievements-list">
        {this.achievementCrowns(players, 'C', 'Crowns', 'gold')}
        {this.achievementWins(players, 'W', 'Wins', 'gold')}
        {this.achievementLooser(players, 'L', 'Lost', 'bronze')}
        {this.achievementStreak(players, 'S', 'Streak', 'gold')}
        {this.achievementGate(players, 'G', 'Gate Keeper', 'silver')}
        {this.achievementPlayed(players, 'P', 'Played', 'silver')}
        {this.achievementTime(matches, 0, 'R', 'GOT REKT', 'bronze')}
        {this.achievementTime(matches, 1, 'E', 'Endurance', 'silver')}
        <style jsx global>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .achievements-list {
            display: flex;
            flex-wrap: wrap;
          }

        `}
        </style>
      </ul>
    )
  }
}
