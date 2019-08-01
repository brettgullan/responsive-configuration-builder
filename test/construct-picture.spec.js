/* global expect */

import { constructImage } from '../src/construct-picture'

//-----------------------------------------------------------------------------

describe.only('Construct Image', () => {
  it('given an image data object, specification and url template, build a final image props object', () => {
    const spec = {
      src: {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      // placeholder: {
      //   width: 64,
      //   ratio: '16 / 9',
      //   options: {
      //     quality: 20,
      //   },
      // },
      srcset: {
        widths: ['240px', 320, 480],
        ratio: '16 / 9',
      },
      sizes: '50vw',

      // These options will apply to any src or srcSet spec
      // unless overridden.
      options: {
        crop: 'auto',
      },
    }

    const url = `https://picsum.photos/id/{id}/{width}/{height}`

    const img = {
      id: 128,
      type: 'picsum',
      alt: 'This is a description of image 128!',
      width: 3600,
      height: 2700,
    }

    // ----------------------------------------

    const srcset = [
      'https://picsum.photos/id/128/240/135 240w',
      'https://picsum.photos/id/128/320/180 320w',
      'https://picsum.photos/id/128/480/270 480w',
    ].join(', ')

    const expected = {
      src: {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      srcset,
      sizes: '50vw',
    }

    // ----------------------------------------

    const result = constructImage(url, spec)

    console.log(result)

    expect(result).to.equal(expected)
  })
})
