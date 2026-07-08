export const existingUser = {
  username: "john",
  password: "demo",
};

export const invalidLoginData = {
  invalidUsernameValidPassword: {
    username: "wronguser",
    password: "demo",
  },

  validUsernameInvalidPassword: {
    username: "john",
    password: "wrongpass",
  },

  invalidUsernameInvalidPassword: {
    username: "wronguser",
    password: "wrongpass",
  },

  emptyCredentials: {
    username: "",
    password: "",
  },

  emptyUsername: {
    username: "",
    password: "demo",
  },

  emptyPassword: {
    username: "john",
    password: "",
  },

  usernameCaseSensitivity: {
    username: "JOHN",
    password: "demo",
  },

  passwordCaseSensitivity: {
    username: "john",
    password: "DEMO",
  },

  longUsername: {
    username:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    password: "demo",
  },

  longPassword: {
    username: "john",
    password:
      "Password123Password123Password123Password123Password123Password123Password123Password123",
  },

  sqlInjection: {
    username: `' OR '1'='1`,
    password: "test",
  },

  xssInput: {
    username: '<script>alert("xss")</script>',
    password: "test",
  },

  specialCharacters: {
    username: "!@#$%^&*()",
    password: "!@#$%^&*()",
  },

  spacesOnly: {
    username: "     ",
    password: "     ",
  },

  leadingTrailingSpaces: {
    username: " john ",
    password: " demo ",
  },
};

export const loginTestCases = [
  {
    scenario: "TC_AUTH_001 - Login with valid credentials",
    username: existingUser.username,
    password: existingUser.password,
    type: "success",
    expectedResult: "Accounts Overview page should be displayed",
  },
  {
    scenario: "TC_AUTH_002 - Login with invalid username and valid password",
    username: invalidLoginData.invalidUsernameValidPassword.username,
    password: invalidLoginData.invalidUsernameValidPassword.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_003 - Login with valid username and invalid password",
    username: invalidLoginData.validUsernameInvalidPassword.username,
    password: invalidLoginData.validUsernameInvalidPassword.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_004 - Login with invalid username and invalid password",
    username: invalidLoginData.invalidUsernameInvalidPassword.username,
    password: invalidLoginData.invalidUsernameInvalidPassword.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_005 - Login with empty username and password",
    username: invalidLoginData.emptyCredentials.username,
    password: invalidLoginData.emptyCredentials.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_006 - Login with empty username",
    username: invalidLoginData.emptyUsername.username,
    password: invalidLoginData.emptyUsername.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_007 - Login with empty password",
    username: invalidLoginData.emptyPassword.username,
    password: invalidLoginData.emptyPassword.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_008 - Username case sensitivity",
    username: invalidLoginData.usernameCaseSensitivity.username,
    password: invalidLoginData.usernameCaseSensitivity.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_009 - Password case sensitivity",
    username: invalidLoginData.passwordCaseSensitivity.username,
    password: invalidLoginData.passwordCaseSensitivity.password,
    type: "invalidCredentials",
    expectedResult: "Error message should be displayed",
  },
  {
    scenario: "TC_AUTH_BOUNDARY_001 - Login with very long username",
    username: invalidLoginData.longUsername.username,
    password: invalidLoginData.longUsername.password,
    type: "invalidCredentials",
    expectedResult: "System should reject login without crashing",
  },
  {
    scenario: "TC_AUTH_BOUNDARY_002 - Login with very long password",
    username: invalidLoginData.longPassword.username,
    password: invalidLoginData.longPassword.password,
    type: "invalidCredentials",
    expectedResult: "System should reject login without crashing",
  },
  {
    scenario: "TC_AUTH_SECURITY_001 - Login with SQL injection input",
    username: invalidLoginData.sqlInjection.username,
    password: invalidLoginData.sqlInjection.password,
    type: "security",
    expectedResult: "System should reject login without exposing server errors",
  },
  {
    scenario: "TC_AUTH_SECURITY_002 - Login with XSS input",
    username: invalidLoginData.xssInput.username,
    password: invalidLoginData.xssInput.password,
    type: "security",
    expectedResult: "Script should not execute and login should fail",
  },
];