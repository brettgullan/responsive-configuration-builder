/* global expect */

import buildSrcSet, { srcsetByScale } from '../src/build-srcset'

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

  it('should build a srcset size array for given size (array) and scale', () => {
    const size = [240, 180]
    const scale = [1, 1.5, 2, 3]

    expect(buildSrcSet.srcsetByScale(size, scale)).to.deep.equal(expected)
  })
})

/*
const template = `https://picsum.photos/id/{id}/{width}/{height} {width}w`

const srcsetWidths = {
  widths: [240, 320, 480, 640, 720, 960, 1280],
  aspectRatio: 16 / 9,
}

const srcsetScale = {
  size: [240, 180],
  scale: [1, 1.2, 1.5, 2, 2.5, 3],
}

const srcset = (widths, aspectRatio) =>
  widths.map((width) => resolveSize({ width, aspectRatio }))

const srcsetByScale = (size, scale) => scale.map((multiplier) => map(multiply(multiplier), size))

const multiplier = (size) => compose(map(__, size), multiply)
const generateScale = (size, scale) => map(multiplier(size), scale)

const srcsetByScale = (size, scale) => {
  let sz = size
  if (Array.isArray(size)) {
    sz = zipObj(['width', 'height'])(size)
  }
  return generateScale(sz, scale)
}
*/
