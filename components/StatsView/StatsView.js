import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'
import PlayersList from '../PlayersList/PlayersList'

export default class StatsView extends PureComponent {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
    changeView: PropTypes.func,
  }

  static defaultProps = {
    players: [],
    matches: [],
    changeView: () => {},
  }

  render() {
    const {
      players,
      matches,
      changeView,
    } = this.props
    return (
      <div className="standard-flex">
        <h2 className="standard-subtitle air-3">Game Stats</h2>
        <div className="air-4">
          <PlayersList players={players} openPlayerStats="true" className="stats-list" matches={matches} />
        </div>
        <div className="text-center">
          <Button text="Back to Match" className="crimson" changeView={changeView} />
        </div>
      </div>
    )
  }
}
