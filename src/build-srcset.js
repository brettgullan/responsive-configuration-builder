import {
  compose,
  concat,
  converge,
  curry,
  join,
  map,
  omit,
  pick,
  zipWith,
} from 'ramda'

//-----------------------------------------------------------------------------

import {
  generateSizeForRatio,
  generateSizesForRatio,
  buildSizesForRatio,
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

/*
export const buildSrcSet = (url, { widths, ratio }, tokens) => {
  let sizes = generateSizesForRatio(widths, ratio)
  sizes = map((size) => replaceTokens(url, Object.assign(tokens, size)), sizes)
  return sizes.join(', ')
}


export const buildSrcSet = (url, spec, tokens) => compose(
  join(', '),
  map((size) => replaceTokens(url, Object.assign(tokens, size))),
  buildSizesForRatio
)(spec)
*/

/*
export const buildSrcSet = curry((url, tokens, { options, ...spec }) => {
  const { widths, ratio } = spec
  // TODO: work out which generate function to call -- size, scale, ratio, etc.
  const sizes = generateSizesForRatio(widths, ratio, true)
  return map(
    (size) =>
      replaceTokens(`${url} {width}w`, Object.assign(tokens, options, size)),
    sizes,
  ).join(', ')
})
*/

export const buildSrcSet = curry((url, tokens, { options, ...spec }) => {
  const { widths, ratio } = spec
  // TODO: work out which generate function to call -- size, scale, ratio, etc.
  const sizes = generateSizesForRatio(widths, ratio, true)
  return compose(
    join(', '),
    converge(zipWith(concat), [
      map((size) => replaceTokens(url, Object.assign(tokens, options, size))),
      map((size) => replaceTokens(` {width}w`, size)),
    ]),
  )(sizes)
})
