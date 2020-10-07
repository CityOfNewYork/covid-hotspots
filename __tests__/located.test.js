import app from '../src/js/index'

describe('located', () => {
  const show = app.popup.show
  const getFeaturesAtCoordinate = app.source.getFeaturesAtCoordinate
  const html = app.html
  let features
  beforeEach(() => {
    app.source.getFeaturesAtCoordinate = jest.fn(coordinate => {
      return features
    })
    app.popup.show = jest.fn()
    app.html = jest.fn()
  })
  afterEach(() => {
    app.popup.show = show
    app.source.getFeaturesAtCoordinate = getFeaturesAtCoordinate
    app.html = html
  })

  test('geocoded in a zone', () => {
    expect.assertions(4)

    const coordinate = [1, 2]

    features = ['mock-feature']

    app.locationMgr.trigger('geocoded', {coordinate})

    expect(app.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(1)
    expect(app.source.getFeaturesAtCoordinate.mock.calls[0][0]).toBe(coordinate)
    
    expect(app.html).toHaveBeenCalledTimes(1)
    expect(app.html.mock.calls[0][0]).toBe('mock-feature')
  })

  test('geolocateded not in a zone', () => {
    expect.assertions(4)

    const coordinate = [1, 2]

    features = []

    app.locationMgr.trigger('geolocated', {coordinate})

    expect(app.source.getFeaturesAtCoordinate).toHaveBeenCalledTimes(1)
    expect(app.source.getFeaturesAtCoordinate.mock.calls[0][0]).toBe(coordinate)
    
    expect(app.html).toHaveBeenCalledTimes(1)
    expect(app.html.mock.calls[0][0]).toBeUndefined()
  })
})