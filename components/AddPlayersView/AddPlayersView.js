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
        <div className="add-players-input-wrapper standard-flex air-4">
          <Input
            inputValue={inputValue}
            getValue={returnPlayerValue}
            ref={ch => this.child = ch}
          />
          <Button addPlayer={addPlayer} text="Add" inputValue={inputValue} focusInput={this.focusInput} />
        </div>
        {players[0] && // If a players exists, show PlayerList
          <div>
            <h2 className="standard-subtitle air-3">Players</h2>
            <div className="air-4">
              <PlayersList players={players} removePlayer={removePlayer} />
            </div>
          </div>
        }
        {players[3] && // If four players exists, show the changeView button
          <div className="text-center">
            <Button text="Start Match" className="magenta" changeView={changeView} />
          </div>
        }
        <style jsx global>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .add-players-input-wrapper {
            align-items: center;
            flex-direction: initial !important;
            .button {
              margin-left: #{$gutter * 2};
              padding: 18px #{$gutter * 2};
              box-sizing: border-box;
            }
          }

        `}</style>
      </div>
    )
  }
}
