# Responsive Tools

### A set of utility functions for working with responsive images. Useful for generating image `src`, `srcset` and `sources` arrays.

Managing responsive images is tedious. Generating multi-resolution `srcset` values for responsive images or art-directed picture elements is repetitive and laborious. On-the-fly image transformation services such as Cloudinary or Imgix have made it easy to generate responsive image derivations, but there is still a significant amount of boilerplate required in order to request them.

This is further complicated by the various data sources typically in use. The specific responsive image (or picture) specification is usually a front-end concern. The image to be rendered will likely come from a CMS (or other data store). And the image source -- an image service such as Cloudinary -- will presumably require environment-specific formatting for domain, account id, etc.

# Use

At its simplest, `responsive-image-config` takes a URL template, a spec object and optional tokens, and generates the appropriate `src` and `srcset` URLs.

## Img src

```javascript
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
```

## Img srcset

```javascript
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
```

## Picture sources

```javascript
import constructPicture from 'responsive-image-config'

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

const template = 'https://picsum.photos/id/{id}/{width}/{height}'

const image = {
  id: 128,
}

const result = constructPicture(template, spec, image)

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
```

# Development

## Build

```
$ npm run build
```

## Test

```
$ npm test
```
