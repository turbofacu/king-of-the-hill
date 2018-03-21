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
          @import './static/scss/mixins';

          .input-wrapper {
            width: 100%;
            position: relative;
            overflow: hidden;
            @include itemBorderBig(#000);
            &:focus-within {
              @include itemBorderBig($magenta);
            }
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
              stroke-dasharray: 31;
              stroke-dashoffset: 0;
              animation: dash 2s linear infinite;
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
            border-radius: 0;
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
            0%, 9% {
              stroke-dashoffset: 0;
            }
            10%, 19% {
              stroke-dashoffset: 100;
            }
            20%, 29% {
              stroke-dashoffset: 200;
            }
            30%, 39% {
              stroke-dashoffset: 300;
            }
            40%, 49% {
              stroke-dashoffset: 400;
            }
            50%, 59% {
              stroke-dashoffset: 500;
            }
            60%, 69% {
              stroke-dashoffset: 600;
            }
            70%, 79% {
              stroke-dashoffset: 700;
            }
            80%, 89% {
              stroke-dashoffset: 800;
            }
            90%, 100% {
              stroke-dashoffset: 900;
            }
          }

        `}</style>
      </div>
    )
  }
}
