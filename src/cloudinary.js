import configBuilder from './config-builder'
import cloudinaryExpander from './cloudinary-expander'
import specBuilder from './spec-builder'
import cloudinaryResolver from './cloudinary-resolver'

//-----------------------------------------------------------------------------

export default (cloudinary) => {
  const cloudinaryBuilder = specBuilder(
    cloudinaryExpander,
    cloudinaryResolver(cloudinary),
  )
  return configBuilder(cloudinaryBuilder)
}
