import {
  always,
  compose,
  cond,
  curry,
  is,
  isEmpty,
  join,
  map,
  merge,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import {
  buildSizeForSize,
  buildSizesForScale,
  buildSizeForRatio,
  buildSizesForRatio,
} from './build-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

const buildSizesForSpec = cond([
  [
    ({ widths, ratio }) => widths && ratio,
    ({ widths, ratio }) => buildSizesForRatio(widths, ratio, true),
  ],
  [
    ({ size, scale }) => size && scale,
    ({ size, scale }) => buildSizesForScale(size, scale, true),
  ],

  [
    ({ width, ratio }) => width && ratio,
    ({ width, ratio }) => buildSizeForRatio(width, ratio, true),
  ],
  [
    ({ width, height }) => width && height,
    ({ width, height }) => buildSizeForSize(width, height, true),
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
