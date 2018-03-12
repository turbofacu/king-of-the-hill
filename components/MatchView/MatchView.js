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
        <div className="air-4">
          <Match
            currentPlayers={currentPlayers}
            updatePlayers={updatePlayers}
          />
          <PlayersList players={waitingPlayers} />
        </div>
        <div className="text-center">
          <Button text="Game Stats" className="orange" changeView={changeView} />
        </div>
      </div>
    )
  }
}
