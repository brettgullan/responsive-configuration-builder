import { TokenBuilder } from 'responsive-configuration-builder'

const template = 'https://picsum.photos/id/{id}/{width}/{height}'
const builder = TokenBuilder(template)

const spec = {
  sources: [
    {
      srcset: {
        widths: [240, 320, 480],
        ratio: 3 / 2,
      },
    },
    {
      srcset: {
        widths: [640, 720, 960],
        ratio: 16 / 9,
      },
    },
  ],
}

const image = {
  id: 128,
}

const result = builder(spec, image)

// Result:
// {
//   sources: [
//     {
//       srcset:
//         'https://picsum.photos/id/128/240/160 240w, https://picsum.photos/id/128/320/213 320w, https://picsum.photos/id/128/480/320 480w',
//     },
//     {
//       srcset:
//         'https://picsum.photos/id/128/640/360 640w, https://picsum.photos/id/128/720/405 720w, https://picsum.photos/id/128/960/540 960w',
//     },
//   ]
// }
