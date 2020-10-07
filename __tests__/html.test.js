import Feature from 'ol/Feature'
import app from '../src/js/index'
import {ACTIVITIES, GUIDANCE, INFO_URL, NO_ZONE} from '../src/js/constants'

const pan = app.popup.pan

beforeEach(() => {
  app.popup.pan = jest.fn()
})

afterEach(() => {
  app.popup.pan = pan
})

describe('html', () => {
  test('html in a red zone', () => {
    expect.assertions(13)

    const feature = new Feature({zone_code: 'red'})

    const html = app.html(feature)

    expect(html.find('h2').length).toBe(1)
    expect(html.find('h2').text()).toBe('You are located in the RED zone')

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
    expect(html.find('h2').text()).toBe('You are located in the ORANGE zone')

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
    expect(html.find('h2').text()).toBe('You are located in the YELLOW zone')

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
    expect(html.find('h2').text()).toBe(NO_ZONE)
    expect($('<div></div>').append(html.find('a.info')).html()).toBe(`<a class="btn rad-all info" target="_blank" href="${INFO_URL}">More Information</a>`)
  })
})

// test('popup pans on content expansion', () => {
//   expect.assertions(1)

//   const feature = new Feature({zone_code: 'yellow'})

//   const html = app.html(feature)

//   $(html.find('button').get(0)).trigger('click')

//   expect(app.popup.pan).toHaveBeenCalledTimes(1)
// })
