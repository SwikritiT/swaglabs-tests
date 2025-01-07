import { login, teardown, addItemsToCart, checkout } from "../support/helpers"

describe("Checkout", () => {
	beforeEach(() => {
		login("standard_user", "secret_sauce")
	})

	it("checks out a item from the cart", () => {
		addItemsToCart(["Sauce Labs Backpack"])
		checkout("John", "Doe", "12345")
	})

	it("checks out multiple items from the cart", () => {
		addItemsToCart([
			"Sauce Labs Backpack",
			"Sauce Labs Bike Light",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Onesie",
		])
		checkout("John", "Doe", "12345")
	})

	afterEach(() => {
		teardown()
	})
})
