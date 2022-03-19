import './style.css'
import { render } from 'solid-js/web';
import Cart from './Cart'


function App() {
	return <Cart />
}

render(() => <App />, document.getElementById('app') as HTMLElement);
