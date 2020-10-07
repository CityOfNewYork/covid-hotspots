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

const GUIDANCE = {
  yellow: {
    worship: '50% Capacity',
    mass_gathering: '25 people maximum, indoors and outdoors',
    business: 'Open',
    dining: 'Indoor and outdoor dining, 4 person maximum per table',
    school: 'Open<br>Mandatory weekly testing of students and teachers/staff for in-person settings.'
  },
  orange: {
    worship: '25% Capacity',
    mass_gathering: '20 people maximum, indoors and outdoors',
    business: 'Open',
    dining: 'Indoor and outdoor dining, 4 person maximum per table',
    school: 'Open<br>Mandatory weekly testing of students and teachers/staff for in-person settings.'
  },
  red: {
    worship: '10% Capacity',
    mass_gathering: '10 people maximum, indoors and outdoors',
    business: 'Open',
    dining: 'Indoor and outdoor dining, 4 person maximum per table',
    school: 'Open<br>Mandatory weekly testing of students and teachers/staff for in-person settings.'
  }  
}

const ACTIVITIES = ['Worship', 'Mass Gathering', 'Business', 'Dining', 'School']

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
  return html.append('<a class="btn rad-all info" href="https://www1.nyc.gov/site/coronavirus/index.page" target="_blank">More information</a>')
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

map.on('click', located)
locationMgr.on('geocoded', located)
locationMgr.on('geolocated', located)

$('.srch input').attr('tab-index', 0).trigger('focus')