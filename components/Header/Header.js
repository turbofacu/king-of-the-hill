import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: 'Add Player',
  }

  state = {
    animate: null,
  }

  componentDidMount() {
    this.setState({ animate: 'animate' })
  }

  render() {
    const { animate } = this.state
    const { text } = this.props

    return (
      <header className={`header standard-title ${animate} air-4`}>
        <h1 className="header-title">
          <div className="header-crown-wrapper">
            <span className="header-crown-letter">K<img className="header-crown" src="./static/images/crown.png" alt="crown" /></span>
            ing
          </div>
          <span className="header-title-text"> of the hill</span>
        </h1>

        <style jsx>{`

          @import './static/scss/variables';

          .header {
            font-size: 32px;
            text-transform: uppercase;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.animate {
              .header-crown {
                animation: crown 350ms cubic-bezier(0, 0, 0.53, 1.38) 1 forwards;
                transform-origin: right bottom;
              }
            }
            &-title {
              font-size: 68px;
              padding-top: #{$gutter * 4};
              @media(max-width: 768px) {
                font-size: 40px;
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
            80% {
              transform: translate3d(0, 0, 0) rotate(0deg);
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