const puppeteer = require("puppeteer");
const faker = require('faker')
const fs = require('fs')

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://github.com/signup");

  const USERNAME_SELECTOR = "#user_login";
  const EMAIL_SELECTOR = "#user_email";
  const PASS_SELECTOR = "#user_password";
  const CREATE_ACCOUNT_BTN_SELECTOR = "#signup_button";
  const CONTINUE_BTN_SELECTOR =
    "#js-pjax-container > div > div.setup-main > div > form > div.SignUpContinueActions > button";
  const SUBMIT_BTN_SELECTOR =
    "#js-pjax-container > div > div.setup-main.user-identification-questions > div > form > input.btn.btn-primary";
	const STAR_REPO_SELECTOR = '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > ul > li:nth-child(2) > div > form.unstarred.js-social-form > button'
	const WATCH_REPO_SELECTOR = '#js-repo-pjax-container > div.pagehead.repohead.instapaper_ignore.readability-menu.experiment-repo-nav > div > ul > li:nth-child(1) > form > div > a.btn.btn-sm.btn-with-count.select-menu-button.js-menu-target'

	const creds = {
		username: faker.name.firstName() + '13123',
		email: faker.internet.email(),
		password: faker.internet.password()
	}

	fs.appendFile('creds.txt', JSON.stringify(creds) + '\n', function (err) {return})

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type(creds.username);

  await page.click(EMAIL_SELECTOR);
  await page.keyboard.type(creds.email);

  await page.click(PASS_SELECTOR);
  await page.keyboard.type(creds.password);

  await page.click(CREATE_ACCOUNT_BTN_SELECTOR);

  await page.waitForNavigation();

	await page.click(CONTINUE_BTN_SELECTOR);
	
	await page.waitForNavigation()

	await page.click(SUBMIT_BTN_SELECTOR)

	await page.waitForNavigation()

	await page.goto('https://github.com/noobling/cs50')
	await page.waitFor(2 * 1000)

	await page.click(STAR_REPO_SELECTOR)
	await page.click(WATCH_REPO_SELECTOR)	
}

run();
