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
    "web/index.php/pim/addEmployee"
  );
  for (let index = 0; index < loginPage.credentialList.length; index++) {
    const element = loginPage.credentialList[index];
    const passwordValidation = validatePassword(element.passWord,dashboardPage.regexFormat);
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
        await expect(dashboardPage.get("bannerTitle")).toHaveText("PIM");
      }
    }
  } //end of the for loop for passwords
  await dashboardPage.get("firstNameTextBox").fill(dashboardPage.firstNameText);
  await dashboardPage.get("middleNameTextBox").fill(dashboardPage.middleNameText);
  await dashboardPage.get("lastNameTextBox").fill(dashboardPage.lastNameText);
  await dashboardPage.get("employeeIDTextBox").fill(dashboardPage.employeeID);

  await Promise.all([
    page.waitForNavigation(),
    dashboardPage.get("submitButton").click(),
  ]);

  // Ensure that the new employee is saved in the system and their login credentials are valid
  await expect(dashboardPage.get("employeeTitle")).toHaveText(
    dashboardPage.firstNameText + " " + dashboardPage.lastNameText
  );

  // Store the newly created employee data in the shared context object
  sharedContext.newEmployee.credentials.username = loggedUser;
  sharedContext.newEmployee.credentials.password = loggedPassword;

  //Data Cleanup
  //click on employee list
  await Promise.all([
    dashboardPage.get("employeeListButton").click(),
    page.waitForNavigation(),
  ]);
  await dashboardPage.get("employeeIDTextBoxInEmployeeList").fill(
    dashboardPage.employeeID
  );

  //search for the employee
  await dashboardPage.get("employeeSearchButton").highlight();
  await dashboardPage.get("employeeSearchButton").hover();
  await dashboardPage.get("employeeSearchButton").focus();
  await dashboardPage.get("employeeSearchButton").click();
  await page.waitForTimeout(1000);
  await dashboardPage.get("employeeDeleteButton").click();
  await dashboardPage.get("employeeDeleteConfirmation").click();
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
function validatePassword(password: string,regExpFormat:RegExp): boolean {
  return regExpFormat.test(password);
}
