import { keyframes } from '@emotion/react'

export const accordion = (color) => keyframes`
  0%,
  80%,
  100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
    box-shadow: var(--color-${color}-1) -5px 5px, var(--color-${color}-2) -10px 10px;
  }
  20% {
    -webkit-transform: translateY(-10px);
    -ms-transform: translateY(-10px);
    transform: translateY(-10px);
    box-shadow: var(--color-${color}-1) -5px 8px, var(--color-${color}-2) -10px 15px;
  }
  60% {
    -webkit-transform: translateY(10px);
    -ms-transform: translateY(10px);
    transform: translateY(10px);
    box-shadow: var(--color-${color}-1) -5px 2.5px,
    var(--color-${color}-2) -10px 5px;
  } 
`
