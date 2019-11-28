import {
  allPass,
  compose,
  cond,
  identity,
  propIs,
  propSatisfies,
  T,
} from 'ramda'
import { isValidNumber } from 'ramda-adjunct'

import evaluateRatio from '../evaluate-ratio'
import { expandWidthForRatio, expandWidthsForRatio } from '../token-expander'

//-----------------------------------------------------------------------------

export const isNumberLike = compose(isValidNumber, evaluateRatio)

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
      propSatisfies(isNumberLike, 'ratio'),
    ]),
    expandWidthsAndResolutionsForRatio,
  ],
  [
    allPass([propIs(Array, 'widths'), propSatisfies(isNumberLike, 'ratio')]),
    expandWidthsForRatio,
  ],
  [
    ({ width, ratio }) => width && ratio,
    ({ width, ratio, ...options }) =>
      expandWidthForRatio(width, ratio, options),
  ],
  [T, identity],
])
