import configBuilder from './config-builder'
import specBuilder from './spec-builder'

import tokenExpander from './token-expander'
import tokenResolver from './token-resolver'

//-----------------------------------------------------------------------------

export default (template) => {
  const tokenBuilder = specBuilder(tokenExpander, tokenResolver(template))
  return configBuilder(tokenBuilder)
}
