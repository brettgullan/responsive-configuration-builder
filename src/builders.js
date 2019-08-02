import {
  always,
  compose,
  cond,
  curry,
  defaultTo,
  isEmpty,
  join,
  map,
  T,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import {
  generateSizesForRatio,
  generateSizesForScale,
  generateSizeForRatio,
  generateSizeForSize,
} from './build-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

export const getBuilderForSpec = cond([
  [
    ({ widths, ratio }) => widths && ratio,
    ({ widths, ratio }) => generateSizesForRatio(widths, ratio, true),
  ],
  [
    ({ size, scale }) => size && scale,
    ({ size, scale }) => generateSizesForScale(size, scale, true),
  ],

  [
    ({ width, ratio }) => width && ratio,
    ({ width, ratio }) => generateSizeForRatio(width, ratio, true),
  ],
  [
    ({ width, height }) => width && height,
    ({ width, height }) => generateSizeForSize(width, height, true),
  ],
])

//-----------------------------------------------------------------------------

export const buildSrcSet = curry((url, tokens, { options, ...spec }) =>
  compose(
    // Return undefined (as error code) if result is empty string
    when(isEmpty, always(undefined)),

    // Collapse into final comma-separated srcSet string
    join(', '),

    // Build individual src/descriptor strings
    map((size) =>
      replaceTokens(`${url} {width}w`, Object.assign(tokens, options, size)),
    ),

    // Generate size object array using appropriate function
    // Invalid specs will result in empty array
    defaultTo([]),
    getBuilderForSpec,
  )(spec),
)

//-----------------------------------------------------------------------------

export const buildSrc = curry((url, tokens, { options, ...spec }) =>
  compose(
    // Return undefined (as error code) if result is empty string
    when(isEmpty, always(undefined)),

    // Build src string
    (size) => replaceTokens(url, Object.assign(tokens, options, size)),

    // Generate size object using appropriate function.
    defaultTo({}),
    getBuilderForSpec,
  )(spec),
)
