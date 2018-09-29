import queryString from 'query-string'

const BASE_URL = ' https://bazango.herokuapp.com/api/'

const config = {
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}

const isActive = ({active}) => active

const tagsString = tags =>
  tags.filter(isActive).map(({slug}) => slug).join()

const categoriesString = categories =>
  categories.filter(isActive).map(({name}) => name).join()

const get = (path) =>
  fetch(BASE_URL + path, { method: 'GET', ...config })
    .then(response => response.json())

const getOrganizations = (search, page, tags, categories) => {
  let query = queryString.stringify({
    search: search,
    page: page,
    'tags__name__in': tagsString(tags),
    'categories__name__in': categoriesString(categories)
  })
  return get('organization/?' + query)
}

const getOrganization = (id) => get(`organization/${id}/`)

const getTags = () => get('tag/')

const getCategories = () => get('category/')

export {
  getOrganizations,
  getOrganization,
  getTags,
  getCategories
}
