/* global expect */

import resolveSize from '../src/resolve-size'

//-----------------------------------------------------------------------------

describe('resolveSize', () => {
  it('given width/height size object, returns same', () => {
    const size = {
      width: 160,
      height: 90,
    }
    expect(resolveSize(size)).to.deep.equal(size)
  })

  it('given string width and height, returns same', () => {
    const size = {
      width: '160px',
      height: '90px',
    }
    const expected = {
      width: 160,
      height: 90,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  it('given width/ratio size object, returns correct width/height', () => {
    const size = {
      width: 160,
      ratio: '16/9',
    }
    const expected = {
      width: 160,
      height: 90,
    }
    expect(resolveSize(size)).to.deep.equal(expected)
  })

  it('given undefined width, returns undefined height', () => {
    const size = {
      width: undefined,
      ratio: '16/9',
    }
    const expected = {
      width: undefined,
      height: undefined,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  it('given valid string width, returns height', () => {
    const size = {
      width: '160px',
      ratio: '16/9',
    }
    const expected = {
      width: 160,
      height: 90,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  it('given invalid string width, returns undefined width/height', () => {
    const size = {
      width: 'unparseable',
      ratio: '16/9',
    }
    const expected = {
      width: undefined,
      height: undefined,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  // ALTERNATIVE RATIO KEYS

  it('returns correct result for aspectRatio key', () => {
    const size = {
      width: 160,
      aspectRatio: '16:9',
    }
    const expected = {
      width: 160,
      height: 90,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  it('returns correct result for aspect-ratio key', () => {
    const size = {
      width: 160,
      'aspect-ratio': '16:9',
    }
    const expected = {
      width: 160,
      height: 90,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  // LIMITATIONS

  it('given invalid string width but valid height, returns undefined width', () => {
    const size = {
      width: 'unparseable',
      height: '90px',
    }
    const expected = {
      width: undefined,
      height: 90,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })

  it('given percentage width, returns unexpected result', () => {
    const size = {
      width: '50%',
      ratio: '50%',
    }
    const expected = {
      width: 50,
      height: 25,
    }
    const result = resolveSize(size)
    expect(result).to.deep.equal(expected)
  })
})
