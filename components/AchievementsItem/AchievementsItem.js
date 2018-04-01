import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AchievementsItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    medal: PropTypes.string.isRequired,
    time: PropTypes.string,
  }

  static defaultProps = {
    time: null,
  }

  render() {
    const {
      name,
      title,
      badge,
      medal,
      time,
    } = this.props
    return (
      <li className="achievements-item rekt air-3">
        <span className="achievements-item-badge">
          <span className={`achievements-item-badge-rope ${medal}`}></span>
          <span className={`achievements-item-badge-coin ${medal}`}>
            <span className="achievements-item-badge-content">{badge}</span>
          </span>
        </span>
        <div className="achievements-item-content">
          <div className="achievements-item-title air-1">{title}</div>
          <div className="achievements-item-text air-1"><strong>{name}</strong></div>
          {time &&
            <div className="achievements-item-value">
              Time: {time}
            </div>
          }
        </div>
        <style jsx global>{`

          @import './static/scss/variables';
          @import './static/scss/mixins';

          .achievements-item {
            color: white;
            display: flex;
            align-items: flex-start;
            @media(max-width: $mobileMax) {
              margin-bottom: #{$gutter * 2};
            }
            @media(min-width: $tabletMin) {
              width: 50%;
              flex-basis: 50%;
            }
            @media(max-width: $mobileMax) {
              flex-direction: column;
              align-items: center;
            }
            &-content {
              @media(min-width: $tabletMin) {
                width: 70%;
              }
              @media(max-width: $mobileMax) {
                text-align: center;
              }
            }
            &-title, &-text, &-value {
              @media(min-width: $tabletMin) {
                margin-right: $gutter;
              }
            }
            &-title {
              font-size: 18px;
              text-transform: uppercase;
              text-shadow: 1px 1px darken(white, 75%), 2px 2px darken(white, 75%), 3px 3px darken(white, 75%);
            }
            &-text {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              @media(min-width: $tabletMin) {
                max-width: 60%;
              }
            }
            &-badge {
              min-height: 50px;
              width: 35px;
              position: relative;
              @media(min-width: $tabletMin) {
                margin-right: #{$gutter * 2};
              }
              @media(max-width: $mobileMax) {
                margin-bottom: $gutter;
              }
              &-coin {
                line-height: 35px;
                width: 35px;
                height: 35px;
                border-radius: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
                overflow: hidden;
                position: absolute;
                bottom: 0;
                transform: translateZ(0);
                &.gold {
                  color: darken(gold, 20%);
                  background-color: gold;
                  border: 1px solid lighten(gold, 15%);
                  @include itemBorderXSmall(darken(gold, 15%));
                  .achievements-item-badge-content {
                    text-shadow: 1px 1px darken(gold, 5%);
                  }
                }
                &.silver {
                  color: darken($silver, 20%);
                  background-color: $silver;
                  border: 1px solid lighten($silver, 5%);
                  @include itemBorderXSmall(darken($silver, 15%));
                  .achievements-item-badge-content {
                    text-shadow: 1px 1px darken($silver, 5%);
                  }
                }
                &.bronze {
                  color: darken($bronze, 20%);
                  background-color: $bronze;
                  border: 1px solid lighten($bronze, 7%);
                  @include itemBorderXSmall(darken($bronze, 15%));
                  .achievements-item-badge-content {
                    text-shadow: 1px 1px darken($bronze, 5%);
                  }
                }
                &:before, &:after {
                  content: '';
                  background-color: white;
                  width: 7px;
                  position: absolute;
                  top: 0;
                  right: 10px;
                  bottom: 0;
                  transform: translate3d(-50px, 0, 0) skew(-15deg);
                  animation: bling 2.5s ease-out infinite;
                }
                &:after {
                  width: 2px;
                  right: 19px;
                }
              }
              &-content {
                margin-left: 2px;
                position: relative;
                z-index: 2;
              }
              &-rope {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                &.gold {
                  &:before, &:after {
                    border: lighten(red, 7%) solid 1px;
                    background-color: red;
                  }
                }
                &.silver {
                  &:before, &:after {
                    border: lighten(blue, 7%) solid 1px;
                    background-color: blue;
                  }
                }
                &.bronze {
                  &:before, &:after {
                    border: lighten(purple, 7%) solid 1px;
                    background-color: purple;
                  }
                }
                &:before, &:after {
                  content: '';
                  height: 25px;
                  width: 10px;
                  position: absolute;
                  top: 0;
                }
                &:before {
                  transform: skew(20deg);
                  left: 2px;
                }
                &:after {
                  transform: skew(-20deg);
                  right: 0;
                }
              }
            }
          }

          @keyframes bling {
            0%, 20.0001% {
              transform: translate3d(-50px, 0, 0) skew(-15deg);
            }
            20%, 40%, 100% {
              transform: translate3d(50px, 0, 0) skew(-15deg);
            }
          }
        `}
        </style>
      </li>
    )
  }
}
