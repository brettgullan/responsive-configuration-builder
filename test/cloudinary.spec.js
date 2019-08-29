/* global expect */
import { Cloudinary } from 'cloudinary-core'

import CloudinaryBuilder from '../src/cloudinary'

//-----------------------------------------------------------------------------

const cloudinary = new Cloudinary({
  cloud_name: 'demo-account',
  secure: true,
})

const BASE_PATH = 'https://res.cloudinary.com/demo-account/image/upload'

//-----------------------------------------------------------------------------

describe.only('Cloudinary', () => {
  describe('Responsive Image', () => {
    it('given an image data object, picture specification and url template, build a final picture props object', () => {
      // Example of the kind of specification that might be generated
      // within a template or view layer, and combined with instance data (see below)
      // to generate a final Picture specification object.
      const spec = {
        options: {
          crop: 'auto',
          quality: 80,
        },
        src: {
          width: '240px',
          ratio: 16 / 9,
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
        src: `${BASE_PATH}/ar_1.7777777777777777,c_auto,q_50,w_240,x_0.5,y_0.5/test.jpg`,
        srcset: [
          `${BASE_PATH}/ar_4:3,c_fill,q_80,w_414,x_0.5,y_0.5/test.jpg 414w`,
          `${BASE_PATH}/ar_4:3,c_fill,q_80,w_480,x_0.5,y_0.5/test.jpg 480w`,
          `${BASE_PATH}/ar_4:3,c_fill,q_80,w_600,x_0.5,y_0.5/test.jpg 600w`,
        ].join(', '),
        sizes: '100vw',
      }

      // ----------------------------------------

      const builder = CloudinaryBuilder(cloudinary)
      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })
})
