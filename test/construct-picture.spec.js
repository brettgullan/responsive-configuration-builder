/* global expect */

import { constructPicture } from '../src/construct-picture'

//-----------------------------------------------------------------------------

describe('Construct Picture', () => {
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
            widths: ['414px', 480, 600],
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
              crop: 'center',
            },
          },
          media: '(min-width: 768px)',
          sizes: '33vw',
        },
      ],
      src: {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 50,
        },
      },
      'data-src': {
        width: '240px',
        ratio: '16 / 9',
        options: {
          quality: 70,
        },
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

    const result = constructPicture(template, spec, image)

    // console.log(result)

    expect(result).to.deep.equal(expected)
  })
})
