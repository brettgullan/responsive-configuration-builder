/* global expect */
import { Filelink } from 'filestack-js'

import FilestackBuilder from '../src/filestack-builder'

//-----------------------------------------------------------------------------

const apiKey = 'A341a1ygQCGfDsIiwIBWnz'

const BASE_PATH = 'https://cdn.filestackcontent.com/'

//-----------------------------------------------------------------------------

describe.only('Filestack', () => {
  describe('Responsive Image', () => {
    it('given an image data object and specification, build a final image props object', () => {
      // Example of the kind of specification that might be generated
      // within a template or view layer, and combined with instance data (see below)
      // to generate a final Picture specification object.
      const spec = {
        options: {
          crop: 'auto',
          quality: 80,
        },
        // src: {
        //   width: '240px',
        //   ratio: 16 / 9,
        //   quality: 50,
        // },
        srcset: {
          widths: ['414px', 480, 600],
          ratio: '4:3',
          crop: 'crop',
        },
        sizes: '100vw',
      }

      // Example image instance data.
      // This would typically be retrieved from a CMS, API call or other dynamic source.
      const image = {
        id: `7rVyAV0tTeKtK6q0gxwn`,
      }

      // ----------------------------------------

      const expected = {
        // src: `${BASE_PATH}/ar_1.7777777777777777,c_auto,q_50,w_240,x_0.5,y_0.5/test.jpg`,
        srcset: [
          `${BASE_PATH}${apiKey}/resize=width:414,height:311,fit:crop/${image.id} 414w`,
          `${BASE_PATH}${apiKey}/resize=width:480,height:360,fit:crop/${image.id} 480w`,
          `${BASE_PATH}${apiKey}/resize=width:600,height:450,fit:crop/${image.id} 600w`,
        ].join(', '),
        sizes: '100vw',
      }

      // ----------------------------------------

      const builder = FilestackBuilder([Filelink, apiKey])
      const result = builder(spec, image)
      console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })

  /*
  describe('Responsive Picture', () => {
    it('given an image data object and picture specification, build a final picture props object', () => {
      const spec = {
        options: {
          crop: 'auto',
          quality: 80,
        },
        sources: [
          {
            srcset: {
              widths: ['414px', 480, 600],
              ratio: '4:3',
              crop: 'fill',
            },
            media: '(min-width: 415px)',
            sizes: '50vw',
          },
          {
            srcset: {
              widths: [768, 960],
              resolutions: [1, 2],
              ratio: 3 / 2,
              quality: 50,
              crop: 'center',
            },
            media: '(min-width: 768px)',
            sizes: '33vw',
          },
        ],
        src: {
          width: '240px',
          ratio: 16 / 9,
          quality: 50,
        },
        sizes: '100vw',
      }

      // Example image instance data.
      // This would typically be retrieved from a CMS, API call or other dynamic source.
      const image = {
        id: 'test.jpg',
        x: 0.5,
        y: 0.4,
      }

      // ----------------------------------------

      const expected = {
        src: `${BASE_PATH}/ar_1.7777777777777777,c_auto,q_50,w_240,x_0.5,y_0.4/test.jpg`,
        sources: [
          {
            srcset: [
              `${BASE_PATH}/ar_4:3,c_fill,q_80,w_414,x_0.5,y_0.4/test.jpg 414w`,
              `${BASE_PATH}/ar_4:3,c_fill,q_80,w_480,x_0.5,y_0.4/test.jpg 480w`,
              `${BASE_PATH}/ar_4:3,c_fill,q_80,w_600,x_0.5,y_0.4/test.jpg 600w`,
            ].join(', '),
            media: '(min-width: 415px)',
            sizes: '50vw',
          },
          {
            srcset: [
              `${BASE_PATH}/ar_1.5,c_center,q_50,w_768,x_0.5,y_0.4/test.jpg 768w`,
              `${BASE_PATH}/ar_1.5,c_center,q_50,w_1536,x_0.5,y_0.4/test.jpg 1536w`,
              `${BASE_PATH}/ar_1.5,c_center,q_50,w_960,x_0.5,y_0.4/test.jpg 960w`,
              `${BASE_PATH}/ar_1.5,c_center,q_50,w_1920,x_0.5,y_0.4/test.jpg 1920w`,
            ].join(', '),
            media: '(min-width: 768px)',
            sizes: '33vw',
          },
        ],
        sizes: '100vw',
      }

      // ----------------------------------------

      const builder = CloudinaryBuilder(cloudinary)
      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })
  */
})
