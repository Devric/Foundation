import './style.css'
import { render } from 'solid-js/web';
import Catalog from './Catalog'


function App() {
	return <Catalog />
}

render(() => <App />, document.getElementById('app') as HTMLElement);
