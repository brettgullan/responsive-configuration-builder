import { compose, curry, merge } from 'ramda'

//-----------------------------------------------------------------------------

import replaceTokens from './replace-tokens'

//-----------------------------------------------------------------------------

export default curry((template, image, spec) =>
  compose(
    replaceTokens(template),
    merge(image),
  )(spec),
)
