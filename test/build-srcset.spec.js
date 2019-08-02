/* global expect */

// import { buildSrcSet } from '../src/build-srcset'
import { buildSrcSet } from '../src/builders'

//-----------------------------------------------------------------------------

describe('Build SrcSet', () => {
  const url = `https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}`
  const tokens = {
    id: 128,
    quality: 80,
    crop: 'auto',
  }

  it('return srcset string for ratio size spec', () => {
    const spec = {
      widths: ['240px', 320, 480],
      ratio: '16 / 9',
      options: {
        quality: 50,
      },
    }

    const expected = [
      'https://picsum.photos/id/128/240/135?q=50&crop=auto 240w',
      'https://picsum.photos/id/128/320/180?q=50&crop=auto 320w',
      'https://picsum.photos/id/128/480/270?q=50&crop=auto 480w',
    ].join(', ')

    const result = buildSrcSet(url, tokens, spec)

    expect(result).to.equal(expected)
  })

  it('return srcset string for scale spec', () => {
    const spec = {
      size: { width: '240px', height: '180px' },
      scale: [1, 1.5, 2, 3],
      options: {
        quality: 50,
      },
    }

    const expected = [
      'https://picsum.photos/id/128/240/180?q=50&crop=auto 240w',
      'https://picsum.photos/id/128/360/270?q=50&crop=auto 360w',
      'https://picsum.photos/id/128/480/360?q=50&crop=auto 480w',
      'https://picsum.photos/id/128/720/540?q=50&crop=auto 720w',
    ].join(', ')

    const result = buildSrcSet(url, tokens, spec)

    expect(result).to.equal(expected)
  })

  it('return undefined for invalid spec', () => {
    const spec = {
      options: {
        quality: 50,
      },
    }

    const result = buildSrcSet(url, tokens, spec)

    expect(result).to.equal(undefined)
  })
})
