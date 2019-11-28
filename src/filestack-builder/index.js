import { builderFactory } from '../'

import filestackExpander from './expander'
import filestackResolver from './resolver'

//-----------------------------------------------------------------------------

export default (filestack) =>
  builderFactory(filestackExpander, filestackResolver(filestack))
