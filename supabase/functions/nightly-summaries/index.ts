export default async function handler() {
  return new Response(
    JSON.stringify({
      job: "nightly-summaries",
      status: "placeholder",
      message: "Implement nightly KPI rollups and digest generation here."
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
