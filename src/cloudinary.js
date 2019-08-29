import builderFactory from './builder-factory'

import cloudinaryExpander from './cloudinary-expander'
import cloudinaryResolver from './cloudinary-resolver'

//-----------------------------------------------------------------------------

export default (cloudinary) =>
  builderFactory(cloudinaryExpander, cloudinaryResolver(cloudinary))
