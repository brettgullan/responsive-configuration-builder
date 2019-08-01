/* global expect */

import evaluateRatio from '../src/evaluate-ratio'

//-----------------------------------------------------------------------------

describe('evaluateRatio', () => {
  it('should handle percentages', () => {
    expect(evaluateRatio('56.25%')).to.eql(16 / 9)
    expect(evaluateRatio('75%')).to.eql(4 / 3)
  })

  it('should handle fractions', () => {
    expect(evaluateRatio(16 / 9)).to.eql(16 / 9)
  })

  it('will also invert decimals! This is correct behaviour.', () => {
    // 16/9 is 1.7777*, though to calculate height based on width resolves to 1/1.7777*
    // Similarly 9/16 is 0.5625; to calculate height based on width resolves to 16/9 (or 1.7777*)
    expect(evaluateRatio(0.5625)).to.equal(9 / 16)
  })

  it('should handle fraction as strings', () => {
    expect(evaluateRatio('16 / 9')).to.eql(16 / 9)
    expect(evaluateRatio('16/9')).to.eql(16 / 9)
  })

  it('should handle ratios', () => {
    expect(evaluateRatio('4 : 3')).to.equal(4 / 3)
    expect(evaluateRatio('4:3')).to.equal(4 / 3)
  })

  it('non-numeric values resolve to undefined', () => {
    expect(evaluateRatio('some thing else')).to.equal(undefined)
  })

  it('should handle an undefined', () => {
    expect(evaluateRatio()).to.eql(undefined)
    expect(evaluateRatio(undefined)).to.eql(undefined)
  })
})
