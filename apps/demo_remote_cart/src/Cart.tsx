// import './style.css'
import { render } from 'solid-js/web';
import { createSignal, onMount, For } from "solid-js";

interface item {
	name: string,
	image: string
}

export default function Catalog() {
	const [items, setItems] = createSignal<Array<item>>([]);

	onMount(async () => {
		// const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10`);
		// setPhotos(await res.json().then(items => items.map(( item:any, i:number )=> { item.thumbnailUrl = images[i]; return item } )));
		setItems([
			{ name:"a", image: "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e" }
		])
	});

	return <>

		<div class="cart" style="widht:100%; max-width:200px; border: 2px solid #eee; padding:15px; border-radius:8px">
			<h3>Items in Cart: {items().length}</h3>
			<For each={items()} fallback={<>Loading...</>}>
				{ (item) =>
					<div style="clear: both; border-bottom:2px solid #000;height:50px;">
						<div style="float:left; font-size:2em;">{item.name}</div>
						<img style="max-width:50px; height:100%; float:right;" src={item.image} />
					</div>
				}
			</For>
			<button style="margin-top:10px; padding:5px 10px;">Checkout</button>
		</div>
	</>;
}

export function mountCart(el:any) {
	render(() => <Catalog />, el);
}

