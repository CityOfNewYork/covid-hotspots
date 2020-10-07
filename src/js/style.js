import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'

export default (feature, resolution) => {
  return new Style({
    fill: new Fill({
      color: {
        Red: 'rgba(255,0,0,.7)',
        Orange: 'rgba(255,165,0,.7)',
        Yellow: 'rgba(240,255,0,.7)'
      }[feature.get('zone')]
    })
  })
}