import { test, expect } from "@playwright/test"

test.describe("Login", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/v1/index.html")
		await expect(page.locator(".login_logo")).toBeVisible()
	})

	test("normal user logs in", async ({ page }) => {
		await page.locator("[data-test='username']").fill("standard_user")
		await page.locator("[data-test='password']").fill("secret_sauce")
		await page.getByText("LOGIN").click()
		await expect(page.locator(".inventory_container")).toBeVisible()
		await page.getByText("Open Menu").click()
		await page.getByText("Logout").click()
	})

	test("locked out user logs in", async ({ page }) => {
		await page.locator("[data-test='username']").fill("locked_out_user")
		await page.locator("[data-test='password']").fill("secret_sauce")
		await page.getByText("LOGIN").click()
		await expect(page.locator("[data-test='error']")).toBeVisible()
		await expect(page.locator("[data-test='error']")).toHaveText(
			"Epic sadface: Sorry, this user has been locked out."
		)
	})

	test("user logs in with no password", async ({ page }) => {
		await page.locator("[data-test='username']").fill("standard_user")
		await page.getByText("LOGIN").click()
		await expect(page.locator("[data-test='error']")).toBeVisible()
		await expect(page.locator("[data-test='error']")).toHaveText(
			"Epic sadface: Password is required"
		)
	})

	test("user submits empty form", async ({ page }) => {
		await page.getByText("LOGIN").click()
		await expect(page.locator("[data-test='error']")).toBeVisible()
		await expect(page.locator("[data-test='error']")).toHaveText(
			"Epic sadface: Username is required"
		)
	})

	test("user logs in with incorrect password", async ({ page }) => {
		await page.locator("[data-test='username']").fill("standard_user")
		await page.locator("[data-test='password']").fill("incorrect_password")
		await page.getByText("LOGIN").click()
		await expect(page.locator("[data-test='error']")).toBeVisible()
		await expect(page.locator("[data-test='error']")).toHaveText(
			"Epic sadface: Username and password do not match any user in this service"
		)
	})
	test.afterEach(async ({ page }) => {
		await expect(page).toHaveURL("https://www.saucedemo.com/v1/index.html")
	})
})
