import { __, compose, curry, evolve, merge } from 'ramda'
import { renameKeys } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

import { convertToNumberOrUndefined } from './helpers'

//-----------------------------------------------------------------------------

export default curry((cloudinary, image, spec) =>
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
  )(spec),
)
