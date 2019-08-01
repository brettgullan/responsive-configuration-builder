import { curry } from 'ramda'

//-----------------------------------------------------------------------------

import { generateSizeForRatio } from './build-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

export const buildSrc = curry((url, tokens, { options, ...spec }) => {
  const { width, ratio } = spec
  // TODO: work out which generate function to call -- size, scale, ratio, etc.
  const size = generateSizeForRatio(width, ratio, true)
  return replaceTokens(url, Object.assign(tokens, options, size))
})

export default buildSrc
