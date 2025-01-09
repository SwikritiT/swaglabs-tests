This repo contains end-to-end tests in a TDD style using both frameworks for the [Swaglabs V1 demo website](https://www.saucedemo.com/v1/index.html).

I created three test files for each framework, covering the following functionalities:

- Logging in
- Adding items to the cart
- Checking out

## Running the test

### Cypress

```bash
$ cd cypress-tests
$ npm install
$ npm run cy:open
```

This will result into Cypress dashboard to be opened, through which you can run end-to-end tests of desired test suite.

Alternatively, after opening the dashboard, you can run following command in the terminal to run tests directly from terminal which will run tests in headless mode

```bash
$ npm run cy:run
```

To run tests in headed mode from terminal
```bash
$ npm run cy:run:headed
```

### Playwright

```bash
$ cd playwright-tests
$ npm install
$ npm run pw:run
```

This will run tests in chrome in headless mode.

To run tests in headed mode

```bash
$ npm run pw:run:headed
```
