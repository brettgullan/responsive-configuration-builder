/* global expect */

import evaluateRatio from '../src/evaluate-ratio'

//-----------------------------------------------------------------------------

describe('evaluateRatio', () => {
  it('should handle percentages', () => {
    expect(evaluateRatio('56.25%')).to.eql(0.5625)
    expect(evaluateRatio('43.75%')).to.eql(0.4375)
  })

  it('should handle fractions', () => {
    expect(evaluateRatio(16 / 9)).to.eql(0.5625)
  })

  it('will also invert decimals! This is correct behaviour.', () => {
    // 16/9 is 1.7777*, though to calculate height based on width resolves to 1/1.7777*
    // Similarly 9/16 is 0.5625; to calculate height based on width resolves to 16/9 (or 1.7777*)
    expect(evaluateRatio(0.5625)).to.equal(16 / 9)
  })

  it('should handle fraction as strings', () => {
    expect(evaluateRatio('16/9')).to.eql(0.5625)
  })

  it('should handle ratios', () => {
    expect(evaluateRatio('4:3')).to.equal(0.75)
  })

  it('barf on non-numeric values', () => {
    expect(evaluateRatio('some thing else')).to.equal(-1)
  })
})
