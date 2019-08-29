/* global expect */

import TokenBuilder from '../src/token'

//-----------------------------------------------------------------------------

const template =
  'https://picsum.photos/id/{id}/{width}/{height}?q={quality}&crop={crop}'

const builder = TokenBuilder(template)

//-----------------------------------------------------------------------------

describe('Token', () => {
  describe('Responsive Image', () => {
    it('given an image data object and specification, build a final image props object', () => {
      const spec = {
        src: {
          width: '240px',
          ratio: '16 / 9',
          quality: 50,
        },
        placeholder: {
          width: '240px',
          ratio: '16 / 9',
          quality: 75,
        },
        sizes: '50vw',

        options: {
          crop: 'auto',
        },
      }

      // Example image instance data.
      // This would typically be retrieved from a CMS, API call or other dynamic source.
      const image = {
        id: 128,
        quality: 80,
      }

      // ----------------------------------------

      const expected = {
        placeholder: `https://picsum.photos/id/128/240/135?q=75&crop=auto`,
        src: `https://picsum.photos/id/128/240/135?q=50&crop=auto`,
        sizes: '50vw',
      }

      // ----------------------------------------

      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })
})
