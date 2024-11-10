write (E2E) tests to verify the functionality of adding new employees with login credentials by super admin users. The testing data should be stored in a shared context object. Additionally, optimize password validation calls to reduce server hits and add tests for the API call. Implement a mechanism to clear the created data (e.g., newly created users).
https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee

1. Add New Employee with Login Details:
a. Verify that a Admin user can successfully add a new employee by entering the required information, including login details.
b. Ensure that the new employee is saved in the system and their login credentials are valid.
c. Store the newly created employee data in the shared context object.
