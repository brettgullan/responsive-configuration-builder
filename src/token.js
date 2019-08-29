import builderFactory from './builder-factory'

import tokenExpander from './token-expander'
import tokenResolver from './token-resolver'

//-----------------------------------------------------------------------------

export default (template) =>
  builderFactory(tokenExpander, tokenResolver(template))
