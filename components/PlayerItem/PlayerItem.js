import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PlayerItem extends Component {
  static propTypes = {
    removePlayer: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.number,
    gate: PropTypes.bool,
    stats: PropTypes.objectOf(PropTypes.number),
    className: PropTypes.string,
    matches: PropTypes.arrayOf(PropTypes.object),
    number: PropTypes.number,
  }
  static defaultProps = {
    removePlayer: null,
    name: '',
    id: 0,
    gate: false,
    stats: {},
    className: null,
    matches: [],
    number: 1,
  }

  state = {
    openStats: '',
  }

  erasePlayer = () => {
    const { removePlayer, id } = this.props
    removePlayer(id)
  }

  openStats = () => {
    this.setState({ openStats: 'stats-open' })
  }

  render() {
    const { openStats } = this.state

    const {
      name,
      id,
      gate,
      stats,
      removePlayer,
      className,
      matches,
      number,
    } = this.props

    return (
      <li className={`player-item item-with-color small gate-${gate} color-${id.substring(0, 1)} ${className} ${openStats}`}>
        <div className="player-item-flex">
          <span className="player-item-name">
            {className === 'stats-item' &&
              <span>{number}. </span>
            }
            <span>{name}</span>
          </span>
          {removePlayer &&
            <span className="player-item-cross" onClick={this.erasePlayer} role="button" tabIndex={0}>x</span>
          }
          <div className="player-item-status">
            {stats.totalGames > 0 &&
              <ul className="player-item-stats-list">
                <li className="player-item-stats-item">P{stats.totalGames} </li>
                <li className="player-item-stats-item">W{stats.wins} </li>
                <li className="player-item-stats-item">L{stats.lost}</li>
              </ul>
            }
            {gate &&
              <img className="player-item-gate" src="./static/images/skull-white.png" alt="skull" />
            }
            {className === 'stats-item' &&
              <div onClick={this.openStats} role="button" tabIndex={0}>
                <img className="player-item-arrow" src="./static/images/arrow.png" alt="arrow" />
              </div>
            }
          </div>
        </div>

        {className === 'stats-item' &&
          <div className="player-stats-big">
            <div>
              <p className="player-stats-big-title air-1">Stats</p>
              <ul className="player-stats-big-list air-2">
                <li className="player-item-big-item air-1">Played: {stats.totalGames} </li>
                <li className="player-stats-big-item air-1">Crowns: {stats.totalCrowns}</li>
                <li className="player-stats-big-item air-1">Won: {stats.wins} </li>
                <li className="player-stats-big-item air-1">Lost: {stats.lost}</li>
                <li className="player-stats-big-item air-1">Streak: {stats.bestStreak}</li>
                <li className="player-stats-big-item air-1">Gate: {stats.timesGate}</li>
              </ul>
            </div>
            <div>
              <p className="player-stats-big-title air-1">Matches</p>
              <ul className="player-stats-big-matches">
                {matches.map((e) => {
                  if (e.matchId.substring(0, 5) === id || e.matchId.substring(6, 11) === id) {
                    let winnerClass = 'winner-standard'
                    if (e.matchId.substring(6, 11) === id) {
                      winnerClass = 'winner-reverse'
                    }
                    return (
                      <li className={`player-stats-big-match ${winnerClass} air-1`}>
                        {e.players.map(el => (
                          <div className="player-stats-big-player">
                            <span>{ el.name }</span><span>{ el.wins }</span>
                          </div>
                        ))}
                      </li>
                    )
                  }
                  return false
                })}
              </ul>
            </div>
          </div>
        }

        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .player-stats-big {
            margin-top: #{$gutter * 2};
            justify-content: space-between;
            > div {
              white-space: nowrap;
              &:first-child {
                flex-grow: 1;
              }
              &:last-child {
                flex-grow: 0;
              }
            }
            &-title {
              font-size: #{$gutter * 1.8};
              font-weight: bold;
            }
            &-player {
              span {
                display: block;
                margin: 0 5px;
              }
            }
            &-match {
              display: flex;
              &.winner-standard {
                .player-stats-big-player {
                  display: flex;
                  &:first-child {
                    span {
                      &:first-child {
                        display: none;
                      }
                    }
                  }
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
                .player-stats-big-player {
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
          }

          .player-item {
            font-size: 18px;
            margin-bottom: 12px;
            padding: 12px 16px;
            list-style: none;
            position: relative;
            border: 0;
            &:hover {
              .player-item-cross {
                opacity: 1;
              }
            }
            &:not(.stats-item) {
              color: white;
            }
            &.stats-item {
              .player-item-gate {
                display: none;
              }
            }
            &.stats-open {
              .player-item {
                &-name {
                  font-size: #{$gutter * 3};
                }
                &-arrow, &-status {
                  display: none;
                }
              }
              .player-stats-big {
                display: flex;
              }
            }
            &-flex {
              display: flex;
              justify-content: space-between;
            }
            &-status {
              display: flex;
            }
            &-stats {
              &-list {
                display: flex;
                align-items: center;
              }
              &-item {
                font-size: 13px;
                margin-left: 8px;
              }
            }
            &-gate {
              width: 18px;
              height: 18px;
              margin-left: 8px;
            }
            &-arrow {
              width: 22px;
              height: 22px;
              margin-left: $gutter;
              &:focus {
                outline: none;
              }
            }
            &-cross {
              fill: white;
              line-height: 6px;
              position: absolute;
              width: 12px;
              height: 12px;
              top: calc(50% - 12px / 2);
              right: 16px;
              opacity: 0;
              cursor: pointer;
              transition: transform 50ms linear;
              &:hover {
                transform: rotate(180deg) translateZ(0);
              }
              &:focus {
                outline: none;
              }
            }
            .player-stats-big {
              display: none;
            }
          }

        `}</style>
      </li>
    )
  }
}
