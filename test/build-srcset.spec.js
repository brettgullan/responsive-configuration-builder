/* global expect */

import { buildSrc, buildSrcSet } from '../src/build-srcset'

//-----------------------------------------------------------------------------

describe.only('Build Src', () => {
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

    console.log(result)

    expect(result).to.equal(expected)
  })
})

describe.only('Build SrcSet', () => {
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

describe.skip('Build Image', () => {
  it('given an image data object, specification and url template, build a final image props object', () => {
    const spec = {
      src: {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      placeholder: {
        width: 64,
        ratio: '16 / 9',
        options: {
          quality: 20,
        },
      },
      srcset: {
        widths: ['240px', 320, 480],
        ratio: '16 / 9',
      },
      sizes: '50vw',
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

    const expected = [
      'https://picsum.photos/id/128/240/135 240w',
      'https://picsum.photos/id/128/320/180 320w',
      'https://picsum.photos/id/128/480/270 480w',
    ].join(', ')

    const result = buildSrcSet(url, spec, tokens)

    console.log(result)

    expect(result).to.equal(expected)
  })
})

describe.skip('Build Picture', () => {
  it('given an image data object, picture specification and url template, build a final picture props object', () => {
    // Example of the kind of specification that might be generated
    // within a template or view layer, and combined with instance data (see below)
    // to generate a final Picture specification object.
    const spec = {
      options: {
        crop: 'auto',
      },
      sources: [
        {
          srcset: {
            widths: ['414px', 480, 600, 640],
            ratio: '4:3',
            options: {
              quality: 70,
            },
          },
          media: '(min-width: 415px)',
          sizes: '50vw',
        },
        {
          srcset: {
            widths: ['768', 960, 1280],
            ratio: '16 / 9',
            options: {
              quality: 50,
            },
          },
          media: '(min-width: 768px)',
          sizes: '33vw',
        },
      ],
      img: {
        srcset: {
          widths: ['414px', 480, 600, 640],
          ratio: '4:3',
        },
        sizes: '100vw',
      },
    }

    // Example image instance data.
    // This would typically be retrieved from a CMS, API call or other dynamic source.
    const img = {
      id: 128,
      type: 'picsum',
      alt: 'This is a description of image 128!',
      width: 3600,
      height: 2700,
    }

    // Example URL template.
    //
    // While this _could_ be included in either of the above data objects,
    // It's also quite possible that one template (and thus one spec) will be used to
    // handle images from multiple sources/services.
    //
    // Moreover, while image type data may be persisted with the image, the
    // specific URL may be dependent on other factors — environment variables, etc.
    const template = `https://picsum.photos/id/{id}/{width}/{height}`

    const expected = [
      'https://picsum.photos/id/128/240/135 240w',
      'https://picsum.photos/id/128/320/180 320w',
      'https://picsum.photos/id/128/480/270 480w',
    ].join(', ')

    const result = buildSrcSet(url, spec, tokens)

    console.log(result)

    expect(result).to.equal(expected)
  })
})
