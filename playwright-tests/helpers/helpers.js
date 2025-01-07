import { expect } from "@playwright/test"
export async function login(page, username, password) {
	await page.goto("/v1/index.html")
	expect(page.locator(".login_logo")).toBeVisible()
	await page.locator("[data-test='username']").fill(username)
	await page.locator("[data-test='password']").fill(password)
	await page.getByText("LOGIN").click()
	expect(page.locator(".inventory_container")).toBeVisible()
}

export async function teardown(page) {
	await page.getByText("Open Menu").click()
	await page.getByText("Reset App State").click()
	await page.getByText("Logout").click()
	await expect(page).toHaveURL("https://www.saucedemo.com/v1/index.html")
}

export async function addItemsToCart(page, items) {
	for (let item of items) {
		const itemLocator = await page
			.locator(".inventory_item")
			.filter({ hasText: item })
		const addToCartButton = await itemLocator.locator(
			page.getByRole("button", { name: "ADD TO CART" })
		)
		await addToCartButton.waitFor({
			state: "visible",
		})
		await addToCartButton.click()
	}
	await expect(page.locator(".shopping_cart_container")).toHaveText(
		items.length.toString()
	)
}

export async function checkout(page, firstName, lastName, postalCode) {
	await page.locator(".shopping_cart_link").click()
	await page.getByText("CHECKOUT").click()
	await page.locator("[data-test='firstName']").fill(firstName)
	await page.locator("[data-test='lastName']").fill(lastName)
	await page.locator("[data-test='postalCode']").fill(postalCode)
	await page.getByText("CONTINUE").click()
	await expect(page.getByText("Checkout: Overview")).toBeVisible()
	await page.getByText("FINISH").click()
	await expect(page.getByText("THANK YOU FOR YOUR ORDER")).toBeVisible()
}
