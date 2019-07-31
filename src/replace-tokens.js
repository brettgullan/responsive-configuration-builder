import {
  call,
  compose,
  flip,
  mapObjIndexed,
  reduce,
  replace,
  values,
} from 'ramda'

//-----------------------------------------------------------------------------

/**
 * A replacement function to apply to a template string.
 *
 * @param {String} val value used to replace token
 * @param {String} key token to replace with value
 * @return {Function} replacement function to apply to template
 */
const replaceForKey = (val, key) => replace(new RegExp(`\{${key}\}`, 'g'), val)

/**
 * Build array of 'expander' functions for each key/value pair in tokens map.
 */
const expandTokensUsing = (resolver) =>
  compose(
    values,
    mapObjIndexed(resolver),
  )

/**
 *
 * @param {String} template
 * @param {Object} tokens
 * @return {String} expanded template with all tokens replaced
 */
const expandTokenizedString = (template, tokens) =>
  compose(
    reduce(flip(call), template),
    expandTokensUsing(replaceForKey),
  )(tokens)

export default expandTokenizedString
