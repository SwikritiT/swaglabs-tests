import { test } from "@playwright/test"
import { addItemsToCart, checkout, login, teardown } from "../helpers/helpers"

test.describe("checkout", () => {
	test.beforeEach(async ({ page }) => {
		await login(page, "standard_user", "secret_sauce")
	})

	test("user checks-out a item from the cart", async ({ page }) => {
		await addItemsToCart(page, ["Sauce Labs Backpack"])
		await checkout(page, "John", "Doe", "12345")
	})

	test("user checks-out multiple items from the cart", async ({ page }) => {
		await addItemsToCart(page, [
			"Sauce Labs Backpack",
			"Sauce Labs Bike Light",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Onesie",
		])
		await checkout(page, "John", "Doe", "12345")
	})
	test.afterEach(async ({ page }) => {
		await teardown(page)
	})
})
