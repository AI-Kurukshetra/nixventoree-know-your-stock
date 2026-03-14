export type PurchaseOrderActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialPurchaseOrderState: PurchaseOrderActionState = {
  status: "idle"
};
