/* global expect */

import TokenBuilder from '../src/token'

//-----------------------------------------------------------------------------

// Example URL template.
//
// While this _could_ be included in either of the above data objects,
// It's also quite possible that one template (and thus one spec) will be used to
// handle images from multiple sources/services.
//
// Moreover, while image type data may be persisted with the image, the
// specific URL may be dependent on other factors — environment variables, etc.
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

    //-----------------------------------------------------------------------------

    it('correctly builds srcset', () => {
      const spec = {
        srcset: {
          widths: ['240px', 320, 480],
          ratio: '16 / 9',
          quality: 50,
        },
        sizes: '50vw',

        // These options will apply to any src or srcset spec unless overridden.
        // Options have the following priority:
        // 1. Options specified on a spec element (src or srcset);
        // 2. Specified at top-level of spec object;
        // 3. Specified on image object;
        options: {
          crop: 'auto',
        },
      }

      const image = {
        id: 128,
        quality: 80,
      }

      // ----------------------------------------

      const srcset = [
        'https://picsum.photos/id/128/240/135?q=50&crop=auto 240w',
        'https://picsum.photos/id/128/320/180?q=50&crop=auto 320w',
        'https://picsum.photos/id/128/480/270?q=50&crop=auto 480w',
      ].join(', ')

      const expected = {
        srcset,
        sizes: '50vw',
      }

      // ----------------------------------------

      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })

  //-----------------------------------------------------------------------------

  describe('Responsive Picture', () => {
    it('given an image data object, picture specification and url template, build a final picture props object', () => {
      const spec = {
        options: {
          crop: 'auto',
        },
        sources: [
          {
            srcset: {
              widths: ['414px', 480, 600],
              ratio: '4:3',
              quality: 70,
            },
            media: '(min-width: 415px)',
            sizes: '50vw',
          },
          {
            srcset: {
              widths: ['768', 960, 1280],
              ratio: '16 / 9',
              quality: 50,
              crop: 'center',
            },
            media: '(min-width: 768px)',
            sizes: '33vw',
          },
        ],
        src: {
          width: '240px',
          ratio: '16 / 9',
          quality: 50,
        },
        'data-src': {
          width: '240px',
          ratio: '16 / 9',
          quality: 70,
        },
        srcset: {
          widths: ['414px', 480, 600],
          ratio: '4:3',
        },
        sizes: '100vw',
      }

      // Example image instance data.
      // This would typically be retrieved from a CMS, API call or other dynamic source.
      const image = {
        id: 128,
      }

      // ----------------------------------------

      const expected = {
        sources: [
          {
            srcset: [
              'https://picsum.photos/id/128/414/311?q=70&crop=auto 414w',
              'https://picsum.photos/id/128/480/360?q=70&crop=auto 480w',
              'https://picsum.photos/id/128/600/450?q=70&crop=auto 600w',
            ].join(', '),
            media: '(min-width: 415px)',
            sizes: '50vw',
          },
          {
            srcset: [
              'https://picsum.photos/id/128/768/432?q=50&crop=center 768w',
              'https://picsum.photos/id/128/960/540?q=50&crop=center 960w',
              'https://picsum.photos/id/128/1280/720?q=50&crop=center 1280w',
            ].join(', '),
            media: '(min-width: 768px)',
            sizes: '33vw',
          },
        ],
        src: 'https://picsum.photos/id/128/240/135?q=50&crop=auto',
        'data-src': 'https://picsum.photos/id/128/240/135?q=70&crop=auto',

        // Note the missing {quality} token below!
        srcset: [
          'https://picsum.photos/id/128/414/311?q={quality}&crop=auto 414w',
          'https://picsum.photos/id/128/480/360?q={quality}&crop=auto 480w',
          'https://picsum.photos/id/128/600/450?q={quality}&crop=auto 600w',
        ].join(', '),
        sizes: '100vw',
      }

      // ----------------------------------------

      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })
})
