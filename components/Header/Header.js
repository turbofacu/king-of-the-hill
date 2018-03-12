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
        <h1 className="header-title">{text}</h1>
        <img className="header-crown" src="./static/images/crown.png" alt="crown" />
        <style jsx>{`

          @import './static/scss/variables';

          .header {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            &.animate {
              .header-crown {
                transform: translate3d(0, 0, 0) rotate(-20deg);
              }
            }
            &-title {
              padding-top: #{$gutter * 4};
            }
            &-crown {
              height: 40px;
              position: absolute;
              top: 25px;
              left: 16px;
              transition: all 500ms ease-out;
              transform: translate3d(0, -50px, 0) rotate(-20deg);
            }
          }
        `}</style>
      </header>
    )
  }
}
