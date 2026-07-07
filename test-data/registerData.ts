export type RegisterUser = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export function generateNewUser(): RegisterUser {
  const randomText = Math.random().toString(36).substring(2, 10);

  return {
    firstName: `fn${randomText}`,
    lastName: `ln${randomText}`,
    address: `${randomText} Street`,
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00100",
    phone: "0712345678",
    ssn: randomText,
    username: `u${randomText}`,
    password: "Password123",
    confirmPassword: "Password123",
  };
}
export function generateUserWithPasswordMismatch(): RegisterUser {
  const randomText = Math.random().toString(36).substring(2, 10);

  return {
    firstName: `fn${randomText}`,
    lastName: `ln${randomText}`,
    address: `${randomText} Road`,
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00100",
    phone: "0723456789",
    ssn: randomText,
    username: `m${randomText}`,
    password: "Password123",
    confirmPassword: "Password456",
  };
}

export const duplicateUsernameUser: RegisterUser = {
  firstName: "John",
  lastName: "Demo",
  address: "123 Demo Street",
  city: "Nairobi",
  state: "Nairobi",
  zipCode: "00100",
  phone: "0711111111",
  ssn: "123456789",
  username: "john",
  password: "Password123",
  confirmPassword: "Password123",
};

export const invalidRegistrationData = {
  emptyUser: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    ssn: "",
    username: "",
    password: "",
    confirmPassword: "",
  },

  specialCharacterUser: {
    firstName: "@#$%",
    lastName: "%^&*",
    address: "!!! ### Street",
    city: "@@@",
    state: "###",
    zipCode: "abcde",
    phone: "abcdef",
    ssn: "invalidssn",
    username: `special_user_${Date.now()}`,
    password: "Password123",
    confirmPassword: "Password123",
  },
};

export const registerTestCases = [
  {
    scenario: "TC_AUTH_REGISTER_001 - User should register successfully",
    type: "success",
    userFactory: generateNewUser,
    expectedResult:
      "Registration should be successful and welcome message should be displayed",
  },
  {
    scenario:
      "TC_AUTH_REGISTER_002 - Required field errors should display when form is empty",
    type: "required",
    userFactory: () => invalidRegistrationData.emptyUser,
    expectedResult: "Required field validation messages should be displayed",
  },
  {
    scenario: "TC_AUTH_REGISTER_003 - Password mismatch should show error",
    type: "passwordMismatch",
    userFactory: generateUserWithPasswordMismatch,
    expectedResult: "Password mismatch error should be displayed",
  },
  {
    scenario: "TC_AUTH_REGISTER_004 - Duplicate username should show error",
    type: "duplicateUsername",
    userFactory: () => duplicateUsernameUser,
    expectedResult: "Username already exists error should be displayed",
  },
  {
    scenario:
      "TC_AUTH_REGISTER_005 - Invalid special character data should be handled safely",
    type: "invalidData",
    userFactory: () => invalidRegistrationData.specialCharacterUser,
    expectedResult:
      "Registration should not succeed or system should handle input safely",
  },
];
