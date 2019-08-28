import { cond, curry, equals, is, map, mapObjIndexed, merge, T } from 'ramda'

//-----------------------------------------------------------------------------

import { buildSpec } from './build-spec'

//-----------------------------------------------------------------------------

/**
 * Process a Picture or Image spec, parsing any valid `src` or `srcset` specifications
 * into URL or URL/Descriptor strings.
 *
 * @param {String} template tokenized URL template string
 * @param {Object} specification Picture or Image spec object definition
 * @param {Object} image
 * @return {String|undefined} valid src or srcset string (or undefined)
 */
export const expandPictureConfig = curry(
  (template, { options, ...spec }, image) =>
    mapObjIndexed(
      cond([
        // Map over `sources` array, recursively calling `constructPicture` to process.
        [
          (__, key) => equals('sources', key),
          map((source) =>
            constructPicture(template, { ...source, options }, image),
          ),
        ],

        // Process individual `src` or `srcset` spec objects
        [
          is(Object),
          (spec) => buildSpec(template, merge(image, options), spec),
        ],

        // Return all other spec values as-is.
        [T, (value) => value],
      ]),
    )(spec),
)

//-----------------------------------------------------------------------------

export const expandImageConfig = expandPictureConfig

export default expandPictureConfig
