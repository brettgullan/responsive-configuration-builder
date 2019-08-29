import { __, cond, map } from 'ramda'

//-----------------------------------------------------------------------------

import { evaluateRatio } from './evaluate-ratio'
import { convertToNumberOrUndefined, convertSizeArrayToObject } from './helpers'

//-----------------------------------------------------------------------------

export const expandSize = ({ width, height, ...options }) => ({
  width: convertToNumberOrUndefined(width),
  height: convertToNumberOrUndefined(height),
  ...options,
})

//-----------------------------------------------------------------------------

export const expandSizeForScale = (size, scale, options) => {
  const sc = convertToNumberOrUndefined(scale)
  const expanded = map((v) => {
    const sz = convertToNumberOrUndefined(v)
    return sz && sc ? sz * sc : undefined
  }, convertSizeArrayToObject(size))
  return {
    ...expanded,
    ...options,
  }
}

export const expandSizesForScale = ({ size, scale, ...options }) =>
  map((s) => expandSizeForScale(size, s, options), scale)

//-----------------------------------------------------------------------------

export const expandWidthForRatio = (width, ratio, options) => {
  const w = convertToNumberOrUndefined(width)
  const r = evaluateRatio(ratio)

  return {
    width: w,
    height: w && r ? Math.round(w / r) : undefined,
    ...options,
  }
}

export const expandWidthsForRatio = ({ widths, ratio, ...options }) =>
  map((width) => expandWidthForRatio(width, ratio, options), widths)

//-----------------------------------------------------------------------------

export default cond([
  [({ widths, ratio }) => widths && ratio, expandWidthsForRatio],
  [({ size, scale }) => size && scale, expandSizesForScale],

  [
    ({ width, ratio }) => width && ratio,
    ({ width, ratio, ...options }) =>
      expandWidthForRatio(width, ratio, options),
  ],
  [({ width, height }) => width && height, expandSize],
])
