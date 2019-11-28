import isNumberLike from '../src/filestack-builder/expander'
import { compose } from 'ramda'
import { isValidNumber } from 'ramda-adjunct'
import evaluateRatio from '../src/evaluate-ratio'
// const isNumberLike = compose(isValidNumber, parseFloat)

describe('isNumberLike', () => {
  it('given a float expect true', () => {
    const ratio = '4 / 3'
    expect(compose(isValidNumber, evaluateRatio)(ratio)).to.be.true
  })
})
