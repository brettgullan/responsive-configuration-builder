import { evaluateRatio } from './evaluate-ratio'
import { convertToNumericValue } from './helpers'

//-----------------------------------------------------------------------------

const _resolveSize = ({ width, height, ratio }) => ({
  width,
  height: height || ratio ? Math.round(width / ratio) : 0,
})

/**
 * Resolves a 'size' object given an input object containing `width`
 * and either `height` or `ratio` fields.
 *  - If `width` and `height` are provided, these values are returned.
 *  - If `width` and `ratio` are provided, `height` will be calculated.
 *
 * This function is optimistic.
 * If string values are provided, and can be parsed to numeric values, they will be used.
 *
 * Note:
 * This is intended to work for pixel values (px) and will return correct results in this case.
 * However, rem, percentage, and vw values will also parse correctly,
 * but will return unexpected results.
 *
 * YOU HAVE BEEN WARNED!!
 *
 * @param {Object} src
 * @return {Object} size object with `width` and `height` key-value pairs
 */
export const resolveSize = ({
  width,
  height,
  ratio,
  aspectRatio,
  'aspect-ratio': ar,
}) => {
  const w = convertToNumericValue(width)
  const h = convertToNumericValue(height)
  const r = evaluateRatio(ratio || aspectRatio || ar)
  return {
    width: w ? w : undefined,
    height: h || (w && r ? Math.round(w / r) : undefined),
  }
}

export default resolveSize
