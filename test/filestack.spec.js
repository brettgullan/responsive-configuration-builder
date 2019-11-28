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
          crop: 'crop',
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
        src: `${BASE_PATH}${apiKey}/resize=width:240,height:135,fit:crop/quality=value:50/${image.id}`,
        srcset: [
          `${BASE_PATH}${apiKey}/resize=width:414,height:311,fit:crop/quality=value:80/${image.id} 414w`,
          `${BASE_PATH}${apiKey}/resize=width:480,height:360,fit:crop/quality=value:80/${image.id} 480w`,
          `${BASE_PATH}${apiKey}/resize=width:600,height:450,fit:crop/quality=value:80/${image.id} 600w`,
        ].join(', '),
        sizes: '100vw',
      }

      // ----------------------------------------

      const builder = FilestackBuilder([Filelink, apiKey])
      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })

  describe('Responsive Picture', () => {
    it('given an image data object and picture specification, build a final picture props object', () => {
      const spec = {
        options: {
          crop: 'max',
          quality: 80,
        },
        sources: [
          {
            srcset: {
              widths: ['414px', 480, 600],
              ratio: '4:3',
              crop: 'crop',
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
              crop: 'clip',
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
        id: `7rVyAV0tTeKtK6q0gxwn`,
      }

      // ----------------------------------------

      const expected = {
        src: `${BASE_PATH}${apiKey}/resize=width:240,height:135,fit:max/quality=value:50/${image.id}`,
        sources: [
          {
            srcset: [
              `${BASE_PATH}${apiKey}/resize=width:414,height:311,fit:crop/quality=value:80/${image.id} 414w`,
              `${BASE_PATH}${apiKey}/resize=width:480,height:360,fit:crop/quality=value:80/${image.id} 480w`,
              `${BASE_PATH}${apiKey}/resize=width:600,height:450,fit:crop/quality=value:80/${image.id} 600w`,
            ].join(', '),
            media: '(min-width: 415px)',
            sizes: '50vw',
          },
          {
            srcset: [
              `${BASE_PATH}${apiKey}/resize=width:768,height:512,fit:clip/quality=value:50/${image.id} 768w`,
              `${BASE_PATH}${apiKey}/resize=width:1536,height:1024,fit:clip/quality=value:50/${image.id} 1536w`,
              `${BASE_PATH}${apiKey}/resize=width:960,height:640,fit:clip/quality=value:50/${image.id} 960w`,
              `${BASE_PATH}${apiKey}/resize=width:1920,height:1280,fit:clip/quality=value:50/${image.id} 1920w`,
            ].join(', '),
            media: '(min-width: 768px)',
            sizes: '33vw',
          },
        ],
        sizes: '100vw',
      }

      // ----------------------------------------

      const builder = FilestackBuilder([Filelink, apiKey])
      const result = builder(spec, image)
      // console.log(result)
      expect(result).to.deep.equal(expected)
    })
  })
})
