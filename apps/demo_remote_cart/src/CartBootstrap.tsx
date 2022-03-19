import { render } from 'solid-js/web';
import Cart from './Cart'

export default function mountCart(el: HTMLElement) {
	render(Cart, el);
}

