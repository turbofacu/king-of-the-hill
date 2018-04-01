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
            <h2 className="air-3">KING OF THE HILL</h2>
            <div className="help-modal-content-overflow">
              <div className="help-modal-content">
                <p className="air-2">This is an application to keep track of wins and loses (and a bunch of other stats) in a King of the Hill type of game where the winner keeps playing.</p>
                <h3 className="air-1">Adding players</h3>
                <p className="air-2">To start a game first you have to add the players doh! Remember to include names of at least three characters. Don't repeat them! The game won't start until there are 4 players added.</p>
                <h3 className="air-1">Keeping the score</h3>
                <p className="air-1">On the Match View, the two buttons at the top are the current players. To select a winner press one of this buttons, as simple as that.</p>
                <p className="air-1">Bellow this buttons is a list of waiting players. The last waiting player has a skull <img src="./static/images/skull-white.png" alt="skull" /> beside the name. This is the last player to be beaten by the current winner to win crown.</p>
                <p className="air-1">The crown represents the current winner beating all the waiting players in a row.</p>
                <h3 className="air-1">Check the Stats</h3>
                <p className="air-1">When you have played at least one match, the statistics will be availeable!</p>
              </div>
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
              position: absolute;
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
              flex-direction: column;
              align-items: center;
              align-content: center;
              justify-content: center;
              &-content {
                overflow: scroll;
                -webkit-overflow-scrolling: touch; /* Lets it scroll lazy */
                text-align: center;
                line-height: 1.6em;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                &-overflow {
                  height: 70%;
                  max-width: 70%;
                  width: 700px;
                  position: relative;
                }
                img {
                  height: 15px;
                  width: auto;
                }
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
