/* global expect */

import buildSrcSet, {
  buildSizesForScale,
  generateSizesForScale,
  generateSizesForRatio,
  generateRatiosForRatio,
  buildSizesForRatio,
  buildRatiosForRatio,
} from '../src/build-sizes'

//-----------------------------------------------------------------------------

describe('sizesForScale', () => {
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

    expect(buildSizesForScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a size array for given size (object) and scale', () => {
    const size = { width: 240, height: 180 }
    const scale = [1, 1.5, 2, 3]

    expect(generateSizesForScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a size array for given size (array) and scale', () => {
    const size = [240, 180]
    const scale = [1, 1.5, 2, 3]

    const result = buildSrcSet.buildSizesForScale(size, scale)
    expect(result).to.deep.equal(expected)
  })

  it('should build a size array when sizes are parseable strings', () => {
    const size = { width: '240px', height: '180px' }
    const scale = [1, 1.5, 2, 3]

    expect(buildSizesForScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a size array when sizes are unparseable strings', () => {
    const size = { width: 'unparseable', height: 'unparseable' }
    const scale = [1, 1.5, 2, 3]

    const result = buildSizesForScale(size, scale)
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
})

//-----------------------------------------------------------------------------

describe('sizesForRatio', () => {
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

    expect(generateSizesForRatio(widths, ratio)).to.deep.equal(expected)
  })

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = ['240px', '320', '480']
    const ratio = '16:9'

    expect(buildSizesForRatio({ widths, ratio })).to.deep.equal(expected)
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

    expect(buildSizesForRatio({ widths, 'aspect-ratio': ratio })).to.deep.equal(
      expected,
    )
  })
})

//-----------------------------------------------------------------------------

describe('ratiosForRatio', () => {
  const expected = [
    {
      ratio: '16:9',
      width: 240,
    },
    {
      ratio: '16:9',
      width: 320,
    },
    {
      ratio: '16:9',
      width: 480,
    },
  ]

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = [240, 320, 480]
    const ratio = '16:9'

    expect(generateRatiosForRatio(widths, ratio)).to.deep.equal(expected)
  })

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = ['240', '320px', '480whatevers']
    const ratio = '16:9'

    expect(
      buildRatiosForRatio({ widths, 'aspect-ratio': ratio }),
    ).to.deep.equal(expected)
  })

  it('builds a size array for given widths and (aspect) ratio', () => {
    const widths = ['240px', '320', 'unparseable']
    const ratio = '16:9'

    const expected = [
      {
        ratio: '16:9',
        width: 240,
      },
      {
        ratio: '16:9',
        width: 320,
      },
      {
        ratio: '16:9',
        width: undefined,
      },
    ]

    expect(buildRatiosForRatio({ widths, aspectRatio: ratio })).to.deep.equal(
      expected,
    )
  })
})
