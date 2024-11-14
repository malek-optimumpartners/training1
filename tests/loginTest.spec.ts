import { test, expect } from "@playwright/test";
import LoginPage from "../tests/loginPage";
import DashboardPage from "../tests/dashboardPage";
import { SharedContext } from "../tests/sharedContext";
import { users } from "../tests/users";

test("user_login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const sharedContext = new SharedContext();

  const loginPage = new LoginPage(page);
  let dashboardPage = new DashboardPage(page);
  var loggedUser = "",
    loggedPassword = "";

  // Add New Employee with Login Details
  await page.goto("/web/index.php/pim/addEmployee");

  for (const [key, { userName, passWord, status }] of Object.entries(users)) {
    const passwordValidation = validatePassword(
      passWord,
      dashboardPage.regexFormat
    );
    if (passwordValidation) {
      await loginPage.usernameTextBox.fill(userName);
      await loginPage.passwordTextBox.fill(passWord);
      await Promise.all([
        page.waitForNavigation(),
        await loginPage.loginButton.click(),
      ]);
      if (status == "fail") {
        await expect(loginPage.invalidCredential).toHaveText(
          "Invalid credentials"
        );
      } else {
        await expect(dashboardPage.bannerTitle).toHaveText("PIM");
      }
    }
  }

  await dashboardPage.firstNameTextBox.fill(dashboardPage.firstNameText);
  await dashboardPage.middleNameTextBox.fill(dashboardPage.middleNameText);
  await dashboardPage.lastNameTextBox.fill(dashboardPage.lastNameText);
  await dashboardPage.employeeIDTextBox.fill(dashboardPage.employeeID);

  await Promise.all([
    page.waitForNavigation(),
    dashboardPage.submitButton.click(),
  ]);

  // Ensure that the new employee is saved in the system and their login credentials are valid
  await expect(dashboardPage.employeeTitle).toHaveText(
    dashboardPage.firstNameText + " " + dashboardPage.lastNameText
  );

  // Store the newly created employee data in the shared context object
  sharedContext.newEmployee.credentials.username = loggedUser;
  sharedContext.newEmployee.credentials.password = loggedPassword;

  //Data Cleanup
  //click on employee list
  await Promise.all([
    dashboardPage.employeeListButton.click(),
    page.waitForNavigation(),
  ]);
  await dashboardPage.employeeIDTextBoxInEmployeeList.fill(
    dashboardPage.employeeID
  );

  //search for the employee
  await dashboardPage.employeeSearchButton.focus();
  await dashboardPage.employeeSearchButton.hover();
  await dashboardPage.employeeSearchButton.click();
  await dashboardPage.employeeDeleteButton.click();
  await dashboardPage.employeeDeleteConfirmation.click();
});
/*
Part two


Pre-steps:

Create an admin user by a super admin user.
Test Cases:

1. Self-Deletion Restriction:
    a. Verify that the newly created admin user cannot delete themselves from the system.
    b. Ensure that the admin user's deletion attempt is denied with an appropriate error message.

2. Password Change by Super Admin:
    a. Verify that the super admin user can successfully change the password for the newly created admin user.
    b. Ensure that the password change is reflected in the system and the newly created admin user can log in with the updated password.


OrangeHRM
https://opensource-demo.orangehrmlive.com
using Playwright 
3. Test sorting functionality based on market cap
    a. by market cap (ascending).
    b. by market cap (descending).
    c. by market cap (default).

4. Verify conditional formatting of percentage change in the last 1 hour (1H) column.
    a. Green for positive values.
    b. Red for negative values.
    c. Black for zero values.
*/
test("Self-Deletion", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //point 1:
  //login as admin
  const loginPage = new LoginPage(page);
  let dashboardPage = new DashboardPage(page);
  await page.goto("/web/index.php/pim/addEmployee");
  await loginPage.usernameTextBox.fill(dashboardPage.adminUsername);
  await loginPage.passwordTextBox.fill(dashboardPage.adminPassword);
  await loginPage.loginButton.hover();
  await loginPage.loginButton.click();
  //to click on admin button
  await dashboardPage.adminButton.hover();
  await dashboardPage.adminButton.click();
  //to search for username maltub2
  //fill username textbox
  await dashboardPage.adminUsernameTextBox.fill(dashboardPage.adminUsername);
  //click on search button
  await dashboardPage.searchButton.hover();
  await dashboardPage.searchButton.click();
  await page.waitForTimeout(1000);
  //try to delete
  await dashboardPage.deleteButton.hover();
  await dashboardPage.deleteButton.click();

  //check message that deletion invalid
  let count: number = 0;
  while (count < 10) {
    await page.waitForTimeout(100);
    const str: string =
      (await dashboardPage.notificationToast.textContent()) ?? "";
    if (str != "<element(s) not found>") {
      await expect(str).toBe("Error");
      break;
    }
    count++;
  }

  //point 2:
  //click on edit user
  await Promise.all([
    await dashboardPage.editButton.hover(),
    await dashboardPage.editButton.click(),
    //await page.waitForNavigation(),
  ]);

  //check box of change password?
  await dashboardPage.changePasswordCheckBox.hover();
  await dashboardPage.changePasswordCheckBox.focus();
  await dashboardPage.changePasswordCheckBox.click();
  await dashboardPage.changePasswordCheckBox.isVisible();
  //fill password and the confirmation
  await dashboardPage.changePasswordTextBox.hover();
  await dashboardPage.changePasswordTextBox.focus();
  await dashboardPage.changePasswordTextBox.click();
  await dashboardPage.changePasswordTextBox.fill(dashboardPage.adminPasswordChange);
  await dashboardPage.changePasswordTextBoxConfirmation.fill(dashboardPage.adminPasswordChange);
  //click on save
  await dashboardPage.saveButton.hover();
  await dashboardPage.saveButton.click();
  count  = 0;
  //wait for the message confirmation
  while (count < 10) {
    await page.waitForTimeout(100);
    const str: string =
      (await dashboardPage.notificationToast.textContent()) ?? "";
    if (str != "<element(s) not found>") {
      await expect(str).toBe("Success");
      break;
    }
    count++;
  }
});

test("sorting", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  //point 3:
  //login as admin
  const loginPage = new LoginPage(page);
  let dashboardPage = new DashboardPage(page);
  await page.goto("/");

  await loginPage.usernameTextBox.fill(users.user4.userName);
  await loginPage.passwordTextBox.fill(users.user4.passWord);
  await loginPage.loginButton.hover();
  await loginPage.loginButton.click();
  await dashboardPage.menuPIM.click();
  //Sort ascending
  await dashboardPage.sortLastNameDropDown.click();
  await dashboardPage.sortLastNameAscending.click();
  const firstLastName:String=await dashboardPage.firstElementOfLastName.textContent()??"";
  const lastLastName:String=await dashboardPage.lastElementOfLastName.textContent()??"";
  await expect(lastLastName>firstLastName).toBeTruthy();
  //Sort descending
  await dashboardPage.sortLastNameDropDown.click();
  await dashboardPage.sortLastNameDescending.click();
  const firstLastName2:String=await dashboardPage.firstElementOfLastName.textContent()??"";
  const lastLastName2:String=await dashboardPage.lastElementOfLastName.textContent()??"";
  await expect(lastLastName2<firstLastName2).toBeTruthy();
  
});

/**
 * Regex explanation:
   ^ asserts the start of the string
   (?=.*[a-z]) checks for at least one lowercase letter
  (?=.*\d) checks for at least one digit
   [A-Za-z\d@$!%*?&]{8,} ensures the password is at least 8 characters long
   $ asserts the end of the string
   @param password - the password to be used to validate it
   @param regExpFormat - the regex to be used to check validation
 */
function validatePassword(password: string, regExpFormat: RegExp): boolean {
  return regExpFormat.test(password);
}
