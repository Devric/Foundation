import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import GlobalStyles from './client/GlobalStyles'

ReactDOM.hydrate(
	<BrowserRouter>
		<GlobalStyles />
		<App />
	</BrowserRouter>,
	document.getElementById('app')
)