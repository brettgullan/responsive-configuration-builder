import { TokenBuilder } from 'responsive-configuration-builder'

const template = 'https://picsum.photos/id/{id}/{width}/{height}'
const builder = TokenBuilder(template)

const spec = {
  src: {
    width: '240px',
    ratio: '16 / 9',
  },
}

const image = {
  id: 128,
}

const result = builder(spec, image)

// Result:
// {
//   src: `https://picsum.photos/id/128/240/135`,
// }
