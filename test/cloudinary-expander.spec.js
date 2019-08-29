/* global expect */

import {
  expandWidths,
  expandWidthsAndResolutions,
} from '../src/cloudinary-expander'

//-----------------------------------------------------------------------------

describe('expandSpecForWidths', () => {
  const expected = [
    {
      width: '414px',
      ratio: '4:3',
      crop: 'fill',
    },
    {
      width: 480,
      ratio: '4:3',
      crop: 'fill',
    },
    {
      width: 600,
      ratio: '4:3',
      crop: 'fill',
    },
  ]

  it('should build a spec array for given widths', () => {
    const spec = {
      widths: ['414px', 480, 600],
      ratio: '4:3',
      crop: 'fill',
    }

    expect(expandWidths(spec)).to.deep.equal(expected)
  })
})

//-----------------------------------------------------------------------------

describe('expandSpecForWidthsAndResolutions', () => {
  const expected = [
    {
      width: 320,
      ratio: '4:3',
      crop: 'fill',
    },
    {
      width: 640,
      ratio: '4:3',
      crop: 'fill',
    },
    {
      width: 375,
      ratio: '4:3',
      crop: 'fill',
    },
    {
      width: 750,
      ratio: '4:3',
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

    const result = expandWidthsAndResolutions(spec)
    expect(result).to.deep.equal(expected)
  })
})
