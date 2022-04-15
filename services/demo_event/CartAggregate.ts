import { read } from "fs";

export namespace Agregate {
	// Aggregate Root
	// an Entity
	// encapsulates child entities
	// feature
	// - has unique id
	// - entry point to the all the entities of this domain
	// - expose public methods with the applciation to intereact
	// - enforces business invariants
	// - modifiy and persistent single trancation
	export class Cart /* extends AggregateRoot */ {
		constructor(
		    public cartId: string // UUID
		  , public customerId: string
		  , public priceService: Function
		  , public cartItems: Array<any>
		  , public cartPirce: number
		  , public modified: Date
		){}

		getCartItems() {}

		isBasketEmpty() {
			return this.cartItems.length > 0
		}

		getTotalItemsInCart() {
			return this.cartItems.length
		}

		addItemToCart(cartItem:any) {
			// check cart quantity
			// add cart
			// caculate price
			// updateLastModifiedTime
			// if not allowed throw error
		}

		validateMaxItemsLimit(itemCountToAdd: number): boolean {
			let cartMaxItemsLimit = 10
    		return this.getTotalItemsInCart() + itemCountToAdd <= cartMaxItemsLimit ? false : true;
		}

		isQtyWithinAllowedLimit(cartItem: any) {
    		// return cartItem.isQtyWithinAllowedLimit();
		}

		private calculateCartPrice() {
			// priceService.calculateAndUpdatePriceInfo(this);
		}

		public getCartTotalValue():number {
			return 100
			// return this.cartPrice.getTotalCost();
		}

		private updateLastModifiedTime() {
			this.modified = new Date();
		}
	}

	// Entity
	// sub entities
	// mutable
	class CartItem /* extends Entity */ {
		private CartItemPrice: number = 0

		constructor(
			public CartItemId: number
		  , public skuId: number
		  , public qty: number
		  , public catalogItem: any
		){}

		getQty() {
			return this.qty
		}

		getCatalogItem() {
			return this.catalogItem
		}

		isQtyWithinAllowedLimit() {
			return this.qty <= this.catalogItem.getMaxAllewedPurchaseQty() ? true : false
		}

		getCartItemName() {
			return this.catalogItem.cartItemDisplayName()
		}

		updateCartItemPrice(price: number) {
			this.CartItemPrice = price
		}
	}

	// ValueObject
	// immutable entity
	class catalogItem /* extend ValueObject */ {
		constructor(
			public skuId: number
		  , public maxAllowedPurchaseQty: number
		  , public skuName: string
		  , public brand: string
		){}

		
		maxAllewedPurchaseQty = 2

		getMaxAllewedPurchaseQty() {
			return this.maxAllewedPurchaseQty
		}

		setMaxAllewedPurchaseQty(maxQty: number) {
			return this.maxAllewedPurchaseQty = maxQty
		}

		cartItemDisplayName() {
			let delimiter = ','
			return this.skuName.concat(delimiter).concat(this.brand)
		}
	}

	interface ICartRepository {
		saveCart(cart:any): void
		getCart(cartId:string): void
	}

	class CartRepository implements ICartRepository {

		constructor(
			public persistenceStore: any
		){}

		saveCart(cart:any){
			this.persistenceStore.save(cart)
		}

		getCart(cartId:any){
			return this.persistenceStore.get(cartId)
		}
	}

	// Useful when the aggregates is not the representation of the data stored
	// such as when Aggregate is composite of data from external microservies
	// complex aggregates can delegate to factory to construct objects
	// normally uses builder pattern
	// i.e
	// cartItem requires information, from CataLogData
	// the factory will be creating the cart aggregate
	class CartFactory {
		constructor(
			public cartRepository: ICartRepository,
			public catalogService: any
		){}

		retrieveUserCart(cartId:string) {
			let cart = this.cartRepository.getCart(cartId)
			let catalogItems = this.catalogService.getCatalogData(cart)
			// cart.refreshCatalogInformation(catalogItems)
			return cart
		}
	}

	// Adapter layer
	// intereact with other services
	// commuicates in dto
	class CartController /*implements CartService*/ {
		// service
		// command
		// responsemapper


		// @Post('/{cart-id/items}')
		addItemToCart(){
			// addItemCommand = Command('additem')
			// cart = cartApplicationService.addItemToCart(addItemCommand)
			// return cart response
		}
	}

	// Application layer
	// this is responsible to perform workflow, business flow
	class CartApp {
		addItemsToCart(){
			// let cart = cartFactory.retrieveUserCart
			// cartItem = cartItemFactory.createCartItem()
			// cart.addItem
			// cartRepository.save
			// return cart
		}
	}

}


