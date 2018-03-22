import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MatchHistoryItem from '../MatchHistoryItem/MatchHistoryItem'

export default class MatchesHistoryList extends Component {
  static propTypes = {
    matches: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    matches: [],
  }

  render() {
    const { matches } = this.props

    return (
      <div className="matches-history-list">
        {matches.map((e, i) => {
          let matchTime = (e.matchTime / 60).toFixed(2)
          matchTime = matchTime.replace('.', ':')
          return (
            <div className="matches-history-item-wrapper standard-list-item">
              <div className="matches-history-item-flex">
                <span className="matches-history-number">{i + 1}. </span>
                <MatchHistoryItem players={e.players} winnerClass="winner-standard" />
              </div>
              <span className="matches-history-number">{matchTime}</span>
            </div>
          )
        })
        }
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .matches-history-item-flex {
            display: flex;
          }

          .matches-history-item-wrapper {
            display: flex;
            justify-content: space-between;
            @for $i from 1 to 200 {
              &:nth-child(#{$i}) {
                @if $i <= 50 {
                  @include itemBorderSmall(rgba(225, ($i * 5), 138, 1));
                }
                @else if $i <= 100 {
                  @include itemBorderSmall(rgba(($i * 5), 213, 138, 1));
                }
                @else if $i <= 150 {
                  @include itemBorderSmall(rgba(($i * 5), 100, 70, 1));
                }
                @else {
                  @include itemBorderSmall(rgba(150, 150, ($i * 5), 1));
                }
              }
            }
          }

        `}

        </style>

        <style jsx global>{`

          @import './static/scss/variables';

          .matches-history-item-wrapper {
            .match-history-item {
              justify-content: center;
            }
          }

        `}
        </style>
      </div>
    )
  }
}
