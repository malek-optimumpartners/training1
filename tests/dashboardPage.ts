import { Page, Locator } from "@playwright/test";

export default class DashboardPage {
  pageDomain: Page;

  regexFormat = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  firstNameText: string = "Malek";
  lastNameText: string = "Tubaishat";
  middleNameText: string = "abdel";
  employeeID: string;
  adminUsername:string="maltub2";
  adminPassword:string="abcd1234";
  adminPasswordChange:string="abcd1234";

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
  adminButton: Locator;
  adminUsernameTextBox:Locator;
  searchButton:Locator;
  deleteButton:Locator;
  editButton:Locator;
  notificationToast:Locator;
  changePasswordCheckBox:Locator;
  changePasswordTextBox:Locator;
  changePasswordTextBoxConfirmation:Locator;
  saveButton:Locator;
  sortLastNameDropDown:Locator;
  sortLastNameAscending:Locator;
  sortLastNameDescending:Locator;
  firstElementOfLastName:Locator;
  lastElementOfLastName:Locator;
  menuPIM:Locator;

  constructor(pageDomain: Page) {
    this.pageDomain = pageDomain;
      this.employeeID = this.getRandomSixDigitNumber().toString();

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
      this.employeeDeleteConfirmation = this.pageDomain.locator(
        "button.orangehrm-button-margin.oxd-button--label-danger"
      );
      this.adminButton = this.pageDomain.locator(
        'a[href="/web/index.php/admin/viewAdminModule"]'
      );
      this.adminUsernameTextBox=this.pageDomain.locator('input.oxd-input--active[data-v-1f99f73c]:first-child');
      this.searchButton=this.pageDomain.locator("button[type='submit']");
      this.deleteButton=this.pageDomain.locator("i.bi-trash");
      this.editButton=this.pageDomain.locator("i.bi-pencil-fill");
      this.notificationToast=this.pageDomain.locator("p.oxd-text--toast-title");
      this.changePasswordCheckBox=this.pageDomain.locator('label[data-v-6179b72a]');
      this.changePasswordTextBox=this.pageDomain.locator(' div.oxd-grid-item.oxd-grid-item--gutters.user-password-cell > div > div:nth-child(2) > input');
      this.changePasswordTextBoxConfirmation=this.pageDomain.locator(' div.oxd-form-row.user-password-row > div > div:nth-child(2) > div > div:nth-child(2) > input');
      this.saveButton=this.pageDomain.locator('form > div.oxd-form-actions > button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space');
      this.sortLastNameDropDown=this.pageDomain.locator('div:nth-of-type(4) > div > i');
      this.sortLastNameAscending=this.pageDomain.locator('div.orangehrm-container div:nth-of-type(4) li:nth-of-type(1)');
      this.sortLastNameDescending=this.pageDomain.locator('div:nth-of-type(4) li:nth-of-type(2) > span');
      this.firstElementOfLastName=this.pageDomain.locator('div.oxd-table-body > div:nth-of-type(1) div:nth-of-type(4) > div');
      this.lastElementOfLastName=this.pageDomain.locator('div:nth-of-type(50) div:nth-of-type(4) > div');
      this.menuPIM=this.pageDomain.locator('a[href="/web/index.php/pim/viewPimModule"]');
  }


  getRandomSixDigitNumber(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
