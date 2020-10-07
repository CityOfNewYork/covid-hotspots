import Source from 'ol/source/Vector'
import LocationMgr from 'nyc-lib/nyc/ol/LocationMgr'

import {located, popup} from '../src/js/index'

jest.mock('nyc-lib/nyc/ol/LocationMgr')

describe('located', () => {
  const source = {}
  const show = popup.show
  const div = $('<div id="map"></div>')
  let features
  let html
  beforeEach(() => {
    $('body').append(div)
    source.getFeaturesAtCoordinate = jest.fn(coordinate => {
      return features
    })
    popup.show = jest.fn()
    html = jest.fn()
  })
  afterEach(() => {
    div.remove()
    popup.show = show
  })

  test('geocoded in a zone', () => {
    expect.assertions(0)

    const coordinate = [1, 2]

    features = ['mock-feature']

    located({coordinate})

    //expect(source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(1)
   // expect(source.getFeaturesAtCoordinate.mock.calls[0][0]).toBe(coordinate)
  })
})