import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import styles from './styles.css'

import configureStore from 'store'
import createRoutes from 'routes'

const history = createHistory({ basename: process.env.NODE_ENV === 'production' ? 'bazaNGO' : '/'})
const store = configureStore(history)

const routes = createRoutes(store, history)

ReactDOM.render(routes, document.getElementById('app'))
