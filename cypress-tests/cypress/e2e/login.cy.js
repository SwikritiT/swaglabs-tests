describe("Login", () => {
	beforeEach(() => {
		cy.visit("https://www.saucedemo.com/v1/index.html")
		cy.get(".login_logo").should("be.visible")
	})
	it("normal user logs in", () => {
		cy.get("[data-test='username']").type("standard_user")
		cy.get("[data-test='password']").type("secret_sauce")
		cy.contains("LOGIN").click()
		cy.get(".inventory_container").should("be.visible")
		cy.contains("Open Menu").click()
		cy.contains("Logout").click()
	})

	it("locked out user logs in", () => {
		cy.get("[data-test='username']").type("locked_out_user")
		cy.get("[data-test='password']").type("secret_sauce")
		cy.contains("LOGIN").click()
		cy.get("[data-test='error']").should("be.visible")
		cy.contains("Epic sadface: Sorry, this user has been locked out.")
	})

	it("user logs in with no password", () => {
		cy.get("[data-test='username']").type("standard_user")
		cy.contains("LOGIN").click()
		cy.get("[data-test='error']").should("be.visible")
		cy.contains("Epic sadface: Password is required")
	})

	it("user submits empty form", () => {
		cy.contains("LOGIN").click()
		cy.get("[data-test='error']").should("be.visible")
		cy.contains("Epic sadface: Username is required")
	})

	it("user logs in with incorrect password", () => {
		cy.get("[data-test='username']").type("standard_user")
		cy.get("[data-test='password']").type("incorrect_password")
		cy.contains("LOGIN").click()
		cy.get("[data-test='error']").should("be.visible")
		cy.contains(
			"Epic sadface: Username and password do not match any user in this service"
		)
	})

	afterEach(() => {
		cy.url().should("eq", "https://www.saucedemo.com/v1/index.html")
		cy.clearCookies()
	})
})
