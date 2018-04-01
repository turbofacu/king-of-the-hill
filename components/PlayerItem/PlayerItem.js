import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cn from 'classnames'

import PlayerMatchesHistory from '../PlayerMatchesHistory/PlayerMatchesHistory'

export default class PlayerItem extends Component {
  static propTypes = {
    removePlayer: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
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
    openStats: false,
  }

  erasePlayer = () => {
    const { removePlayer, id } = this.props
    removePlayer(id)
  }

  openStats = () => {
    this.setState({ openStats: !this.state.openStats })
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
      <li className={`player-item item-with-color small gate-${gate} color-${id.substr(0, id.indexOf('-'))} ${className}`}>
        <div className={cn({ 'stats-open': openStats })}>
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
              {stats.totalGames > 0 && !openStats &&
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
                <div className="player-item-arrow" onClick={this.openStats} role="button" tabIndex={0}>
                  <img src="./static/images/arrow-down.png" alt="arrow" />
                </div>
              }
            </div>
          </div>

          {className === 'stats-item' && openStats &&
            <div className="player-stats-big">
              <div>
                <p className="player-stats-big-title air-1">Stats</p>
                <ul className="player-stats-big-list air-2">
                  <li className="player-stats-big-item air-1">Played: {stats.totalGames} </li>
                  <li className="player-stats-big-item air-1">Crowns: {stats.totalCrowns}</li>
                  <li className="player-stats-big-item air-1">Won: {stats.wins} </li>
                  <li className="player-stats-big-item air-1">Lost: {stats.lost}</li>
                  <li className="player-stats-big-item air-1">Streak: {stats.bestStreak}</li>
                  <li className="player-stats-big-item air-1">Gate: {stats.timesGate}</li>
                </ul>
              </div>
              <div>
                <p className="player-stats-big-title air-1">Matches</p>
                <PlayerMatchesHistory matches={matches} id={id} />
              </div>
            </div>
          }
        </div>

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
          }

          .player-item {
            font-size: 18px;
            margin-bottom: 12px;
            padding: 12px 16px;
            list-style: none;
            position: relative;
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
            .stats-open {
              .player-item {
                &-name {
                  font-size: #{$gutter * 2.5};
                  max-width: 80%;
                }
                &-stats-list {
                  display: none;
                }
                &-arrow {
                  transform: rotate(180deg);
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
            &-name {
             white-space: nowrap;
             max-width: 60%;
             text-overflow: ellipsis;
             overflow: hidden;
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
              margin-left: $gutter;
              display: flex;
              align-items: center;
              &:focus {
                outline: none;
              }
              > img {
                width: 20px;
                height: auto;
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
              @media(max-width: $mobileMax) {
                opacity: 1;
              }
              &:hover {
                transform: rotate(180deg) translateZ(0);
              }
              &:focus {
                outline: none;
              }
            }
            .player-stats-big {
              display: none;
              &-title {
                @media(max-width: $mobileXsMax) {
                  font-size: 18px;
                }
              }
              &-item {
                @media(max-width: $mobileXsMax) {
                  font-size: 14px;
                }
              }
            }
          }

        `}</style>
      </li>
    )
  }
}
