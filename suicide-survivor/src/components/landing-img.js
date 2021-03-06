import { BackgroundImg } from './utils/img-utils'
import { colors, fontWeight } from '../constants/style-variables'
import ArrowDownIcon from '../../static/arrow_down.svg'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import styled, { keyframes } from 'styled-components'
import { scrollUnlocker } from '../utils/scroll-manager'

const fontSize = '42px'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 100;
`
const Title = styled.div`
  color: ${colors.white};
  font-size: ${fontSize};
  font-weight: ${fontWeight.heavy};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  ${mq.mobile`
    top: 53%;
    font-size: 25px;
  `};
`

const TitleRow = styled.div`
  margin-bottom: 8px;
`

const fadeInSlideDown = keyframes`
  from {
    transform: translate(-50%, 0px);
  }
  50% {
    transform: translate(-50%, 10px);
  }
  to {
    transform: translate(-50%, 0);
  }
`

const IconContainer = styled.div`
  opacity: 1;
  position: absolute;
  left: 50%;
  height: 26px;
  width: 27px;
  cursor: pointer;
  >svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  bottom: 18%;
  ${mq.tablet`
    bottom: 5.4%
  `}
  ${mq.desktopAbove`
    bottom: 4.7%;
  `}
  ${mq.desktopHd`
    bottom: 4.2%;
  `}
  transform: translateX(-50%);
  animation: ${fadeInSlideDown} 1500ms ease infinite both;
`

class Header extends React.Component {
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
    this.module = {}
  }

  _handleClick(event) {
    const { playAllAudios } = this.props
    event.preventDefault()
    if (typeof window === 'undefined') return
    if (document.body.style.overflowY === 'hidden') {
      scrollUnlocker()
      playAllAudios()
    }
    const targetHeight = this.module.offsetHeight || window.innerHeight
    return smoothScroll(targetHeight + 1)
  }

  render() {
    const { title, image } = this.props
    const { mobile, tablet, desktop } = image.resizedTargets
    return (
      <Container
        innerRef={(node) => { this.module = node }}
      >
        <BackgroundImg mobile={mobile} tablet={tablet} desktop={desktop} />
        <Title>
          <TitleRow>{title.rowOne}</TitleRow>
          <TitleRow>{title.rowTwo}</TitleRow>
        </Title>
        <IconContainer onClick={this._handleClick}><ArrowDownIcon /></IconContainer>
      </Container>
    )
  }
}

Header.propTypes = {
  title: PropTypes.object.isRequired,
  image: PropTypes.shape({
    resizedTargets: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      tablet: PropTypes.string.isRequired,
      desktop: PropTypes.string.isRequired,
    }),
  }).isRequired,
  playAllAudios: PropTypes.func.isRequired,
}

export default Header
