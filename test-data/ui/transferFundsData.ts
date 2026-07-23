export const transferFundsData = {
  validTransfer: {
    amount: "100",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },

  emptyAmount: {
    amount: "",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },

  zeroAmount: {
    amount: "0",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },

  negativeAmount: {
    amount: "-100",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },

  invalidAmount: {
    amount: "abc",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },

  largeAmount: {
    amount: "999999999",
    fromAccountIndex: 0,
    toAccountIndex: 0,
  },
};

export const transferFundsTestCases = [
  {
    scenario: "TC_TRANSFER_001 - User should transfer funds successfully",
    type: "success",
    data: transferFundsData.validTransfer,
    expectedResult: "Transfer complete message should be displayed",
  },
  {
    scenario: "TC_TRANSFER_002 - Transfer with empty amount",
    type: "validation",
    data: transferFundsData.emptyAmount,
    expectedResult: "Amount validation error should be displayed",
  },
  {
    scenario: "TC_TRANSFER_003 - Transfer with invalid amount",
    type: "invalidData",
    data: transferFundsData.invalidAmount,
    expectedResult: "System should reject invalid amount or handle it safely",
  },
  {
    scenario: "TC_TRANSFER_004 - Transfer with negative amount",
    type: "invalidData",
    data: transferFundsData.negativeAmount,
    expectedResult: "System should reject negative amount or handle it safely",
  },
  {
    scenario: "TC_TRANSFER_005 - Transfer with zero amount",
    type: "invalidData",
    data: transferFundsData.zeroAmount,
    expectedResult: "System should reject zero amount or handle it safely",
  },
  {
    scenario: "TC_TRANSFER_006 - Transfer with very large amount",
    type: "invalidData",
    data: transferFundsData.largeAmount,
    expectedResult: "System should reject unrealistic amount or handle it safely",
  },
];