import {
  __,
  compose,
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

/**
 * Walk the specification to locate any URL-related 'spec objects' to resolve.
 *
 * Any `src`, `srcset` or similar fields are expanded and resolved into
 * the appropriate URL or URL/descriptor strings.
 *
 * @returns {Object} fully resolved responsive configuration object
 */
const buildResponsiveConfig = curry((builder, { options, ...spec }, image) =>
  mapObjIndexed(
    cond([
      // Map over `sources` array, recursively calling this function to process.
      [
        (__, key) => equals('sources', key),
        map(
          compose(
            buildResponsiveConfig(builder, __, image),
            merge({ options }),
          ),
        ),
      ],

      // Process individual spec objects.
      [
        is(Object),
        compose(
          builder(image),
          merge(options),
        ),
      ],

      // Return all other spec values as-is.
      [T, identity],
    ]),
  )(spec),
)

//-----------------------------------------------------------------------------

export default buildResponsiveConfig
