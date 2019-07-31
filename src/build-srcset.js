import { __, compose, map, multiply, useWith } from 'ramda'

//-----------------------------------------------------------------------------

import {
  convertToNumericValue,
  convertZeroToUndefined,
  transformSizesArray,
} from './helpers'

//-----------------------------------------------------------------------------

const multiplier = (size) =>
  compose(
    map(__, size),
    multiply,
  )

export const generateSizesForScale = (size, scale) =>
  map(multiplier(size), scale)

// Most of this function is parsing and data normalization.
// Use the function above, if confident of input formats and values.
export const srcsetByScale = compose(
  map(map(convertZeroToUndefined)),
  useWith(generateSizesForScale, [
    compose(
      transformSizesArray,
      map(convertToNumericValue),
    ),
    map(convertToNumericValue),
  ]),
)

//-----------------------------------------------------------------------------

export const generateSizesForRatio = (size, ratio) => {}

//-----------------------------------------------------------------------------

export default {
  srcsetByScale,
}
