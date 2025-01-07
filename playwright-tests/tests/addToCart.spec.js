import { test } from "@playwright/test"
import { addItemsToCart, login, teardown } from "../helpers/helpers"

test.describe("Add to cart", () => {
	test.beforeEach(async ({ page }) => {
		await login(page, "standard_user", "secret_sauce")
	})

	test("user adds a item to cart", async ({ page }) => {
		await addItemsToCart(page, ["Sauce Labs Backpack"])
	})

	test("user adds multiple items to cart", async ({ page }) => {
		await addItemsToCart(page, [
			"Sauce Labs Backpack",
			"Sauce Labs Bike Light",
			"Sauce Labs Bolt T-Shirt",
			"Sauce Labs Onesie",
		])
	})
	test.afterEach(async ({ page }) => {
		await teardown(page)
	})
})
