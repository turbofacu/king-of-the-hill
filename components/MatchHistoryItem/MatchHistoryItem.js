import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MatchHistoryItem extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
    winnerClass: PropTypes.string,
  }

  static defaultProps = {
    players: [],
    winnerClass: '',
  }

  render() {
    const {
      players,
      winnerClass,
    } = this.props

    return (
      <div className={`match-history-item ${winnerClass}`}>
        {players.map(e => (
          <div className="match-history-item-player">
            <div className="match-history-item-player-flex">
              {e.gate &&
                <img className="match-history-item-gate" src="./static/images/skull-white.png" alt="skull" />
              }
              {e.crown &&
                <img className="match-history-item-crown" src="./static/images/crown-0.png" alt="crown" />
              }
              <span>{ e.name.substring(0, 3) }</span><span>{ e.wins }</span>
            </div>
          </div>
        ))}
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .match-history-item {
            display: flex;
            @media(max-width: $mobileXsMax) {
              font-size: 14px;
            }
            &-player {
              display: flex;
              text-transform: uppercase;
              &-flex {
                display: flex;
                align-items: center;
              }
              span {
                display: block;
                margin: 0 5px;
              }
            }
            &-gate, &-crown {
              height: 20px;
              width: auto;
              margin-right: 5px;
              @media(max-width: $mobileXsMax) {
                height: 15px;
                width: auto;
              }
            }
            &:not(.matches-history) {
              margin-left: -5px;
            }
            &.winner-reverse, &.winner-standard {
              margin-bottom: $gutter;
            }
            &.winner-standard {
              .match-history-item-player {
                display: flex;
                &:last-child {
                  span {
                    order: 2;
                    &:last-child {
                      order: 1;
                      &:before {
                        content: '-';
                        margin-right: 5px;
                      }
                    }
                  }
                }
              }
            }
            &.winner-reverse {
              .match-history-item-player {
                order: 1;
                &:first-child {
                  display: flex;
                  order: 2;
                  span {
                    order: 2;
                    &:last-child {
                      order: 1;
                      &:before {
                        content: '-';
                        margin-right: 5px;
                      }
                    }
                  }
                }
                &:last-child {
                  span {
                    &:first-child {
                      display: none;
                    }
                  }
                }
              }
            }
            &.matches-history {
              .match-history-item-player {
                span {
                  display: block;
                  margin: 0 5px;
                }
                &:last-child {
                  &:before {
                    content: '-';
                    margin: 0 5px;
                  }
                }
              }
            }
          }

        `}</style>
      </div>
    )
  }
}
