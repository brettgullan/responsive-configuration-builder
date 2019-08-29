/* global expect */

import { identity, curry } from 'ramda'

//-----------------------------------------------------------------------------

import specBuilder from '../src/spec-builder'

//-----------------------------------------------------------------------------

const toQueryString = (params) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')

//-----------------------------------------------------------------------------

describe('Spec Builder', () => {
  const image = {
    id: 128,
    crop: 'auto',
  }

  it('correctly processes an individual spec object', () => {
    const resolver = curry((__, spec) => spec)
    const builder = specBuilder(identity, resolver)

    const spec = {
      width: 320,
      height: 180,
      quality: 50,
    }

    const result = builder(image, spec)

    expect(result).to.equal(spec)
  })

  it('correctly processes an array spec object', () => {
    const resolver = curry((__, spec) => toQueryString(spec))
    const builder = specBuilder(identity, resolver)

    const spec = [
      {
        width: 320,
        height: 180,
        quality: 50,
      },
      {
        width: 640,
        height: 360,
        quality: 80,
      },
    ]

    const expected = [
      'width=320&height=180&quality=50 320w',
      'width=640&height=360&quality=80 640w',
    ].join(', ')

    const result = builder(image, spec)

    expect(result).to.equal(expected)
  })
})
