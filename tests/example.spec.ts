import { test, expect, Locator } from '@playwright/test';
import LoginPage from "../tests/login_page";
import DashboardPage from "../tests/dashboard_page";
import {SharedContext} from "../tests/shared_context";

// Define SharedContext class outside of the test to make it accessible globally


test('user_login', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const sharedContext = new SharedContext();

  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();

  // Add New Employee with Login Details
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  
  await page.fill(loginPage.usernameTextBox, loginPage.username);
  await page.fill(loginPage.passwordTextBox, loginPage.password);
  await page.click(loginPage.loginButton);

  await expect(page.locator(dashboardPage.bannerTitle)).toHaveText('PIM');

  await page.fill(dashboardPage.firstNameTextBox, dashboardPage.firstNameText);
  await page.fill(dashboardPage.middleNameTextBox, dashboardPage.middleNameText);
  await page.fill(dashboardPage.lastNameTextBox, dashboardPage.lastNameText);
  
  await Promise.all([
    page.waitForNavigation(),
    page.click(dashboardPage.submitButton)
  ]);

  // Ensure that the new employee is saved in the system and their login credentials are valid
  const empTitle: Locator = page.locator(dashboardPage.employeeTitle);
  await expect(empTitle).toHaveText(dashboardPage.firstNameText + ' ' + dashboardPage.lastNameText);

  // Store the newly created employee data in the shared context object
  const url = await page.url();  
  const id = url.split('/').pop();
  sharedContext.newEmployee.id = id;  
  sharedContext.newEmployee.credentials.username = loginPage.username;
  sharedContext.newEmployee.credentials.password = loginPage.password;

  // loging it
  console.log(sharedContext.newEmployee);
});
