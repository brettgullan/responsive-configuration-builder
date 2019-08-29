import { __, cond, map } from 'ramda'

//-----------------------------------------------------------------------------

import { evaluateRatio } from './evaluate-ratio'
import { convertToNumberOrUndefined, convertSizeArrayToObject } from './helpers'

//-----------------------------------------------------------------------------

export const buildSizeForSize = (width, height) => ({
  width: convertToNumberOrUndefined(width),
  height: convertToNumberOrUndefined(height),
})

//-----------------------------------------------------------------------------

export const buildSizeForScale = (size, scale, lenient = true) => {
  const sc = lenient ? convertToNumberOrUndefined(scale) : scale
  return map((v) => {
    const sz = lenient ? convertToNumberOrUndefined(v) : v
    return sz && sc ? sz * sc : undefined
  }, convertSizeArrayToObject(size))
}

export const buildSizesForScale = (size, scale, lenient = true) =>
  map((s) => buildSizeForScale(size, s, lenient), scale)

//-----------------------------------------------------------------------------

export const buildSizeForRatio = (width, ratio, lenient = true) => {
  const w = lenient ? convertToNumberOrUndefined(width) : width
  const r = lenient ? evaluateRatio(ratio) : ratio

  return {
    width: w,
    height: w && r ? Math.round(w / r) : undefined,
  }
}

export const buildSizesForRatio = (widths, ratio, lenient = true) =>
  map((width) => buildSizeForRatio(width, ratio, lenient), widths)

//-----------------------------------------------------------------------------

export default cond([
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
