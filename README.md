# Responsive Configuration Builder

![npm](https://img.shields.io/npm/v/responsive-configuration-builder?style=flat-square)
![npm](https://img.shields.io/npm/l/responsive-configuration-builder?style=flat-square)

### A set of utility functions for working with responsive images. Generate image `src`, `srcset` and `sources` arrays from shorthand specifications.

Managing responsive images is tedious. Generating multi-resolution `srcset` values for responsive images or art-directed picture elements is repetitive and laborious. On-the-fly image transformation services such as Cloudinary or Imgix have made it easy to generate responsive image derivations, but there is still a significant amount of boilerplate required in order to configure the requests for them.

This is further complicated by the various data sources typically in use. The specific responsive image (or picture) specification is usually a front-end concern. The image to be rendered will likely come from a CMS (or other data store). And the image source -- an image service such as Cloudinary -- will presumably require environment-specific formatting for domain, account id, etc.

Responsive configuration builder uses a _spec_ object that simplifies the task of configuring multiple `src`, `srcset` and `sources` attributes, and returns a configuration object that can be easily consumed by front-end frameworks -- React, Vue, etc. -- and rendered into markup.

# Installation

```bash
$ npm install responsive-configuration-builder
```

# Usage

At its simplest, `responsive-configuration-builder` uses a custom builder function, which takes a spec object and image data, and generates the appropriate `src` and `srcset` URLs.

Builders for a simple token replacer `TokenBuilder` and Cloudinary `CloudinaryBuilder` are included.

## Token Builder

### Img src

```javascript
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
```

### Img srcset

```javascript
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
```

### Picture sources

```javascript
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
```

---

## Cloudinary Builder

Responsive configuration builder also includes a Cloudinary builder that is initialized with a configured instance of `cloudinary-core`.
(note: the `cloudinary-core` library is **not** included in this package).

### Img src

```javascript
import { Cloudinary } from 'cloudinary-core'
import { CloudinaryBuilder } from 'responsive-configuration-builder'

const cloudinary = new Cloudinary({
  cloud_name: 'demo-account',
  secure: true,
})

const builder = CloudinaryBuilder(cloudinary)

const spec = {
  src: {
    width: 240,
    ratio: 16 / 9,
    quality: 50,
    crop: 'auto',
  },
}

const image = {
  id: 'test.jpg',
}

const result = builder(spec, image)

// Result:
// {
//   src: `https://res.cloudinary.com/demo-account/image/upload/ar_1.7777,c_auto,q_50,w_240/test.jpg`,
// }
```

---

## Filestack Builder

Responsive configuration builder also includes a Fielstack builder that is initialized with a tuple containing a reference to the `Filelink` class and public apiKey.
(note: the `filestack-js` library is **not** included in this package).

### Img src

```javascript
import { Filelink } from 'filestack-js'
import { FilestackBuilder } from 'responsive-configuration-builder'

const apiKey = 'sOmeAp1K3y'

const builder = FilestackBuilder([Filelink, apiKey])

const spec = {
  src: {
    width: 240,
    ratio: 16 / 9,
    quality: 50,
    fit: 'crop',
  },
}

const image = {
  id: '50m31m4gek3y',
}

const result = builder(spec, image)

// Result:
// {
//   src: `https://cdn.filestackcontent.com/sOmeAp1K3y/resize=width:240,height:135,fit:crop/quality=value:50/50m31m4gek3y`,
// }
```

# Configuration

The configuration _spec_ objects used for each builder are not intended to be universally portable. The configuration spec for a TokenBuilder will not necessarily work for a CloudinaryBuilder (or any other custom builder). The purpose of Responsive Configuration Builder is to simplify and abstract the process of specifying image sizes. It is not intended to be a universal configuration layer. Each Builder is expected to handle the resizing requirements appropriate to its target platform or service (and to pass through any unrecognized options/paramters).

# Development

## Build

```
$ npm run build
```

## Test

```
$ npm test
```

# License

[MIT](https://github.com/brettgullan/responsive-configuration-builder/blob/master/LICENSE)
