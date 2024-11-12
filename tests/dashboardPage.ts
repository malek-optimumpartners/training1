import { Page, Locator } from "@playwright/test";

export default class DashboardPage {
  pageDomain: Page;

  firstNameText: string = "Malek";
  lastNameText: string = "Tubaishat";
  middleNameText: string = "abdel";
  employeeID: string;

  bannerTitle: Locator;
  firstNameTextBox: Locator;
  middleNameTextBox: Locator;
  lastNameTextBox: Locator;
  submitButton: Locator;
  employeeTitle: Locator;
  employeeIDTextBox: Locator;
  employeeIDTextBoxInEmployeeList: Locator;
  employeeListButton: Locator;
  employeeSearchButton: Locator;
  employeeDeleteButton: Locator;
  employeeDeleteConfirmation: Locator;

  constructor(pageDomain: Page) {
    if (pageDomain != null) {
      this.pageDomain = pageDomain;
      this.employeeID = this.getRandomSixDigitNumber().toString();
      this.initializeLocators();
    }
  }

  async initializeLocators() {
    try {
      this.bannerTitle = this.pageDomain.locator(
        "span.oxd-topbar-header-breadcrumb"
      );
      this.firstNameTextBox = this.pageDomain.locator(
        "input[name='firstName']"
      );
      this.middleNameTextBox = this.pageDomain.locator(
        "input[name='middleName']"
      );
      this.lastNameTextBox = this.pageDomain.locator("input[name='lastName']");
      this.submitButton = this.pageDomain.locator("button[type='submit']");
      this.employeeTitle = this.pageDomain.locator(
        "div.orangehrm-edit-employee-name > h6"
      );
      this.employeeIDTextBox = this.pageDomain.locator(
        "div.oxd-grid-2>div>div>div:nth-of-type(2)>input"
      );
      this.employeeIDTextBoxInEmployeeList = this.pageDomain.locator(
        "div.oxd-form-row>div>div:nth-of-type(2)>div>div:nth-of-type(2)>input"
      );
      this.employeeListButton = this.pageDomain.locator(
        "li.oxd-topbar-body-nav-tab.--visited>a.oxd-topbar-body-nav-tab-item"
      );
      this.employeeSearchButton = this.pageDomain.locator(
        "button[type='submit']"
      );
      this.employeeDeleteButton = this.pageDomain.locator(
        "i.oxd-icon.bi-trash"
      );
      this.employeeDeleteConfirmation=this.pageDomain.locator("button.orangehrm-button-margin.oxd-button--label-danger");
    } catch (error) {
      console.error("Initialize locators error", error);
    }
  }

  getRandomSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
