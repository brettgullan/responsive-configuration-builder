import {
  __,
  always,
  compose,
  concat,
  cond,
  converge,
  curry,
  is,
  isEmpty,
  join,
  map,
  // tap,
  when,
} from 'ramda'

//-----------------------------------------------------------------------------

import { convertToNumberOrUndefined } from './helpers'

//-----------------------------------------------------------------------------

const buildDescriptor = ({ width }) => ` ${convertToNumberOrUndefined(width)}w`

//-----------------------------------------------------------------------------

export default (expander, resolver) =>
  curry((image, spec) => {
    const handleSingleSpec = resolver(image)

    const handleArraySpec = compose(
      join(', '),
      map(converge(concat, [handleSingleSpec, buildDescriptor])),
    )

    return compose(
      // Return undefined (as error code) if final result is empty string
      when(isEmpty, always(undefined)),

      cond([
        [is(Array), handleArraySpec],
        //
        [is(Object), handleSingleSpec],
      ]),

      // Expand all shorthand-format spec objects
      expander,
    )(spec)
  })
