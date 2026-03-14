export type OrderFormValues = {
  customerId: string;
  variantId: string;
  channel: string;
  quantity: string;
  unitPrice: string;
};

export type OrderActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  values: OrderFormValues;
};

export const initialOrderState: OrderActionState = {
  status: "idle",
  values: {
    customerId: "",
    variantId: "",
    channel: "manual",
    quantity: "1",
    unitPrice: ""
  }
};
