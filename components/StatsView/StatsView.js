import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'
import PlayersList from '../PlayersList/PlayersList'
import MatchesHistoryList from '../MatchesHistoryList/MatchesHistoryList'
import MatchesHistoryStats from '../MatchesHistoryStats/MatchesHistoryStats'
import AchievementsList from '../AchievementsList/AchievementsList'

export default class StatsView extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    matchesHistory: PropTypes.arrayOf(PropTypes.object),
    changeView: PropTypes.func,
    gameStats: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ])),
  }

  static defaultProps = {
    players: [],
    matches: [],
    matchesHistory: [],
    changeView: () => {},
    gameStats: {},
  }

  render() {
    const {
      players,
      matches,
      matchesHistory,
      changeView,
      gameStats,
    } = this.props
    return (
      <div className="standard-flex">
        <h2 className="standard-subtitle air-3">Game Stats</h2>
        <div className="air-4">
          <PlayersList players={players} openPlayerStats="true" className="stats-list" matches={matches} />
        </div>
        <div className="air-4">
          <h2 className="standard-subtitle air-3">Matches Stats</h2>
          <MatchesHistoryStats gameStats={gameStats} />
        </div>
        <div className="air-4">
          <h2 className="standard-subtitle air-3">Achievements</h2>
          <AchievementsList matches={matchesHistory} players={players} />
        </div>
        <div className="air-4">
          <h2 className="standard-subtitle air-3">Matches History</h2>
          <MatchesHistoryList matches={matchesHistory} />
        </div>
        <div className="text-center">
          <Button text="Back to Match" className="crimson" changeView={changeView} />
        </div>
      </div>
    )
  }
}
