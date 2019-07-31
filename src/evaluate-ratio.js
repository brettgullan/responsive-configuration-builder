const ratioCaseRegex = /^\d+:\d+$/
const fractionalCaseRegex = /^\d+\/\d+$/

//-----------------------------------------------------------------------------

/**
 * Convert common aspect-ratio expressions (width/height) into decimal values.
 * i.e:
 *    16/9 = 0.5625
 *    '16/9' = 0.5625
 *    '4:3' = 0.75
 *    '56.25%' = 0.5625
 * Useful when calculating height based on a width and ratio.
 *
 * @param {Number|String} ratio
 * @return {Number} ratio expressed as decimal width/height
 */
export const evaluateRatio = (ratio) => {
  let candidate = Number(ratio)

  // Anything that has dynamically resolved to a Number
  // 16/9, 1.7777778, etc.
  if (candidate) {
    return 1 / candidate
  }

  candidate = ratio.toString().trim()

  // percentage case
  if (candidate.slice(-1) === '%') {
    return Number.parseFloat(candidate) / 100
  }

  // ratio case (width:height)
  if (candidate.search(ratioCaseRegex) > -1) {
    const [a, b] = candidate.split(':')
    return b / a
  }

  // fractional case (width/height)
  if (candidate.search(fractionalCaseRegex) > -1) {
    const [a, b] = candidate.split('/')
    return b / a
  }

  // wtf?
  return -1
}

export default evaluateRatio
