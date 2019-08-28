/* global expect */
import { Cloudinary } from 'cloudinary-core'

import expandCloudinaryConfig from '../src/cloudinary'

//-----------------------------------------------------------------------------

const cloudinary = new Cloudinary({
  cloud_name: 'steve-vickers-associates',
  secure: true,
})

const BASE_PATH = 'https://res.cloudinary.com/steve-vickers-associate/upload'

//-----------------------------------------------------------------------------

describe.only('Cloudinary Picture', () => {
  it('given an image data object, picture specification and url template, build a final picture props object', () => {
    // Example of the kind of specification that might be generated
    // within a template or view layer, and combined with instance data (see below)
    // to generate a final Picture specification object.
    const spec = {
      options: {
        crop: 'auto',
      },
      src: {
        width: '240px',
        ratio: '16 / 9',
        quality: 50,
      },
      srcset: {
        widths: ['414px', 480, 600],
        ratio: '4:3',
        crop: 'fill',
      },
      sizes: '100vw',
    }

    // Example image instance data.
    // This would typically be retrieved from a CMS, API call or other dynamic source.
    const image = {
      id: 'test.jpg',
      x: 0.5,
      y: 0.5,
    }

    // ----------------------------------------

    const expected = {
      src: `${BASE_PATH}/id/128/240/135?q=50&crop=auto`,

      // Note the missing {quality} token below!
      srcset: [
        `${BASE_PATH}/id/128/414/311?q={quality}&crop=auto 414w`,
        `${BASE_PATH}/id/128/480/360?q={quality}&crop=auto 480w`,
        `${BASE_PATH}/id/128/600/450?q={quality}&crop=auto 600w`,
      ].join(', '),

      sizes: '100vw',
    }

    // ----------------------------------------

    const result = expandCloudinaryConfig(cloudinary, spec, image)

    console.log(result)

    expect(result).to.deep.equal(expected)
  })
})
