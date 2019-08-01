import { evolve, is, when } from 'ramda'

//-----------------------------------------------------------------------------

import buildSrcSet from './build-srcset'

//-----------------------------------------------------------------------------

export const constructImage = (url, { options, ...spec }) => {
  return evolve({
    srcset: when(is(Object), buildSrcSet(url, options)),
  })(spec)
}
