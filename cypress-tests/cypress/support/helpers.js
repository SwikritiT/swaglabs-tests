const baseUrl = "https://www.saucedemo.com/v1/index.html"
export function login(username, password) {
	cy.visit(baseUrl)
	cy.get(".login_logo").should("be.visible")
	cy.get("[data-test='username']").type(username)
	cy.get("[data-test='password']").type(password)
	cy.contains("LOGIN").click()
	cy.get(".inventory_container").should("be.visible")
}

export function teardown() {
	cy.contains("Open Menu").click()
	cy.contains("Reset App State").click()
	cy.contains("Logout").click()
	cy.url().should("eq", baseUrl)
	cy.clearCookies()
}

export function addItemsToCart(items) {
	for (let item of items) {
		cy.get(".inventory_item")
			.find(".inventory_item_name")
			.contains(item)
			.parent()
			.parent()
			.parent()
			.find(".pricebar")
			.find(".btn_primary")
			.contains("ADD TO CART")
			.click()
	}
	cy.get(".shopping_cart_container").contains(items.length)
}

export function checkout(firstName, lastName, postalCode) {
	cy.get(".shopping_cart_link").click()
	cy.contains("CHECKOUT").click()
	cy.get("[data-test='firstName']").type(firstName)
	cy.get("[data-test='lastName']").type(lastName)
	cy.get("[data-test='postalCode']").type(postalCode)
	cy.contains("CONTINUE").click()
	cy.contains("Checkout: Overview").should("be.visible")
	cy.contains("FINISH").click()
	cy.contains("THANK YOU FOR YOUR ORDER").should("be.visible")
}
