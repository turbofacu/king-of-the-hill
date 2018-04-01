import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MatchItem from '../MatchItem/MatchItem'

export default class Match extends PureComponent {
  static propTypes = {
    updatePlayers: PropTypes.func,
    currentPlayers: PropTypes.arrayOf(PropTypes.object),
    matches: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    updatePlayers: () => {},
    currentPlayers: [],
    matches: [],
  }

  findStats = (id) => {
    const { matches, currentPlayers } = this.props
    const pOneId = currentPlayers[0].id
    const pTwoId = currentPlayers[1].id
    const match = matches.filter(e => e.matchId === `${pOneId}-${pTwoId}` || e.matchId === `${pTwoId}-${pOneId}`)

    if (!match[0]) {
      return false
    }

    let playerWins = 0
    for (let i = 0; i < match[0].players.length; i++) {
      if (match[0].players[i].id === id) {
        playerWins = match[0].players[i].wins
      }
    }
    return playerWins
  }

  render() {
    const { currentPlayers, updatePlayers } = this.props
    return (
      <div className="standard-flex">
        <div className="match-wrapper air-2">
          <MatchItem
            name={currentPlayers[0].name}
            id={currentPlayers[0].id}
            crown={currentPlayers[0].crown}
            gate={currentPlayers[0].gate}
            updatePlayers={updatePlayers}
            wins={this.findStats(currentPlayers[0].id)}
            className="left"
          />
          <div className="match-divider">VS</div>
          <MatchItem
            name={currentPlayers[1].name}
            id={currentPlayers[1].id}
            crown={currentPlayers[1].crown}
            gate={currentPlayers[1].gate}
            updatePlayers={updatePlayers}
            wins={this.findStats(currentPlayers[1].id)}
            className="right"
          />
        </div>
        <style jsx>{`

          @import './static/scss/variables';

          .match {
            &-wrapper {
              display: flex;
              justify-content: space-between;
              padding-right: 8px;
            }
            &-item {
              color: white;
              font-size: 32px;
              white-space: nowrap;
              text-overflow: ellipsis;
              height: 192px;
              background-color: rgba(255, 255, 255, 0.2);
              width: 40%;
              flex-basis: 40%;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 4px;
              box-sizing: content-box;
            }
            &-divider {
              color: white;
              font-size: 24px;
              text-align: center;
              height: 192px;
              width: 10%;
              flex-basis: 10%;
              display: flex;
              align-items: center;
              justify-content: center;
              @media(max-width: $mobileMax) {
                font-size: 18px;
                height: 120px;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}
