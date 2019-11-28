import {
  __,
  compose,
  curry,
  evolve,
  invoker,
  merge,
  objOf,
  pick,
  tap,
  when,
} from 'ramda'
import { isNotObj, isPlainObj, isString } from 'ramda-adjunct'

//-----------------------------------------------------------------------------

export default curry(([Filelink, apiKey], image, spec) =>
  compose(
    ({ id, ...rest }) => {
      let src = new Filelink(id, apiKey)
      Object.keys(rest).forEach((key) => {
        const transformer = invoker(1, key)
        src = transformer(rest[key], src)
      })
      return src.toString()
    },
    ({ width, height, fit, crop, align, ...rest }) => {
      let resize = {
        width,
        height,
        ...(align && { align }),
        ...((isString(crop) && { fit: crop }) || (isString(fit) && { fit })),
      }

      return {
        resize,
        ...(isPlainObj(crop) && { crop }),
        ...rest,
      }
    },
    evolve({
      quality: when(isNotObj, objOf('value')),
      rotate: when(isNotObj, objOf('deg')),
    }),
    merge(image),
  )(spec),
)
