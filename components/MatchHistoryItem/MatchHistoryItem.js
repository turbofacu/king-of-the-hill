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
    const { players, winnerClass } = this.props

    return (
      <div className={`match-history-item ${winnerClass}`}>
        {players.map(el => (
          <div className="match-history-item-player">
            <span>{ el.name }</span><span>{ el.wins }</span>
          </div>
        ))}
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .match-history-item {
            display: flex;
            &-player {
              display: flex;
              span {
                display: block;
                margin: 0 5px;
              }
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
                  > span {
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
          }

        `}</style>
      </div>
    )
  }
}
