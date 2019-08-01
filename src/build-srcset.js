import {
  always,
  compose,
  cond,
  curry,
  defaultTo,
  isEmpty,
  join,
  map,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import {
  generateSizeForRatio,
  generateSizesForRatio,
  generateSizesForScale,
} from './build-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

export const buildSrc = curry((url, tokens, { options, ...spec }) => {
  const { width, ratio } = spec
  // TODO: work out which generate function to call -- size, scale, ratio, etc.
  const size = generateSizeForRatio(width, ratio, true)
  return replaceTokens(url, Object.assign(tokens, options, size))
})

//-----------------------------------------------------------------------------

const buildSizesForSrcSet = cond([
  [
    ({ widths, ratio }) => widths && ratio,
    ({ widths, ratio }) => generateSizesForRatio(widths, ratio, true),
  ],
  [
    ({ size, scale }) => size && scale,
    ({ size, scale }) => generateSizesForScale(size, scale, true),
  ],
])

export const buildSrcSet = curry((url, tokens, { options, ...spec }) => {
  return compose(
    when(isEmpty, always(undefined)),
    join(', '),
    map((size) =>
      replaceTokens(`${url} {width}w`, Object.assign(tokens, options, size)),
    ),
    defaultTo([]),
    buildSizesForSrcSet,
  )(spec)
})
