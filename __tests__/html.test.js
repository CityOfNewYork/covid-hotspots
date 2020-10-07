import Feature from 'ol/Feature'
import app from '../src/js/index'
import {TITLE, ACTIVITIES, GUIDANCE, GEOCLIENT_URL, INFO_URL, DATA_URL} from '../src/js/constants'


describe('html', () => {
  test('html in a red zone', () => {
    expect.assertions(13)

    const feature = new Feature({zone_code: 'red'})

    const html = app.html(feature)

    expect(html.find('h2').length).toBe(1)
    expect(html.find('h2').text()).toBe('You are located in the red zone')

    const collapsibles = html.find('.clps')

    ACTIVITIES.forEach((title, i) => {
      const activity = title.replace(/ /g, '_').toLowerCase()
      const guidance = GUIDANCE[feature.get('zone_code')][activity]
      expect($(collapsibles.get(i)).find('button').text()).toBe(title)
      expect($(collapsibles.get(i)).find('.content div').html()).toBe(guidance)
    })
    expect($('<div></div>').append(html.find('a.info')).html()).toBe(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  })

  test('html in an orange zone', () => {
    expect.assertions(13)

    const feature = new Feature({zone_code: 'orange'})

    const html = app.html(feature)

    expect(html.find('h2').length).toBe(1)
    expect(html.find('h2').text()).toBe('You are located in the orange zone')

    const collapsibles = html.find('.clps')

    ACTIVITIES.forEach((title, i) => {
      const activity = title.replace(/ /g, '_').toLowerCase()
      const guidance = GUIDANCE[feature.get('zone_code')][activity]
      expect($(collapsibles.get(i)).find('button').text()).toBe(title)
      expect($(collapsibles.get(i)).find('.content div').html()).toBe(guidance)
    })
    expect($('<div></div>').append(html.find('a.info')).html()).toBe(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  })

  test('html in a yellow zone', () => {
    expect.assertions(13)

    const feature = new Feature({zone_code: 'yellow'})

    const html = app.html(feature)

    expect(html.find('h2').length).toBe(1)
    expect(html.find('h2').text()).toBe('You are located in the yellow zone')

    const collapsibles = html.find('.clps')

    ACTIVITIES.forEach((title, i) => {
      const activity = title.replace(/ /g, '_').toLowerCase()
      const guidance = GUIDANCE[feature.get('zone_code')][activity]
      expect($(collapsibles.get(i)).find('button').text()).toBe(title)
      expect($(collapsibles.get(i)).find('.content div').html()).toBe(guidance)
    })
    expect($('<div></div>').append(html.find('a.info')).html()).toBe(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  })

  test('html not in a zone', () => {
    expect.assertions(3)

    const html = app.html()

    expect(html.find('h2').length).toBe(1)
    expect(html.find('h2').text()).toBe('You are not located in a restricted zone')
    expect($('<div></div>').append(html.find('a.info')).html()).toBe(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  })
})

