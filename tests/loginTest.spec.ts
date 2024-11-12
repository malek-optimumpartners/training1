import { test, expect } from "@playwright/test";
import LoginPage from "../tests/loginPage";
import DashboardPage from "../tests/dashboardPage";
import { SharedContext } from "../tests/sharedContext";



test("user_login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const sharedContext = new SharedContext();

  const loginPage = new LoginPage(page);
  let dashboardPage = new DashboardPage(page);
  var loggedUser = "",
    loggedPassword = "";

  // Add New Employee with Login Details
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee"
  );
  for (let index = 0; index < loginPage.credentialList.length; index++) {
    const element = loginPage.credentialList[index];
    const passwordValidation = validatePassword(element.passWord);
    if (passwordValidation) {
      await loginPage.usernameTextBox.fill(element.userName);
      await loginPage.passwordTextBox.fill(element.passWord);
      await Promise.all([
        page.waitForNavigation(),
        await loginPage.loginButton.click(),
      ]);
      if (element.credentialState == "fail") {
        await expect(loginPage.invalidCredential).toHaveText(
          "Invalid credentials"
        );
      } else {
        await expect(dashboardPage.bannerTitle).toHaveText("PIM");
      }
    }
  } //end of the for loop for passwords
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
  await dashboardPage.employeeSearchButton.click();
  await dashboardPage.employeeDeleteButton.click();
  await dashboardPage.employeeDeleteConfirmation.click();
});

function validatePassword(password: string): boolean {
  // Regex explanation:
  // ^ asserts the start of the string
  // (?=.*[a-z]) checks for at least one lowercase letter
  // (?=.*\d) checks for at least one digit
  // [A-Za-z\d@$!%*?&]{8,} ensures the password is at least 8 characters long
  // $ asserts the end of the string

  const regex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}
