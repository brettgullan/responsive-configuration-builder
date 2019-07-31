import { __, compose, map, multiply, zipObj } from 'ramda'

//-----------------------------------------------------------------------------

/*
export const buildSrcSet = (srcset, urlFormat) =>
  srcset.map((src) => {
    if (typeof src === 'string') {
      return src // src entry is a literal string; don't process it.
    }

    const dimensions = processImgSize(src)
    const formatter = `${urlFormat} {width}w`

    return formatSrcUrl(formatter, dimensions)
  })

export default buildSrcSet
*/

const multiplier = (size) =>
  compose(
    map(__, size),
    multiply,
  )

const generateScale = (size, scale) => map(multiplier(size), scale)

export const srcsetByScale = (size, scale) => {
  let sz = size
  if (Array.isArray(size)) {
    sz = zipObj(['width', 'height'])(size)
  }
  return generateScale(sz, scale)
}

export default {
  srcsetByScale,
}
