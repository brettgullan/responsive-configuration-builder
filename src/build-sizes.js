import { __, compose, map, multiply, identity, useWith } from 'ramda'

//-----------------------------------------------------------------------------

import { evaluateRatio } from './evaluate-ratio'
import {
  convertToNumericValue,
  convertZeroToUndefined,
  transformSizesArray,
} from './helpers'

//-----------------------------------------------------------------------------

const resolveSizeWithScale = (size) =>
  compose(
    map(__, size),
    multiply,
  )

export const generateSizesForScale = (size, scale) =>
  map(resolveSizeWithScale(size), scale)

// Most of this function is parsing and data normalization.
// Use the function above, if confident of input formats and values.
export const buildSizesForScale = compose(
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

const resolveSizeWithRatio = (width, ratio) => ({
  width,
  height: ratio ? Math.round(width / ratio) : 0,
})

export const generateSizesForRatio = (widths, ratio) =>
  map((width) => resolveSizeWithRatio(width, ratio), widths)

export const buildSizesForRatio = ({
  widths,
  ratio,
  aspectRatio,
  'aspect-ratio': ar,
}) =>
  useWith(
    compose(
      map(map(convertZeroToUndefined)),
      (widths, ratio) => generateSizesForRatio(widths, ratio),
    ),
    [map(convertToNumericValue), evaluateRatio],
  )(widths, ratio || aspectRatio || ar)

//-----------------------------------------------------------------------------

export const generateRatiosForRatio = (widths, ratio) =>
  map((width) => ({ width, ratio }), widths)

export const buildRatiosForRatio = ({
  widths,
  ratio,
  aspectRatio,
  'aspect-ratio': ar,
}) =>
  useWith(
    compose(
      map(map(convertZeroToUndefined)),
      (widths, ratio) => generateRatiosForRatio(widths, ratio),
    ),
    [map(convertToNumericValue), identity],
  )(widths, ratio || aspectRatio || ar)

//-----------------------------------------------------------------------------

export default {
  generateSizesForScale,
  generateSizesForRatio,
  generateRatiosForRatio,

  buildSizesForScale,
  buildSizesForRatio,
  buildRatiosForRatio,
}
