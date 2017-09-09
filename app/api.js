const BASE = 'http://155.158.2.79:8080/api/'
const headers = {
  mode: 'cors'
}

const getAttrs = (obj) => Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&')

const getOrganizations = (search) => {
  let attrs = getAttrs({
    search: search ? search : ''
  })
  return fetch(BASE + 'organization/?' + attrs, { method: 'GET', ...headers }).then(
    (response) => response.json()
  )
}

const getOrganization = (id) => {
  return fetch(BASE + 'organization/' + id, { method: 'GET', ...headers }).then(
    (response) => response.json()
  )
}

export {
  getOrganizations,
  getOrganization
}
