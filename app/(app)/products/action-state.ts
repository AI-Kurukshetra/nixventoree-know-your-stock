export type ProductFormValues = {
  name: string;
  sku: string;
  categoryId: string;
  supplierId: string;
  warehouseId: string;
  salePrice: string;
  costPrice: string;
  reorderPoint: string;
  reorderQuantity: string;
  initialStock: string;
  brand: string;
  description: string;
};

export type ProductActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  values: ProductFormValues;
};

export const initialProductState: ProductActionState = {
  status: "idle",
  values: {
    name: "",
    sku: "",
    categoryId: "",
    supplierId: "",
    warehouseId: "",
    salePrice: "",
    costPrice: "",
    reorderPoint: "",
    reorderQuantity: "",
    initialStock: "",
    brand: "",
    description: ""
  }
};
