import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class MatchesHistoryStats extends Component {
  static propTypes = {
    gameStats: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ])),
  }

  static defaultProps = {
    gameStats: {},
  }

  render() {
    const { gameStats } = this.props

    return (
      <div className="matches-history-stats air-1">
        <div className="matches-history-stats-item">Game Start: {gameStats.matchStart}</div>
        <div className="matches-history-stats-item">Total Matches: {gameStats.totalMatches}</div>
        <div className="matches-history-stats-item">P1 Wins: {gameStats.winnerPosition.playerOne}</div>
        <div className="matches-history-stats-item">P2 Wins: {gameStats.winnerPosition.playerTwo}</div>
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .matches-history-stats {
            color: white;
            font-size: 18px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            &-item {
              width: 50%;
              margin-bottom: $gutter;
            }
          }

        `}

        </style>

      </div>
    )
  }
}
