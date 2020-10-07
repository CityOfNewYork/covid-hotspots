import nyc from 'nyc-lib/nyc'
import Basemap from 'nyc-lib/nyc/ol/Basemap'
import LocationMgr from 'nyc-lib/nyc/ol/LocationMgr'
import Popup from 'nyc-lib/nyc/ol/Popup'
import Share from 'nyc-lib/nyc/Share'
import Goog from 'nyc-lib/nyc/lang/Goog'

import TopoJson from 'ol/format/TopoJSON'
import Source from 'ol/source/Vector'
import Layer from 'ol/layer/Vector'

import style from './style'

const map = new Basemap({target: 'map'})

const source = new Source({
  url: 'data/hotspots.json',
  format: new TopoJson()
})

const layer = new Layer({source, style})

map.addLayer(layer)

var locationMgr = new LocationMgr({
  map: map,
  url: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example'
})

const popup = new Popup({map})

const html = feature => {
  const html = $('<div></div>')
  if (feature) {
    html.append('<h2>You are located in a risk zone</h2>')
      .append(nyc.html(feature.getProperties()))
  } else {
    html.append('<h2>You are not located in a risk zone</h2>')
  }
  return html.append('<a href="https://www1.nyc.gov/site/coronavirus/index.page" target="_blank">More information</a>')
}

const located = location => {
  const coordinate = location.coordinate
  const features = source.getFeaturesAtCoordinate(coordinate)
  if (features.length) {
    popup.show({coordinate, html: html(features[0])})
  } else {
    popup.show({coordinate, html: html()})
  }
}

new Goog({target: '#map', button: true})
new Share({target: '#map'})

map.on('click', located)
locationMgr.on('geocoded', located)
locationMgr.on('geolocated', located)