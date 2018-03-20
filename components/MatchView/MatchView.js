import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'
import Match from '../Match/Match'
import PlayersList from '../PlayersList/PlayersList'

export default class MatchView extends PureComponent {
  static propTypes = {
    changeView: PropTypes.func,
    currentPlayers: PropTypes.arrayOf(PropTypes.object),
    waitingPlayers: PropTypes.arrayOf(PropTypes.object),
    updatePlayers: PropTypes.func,
  }

  static defaultProps = {
    changeView: () => {},
    updatePlayers: () => {},
    currentPlayers: [],
    waitingPlayers: [],
  }

  render() {
    const {
      changeView,
      updatePlayers,
      currentPlayers,
      waitingPlayers,
    } = this.props
    return (
      <div className="standard-flex">
        <h2 className="standard-subtitle air-3">Current Match</h2>
        <div className="air-4">
          <Match
            currentPlayers={currentPlayers}
            updatePlayers={updatePlayers}
          />
          <h2 className="standard-semititle air-2">Waiting Players</h2>
          <PlayersList players={waitingPlayers} />
        </div>
        <div className="text-center">
          <Button text="Game Stats" className="orange" changeView={changeView} />
        </div>
      </div>
    )
  }
}
