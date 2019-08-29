import configBuilder from './config-builder'
import specBuilder from './spec-builder'

import cloudinaryExpander from './cloudinary-expander'
import cloudinaryResolver from './cloudinary-resolver'

//-----------------------------------------------------------------------------

export default (cloudinary) => {
  const cloudinaryBuilder = specBuilder(
    cloudinaryExpander,
    cloudinaryResolver(cloudinary),
  )
  return configBuilder(cloudinaryBuilder)
}
