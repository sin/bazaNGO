const BASE = 'https://cors-anywhere.herokuapp.com/http://155.158.2.79:8080/api/'
const headers = {
  mode: 'cors'
}

const getAttrs = (obj) => Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')

const getOrganizations = (search, page, tags) => {
  let attrs = getAttrs({
    search: search ? search : '',
    page: page ? page : 1,
    tags__name__in: tags.filter(({active}) => active).map(({slug}) => slug).join(',')
  })
  return fetch(`${BASE}organization/?${attrs}`, { method: 'GET', ...headers }).then(
    (response) => response.json()
  )
}

const getOrganization = (id) => {
  return fetch(`${BASE}organization/${id}/`, { method: 'GET', ...headers }).then(
    (response) => response.json()
  )
}

const getTags = () => {
  return fetch(`${BASE}tag/`, { method: 'GET', ...headers }).then(
    (response) => response.json()
  )
}

export {
  getOrganizations,
  getOrganization,
  getTags
}
