import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import PlayersList from '../PlayersList/PlayersList'

export default class StatsView extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    players: [],
    matches: [],
  }

  render() {
    const {
      players,
      matches,
    } = this.props
    return (
      <div className="standard-flex">
        <h2 className="standard-subtitle air-2">Game Stats</h2>
        <div className="air-4">
          <PlayersList players={players} openPlayerStats="true" className="stats-list" matches={matches} />
        </div>
        <div className="text-center">
        </div>
      </div>
    )
  }
}
