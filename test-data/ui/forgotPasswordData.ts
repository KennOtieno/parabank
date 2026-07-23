export const forgotPasswordData = {
  validCustomerInfo: {
    firstName: "John",
    lastName: "Demo",
    address: "123 Demo Street",
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00100",
    ssn: "12345678",
  },

  emptyCustomerInfo: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    ssn: "",
  },

  invalidCustomerInfo: {
    firstName: "Wrong",
    lastName: "User",
    address: "Unknown Street",
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00100",
    ssn: "000000000",
  },

  partialCustomerInfo: {
    firstName: "John",
    lastName: "",
    address: "123 Main St",
    city: "",
    state: "CA",
    zipCode: "",
    ssn: "123-45-6789",
  },

  specialCharacterCustomerInfo: {
    firstName: "@@@",
    lastName: "###",
    address: "!!! ### Street",
    city: "@@@",
    state: "###",
    zipCode: "abcde",
    ssn: "!@#$%",
  },

  sqlInjectionCustomerInfo: {
    firstName: "' OR '1'='1",
    lastName: "' OR '1'='1",
    address: "' OR '1'='1",
    city: "' OR '1'='1",
    state: "' OR '1'='1",
    zipCode: "' OR '1'='1",
    ssn: "' OR '1'='1",
  },

  xssCustomerInfo: {
    firstName: '<script>alert("xss")</script>',
    lastName: '<script>alert("xss")</script>',
    address: '<script>alert("xss")</script>',
    city: '<script>alert("xss")</script>',
    state: '<script>alert("xss")</script>',
    zipCode: '<script>alert("xss")</script>',
    ssn: '<script>alert("xss")</script>',
  },
};

export const forgotPasswordTestCases = [
  {
    scenario:
      "TC_FORGOT_LOGIN_001 - Recover login information with valid customer details",
    type: "success",
    data: forgotPasswordData.validCustomerInfo,
    expectedResult: "Customer login information should be displayed",
  },
  {
    scenario:
      "TC_FORGOT_LOGIN_002 - Recover login information with empty required fields",
    type: "validation",
    data: forgotPasswordData.emptyCustomerInfo,
    expectedResult: "Required field validation messages should be displayed",
  },
  {
    scenario:
      "TC_FORGOT_LOGIN_003 - Recover login information with invalid customer details",
    type: "notFound",
    data: forgotPasswordData.invalidCustomerInfo,
    expectedResult:
      "Customer information not found message should be displayed",
  },
  {
    scenario:
      "TC_FORGOT_LOGIN_004 - Recover login information with partial customer details",
    type: "partialValidation",
    data: forgotPasswordData.partialCustomerInfo,
    expectedResult:
      "Required field validation messages should be displayed for missing fields",
  },

  {
    scenario:
      "TC_FORGOT_LOGIN_005 - Recover login information with special character data",
    type: "invalidData",
    data: forgotPasswordData.specialCharacterCustomerInfo,
    expectedResult: "System should reject invalid data or handle it safely",
  },
  {
    scenario:
      "TC_FORGOT_LOGIN_SECURITY_001 - Recover login information with SQL injection input",
    type: "security",
    data: forgotPasswordData.sqlInjectionCustomerInfo,
    expectedResult:
      "System should reject SQL injection input without exposing server errors",
  },
  {
    scenario:
      "TC_FORGOT_LOGIN_SECURITY_002 - Recover login information with XSS input",
    type: "security",
    data: forgotPasswordData.xssCustomerInfo,
    expectedResult:
      "System should not execute script and should handle input safely",
  },
];
