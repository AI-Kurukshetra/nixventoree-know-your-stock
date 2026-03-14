export type WarehouseActionState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export const initialWarehouseState: WarehouseActionState = {
  status: "idle"
};
