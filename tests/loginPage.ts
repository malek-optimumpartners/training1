import { Credential } from "./creditintial";
import { Locator, Page } from "@playwright/test";

export default class loginPage {
  private pageDomain: Page;

  usernameTextBox: Locator;
  passwordTextBox: Locator;
  loginButton: Locator;
  invalidCredential: Locator;
  credentialList: Credential[] = [
    new Credential("Admin1", "passw", "fail"),
    new Credential("Admin2", "password123", "fail"),
    new Credential("User1", "userpass", "fail"),
    new Credential("Admin", "admin123", "success"),
  ];

  constructor(pageDomain: Page) {
    this.pageDomain = pageDomain;
    this.initializeLocators();
  }

  initializeLocators() {
    this.usernameTextBox = this.pageDomain.locator("input[name='username']");
    this.passwordTextBox = this.pageDomain.locator("input[name='password']");
    this.loginButton = this.pageDomain.locator("button[type='submit']");
    this.invalidCredential = this.pageDomain.locator("p.oxd-alert-content-text");
  }
}
