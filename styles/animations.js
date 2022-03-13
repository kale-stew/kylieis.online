import { keyframes } from '@emotion/react'

export const accordion = (color) => keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    box-shadow: var(--color-${color}-1) -5px 5px,
      var(--color-${color}-2) -10px 10px,
      var(--color-${color}-3) -15px 15px,
      var(--color-${color}-4) -20px 20px;
  }
  20% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
    box-shadow: var(--color-${color}-1) -5px 8px,
      var(--color-${color}-2) -10px 15px,
      var(--color-${color}-3) -15px 22px,
      var(--color-${color}-4) -20px 30px;
  }
  60% {
    -webkit-transform: translateY(10px);
    -ms-transform: translateY(10px);
    transform: translateY(10px);
    box-shadow: var(--color-${color}-1) -5px 2.5px,
      var(--color-${color}-2) -10px 5px,
      var(--color-${color}-3) -15px 7.5px,
      var(--color-${color}-4) -20px 9px;
  } 
`

export const miniAccordion = (color) => keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    box-shadow: var(--color-${color}-1) -5px 5px,
      var(--color-${color}-2) -10px 10px;
  }
  20% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
    box-shadow: var(--color-${color}-1) -5px 8px,
      var(--color-${color}-2) -10px 15px;
  }
  60% {
    -webkit-transform: translateY(10px);
    -ms-transform: translateY(10px);
    transform: translateY(10px);
    box-shadow: var(--color-${color}-1) -5px 2.5px,
      var(--color-${color}-2) -10px 5px;
  } 
`

export const mobileAccordion = (color) => keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    box-shadow: var(--color-${color}-1) 0 5px,
      var(--color-${color}-2) 0 10px,
      var(--color-${color}-3) 0 15px,
      var(--color-${color}-4) 0 20px;
  }
  20% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
    box-shadow: var(--color-${color}-1) 0 8px,
      var(--color-${color}-2) 0 15px,
      var(--color-${color}-3) 0 22px,
      var(--color-${color}-4) 0 30px;
  }
  60% {
    -webkit-transform: translateY(10px);
    -ms-transform: translateY(10px);
    transform: translateY(10px);
    box-shadow: var(--color-${color}-1) 0 2.5px,
      var(--color-${color}-2) 0 5px,
      var(--color-${color}-3) 0 7.5px,
      var(--color-${color}-4) 0 9px;
  } 
`
