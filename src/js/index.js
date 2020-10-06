import Basemap from 'nyc-lib/nyc/ol/Basemap'
import LocationMgr from 'nyc-lib/nyc/ol/LocationMgr'
import Source from 'ol/source/Source'
import TopoJson from 'ol/format/TopoJSON'
import Source from 'ol/source/Vector'
import Layer from 'ol/layer/Vector'

const map = new Basemap({target: 'map'})

const source = new Source({
  url: 'data/hotspots.json',
  format: new TopoJson()
})

const layer = new Layer({source})

var locationMgr = LocationMgr({
  map: map,
  url: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example'
})
