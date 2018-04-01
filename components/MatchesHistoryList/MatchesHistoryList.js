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
                <span className="matches-history-item-number">{i + 1}. </span>
                <MatchHistoryItem players={e.players} trim winnerClass="matches-history" />
              </div>
              <span className="matches-history-item-time"><img className="matches-history-item-time-icon" src="./static/images/clock.png" alt="clock icon" />{matchTime}</span>
            </div>
          )
        })
        }
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .matches-history-item {
            &-flex {
              display: flex;
            }
            &-time {
              display: flex;
              align-items: center;
              &-icon {
                height: 25px;
                width: auto;
                margin-right: $gutter;
              }
            }
            &-number {
              margin-right: 10px;
            }
          }

          .matches-history-item-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 0 !important;
            border-left: 0 !important;
            @for $i from 1 to 50 {
              &:nth-child(#{$i}) {
                @include itemBorderSmall(rgba(98, ($i * 5), 170, 1));
                border: 2px solid lighten(rgba(98, ($i * 5), 170, 1), 5%);
              }
            }
            @for $i from 50 to 101 {
              &:nth-child(#{$i}) {
                @include itemBorderSmall(rgba((($i - 49) * 5), 250, 170, 1));
                border: 2px solid lighten(rgba((($i - 49) * 5), 250, 170, 1), 5%);
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
