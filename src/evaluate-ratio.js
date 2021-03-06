const ratioCaseRegex = /^(\d+)\s?:\s?(\d+)$/
const fractionalCaseRegex = /^(\d+)\s?\/\s?(\d+)$/

//-----------------------------------------------------------------------------

/**
 * Convert common aspect-ratio expressions (width/height) into decimal values.
 * i.e:
 *    16/9 = 1.777*
 *    '16/9' = 1.777*
 *    '4:3' = 1.333*
 *    '56.25%' = 1.777*
 * Useful when calculating height based on a width and ratio.
 *
 * @param {Number|String} ratio
 * @return {Number} ratio expressed as decimal width/height
 */
export const evaluateRatio = (ratio) => {
  if (!ratio) return undefined // sanity!

  let candidate = Number(ratio)

  // Anything that has dynamically resolved to a Number
  // 16/9, 1.7777778, etc.
  if (candidate) return candidate

  candidate = ratio.toString().trim()

  // percentage case
  if (candidate.slice(-1) === '%') {
    return 1 / (Number.parseFloat(candidate) / 100)
  }

  // ratio case (width:height)
  if (ratioCaseRegex.test(candidate)) {
    const result = ratioCaseRegex.exec(candidate)
    return result[1] / result[2]
  }

  // fractional case (width/height)
  if (fractionalCaseRegex.test(candidate)) {
    const result = fractionalCaseRegex.exec(candidate)
    return result[1] / result[2]
  }

  // wtf?
  return undefined
}

export default evaluateRatio
