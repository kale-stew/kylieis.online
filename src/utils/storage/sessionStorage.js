import partial from 'lodash.partial'
import { setValueTo, getValueFrom } from './core'
import { sessionStorage } from './browser'

export const setValueToSessionStorage = partial(setValueTo, sessionStorage)
export const getValueFromSessionStorage = partial(getValueFrom, sessionStorage)
