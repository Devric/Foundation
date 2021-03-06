import './style.css'
import { createSignal, onMount, For } from "solid-js";
import Cart from "solidCart/Cart"
import { Oracle } from 'Oracle'

export default function Catalog() {
	let oracle: Oracle;
	const [photos, setPhotos] = createSignal([]);
	const images = [
		'https://burst.shopifycdn.com/photos/blue-t-shirt.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/gold-zipper-on-black-fashion-backpack.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/pool-floaty-fun.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/wood-leather-watches.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/fun-swimming-products.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://burst.shopifycdn.com/photos/qr-codes-in-store.jpg?width=373&format=pjpg&exif=1&iptc=1',
		'https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459__340.jpg',
		'https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994__340.jpg',
		'https://cdn.pixabay.com/photo/2017/03/31/18/02/strawberry-dessert-2191973__340.jpg'
	]

	onMount(async () => {
		const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=10`);
		setPhotos(await res.json().then(items => items.map(( item:any, i:number )=> { item.thumbnailUrl = images[i]; return item } )));

		oracle = new Oracle();
		oracle.register({
			host: "http://127.0.0.1:3000",
			module: "catalog",
			actions: ['addToCart']
		})

		oracle.subscribe((event:MessageEvent)=>{
			// console.log("catalog listner")
			CartReducer(event.data)
		})

		// oracle.dispatch({"action": "doThings","value": "1"})

		// TODO fix the pnpm build issue because it cant not find type
		// move Cart to a bootstrap function from remote app
		// render(() => Cart, document.getElementById('app') as HTMLElement);
	});

	function addHandler(data:any) {
		oracle.dispatch({"action": "addToCart","value": data})
	}

	return <>
		<h1>Product Catalog</h1>

		<div style="display:flex; flex-direction:row;" id="test">
			<div  style="flex-grow:1; order: 2; padding: 0 20px; min-width:240px;">
				<Cart />
				<p style="max-width:240px; font-size:0.8em; color:red;">This is MFE block from localhost:8888, pnpm startFederation if not displayed</p>
			</div>
			<div class="flex-grow:1">
				<div class="photos" style="">
					<For each={photos()} fallback={<p>Loading...</p>}>
						{ ( photo : {title: string, thumbnailUrl:string})  =>
							<figure>
								<img src={photo.thumbnailUrl} alt={photo.title} />
								<figcaption>{photo.title}</figcaption>
								<button onClick={[addHandler,photo]} style="margin-top:10px; padding:5px 10px;">Add to Cart</button>
							</figure>
						}
					</For>
				</div>
			</div>
		</div>
	</>;
}


function CartReducer(data:any) {
	if (data.module !== 'cart') return
	console.log(data)
	switch (data.action) {
		case 'add':
				console.log('ADD')
			break;
		case 'reduce':
				console.log('reduce')
			break;
		case 'checkout':
				console.log('checkout')
			break;
		case 'remove':
				console.log('remove')
			break;
		case 'clear':
				console.log('clear')
			break;
		default:
			console.log('Unhandled event: ', data.action)
	}
}
