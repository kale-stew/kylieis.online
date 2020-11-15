import partial from 'lodash.partial'
import { setValueTo, getValueFrom } from './core'
import { localStorage } from './browser'

export const setValueToLocalStorage = partial(setValueTo, localStorage)
export const getValueFromLocalStorage = partial(getValueFrom, localStorage)
