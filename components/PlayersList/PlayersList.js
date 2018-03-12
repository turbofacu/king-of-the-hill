import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlayerItem from '../PlayerItem/PlayerItem'

export default class PlayerList extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.object),
    removePlayer: PropTypes.func,
    openPlayerStats: PropTypes.bool,
    className: PropTypes.string,
    matches: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    removePlayer: null,
    openPlayerStats: false,
    players: [],
    className: '',
    matches: [],
  }

  render() {
    const {
      players,
      removePlayer,
      className,
      openPlayerStats,
      matches,
    } = this.props

    let playerItemClass = 'no-background'
    if (className) {
      playerItemClass = 'stats-item'
    }

    return (
      <ul className="player-list">
        {players.map((e, i) => (
          <PlayerItem
            name={e.name}
            id={e.id}
            key={e.id}
            crown={e.crown}
            gate={e.gate}
            stats={e.stats}
            removePlayer={removePlayer}
            openPlayerStats={openPlayerStats}
            className={playerItemClass}
            matches={matches}
            number={i + 1}
          />
        ))}
        <style jsx>{`
          .player-list {
            padding-right: 8px;
          }
        `}
        </style>
      </ul>
    )
  }
}
