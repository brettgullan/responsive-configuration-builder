/* global expect */

import { buildSrc } from '../src/build-src'

//-----------------------------------------------------------------------------

describe('Build Src', () => {
  it('given width/height size object, returns same', () => {
    const url = `https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}`
    const tokens = {
      id: 128,
      crop: 'auto',
    }
    const spec = {
      width: '320px',
      ratio: '16 / 9',
      options: {
        quality: 50,
      },
    }

    const expected = 'https://picsum.photos/id/128/320/180?q=50&crop=auto'

    const result = buildSrc(url, tokens, spec)

    expect(result).to.equal(expected)
  })
})
