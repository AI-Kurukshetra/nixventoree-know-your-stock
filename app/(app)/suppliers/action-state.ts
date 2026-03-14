export type SupplierActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialSupplierState: SupplierActionState = {
  status: "idle"
};
