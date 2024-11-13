import { Page,Locator } from "@playwright/test";

export default class loginPage {
  private pageDomain: Page;

  usernameTextBox: Locator;
  passwordTextBox: Locator;
  loginButton: Locator;
  invalidCredential: Locator;

  constructor(pageDomain: Page) {
    this.pageDomain = pageDomain;
    this.usernameTextBox = this.pageDomain.locator("input[name='username']");
    this.passwordTextBox = this.pageDomain.locator("input[name='password']");
    this.loginButton = this.pageDomain.locator("button[type='submit']");
    this.invalidCredential = this.pageDomain.locator("p.oxd-alert-content-text");
  }
}
