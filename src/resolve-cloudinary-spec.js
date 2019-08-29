import {
  __,
  always,
  both,
  compose,
  concat,
  cond,
  curry,
  evolve,
  identity,
  is,
  isEmpty,
  join,
  map,
  merge,
  propIs,
  T,
  tap,
  when,
} from 'ramda'
import { renameKeys } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

import {
  expandWidths,
  expandWidthsAndResolutions,
} from './expand-cloudinary-sizes'
import { convertToNumberOrUndefined } from './helpers'

//-----------------------------------------------------------------------------

const expandShorthandSpecifications = cond([
  [
    both(propIs(Array, 'widths'), propIs(Array, 'resolutions')),
    expandWidthsAndResolutions,
  ],
  [propIs(Array, 'widths'), expandWidths],
  [T, identity],
])

//-----------------------------------------------------------------------------

const formatForSize = (cloudinary, image) =>
  compose(
    ({ id, ...options }) => cloudinary.url(id, options),
    evolve({
      width: convertToNumberOrUndefined,
    }),
    renameKeys({
      ratio: 'aspect_ratio',
      aspectRatio: 'aspect_ratio',
      ar: 'aspect_ratio',
    }),
    merge(image),
  )

//-----------------------------------------------------------------------------

export const resolveSpec = curry((cloudinary, image, spec) =>
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
          map((options) =>
            compose(
              concat(__, ` ${convertToNumberOrUndefined(options.width)}w`),
              formatForSize(cloudinary, image),
            )(options),
          ),
        ),
      ],

      // Handle single object -- i.e. src format
      [is(Object), formatForSize(cloudinary, image)],
    ]),

    // tap(console.log),

    expandShorthandSpecifications,
  )(spec),
)

//-----------------------------------------------------------------------------

export default resolveSpec
