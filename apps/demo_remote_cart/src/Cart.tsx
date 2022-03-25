// import './style.css'
import { render } from 'solid-js/web';
import { createSignal, onMount, For } from "solid-js";
import { Oracle } from 'Oracle'

interface item {
	name: string,
	image: string,
	qty: number
}

export default function Catalog() {
	let oracle: Oracle;
	const [items, setItems] = createSignal<Array<item>>([]);

	onMount(async () => {
		oracle = new Oracle();
		oracle.register({
			host: "http://127.0.0.1:3000",
			module: "cart",
			actions: ['remove','reduce', 'add', 'checkout', 'clear']
		})

		oracle.subscribe((event:MessageEvent)=>{
			// console.log("cart listner")
			CatalogReducer(event.data)
		})

		// oracle.dispatch({"action": "getItem","value": "1"})
		// oracle.dispatch({"action": "doThings","value": "1"})

		// const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10`);
		// setPhotos(await res.json().then(items => items.map(( item:any, i:number )=> { item.thumbnailUrl = images[i]; return item } )));
		setItems([
			{
				name:"a",
				image: "https://cdn.sstatic.net/Img/teams/teams-illo-free-sidebar-promo.svg?v=47faa659a05e",
				qty: 1
			}
		])
	});

	function CatalogReducer(data:any) {
		if (data.module !== 'catalog') return
		console.log(data)
		switch (data.action) {
			case 'addToCart':
				setItems((items)=>{
					return [...items, {
						name: data.value.title,
						image: data.value.thumbnailUrl,
						qty: data.value.qty || 1
					}]
				})

			break;
			default:
				console.log('Unhandled event: ', data.action)
		}
	}

	function handleCheckout(){
		let cartItems = items()
		oracle.dispatch({"action": "checkout","value": cartItems})
	}

	return <>

		<div class="cart" style="widht:100%; max-width:200px; border: 2px solid #eee; padding:15px; border-radius:8px">
			<h3>Items in Cart: {items().length}</h3>
			<For each={items()} fallback={<>Loading...</>}>
				{ (item) =>
					<div style="clear: both; border-bottom:2px solid #000;height:50px; padding: 5px 0;">
						<div style="float:left; font-size:1rem; white-space:nowrap; overflow: hidden; width:100px; text-overflow:ellipsis;">{item.name}</div>
						<div style="float:right; font-size:2em;">
							<input type="number" value={item.qty} min="1" max="999" />
						</div>
						<img style="max-width:50px; height:100%; float:right;" src={item.image} />
					</div>
				}
			</For>
			<button onClick={handleCheckout} style="margin-top:10px; padding:5px 10px;">Checkout</button>
		</div>
	</>;
}

export function mountCart(el:any) {
	render(() => <Catalog />, el);
}


