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
      <div className="matches-history-stats">
        <div className="matches-history-stats-item air-2"><span>Game Start</span><span>{gameStats.matchStart}</span></div>
        <div className="matches-history-stats-item air-2"><span>Total Matches</span> <span>{gameStats.totalMatches}</span></div>
        <div className="matches-history-stats-item air-2"><span>P1 Wins</span> <span>{gameStats.winnerPosition.playerOne}</span></div>
        <div className="matches-history-stats-item air-2"><span>P2 Wins</span> <span>{gameStats.winnerPosition.playerTwo}</span></div>
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
              display: flex;
              flex-direction: column;
              align-items: center;
              > span {
                &:first-child {
                  margin-bottom: 10px;
                }
              }
            }
          }

        `}

        </style>

      </div>
    )
  }
}
