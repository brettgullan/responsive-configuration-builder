import configBuilder from './config-builder'
import specBuilder from './spec-builder'

//-----------------------------------------------------------------------------

export default (expander, resolver) =>
  configBuilder(specBuilder(expander, resolver))
