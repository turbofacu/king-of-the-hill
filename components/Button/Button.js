import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Button extends PureComponent {
  static propTypes = {
    addPlayer: PropTypes.func,
    focusInput: PropTypes.func,
    changeView: PropTypes.func,
    text: PropTypes.string,
    className: PropTypes.string,
    inputValue: PropTypes.string,
  }

  static defaultProps = {
    addPlayer: null,
    focusInput: null,
    changeView: null,
    text: 'Add Player',
    className: '',
    inputValue: '',
  }

  state = {
    animate: null,
  }

  componentDidMount() {
    this.mounted = true
    document.addEventListener('keydown', this.handleEnter);
  }

  componentWillUnmount() {
    this.mounted = false
    document.removeEventListener('keydown', this.handleEnter);
  }

  handleClick = () => {
    const {
      changeView,
      addPlayer,
      focusInput,
      inputValue,
    } = this.props
    if (addPlayer) {
      addPlayer(inputValue)
      focusInput()
    }
    if (changeView) {
      changeView()
    }
  }

  handleEnter = (e) => {
    const { inputValue } = this.props
    if (inputValue) {
      if (e.keyCode === 13) {
        this.handleClick()
        this.setState({ animate: 'animate' })
        if (!this.mounted) {
          return
        }
        setTimeout(() => {
          this.setState({ animate: null })
        }, 50)
      }
    }
  }

  render() {
    const { animate } = this.state
    const { text, className } = this.props
    return (
      <div className={`button ${className} ${animate}`} onClick={this.handleClick} role="button" tabIndex={0} >
        <span className="button-text">{text}</span>
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .button {
            color: white;
            font-family: $ff;
            font-size: 20px;
            text-align: center;
            background-color: $green;
            @include itemBorderBig(darken($green, 8%));
            padding: $gutter #{$gutter * 5};
            display: inline-block;
            cursor: pointer;
            position: relative;
            transition: transform 25ms linear;
            transform-origin: bottom right;
            border-top: 0 !important;
            border-left: 0 !important;
            &:focus {
              outline: none;
            }
            &:hover {
              transform: scale(1.1);
            }
            &.animate, &:active {
              transform: scale(0.9);
            }
            &.magenta {
              background-color: $magenta;
              @include itemBorderBig(darken($magenta, 8%));
              border: 2px solid darken($magenta, 3%);
            }
            &.orange {
              background-color: $orange;
              @include itemBorderBig(darken($orange, 8%));
              border: 2px solid darken($orange, 3%);
            }
            &.crimson {
              background-color: $crimson;
              @include itemBorderBig(darken($crimson, 8%));
              border: 2px solid darken($crimson, 3%);
            }
          }

        `}</style>
      </div>
    )
  }
}
