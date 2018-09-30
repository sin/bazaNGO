import ReactDOM from 'react-dom'
import createHistory from 'history/createHashHistory'

import configureStore from 'store'
import createRoutes from 'routes'

const history = createHistory()
const store = configureStore(history)

const routes = createRoutes(store, history)

ReactDOM.render(routes, document.getElementById('app'))
