import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MatchHistoryItem from '../MatchHistoryItem/MatchHistoryItem'

export default class PlayerMatchesHistory extends Component {
  static propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
  }

  static defaultProps = {
    matches: [],
    id: null,
  }

  render() {
    const { matches, id } = this.props

    let matchesFilter = matches

    if (id !== null) {
      matchesFilter = matches.filter(e =>
        e.matchId.substring(0, 5) === id || e.matchId.substring(6, 11) === id)
    }

    return (
      <div className="player-history-matches">
        {matchesFilter.map((e) => {
          let winnerClass = ''

          if (id !== null) {
            if (e.matchId.substring(0, 5) === id || e.matchId.substring(6, 11) === id) {
              winnerClass = 'winner-standard'
              if (e.matchId.substring(6, 11) === id) {
                winnerClass = 'winner-reverse'
              }
            }
          }

          return (
            <MatchHistoryItem players={e.players} winnerClass={winnerClass} />
          )
        })}

        <style jsx global>{`

          @import './static/scss/variables';

          .player-history-matches {
            .match-history-item {
              &.winner-standard {
                .match-history-item-player {
                  display: flex;
                  &:first-child {
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
        `}
        </style>


      </div>
    )
  }
}
