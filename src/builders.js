import {
  always,
  compose,
  cond,
  curry,
  defaultTo,
  is,
  isEmpty,
  join,
  map,
  merge,
  tap,
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

const buildSizesForSpec = cond([
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

const formatForSize = (url, tokens) =>
  compose(
    replaceTokens(url),
    merge(tokens),
  )

//-----------------------------------------------------------------------------

export const buildSpec = curry((url, tokens, { options, ...spec }) =>
  compose(
    // Return undefined (as error code) if final result is empty string
    when(isEmpty, always(undefined)),

    cond([
      // Handle arrays -- i.e. srcSet format
      [
        is(Array),
        compose(
          // Collapse into final comma-separated srcSet string
          join(', '),

          // Build individual src/descriptor strings
          map(formatForSize(`${url} {width}w`, merge(tokens, options))),
        ),
      ],

      // Handle single object -- i.e. src format
      [is(Object), formatForSize(url, merge(tokens, options))],
    ]),

    buildSizesForSpec,
  )(spec),
)

//-----------------------------------------------------------------------------

export const buildSrcSet = buildSpec
export const buildSrc = buildSpec
