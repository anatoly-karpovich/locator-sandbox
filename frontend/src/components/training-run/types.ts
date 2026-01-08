export const CHECK_STATUS = {
  Pending: "Pending",
  Pass: "Passed",
  Fail: "Failed",
} as const;

export type CheckStatus = (typeof CHECK_STATUS)[keyof typeof CHECK_STATUS];

export type CheckState = {
  key: string;
  expected: unknown;
  actual: unknown;
  status: CheckStatus;
};
