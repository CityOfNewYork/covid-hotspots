export const GUIDANCE = {
  yellow: {
    houses_of_worship: 'Houses of worship may remain open for individual worship at 50% maximum capacity.',
    gatherings: 'Non-essential gatherings must be limited to 25 people maximum for both indoor and outdoor settings. Any individual who encourages, promotes or organizes mass gatherings may be fined up to $15,000/day.',
    businesses: 'All businesses may remain open but must follow COVID-19 requirements for their <a href="https://forward.ny.gov/reopening-new-york-city" target="_blank">sector</a>.',
    food_service_establishments: 'Indoor and outdoor dining is allowed. There is a four-person maximum per table. ',
    schools: 'All New York City public schools and nonpublic schools may remain open. Testing guidance will be issued by New York State on Friday, 10/9/2020. '
  },
  orange: {
    houses_of_worship: 'Houses of worship may remain open for individual worship at 33% capacity, up to a maximum of 25 people, whichever is fewer.',
    gatherings: 'Non-essential gatherings must be limited to no more than 10 people for both indoor and outdoor settings. Any individual who encourages, promotes or organizes mass gatherings may be fined up to $15,000/day',
    businesses: 'Businesses including gyms and fitness centers, and personal care services, including barbers, hair salons, spas, tattoo or piercing parlors, nail technicians and nail salons, cosmetologists, estheticians, the provision of laser hair removal and electrolysis, etc. must close. ',
    food_service_establishments: 'Restaurants, bars, cafes and other food service establishments can provide outdoor dining and takeout and delivery service only. There is a four-person maximum per table. No indoor dining is allowed. ',
    schools: 'All New York City public schools and nonpublic schools must close and return to full remote learning. '
  },
  red: {
    houses_of_worship: 'Houses of worship may remain open for individual worship at 25% capacity, up to a maximum of 10 people, whichever is fewer. ',
    gatherings: 'Non-essential gatherings of any size are prohibited and must be postponed or cancelled. Any individual who encourages, promotes or organizes mass gatherings may be fined up to $15,000/day.',
    businesses: 'All nonessential businesses are required to close. Only essential <a href="https://esd.ny.gov/guidance-executive-order-2026" target="_blank">businesses</a> as designated by New York State Empire State Development Corporation can remain open. ',
    food_service_establishments: 'Restaurants, bars, cafes and other food service establishments can provide takeout and delivery service only. No indoor or outdoor dining is allowed.',
    schools: 'All New York City public schools and nonpublic schools must close and return to full remote learning. '
  }  
}

export const ACTIVITIES = ['Houses of Worship', 'Gatherings', 'Businesses', 'Food Service Establishments', 'Schools']

export const INFO_URL = 'https://www1.nyc.gov/site/coronavirus/index.page'
export const GEOCLIENT_URL = 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example'
export const DATA_URL = 'data/hotspots.json'
