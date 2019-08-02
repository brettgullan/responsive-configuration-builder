import { compose, curry, evolve, is, merge, when } from 'ramda'

//-----------------------------------------------------------------------------

import buildSrc from './build-src'
import buildSrcSet from './build-srcset'

//-----------------------------------------------------------------------------

export const constructImage = curry(({ options, ...spec }, template, image) =>
  evolve({
    src: when(is(Object), buildSrc(template, Object.assign(image, options))),
    srcset: when(
      is(Object),
      buildSrcSet(template, Object.assign(image, options)),
    ),
  })(spec),
)

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
