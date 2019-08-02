export { constructImage, constructPicture } from './construct-picture'

export { buildSrcSet, buildSrc } from './builders'

export { evaluateRatio } from './evaluate-ratio'

export {
  generateSizeForSize,
  generateSizeForScale,
  generateSizeForRatio,
  generateSizesForScale,
  generateSizesForRatio,
  buildSizesForRatio,
  buildRatiosForRatio,
} from './build-sizes'

//-----------------------------------------------------------------------------

import { constructImage, constructPicture } from './construct-picture'
import { buildSrcSet, buildSrc } from './builders'
import { evaluateRatio } from './evaluate-ratio'

import {
  generateSizeForSize,
  generateSizeForScale,
  generateSizeForRatio,
  generateSizesForScale,
  generateSizesForRatio,
  buildSizesForRatio,
  buildRatiosForRatio,
} from './build-sizes'

//-----------------------------------------------------------------------------

export default {
  constructImage,
  constructPicture,
  generateSizeForSize,
  generateSizeForScale,
  generateSizeForRatio,
  generateSizesForScale,
  generateSizesForRatio,
  buildSizesForRatio,
  buildRatiosForRatio,
  buildSrcSet,
  buildSrc,
  evaluateRatio,
}
