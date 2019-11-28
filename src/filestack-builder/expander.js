import { allPass, compose, cond, identity, map, propIs, T } from 'ramda'
import { isValidNumber } from 'ramda-adjunct'

import { convertToNumberOrUndefined } from '../helpers'
import evaluateRatio from '../evaluate-ratio'

import { expandWidthsForRatio } from '../token-expander'

//-----------------------------------------------------------------------------

const isNumberLike = compose(isValidNumber, parseFloat)

//-----------------------------------------------------------------------------

export const expandWidthsAndResolutionsForRatio = ({
  widths,
  resolutions,
  ratio,
  ...rest
}) => {
  const result = []
  widths.forEach((width) =>
    resolutions.forEach((resolution) => {
      const rt = evaluateRatio(ratio)

      const _width = Math.round(width * resolution)
      const _height = Math.round(_width / rt)

      result.push({
        width: _width,
        height: _height,
        ...rest,
      })
    }),
  )
  return result
}

//-----------------------------------------------------------------------------

export default cond([
  [
    allPass([
      propIs(Array, 'widths'),
      propIs(Array, 'resolutions'),
      propIs(isNumberLike, 'ratio'),
    ]),
    expandWidthsAndResolutionsForRatio,
  ],
  [allPass([propIs(Array, 'widths')]), expandWidthsForRatio],
  [T, identity],
])
