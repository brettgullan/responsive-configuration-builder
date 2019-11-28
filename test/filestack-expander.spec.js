/* global expect */

import { expandWidthsAndResolutionsForRatio } from '../src/filestack-builder/expander'

//-----------------------------------------------------------------------------

describe('expandSpecForWidthsAndResolutionsForRatio', () => {
  const expected = [
    {
      width: 320,
      height: 240,
      crop: 'fill',
    },
    {
      width: 640,
      height: 480,
      crop: 'fill',
    },
    {
      width: 375,
      height: 281,
      crop: 'fill',
    },
    {
      width: 750,
      height: 563,
      crop: 'fill',
    },
  ]

  it('should build a spec array for given widths and resolutions', () => {
    const spec = {
      widths: [320, 375],
      resolutions: [1, 2],
      ratio: '4:3',
      crop: 'fill',
    }

    const result = expandWidthsAndResolutionsForRatio(spec)
    expect(result).to.deep.equal(expected)
  })
})
