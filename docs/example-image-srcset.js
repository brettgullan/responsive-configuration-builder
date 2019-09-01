import { TokenBuilder } from 'responsive-configuration-builder'

const template = 'https://picsum.photos/id/{id}/{width}/{height}'
const builder = TokenBuilder(template)

const spec = {
  srcset: {
    widths: [240, 320, 480],
    ratio: 16 / 9,
  },
}

const image = {
  id: 128,
}

const result = builder(spec, image)

// Result:
// {
//   srcset: 'https://picsum.photos/id/128/240/135 240w, https://picsum.photos/id/128/320/180 320w, https://picsum.photos/id/128/480/270 480w'
// }
