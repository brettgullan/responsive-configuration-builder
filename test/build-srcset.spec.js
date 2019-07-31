/* global expect */

import buildSrcSet, {
  srcsetByScale,
  generateSizesForScale,
  generateSizesForRatio,
} from '../src/build-srcset'

//-----------------------------------------------------------------------------

describe('srcsetByScale', () => {
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

  it('should build a srcset size array for given size (object) and scale', () => {
    const size = { width: 240, height: 180 }
    const scale = [1, 1.5, 2, 3]

    expect(srcsetByScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a srcset size array for given size (object) and scale', () => {
    const size = { width: 240, height: 180 }
    const scale = [1, 1.5, 2, 3]

    expect(generateSizesForScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a srcset size array for given size (array) and scale', () => {
    const size = [240, 180]
    const scale = [1, 1.5, 2, 3]

    const result = buildSrcSet.srcsetByScale(size, scale)
    expect(result).to.deep.equal(expected)
  })

  it('should build a srcset size array when sizes are parseable strings', () => {
    const size = { width: '240px', height: '180px' }
    const scale = [1, 1.5, 2, 3]

    expect(srcsetByScale(size, scale)).to.deep.equal(expected)
  })

  it('should build a srcset size array when sizes are unparseable strings', () => {
    const size = { width: 'unparseable', height: 'unparseable' }
    const scale = [1, 1.5, 2, 3]

    const result = srcsetByScale(size, scale)
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

describe('srcsetByScale', () => {
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

  it('builds a srcset size array for given widths and (aspect) ratio', () => {
    const widths = [240, 320, 480]
    const ratio = 16 / 9

    expect(generateSizesForScale(widths, ratio)).to.deep.equal(expected)
  })
})

/*
const template = `https://picsum.photos/id/{id}/{width}/{height} {width}w`

const srcsetWidths = {
  widths: [240, 320, 480, 640, 720, 960, 1280],
  aspectRatio: 16 / 9,
}

const srcset = (widths, aspectRatio) =>
  widths.map((width) => resolveSize({ width, aspectRatio }))

*/
