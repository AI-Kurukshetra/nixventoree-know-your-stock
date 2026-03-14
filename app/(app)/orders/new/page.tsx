import { OrderCreateForm } from "@/components/orders/order-create-form";
import { getOrderFormOptions } from "@/lib/repositories/ops";

export default async function NewOrderPage() {
  const options = await getOrderFormOptions();

  return <OrderCreateForm customers={options.customers} variants={options.variants} />;
}
