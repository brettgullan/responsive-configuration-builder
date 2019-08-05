import { cond, curry, equals, is, map, mapObjIndexed, merge, T } from 'ramda'

//-----------------------------------------------------------------------------

import { buildSpec } from './builders'

//-----------------------------------------------------------------------------

export const constructPicture = curry((template, { options, ...spec }, image) =>
  mapObjIndexed(
    cond([
      [
        (sources, key) => equals('sources', key),
        map((source) =>
          constructPicture(template, { ...source, options }, image),
        ),
      ],

      [
        (img, key) => equals('img', key),
        (img) => constructPicture(template, { ...img, options }, image),
      ],

      [is(Object), (spec) => buildSpec(template, merge(image, options), spec)],

      [T, (value) => value],
    ]),
  )(spec),
)

//-----------------------------------------------------------------------------

export const constructImage = constructPicture

export default constructPicture
