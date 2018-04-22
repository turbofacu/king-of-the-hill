import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'
import RewindButton from '../RewindButton/RewindButton'
import Match from '../Match/Match'
import PlayersList from '../PlayersList/PlayersList'

export default class MatchView extends PureComponent {
  static propTypes = {
    changeView: PropTypes.func,
    currentPlayers: PropTypes.arrayOf(PropTypes.object),
    waitingPlayers: PropTypes.arrayOf(PropTypes.object),
    updatePlayers: PropTypes.func,
    matches: PropTypes.arrayOf(PropTypes.object),
    onRestoreState: PropTypes.func.isRequired,
    canRestoreState: PropTypes.bool,
  }

  static defaultProps = {
    changeView: () => {},
    updatePlayers: () => {},
    currentPlayers: [],
    waitingPlayers: [],
    matches: [],
    canRestoreState: false,
  }

  render() {
    const {
      changeView,
      updatePlayers,
      currentPlayers,
      waitingPlayers,
      matches,
      onRestoreState,
      canRestoreState,
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
          {matches[0] && canRestoreState &&
            <RewindButton onClick={onRestoreState} />
          }
          <h2 className="standard-semititle air-2">Waiting Players</h2>
          <PlayersList players={waitingPlayers} />
        </div>
        {matches[0] &&
          <div className="text-center">
            <Button text="Game Stats" className="orange" changeView={changeView} />
          </div>
        }
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .standard-semititle {
            margin-top: #{$gutter * 2};
          }
        `}
        </style>
      </div>
    )
  }
}
