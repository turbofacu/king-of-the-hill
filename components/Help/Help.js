import React, { Component } from 'react'

export default class Button extends Component {
  state = {
    showModal: false,
  }

  toogleModal = () => {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    const { showModal } = this.state

    return (
      <div className="help-wrapper">
        <div className="help-button red-button" onClick={this.toogleModal} role="button" tabIndex={0}>?</div>
        {showModal &&
          <div className="help-modal">
            <span className="help-cross red-button" onClick={this.toogleModal} role="button" tabIndex={0}>x</span>
            <div className="help-modal-content">
              <h2 className="air-3">Welcome to KING OF THE HILL!</h2>
              <p className="air-2">This is an application for you to take track of your wins and looses in a king of the hill type of game where the winner keeps playing.</p>
              <h3 className="air-1">Adding players!</h3>
              <p className="air-2">To start a game first you have to add the players doh! Remember to include names of at least three characters and don't repeat them! The game won't start until there are 4 players.</p>
              <h3 className="air-1">Keeping the score!</h3>
              <p className="air-1">On the Match View, the two names on the buttons at the top are the current players. To select a winner press one of this buttons, as simple as that.</p>
              <p className="air-1">Bellow there's a list of the waiting players. The last waiting player has a skull beside the name. This is the last player to be beaten by the current winner in its way to get a crown.</p>
              <p className="air-1">When you have played at least one match, the statistics will be abaileable!</p>
            </div>
          </div>
        }
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .help {
            &-button, &-cross {
              line-height: 34px;
              width: 34px;
              height: 34px;
              position: fixed;
              top: $gutter;
              right: $gutter;
              &:hover {
                transform: scale(1.1);
              }
              &:active {
                transform: scale(0.9);
              }
            }
            &-cross {
              line-height: 28px;
              position: absolute;
              top: $gutter;
              right: $gutter;
            }
            &-modal {
              color: white;
              background-color: rgba($black, 0.95);
              position: fixed;
              top: 0;
              bottom: 0;
              right: 0;
              left: 0;
              z-index: 1000;
              display: flex;
              align-items: center;
              align-content: center;
              justify-content: center;
              &-content {
                text-align: center;
                max-width: 70%;
                width: 700px;
                line-height: 1.6em;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
