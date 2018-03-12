import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Input extends PureComponent {
  static propTypes = {
    getValue: PropTypes.func,
    text: PropTypes.string,
    inputValue: PropTypes.string,
  }

  static defaultProps = {
    text: 'Player Name',
    inputValue: '',
    getValue: () => {},
  }

  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    this.textInput.focus();
  }


  render() {
    const { text, inputValue } = this.props
    return (
      <div className="input-wrapper">
        <svg className="input-svg-border" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 102 58" preserveAspectRatio="none">
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a8ec00" />
              <stop offset="100%" stopColor="#4be0b7" />
            </linearGradient>
          </defs>
          <rect x="1" y="1" fill="transparent" stroke="url(#linear)" strokeWidth="2" strokeMiterlimit="10" width="100" height="56" />
        </svg>
        <input
          type="text"
          className="standard-input"
          placeholder={text}
          value={inputValue}
          ref={ip => this.input = ip}
          onChange={evt => this.props.getValue(evt.target.value)}
        />
        <style jsx>{`

          @import './static/scss/variables';

          .input-wrapper {
            position: relative;
            overflow: hidden;
            &:hover {
              .standard-input {
                border: 2px solid magenta, 25%;
              }
            }
            .input-svg-border {
              height: 100%;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              transform: scale(1.034, 1); //HACK
              stroke-dasharray: 40;
              animation: dash 7s linear infinite;
              pointer-events: none;
            }
          }

          .standard-input {
            color: white;
            font-family: $ff;
            font-size: 20px;
            background-color: rgba(0, 0, 0, 0.3);
            width: 100%;
            padding: 16px;
            transition: all 25ms ease-out;
            border: 2px solid lighten($black, 2%);
            box-sizing: border-box;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            &:focus {
              color: $black;
              outline: none;
              background-color: rgba(white, 0.95);
              border: 2px solid lighten(magenta, 25%);
            }
          }

          @keyframes dash {
            to {
              stroke-dashoffset: 1000;
            }
          }

        `}</style>
      </div>
    )
  }
}
