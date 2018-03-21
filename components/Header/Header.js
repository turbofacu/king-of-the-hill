import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    crownSrc: PropTypes.number,
  }

  static defaultProps = {
    crownSrc: 0,
  }

  state = {
    animate: null,
  }

  componentDidMount() {
    this.setState({ animate: 'animate' })
  }

  render() {
    const { animate } = this.state
    const { crownSrc } = this.props

    return (
      <header className={`header standard-title ${animate} air-4`}>
        <h1 className="header-title">
          <div className="header-crown-wrapper">
            <span className="header-crown-letter">K<img className="header-crown" src={`./static/images/crown-${crownSrc}.png`} alt="crown" /></span>
            ing
          </div>
          <span className="header-title-text"> of the hill</span>
        </h1>

        <style jsx>{`

          @import './static/scss/variables';

          .header {
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.animate {
              .header-crown {
                animation: crown 2s cubic-bezier(0, 0, 0.53, 1.38) 1 forwards;
                transform-origin: right bottom;
              }
            }
            &-title {
              font-size: 68px;
              word-spacing: -18px;
              padding-top: #{$gutter * 4};
              @media(max-width: 768px) {
                font-size: 44px;
              }
            }
            &-crown {
              height: 50px;
              position: absolute;
              top: -35px;
              left: -15px;
              transition: all 500ms ease-out;
              transform: translate3d(0, -50px, 0);
              @media(max-width: 768px) {
                height: 32px;
                top: -25px;
                left: -10px;
              }
              &-letter {
                position: relative;
              }
              &-wrapper {
                margin-bottom: $gutter;
              }
            }
          }

          @keyframes crown {
            0% {
              transform: translate3d(0, -50px, 0) rotate(0deg);
            }
            10% {
              transform: translate3d(0, 0, 0) rotate(0deg);
            }
            15%  {
              transform: translate3d(0, -3px, 0) rotate(0deg);
            }
            25% {
              transform: translate3d(0, 0, 0) rotate(-9deg);
            }
            60% {
              transform: translate3d(0, 0, 0) rotate(-9deg);
            }
            65% {
              transform: translate3d(0, 0, 0) rotate(-15deg);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(-15deg);
            }
          }
        `}</style>
      </header>
    )
  }
}
