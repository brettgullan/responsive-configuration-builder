import {
  always,
  compose,
  cond,
  curry,
  identity,
  is,
  isEmpty,
  join,
  map,
  merge,
  propIs,
  T,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import { buildSizesForWidths } from './build-cloudinary-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

const buildSizesForSpec = cond([
  [propIs(Array, 'widths'), buildSizesForWidths],
  [T, identity],
])

//-----------------------------------------------------------------------------

const formatForSize = (url, tokens) =>
  compose(
    replaceTokens(url),
    merge(tokens),
  )

//-----------------------------------------------------------------------------

export const buildSpec = curry((cloudinary, image, { options, ...spec }) =>
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

export default buildSpec
