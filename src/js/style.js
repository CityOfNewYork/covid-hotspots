import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'

export default (feature, resolution) => {
  return new Style({
    fill: new Fill({
      color: {
        red: 'rgba(255,18,0,.7)',
        orange: 'rgba(255,102,0,.7)',
        yellow: 'rgba(255,255,25,.7)'
      }[feature.get('zone_code')]
    })
  })
}