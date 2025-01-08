import { Builder, By, Key, until } from "selenium-webdriver"
import { normalUserLogin } from "./login.js"
import { expect } from "chai"

export async function addToCart(driver) {
	// Locate the inventory item by the item name
	let inventoryItem = await driver.findElement(By.className("inventory_item"))
	await driver.wait(until.elementIsVisible(inventoryItem), 1000)
	// Find the name and check if it contains the item text
	let itemName = await inventoryItem
		.findElement(By.className("inventory_item_name"))
		.getText()

	if (itemName.includes("Sauce Labs Backpack")) {
		// Navigate to the parent elements to find the button
		let pricebar = await inventoryItem.findElement(By.className("pricebar"))
		let addToCartButton = await pricebar.findElement(
			By.className("btn_primary")
		)

		// Click on the "ADD TO CART" button
		await addToCartButton.click()
	}
	let cartContainer = await driver.findElement(
		By.className("shopping_cart_container")
	)
	let cartText = await cartContainer.getText()
	expect(cartText).to.equal("1")
}

async function addItemsToCart() {
	let driver = await new Builder().forBrowser("chrome").build()
	try {
		await driver.get("https://www.saucedemo.com/v1/index.html")
		await driver.wait(
			until.elementIsVisible(
				driver.findElement(By.className("login_logo")),
				1000,
				"Element wasn't found"
			)
		)
		await normalUserLogin(driver)
		await addToCart(driver)
	} catch (err) {
		console.error(`Error: ${err}`)
	} finally {
		// Quit the browser
		await driver.quit()
	}
}

await addItemsToCart()
