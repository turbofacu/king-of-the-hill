import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class MatchItem extends PureComponent {
  static propTypes = {
    updatePlayers: PropTypes.func,
    name: PropTypes.string,
    id: PropTypes.string,
    crown: PropTypes.number,
    gate: PropTypes.bool,
    wins: PropTypes.number,
    className: PropTypes.string,
  }

  static defaultProps = {
    updatePlayers: () => {},
    name: '',
    id: null,
    crown: false,
    gate: false,
    wins: 0,
    className: '',
  }

  componentDidUpdate() {
    this.renderCrown()
  }

  handleClick = () => {
    const { updatePlayers, id } = this.props
    updatePlayers(id)
  }

  renderCrown = () => {
    const { crown } = this.props
    const crowns = []
    let i
    for (i = 0; i < crown; i += 1) {
      crowns.push(true)
    }
    return (
      <div className="match-item-status match-item-crown-wrapper">
        { crowns.map((e, index) => <img className="match-item-status-icon match-item-crown" src={`./static/images/crown-${index}.png`} alt="crown" key={`${index}-crown`} />) }
      </div>
    )
  }

  render() {
    const {
      name,
      crown,
      gate,
      id,
      wins,
      className,
    } = this.props
    return (
      <div className={`match-item item-with-color big ${crown} gate-${gate} color-${id.substring(0, 1)} ${className}`} onClick={this.handleClick} role="button" tabIndex={0}>
        <span className="match-item-wins">{wins}</span>
        <span className="match-item-name">{name}</span>
        {gate &&
          <div className="match-item-status">
            <img className="match-item-status-icon match-item-gate" src="./static/images/skull-black.png" alt="skull" />
          </div>
        }
        {crown >= 1 &&
          this.renderCrown()
        }
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .match {
            &-item {
              color: $black;
              font-size: 32px;
              white-space: nowrap;
              text-overflow: ellipsis;
              height: 192px;
              width: 40%;
              flex-basis: 40%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-sizing: content-box;
              position: relative;
              transition: all 250ms ease-out;
              cursor: pointer;
              border: 0;
              transition: transform 25ms linear;
              transform-origin: bottom right;
              @media(max-width: $mobileMax) {
                font-size: 20px;
                height: 120px;
              }
              &:focus {
                outline: none;
              }
              &:hover {
                transform: scale(1.05);
              }
              &:active {
                transform: scale(0.9);
              }
              &-name {
                text-align: center;
                max-width: 100%;
                width: 100%;
                padding: 0 $gutter;
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              &-wins {
                font-size: 16px;
                position: absolute;
                top: $gutter;
              }
              &.left {
                .match-item-wins {
                  right: $gutter;
                }
              }
              &.right {
                .match-item-wins {
                  left: $gutter;
                }
              }
            }
          }
        `}</style>
        <style jsx global>{`

          @import './static/scss/variables';

          .match-item {
            &-status {
              display: flex;
              position: absolute;
              bottom: $gutter;
              right: $gutter;
              &-icon {
                height: 40px;
                width: auto;
                margin-left: #{$gutter / 2};
                @media(max-width: $mobileMax) {
                  height: 20px;
                  width: auto;
                }
              }
            }
          }

        `}</style>
      </div>
    )
  }
}
