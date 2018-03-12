import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import MatchItem from '../MatchItem/MatchItem'

export default class Match extends PureComponent {
  static propTypes = {
    currentPlayers: PropTypes.arrayOf(PropTypes.object),
    updatePlayers: PropTypes.func,
  }

  static defaultProps = {
    currentPlayers: [],
    updatePlayers: () => {},
  }

  render() {
    const { currentPlayers, updatePlayers } = this.props
    return (
      <div className="standard-flex">
        <div className="match-wrapper air-4">
          <MatchItem
            name={currentPlayers[0].name}
            id={currentPlayers[0].id}
            crown={currentPlayers[0].crown}
            gate={currentPlayers[0].gate}
            updatePlayers={updatePlayers}
          />
          <div className="match-divider">VS</div>
          <MatchItem
            name={currentPlayers[1].name}
            id={currentPlayers[1].id}
            crown={currentPlayers[1].crown}
            gate={currentPlayers[1].gate}
            updatePlayers={updatePlayers}
          />
        </div>
        <style jsx>{`
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
              @media( max-width: 768px ) {
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
