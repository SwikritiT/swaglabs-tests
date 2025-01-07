import { login, teardown, addItemsToCart } from "../support/helpers"

describe("Add to cart", () => {
	beforeEach(() => {
		login("standard_user", "secret_sauce")
	})

	it("user adds a item to cart", () => {
		addItemsToCart(["Sauce Labs Backpack"])
	})

	it("user adds multiple items to cart", () => {
		addItemsToCart([
			"Sauce Labs Backpack",
			"Sauce Labs Bike Light",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Onesie",
		])
	})

	afterEach(() => {
		teardown()
	})
})
