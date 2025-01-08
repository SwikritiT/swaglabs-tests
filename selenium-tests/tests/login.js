import { Builder, By, Key, until } from "selenium-webdriver"
import { expect } from "chai"

export async function normalUserLogin(driver) {
	await driver
		.findElement(By.css("[data-test='username']"))
		.sendKeys("standard_user")
	await driver
		.findElement(By.css("[data-test='password']"))
		.sendKeys("secret_sauce")
	await driver.findElement(By.id("login-button")).click()
	await driver.wait(
		until.elementIsVisible(
			driver.findElement(By.className("inventory_container")),
			1000
		)
	)
	// Reload the page
	// this doesn't work i give up f selenium
	// await driver.navigate().refresh()
	// await driver.sleep(10000)
	// const menuElement = await driver.findElement(
	// 	By.xpath(
	// 		"//div//div[contains(@class, 'bm-burger-button')]//button[text()='Open Menu']"
	// 	)
	// )

	// await driver.wait(until.elementIsVisible(menuElement), 5000)
	// await driver.wait(until.elementIsEnabled(menuElement), 5000)
	// await menuElement.click()
	// await driver.findElement(By.id("logout_sidebar_link")).click()
}

async function lockedOutUserLogin(driver) {
	await driver
		.findElement(By.css("[data-test='username']"))
		.sendKeys("locked_out_user")
	await driver
		.findElement(By.css("[data-test='password']"))
		.sendKeys("secret_sauce")

	await driver.findElement(By.id("login-button")).click()
	const errorElement = await driver.findElement(By.css("[data-test='error']"))
	await driver.wait(until.elementIsVisible(errorElement, 1000))

	const actualError = await errorElement.getText()
	expect(actualError).to.equal(
		"Epic sadface: Sorry, this user has been locked out."
	)
}

async function login() {
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
	} catch (err) {
		console.error(`Error: ${err}`)
	} finally {
		// Quit the browser
		await driver.quit()
	}
}

await login()
