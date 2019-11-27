export { default as TokenBuilder } from './token'
export { default as CloudinaryBuilder } from './cloudinary'

//-----------------------------------------------------------------------------

export { default as builderFactory } from './builder-factory'

//-----------------------------------------------------------------------------

import {
  expandSize,
  expandSizeForScale,
  expandSizesForScale,
  expandWidthForRatio,
  expandWidthsForRatio,
} from './token-expander'

import { expandWidths, expandWidthsAndResolutions } from './cloudinary-expander'

export const expanders = {
  expandSize,
  expandSizeForScale,
  expandSizesForScale,
  expandWidthForRatio,
  expandWidthsForRatio,
  expandWidths,
  expandWidthsAndResolutions,
}
