import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class RewindButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {},
  }

  render() {
    return (
      <div className="back-button-wrapper air-4" tabIndex={0} role="button" onClick={this.props.onClick}>
        <span className="back-button red-button">&#171;</span>
        <style jsx>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .back-button {
            font-size: 42px;
            line-height: 19px;
            padding-left: 4px;
            box-sizing: border-box;
            display: inline-block;
            &-wrapper {
              text-align: center;
            }
          }

        `}
        </style>
      </div>
    )
  }
}
