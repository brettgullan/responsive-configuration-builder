import {
  cond,
  curry,
  equals,
  identity,
  is,
  map,
  mapObjIndexed,
  merge,
  T,
} from 'ramda'

//-----------------------------------------------------------------------------

import resolveSpec from './build-cloudinary-spec'

//-----------------------------------------------------------------------------

export const buildResponsiveConfig = curry(
  (cloudinary, { options, ...spec }, image) =>
    mapObjIndexed(
      cond([
        // Map over `sources` array, recursively calling `expandPictureConfig` to process.
        [
          (__, key) => equals('sources', key),
          map((source) =>
            buildResponsiveConfig(cloudinary, image, { ...source, options }),
          ),
        ],

        // Process individual spec objects.
        [
          is(Object),
          (spec) => resolveSpec(cloudinary, image, merge(options, spec)),
        ],

        // Return all other spec values as-is.
        [T, identity],
      ]),
    )(spec),
)

//-----------------------------------------------------------------------------

export default buildResponsiveConfig
