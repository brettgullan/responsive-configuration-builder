import configBuilder from './config-builder'
import cloudinaryExpander from './expand-cloudinary-sizes'
import specBuilder from './spec-builder'
import cloudinaryResolver from './resolve-cloudinary-spec'

//-----------------------------------------------------------------------------

export default (cloudinary) => {
  const cloudinaryBuilder = specBuilder(
    cloudinaryExpander,
    cloudinaryResolver(cloudinary),
  )
  return configBuilder(cloudinaryBuilder)
}
