import constructPicture from 'responsive-image-config'

const spec = {
  srcset: {
    widths: [240, 320, 480],
    ratio: 16 / 9,
  },
}

const template = 'https://picsum.photos/id/{id}/{width}/{height}'

const image = {
  id: 128,
}

const result = constructPicture(template, spec, image)

// Result:
// {
//   srcset: 'https://picsum.photos/id/128/240/135 240w, https://picsum.photos/id/128/320/180 320w, https://picsum.photos/id/128/480/270 480w'
// }
