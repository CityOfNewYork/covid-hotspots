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

import {TITLE, ACTIVITIES, GUIDANCE, GEOCLIENT_URL, INFO_URL, DATA_URL, NO_ZONE} from './constants'
import style from './style'

document.title = TITLE
$('body').append(`<h1 id="banner" onclick="document.location='./'">${TITLE}</h1>`)
  .append('<div id="map"></div>')

const source = new Source({url: DATA_URL, format: new TopoJson()})
const layer = new Layer({source, style})

const map = new Basemap({target: 'map'})
const locationMgr = new LocationMgr({map, url: GEOCLIENT_URL})
const popup = new Popup({map})

map.addLayer(layer)

const app = {
  source,
  layer,
  map,
  locationMgr,
  popup,
  html: feature => {
    const html = $('<div></div>')
    if (feature) {
      const zone_code = feature.get('zone_code')
      html.append(`<h2 class="${zone_code}" role="alert" aria-live="assertive">You are located in the ${zone_code.toUpperCase()} zone</h2>`)
        .append('<h3>Activity Guidance:</h3>')
      ACTIVITIES.forEach(title => {
        const target = $('<div></div>')
        const activity = title.replace(/ /g, '_').toLowerCase()
        const content = (`<div>${GUIDANCE[zone_code][activity]}</div>`)
        const collapsible = new Collapsible({target, title, content, collapsed: true})
        collapsible.on('change', () => {app.popup.pan()})
        html.append(target)
      })
      $(app.popup.getElement()).removeClass('no-zone')
    } else {
      html.append(`<h2 role="alert" aria-live="assertive">${NO_ZONE}</h2>`)
      $(app.popup.getElement()).addClass('no-zone')
    }
    return html.append(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  },
  located: location => {
    const coordinate = location.coordinate
    const features = app.source.getFeaturesAtCoordinate(coordinate)
    app.popup.show({coordinate, html: app.html(features[0])})
    $('.pop').attr('tab-index', 0).trigger('focus')
  }
}

new Goog({target: '#map', button: true})
new Share({target: '#map'})

map.on('click', app.located)
locationMgr.on('geocoded', app.located)
locationMgr.on('geolocated', app.located)

$('.srch input').attr('tab-index', 0).trigger('focus')

export default app