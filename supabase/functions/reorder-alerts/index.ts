export default async function handler() {
  return new Response(
    JSON.stringify({
      job: "reorder-alerts",
      status: "placeholder",
      message: "Implement low-stock scan and PO suggestion generation here."
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
