import { map, multiply } from 'ramda'

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
