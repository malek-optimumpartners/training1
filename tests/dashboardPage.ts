import { Page } from "@playwright/test";
import { LocatorsList } from "./locatorsList";

export default class DashboardPage extends LocatorsList {
  pageDomain: Page;

  regexFormat = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  firstNameText: string = "Malek";
  lastNameText: string = "Tubaishat";
  middleNameText: string = "abdel";
  employeeID: string;


  constructor(pageDomain: Page) {
      super(pageDomain);
    this.pageDomain = pageDomain;
      this.employeeID = this.getRandomSixDigitNumber().toString();
      this.addAll({
        "bannerTitle":"span.oxd-topbar-header-breadcrumb",
        "firstNameTextBox":"input[name='firstName']",
        "middleNameTextBox":"input[name='middleName']",
        "lastNameTextBox":"input[name='lastName']",
        "submitButton":"button[type='submit']",
        "employeeTitle":"div.orangehrm-edit-employee-name > h6",
        "employeeIDTextBox":"div.oxd-grid-2>div>div>div:nth-of-type(2)>input",
        "employeeIDTextBoxInEmployeeList":"div.oxd-form-row>div>div:nth-of-type(2)>div>div:nth-of-type(2)>input",
        "employeeListButton":"li.oxd-topbar-body-nav-tab.--visited>a.oxd-topbar-body-nav-tab-item",
        "employeeSearchButton":"button[type='submit']",
        "employeeDeleteButton":"i.oxd-icon.bi-trash",
        "employeeDeleteConfirmation":"button.orangehrm-button-margin.oxd-button--label-danger"
    });

  }


  getRandomSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
