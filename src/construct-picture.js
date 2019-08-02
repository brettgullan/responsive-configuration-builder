import { compose, curry, evolve, is, map, merge, when } from 'ramda'

//-----------------------------------------------------------------------------

import buildSrc from './build-src'
import buildSrcSet from './build-srcset'

//-----------------------------------------------------------------------------

const handleImageSrc = (template, tokens) =>
  when(is(Object), buildSrc(template, tokens))

const handleImageSrcSet = (template, tokens) =>
  when(is(Object), buildSrcSet(template, tokens))

//-----------------------------------------------------------------------------

export const constructPicture = curry(({ options, ...spec }, template, image) =>
  evolve({
    sources: map(
      evolve({
        srcset: handleImageSrcSet(template, merge(image, options)),
        srcSet: handleImageSrcSet(template, merge(image, options)),
      }),
    ),

    img: evolve({
      src: handleImageSrc(template, merge(image, options)),
      srcset: handleImageSrcSet(template, merge(image, options)),
      srcSet: handleImageSrcSet(template, merge(image, options)),
    }),

    src: handleImageSrc(template, merge(image, options)),
    srcset: handleImageSrcSet(template, merge(image, options)),
    srcSet: handleImageSrcSet(template, merge(image, options)),
  })(spec),
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
