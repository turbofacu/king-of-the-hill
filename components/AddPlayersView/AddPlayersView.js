import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Button from '../Button/Button'
import Input from '../Input/Input'
import PlayersList from '../PlayersList/PlayersList'

export default class AddPlayersView extends PureComponent {
  static propTypes = {
    changeView: PropTypes.func,
    addPlayer: PropTypes.func,
    removePlayer: PropTypes.func,
    returnPlayerValue: PropTypes.func,
    players: PropTypes.arrayOf(PropTypes.object),
    inputValue: PropTypes.string,
  }

  static defaultProps = {
    changeView: () => {},
    addPlayer: () => {},
    removePlayer: () => {},
    returnPlayerValue: () => {},
    players: [],
    inputValue: '',
  }

  focusInput = () => {
    this.child.input.focus();
  }

  render() {
    const {
      changeView,
      addPlayer,
      removePlayer,
      returnPlayerValue,
      players,
      inputValue,
    } = this.props
    return (
      <div className="standard-flex">
        <div className="air-2">
          <Input
            inputValue={inputValue}
            getValue={returnPlayerValue}
            ref={ch => this.child = ch}
          />
        </div>
        <div className="text-center air-3">
          <Button addPlayer={addPlayer} inputValue={inputValue} focusInput={this.focusInput} />
        </div>
        {players[0] && // If a players exists, show PlayerList
          <div className="air-4">
            <PlayersList players={players} removePlayer={removePlayer} />
          </div>
        }
        {players[2] && // If three players exists, show the changeView button
          <div className="text-center">
            <Button text="Start Match" className="magenta" changeView={changeView} />
          </div>
        }
      </div>
    )
  }
}
