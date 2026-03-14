export type ProductActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialProductState: ProductActionState = {
  status: "idle"
};
