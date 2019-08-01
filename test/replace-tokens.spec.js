/* global expect */

import replaceTokens from '../src/replace-tokens'

//-----------------------------------------------------------------------------

describe('replaceTokens', () => {
  it('replace all valid tokens', () => {
    const template = `https://picsum.photos/id/{id}/{width}/{height} {width}w`
    const tokens = { id: 128, width: 1234, height: 5678 }

    const expected = 'https://picsum.photos/id/128/1234/5678 1234w'
    expect(replaceTokens(template, tokens)).to.eql(expected)
  })

  it('ignore any missing tokens', () => {
    const template = `https://picsum.photos/id/{id}/{width}/{height} {width}w`
    const tokens = { width: 1234, height: 5678 }

    const expected = 'https://picsum.photos/id/{id}/1234/5678 1234w'
    expect(replaceTokens(template, tokens)).to.eql(expected)
  })
})
