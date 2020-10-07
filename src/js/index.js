import $ from 'jquery'

import nyc from 'nyc-lib/nyc'
import Basemap from 'nyc-lib/nyc/ol/Basemap'
import LocationMgr from 'nyc-lib/nyc/ol/LocationMgr'
import Popup from 'nyc-lib/nyc/ol/Popup'
import Share from 'nyc-lib/nyc/Share'
import Goog from 'nyc-lib/nyc/lang/Goog'

import TopoJson from 'ol/format/TopoJSON'
import Source from 'ol/source/Vector'
import Layer from 'ol/layer/Vector'

import {ACTIVITIES, GUIDANCE, GEOCLIENT_URL, INFO_URL, DATA_URL} from './constants'
import style from './style'

const map = new Basemap({target: 'map'})
const source = new Source({url: DATA_URL, format: new TopoJson()})
const layer = new Layer({source, style})
var locationMgr = new LocationMgr({map, url: GEOCLIENT_URL})
const popup = new Popup({map})

const html = feature => {
  const html = $('<div></div>')
  if (feature) {
    const zone = feature.get('zone')
    const guidance = GUIDANCE[zone]
    const table = $('<table><tbody><tr><th>Activity</th><th>Guidance</th></tr></tbody></table>')
    const tbody = table.find('tbody')
    ACTIVITIES.forEach(activity => {
      const key = activity.replace(/ /, '_').toLowerCase()
      tbody.append(`<tr><td class="activity">${activity}</td><td>${guidance[key]}</td></tr>`)
    })
    html.append(`<h2 class="${zone}" role="alert" aria-live="assertive">You are located in the ${zone} zone</h2>`)
    .append(table)
} else {
    html.append('<h2 role="alert" aria-live="assertive">You are not located in a restricted zone</h2>')
  }
  return html.append(`<a class="btn rad-all info" href="${INFO_URL}`)
}

const located = location => {
  const coordinate = location.coordinate
  const features = source.getFeaturesAtCoordinate(coordinate)
  if (features.length) {
    popup.show({coordinate, html: html(features[0])})
  } else {
    popup.show({coordinate, html: html()})
  }
  $('.pop').attr('tab-index', 0).trigger('focus')
}

new Goog({target: '#map', button: true})
new Share({target: '#map'})

map.addLayer(layer)
map.on('click', located)
locationMgr.on('geocoded', located)
locationMgr.on('geolocated', located)

$('.srch input').attr('tab-index', 0).trigger('focus')