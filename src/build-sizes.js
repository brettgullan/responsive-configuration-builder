import { __, compose, map, multiply, identity, useWith } from 'ramda'

//-----------------------------------------------------------------------------

import { evaluateRatio } from './evaluate-ratio'
import { convertToNumberOrUndefined, transformSizesArray } from './helpers'

//-----------------------------------------------------------------------------

export const generateSizeForSize = (width, height) => ({
  width: convertToNumberOrUndefined(width),
  height: convertToNumberOrUndefined(height),
})

//-----------------------------------------------------------------------------

export const generateSizeForScale = (size, scale, lenient = false) => {
  const sc = lenient ? convertToNumberOrUndefined(scale) : scale
  return map((v) => {
    const sz = lenient ? convertToNumberOrUndefined(v) : v
    return sz && sc ? sz * sc : undefined
  }, transformSizesArray(size))
}

export const generateSizesForScale = (size, scale, lenient = false) =>
  map((s) => generateSizeForScale(size, s, lenient), scale)

export const buildSizesForScale = ({ size, scale }) =>
  generateSizesForScale(size, scale, true)

//-----------------------------------------------------------------------------

export const generateSizeForRatio = (width, ratio, lenient = false) => {
  const w = lenient ? convertToNumberOrUndefined(width) : width
  const r = lenient ? evaluateRatio(ratio) : ratio

  return {
    width: w,
    height: w && r ? Math.round(w / r) : undefined,
  }
}

export const generateSizesForRatio = (widths, ratio, lenient = false) =>
  map((width) => generateSizeForRatio(width, ratio, lenient), widths)

export const buildSizesForRatio = ({
  widths,
  ratio,
  aspectRatio,
  'aspect-ratio': ar,
}) => generateSizesForRatio(widths, ratio || aspectRatio || ar, true)

//-----------------------------------------------------------------------------
// Probably don't need these methods.
// Can replace with just a simple widths expander.

export const generateRatioForRatio = (width, ratio, lenient = false) => ({
  width: lenient ? convertToNumberOrUndefined(width) : width,
  ratio,
})

export const generateRatiosForRatio = (widths, ratio, lenient = false) =>
  map((width) => generateRatioForRatio(width, ratio, lenient), widths)

export const buildRatiosForRatio = ({
  widths,
  ratio,
  aspectRatio,
  'aspect-ratio': ar,
}) => generateRatiosForRatio(widths, ratio || aspectRatio || ar, true)

//-----------------------------------------------------------------------------

export default {
  generateSizesForScale,
  generateSizesForRatio,
  generateRatiosForRatio,

  buildSizesForScale,
  buildSizesForRatio,
  buildRatiosForRatio,
}
