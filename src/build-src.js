import { always, compose, cond, curry, isEmpty, T, when } from 'ramda'

//-----------------------------------------------------------------------------

import { generateSizeForRatio, generateSizeForSize } from './build-sizes'
import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

export const buildSrc = curry((url, tokens, { options, ...spec }) =>
  compose(
    // Return undefined (as error code) if result is empty string
    when(isEmpty, always(undefined)),

    // Build src string
    (size) => replaceTokens(url, Object.assign(tokens, options, size)),

    // Generate size object using appropriate function.
    cond([
      [
        ({ width, ratio }) => width && ratio,
        ({ width, ratio }) => generateSizeForRatio(width, ratio, true),
      ],
      [
        ({ width, height }) => width && height,
        ({ width, height }) => generateSizeForSize(width, height, true),
      ],

      [T, always({})],
    ]),
  )(spec),
)

export default buildSrc
