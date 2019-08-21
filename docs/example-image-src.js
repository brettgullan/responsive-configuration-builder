import constructPicture from 'responsive-image-config'

const spec = {
  src: {
    width: '240px',
    ratio: '16 / 9',
  },
}

const template = 'https://picsum.photos/id/{id}/{width}/{height}'

const image = {
  id: 128,
}

const result = constructPicture(template, spec, image)

// Result:
// {
//   src: `https://picsum.photos/id/128/240/135`,
// }
