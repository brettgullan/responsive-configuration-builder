/* global expect */
import { map, merge } from 'ramda'
import {
  expandSize,
  expandSizesForScale,
  expandWidthsForRatio,
} from '../src/token-expander'

//-----------------------------------------------------------------------------

describe('expandSizesForScale', () => {
  const expected = [
    {
      height: 180,
      width: 240,
    },
    {
      height: 270,
      width: 360,
    },
    {
      height: 360,
      width: 480,
    },
    {
      height: 540,
      width: 720,
    },
  ]

  it('should build a size array for given size (object) and scale', () => {
    const size = { width: 240, height: 180 }
    const scale = [1, 1.5, 2, 3]

    expect(expandSizesForScale({ size, scale })).to.deep.equal(expected)
  })

  it('should build a size array for given size (object) and scale', () => {
    const size = { width: 240, height: 180 }
    const scale = [1, 1.5, 2, 3]

    expect(expandSizesForScale({ size, scale })).to.deep.equal(expected)
  })

  it('should build a size array for given size (array) and scale', () => {
    const size = [240, 180]
    const scale = [1, 1.5, 2, 3]

    const result = expandSizesForScale({ size, scale })
    expect(result).to.deep.equal(expected)
  })

  it('should build a size array when sizes are parseable strings', () => {
    const size = { width: '240px', height: '180px' }
    const scale = [1, 1.5, 2, 3]

    expect(expandSizesForScale({ size, scale })).to.deep.equal(expected)
  })

  it('should build a size array when sizes are unparseable strings', () => {
    const size = { width: 'unparseable', height: 'unparseable' }
    const scale = [1, 1.5, 2, 3]

    const result = expandSizesForScale({ size, scale })
    const expected = [
      {
        height: undefined,
        width: undefined,
      },
      {
        height: undefined,
        width: undefined,
      },
      {
        height: undefined,
        width: undefined,
      },
      {
        height: undefined,
        width: undefined,
      },
    ]

    expect(result).to.deep.equal(expected)
  })

  it('passes any additional properties', () => {
    const size = { width: '240px', height: '180px' }
    const scale = [1, 1.5, 2, 3]
    const options = {
      crop: 'fill',
      quality: 50,
    }

    expect(expandSizesForScale({ size, scale, ...options })).to.deep.equal(
      map(merge(options), expected),
    )
  })
})

//-----------------------------------------------------------------------------

describe('expandWidthsForRatio', () => {
  const expected = [
    {
      height: 135,
      width: 240,
    },
    {
      height: 180,
      width: 320,
    },
    {
      height: 270,
      width: 480,
    },
  ]

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = [240, 320, 480]
    const ratio = 16 / 9

    expect(expandWidthsForRatio({ widths, ratio })).to.deep.equal(expected)
  })

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = ['240px', '320', '480']
    const ratio = '16:9'

    expect(expandWidthsForRatio({ widths, ratio })).to.deep.equal(expected)
  })

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = ['240px', '320', 'unparseable']
    const ratio = '16:9'

    const expected = [
      {
        height: 135,
        width: 240,
      },
      {
        height: 180,
        width: 320,
      },
      {
        height: undefined,
        width: undefined,
      },
    ]

    expect(expandWidthsForRatio({ widths, ratio })).to.deep.equal(expected)
  })

  it('passes any additional properties', () => {
    const widths = ['240px', '320', 'unparseable']
    const ratio = '16:9'
    const options = {
      crop: 'fill',
      quality: 50,
    }

    const expected = [
      {
        height: 135,
        width: 240,
        ...options,
      },
      {
        height: 180,
        width: 320,
        ...options,
      },
      {
        height: undefined,
        width: undefined,
        ...options,
      },
    ]

    expect(expandWidthsForRatio({ widths, ratio, ...options })).to.deep.equal(
      expected,
    )
  })
})

//-----------------------------------------------------------------------------

describe('expandSize', () => {
  it('builds a size object for given width/height spec', () => {
    const expected = {
      height: 180,
      width: 320,
    }

    const fixture = {
      width: '320px',
      height: '180px',
    }

    expect(expandSize(fixture)).to.deep.equal(expected)
  })

  it('passes any additional properties', () => {
    const expected = {
      height: 180,
      width: 320,
      ratio: '16 / 9',
      crop: 'fill',
    }

    const fixture = {
      width: '320px',
      height: '180px',
      ratio: '16 / 9',
      crop: 'fill',
    }

    expect(expandSize(fixture)).to.deep.equal(expected)
  })
})
