import $ from 'jquery'

import Basemap from 'nyc-lib/nyc/ol/Basemap'
import LocationMgr from 'nyc-lib/nyc/ol/LocationMgr'
import Popup from 'nyc-lib/nyc/ol/Popup'
import Share from 'nyc-lib/nyc/Share'
import Goog from 'nyc-lib/nyc/lang/Goog'
import Collapsible from 'nyc-lib/nyc/Collapsible'

import TopoJson from 'ol/format/TopoJSON'
import Source from 'ol/source/Vector'
import Layer from 'ol/layer/Vector'

import {ACTIVITIES, GUIDANCE, GEOCLIENT_URL, INFO_URL, DATA_URL} from './constants'
import style from './style'

const source = new Source({url: DATA_URL, format: new TopoJson()})
const layer = new Layer({source, style})

export const map = new Basemap({target: 'map'})
export const locationMgr = new LocationMgr({map, url: GEOCLIENT_URL})
export const popup = new Popup({map})

export const html = feature => {
  const html = $('<div></div>')
  if (feature) {
    const zone_code = feature.get('zone_code')
    html.append(`<h2 class="${zone_code}" role="alert" aria-live="assertive">You are located in the ${zone_code} zone</h2>`)
      .append('<h3>Activity Guidance:</h3>')
    ACTIVITIES.forEach(title => {
      const target = $('<div></div>')
      const activity = title.replace(/ /g, '_').toLowerCase()
      const content = (`<div>${GUIDANCE[zone_code][activity]}</div>`)
      const collapsible = new Collapsible({target, title, content, collapsed: true})
      collapsible.on('change', () => {popup.pan()})
      html.append(target)
    })
  } else {
    html.append('<h2 role="alert" aria-live="assertive">You are not located in a restricted zone</h2>')
  }
  return html.append(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
}

export const located = location => {
  const coordinate = location.coordinate
  const features = source.getFeaturesAtCoordinate(coordinate)
  popup.show({coordinate, html: html(features[0])})
  $('.pop').attr('tab-index', 0).trigger('focus')
}

new Goog({target: '#map', button: true})
new Share({target: '#map'})

map.addLayer(layer)
map.on('click', located)
locationMgr.on('geocoded', located)
locationMgr.on('geolocated', located)

$('.srch input').attr('tab-index', 0).trigger('focus')