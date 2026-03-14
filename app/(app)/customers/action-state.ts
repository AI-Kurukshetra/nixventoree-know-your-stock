export type CustomerActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialCustomerState: CustomerActionState = {
  status: "idle"
};
