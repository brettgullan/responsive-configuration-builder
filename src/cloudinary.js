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

import resolveSpec from './resolve-cloudinary-spec'

//-----------------------------------------------------------------------------

/**
 * Walk the specification to locate any URL-related 'spec objects' to resolve.
 *
 * Any `src`, `srcset` or similar fields are expanded and resolved into
 * the appropriate URL or URL/descriptor strings.
 *
 * @returns {Object} fully resolved responsive configuration object
 */
export const buildResponsiveConfig = curry(
  (cloudinary, { options, ...spec }, image) =>
    mapObjIndexed(
      cond([
        // Map over `sources` array, recursively calling this function to process.
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
