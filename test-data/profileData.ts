export const profileUpdateData = {
  validProfileUpdate: {
    firstName: "Irene",
    lastName: "Updated",
    address: "789 Kilimani Avenue",
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00200",
    phone: "0798765432",
  },

  emptyProfileUpdate: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  },

  invalidPhoneProfileUpdate: {
    firstName: "Irene",
    lastName: "PhoneTest",
    address: "456 Westlands Road",
    city: "Nairobi",
    state: "Nairobi",
    zipCode: "00800",
    phone: "abcdef",
  },

  specialCharacterProfileUpdate: {
    firstName: "@@@",
    lastName: "###",
    address: "@@@ ### Street",
    city: "@@@",
    state: "###",
    zipCode: "abcde",
    phone: "!@#$%",
  },
};

export const profileUpdateTestCases = [
  {
    scenario: "TC_PROFILE_001 - User should update contact information successfully",
    type: "success",
    data: profileUpdateData.validProfileUpdate,
    expectedResult: "Profile updated success message should be displayed",
  },
  {
    scenario: "TC_PROFILE_003 - Profile update with invalid phone number",
    type: "invalidData",
    data: profileUpdateData.invalidPhoneProfileUpdate,
    expectedResult: "System should reject invalid phone number or handle it safely",
  },
  {
    scenario: "TC_PROFILE_004 - Profile update with special character data",
    type: "invalidData",
    data: profileUpdateData.specialCharacterProfileUpdate,
    expectedResult: "System should reject invalid/special character data or handle it safely",
  },
];