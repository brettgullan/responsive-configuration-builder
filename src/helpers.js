import { always, compose, equals, when, zipObj } from 'ramda'

//-----------------------------------------------------------------------------

/**
 * Convert size value to number.
 * Unparseable strings are converted to zero.
 *
 * @param {String|Number} size value to convert as string (or number)
 * @return {Number} size value parsed to number
 */
export const convertToNumericValue = compose(
  when(Number.isNaN, always(0)),
  parseFloat,
)

/**
 * Convert values of zero to `undefined`.
 * All other values are returned.
 *
 * @param {Number} value to convert (if zero)
 * @return {Number|undefined} input value, or undefined if zero
 */
export const convertZeroToUndefined = when(equals(0), always(undefined))

//-----------------------------------------------------------------------------

/**
 * If sizes is supplied as a height/width array pair, convert to object.
 *
 * @param {Arary} size array as [width, height]
 * @return {Object} size object containing width and height k/v pairs
 */
export const transformSizesArray = when(
  Array.isArray,
  zipObj(['width', 'height']),
)
