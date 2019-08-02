/* global expect */

import { buildSrc } from '../src/build-src'

//-----------------------------------------------------------------------------

describe('Build Src', () => {
  const url = `https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}`
  const tokens = {
    id: 128,
    crop: 'auto',
  }

  const expected = 'https://picsum.photos/id/128/320/180?q=50&crop=auto'

  it('given width/height spec object, returns correct src string', () => {
    const spec = {
      width: '320px',
      height: '180px',
      options: {
        quality: 50,
      },
    }

    const result = buildSrc(url, tokens, spec)

    expect(result).to.equal(expected)
  })

  it('given width/ratio size object, returns correct src string', () => {
    const spec = {
      width: '320px',
      ratio: '16 / 9',
      options: {
        quality: 50,
      },
    }

    const result = buildSrc(url, tokens, spec)

    expect(result).to.equal(expected)
  })
})
