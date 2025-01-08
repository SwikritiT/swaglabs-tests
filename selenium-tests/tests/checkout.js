import { Builder, By, Key, until } from "selenium-webdriver"
import { normalUserLogin } from "./login.js"
import { addToCart } from "./addToCart.js"
import { expect } from "chai"

async function checkout() {
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
		await driver.findElement(By.className("shopping_cart_link")).click()
		await driver.findElement(By.className("checkout_button")).click()
		await driver.findElement(By.id("first-name")).sendKeys("John")
		await driver.findElement(By.id("last-name")).sendKeys("Doe")
		await driver.findElement(By.id("postal-code")).sendKeys("12345")
		await driver.findElement(By.className("cart_button")).click()
		await driver.wait(
			until.elementIsVisible(
				driver.findElement(By.id("checkout_summary_container")),
				1000
			)
		)
        await driver.findElement(By.className("cart_button")).click()
		await driver.wait(
			until.elementIsVisible(
				driver.findElement(By.className("complete-header")),
				1000
			)
		)
		let completeHeader = await driver.findElement(
			By.className("complete-header")
		)
		let completeHeaderText = await completeHeader.getText()
		expect(completeHeaderText).to.equal("THANK YOU FOR YOUR ORDER")
	} catch (err) {
		console.error(`Error: ${err}`)
	} finally {
		// Quit the browser
		await driver.quit()
	}
}

checkout()
