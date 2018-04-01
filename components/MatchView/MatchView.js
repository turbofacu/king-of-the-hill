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
    matches: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    changeView: () => {},
    updatePlayers: () => {},
    currentPlayers: [],
    waitingPlayers: [],
    matches: [],
  }

  render() {
    const {
      changeView,
      updatePlayers,
      currentPlayers,
      waitingPlayers,
      matches,
    } = this.props
    return (
      <div className="standard-flex">
        <h2 className="standard-subtitle air-3">Current Match</h2>
        <div className="air-4">
          <Match
            currentPlayers={currentPlayers}
            updatePlayers={updatePlayers}
            matches={matches}
          />
          <h2 className="standard-semititle air-2">Waiting Players</h2>
          <PlayersList players={waitingPlayers} />
        </div>
        {matches[0] &&
          <div className="text-center">
            <Button text="Game Stats" className="orange" changeView={changeView} />
          </div>
        }
      </div>
    )
  }
}
