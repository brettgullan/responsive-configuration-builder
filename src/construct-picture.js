import {
  compose,
  cond,
  curry,
  equals,
  evolve,
  identity,
  is,
  map,
  mapObjIndexed,
  merge,
  mergeDeepRight,
  tap,
  T,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import { buildSrcSet, buildSrc, getBuilderForSpec } from './builders'

//-----------------------------------------------------------------------------

const handleImageSrc = (template, tokens) =>
  when(is(Object), buildSrc(template, tokens))

const handleImageSrcSet = (template, tokens) =>
  when(is(Object), buildSrcSet(template, tokens))

//-----------------------------------------------------------------------------

export const constructPicture = curry(({ options, ...spec }, template, image) =>
  mapObjIndexed(
    cond([
      [
        (sources, key) => equals('sources', key),
        map((source) =>
          constructPicture({ ...source, options }, template, image),
        ),
      ],

      [
        (img, key) => equals('img', key),
        (img) => constructPicture({ ...img, options }, template, image),
      ],

      [
        is(Object),
        (value, key) => {
          console.log('Processing ...', key)
        },
      ],

      [T, (value) => value],
    ]),
  )(spec),
)

//-----------------------------------------------------------------------------

export const constructImage = constructPicture

export default constructPicture

/*
export const constructImage = curry(
  ({ options: specOpts, ...spec }, template, { attrs, ...imgOpts }) => {
    return compose(
      merge(attrs),
      evolve({
        src: when(
          is(Object),
          buildSrc(template, Object.assign(imgOpts, specOpts)),
        ),
        srcset: when(
          is(Object),
          buildSrcSet(template, Object.assign(imgOpts, specOpts)),
        ),
      }),
    )(spec)
  },
  */
