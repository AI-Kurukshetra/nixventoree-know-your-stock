import { ProductCreateForm } from "@/components/products/product-create-form";
import { getProductFormOptions } from "@/lib/repositories/ops";

export default async function NewProductPage() {
  const options = await getProductFormOptions();

  return <ProductCreateForm categories={options.categories} suppliers={options.suppliers} warehouses={options.warehouses} />;
}
