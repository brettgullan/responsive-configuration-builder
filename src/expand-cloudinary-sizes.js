import { both, cond, identity, map, multiply, propIs, T } from 'ramda'

//-----------------------------------------------------------------------------

export const expandWidths = ({ widths, ...rest }) =>
  map((width) => ({ width, ...rest }))(widths)

//-----------------------------------------------------------------------------

export const expandWidthsAndResolutions = ({
  widths,
  resolutions,
  ...rest
}) => {
  const result = []
  widths.forEach((width) =>
    resolutions.forEach((resolution) => {
      result.push({
        width: multiply(width, resolution),
        ...rest,
      })
    }),
  )
  return result
}

//-----------------------------------------------------------------------------

export default cond([
  [
    both(propIs(Array, 'widths'), propIs(Array, 'resolutions')),
    expandWidthsAndResolutions,
  ],
  [propIs(Array, 'widths'), expandWidths],
  [T, identity],
])
