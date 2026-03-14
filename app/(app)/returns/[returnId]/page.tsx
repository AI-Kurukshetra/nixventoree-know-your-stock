import { PlaceholderPage } from "@/components/shared/placeholder-page";

type ReturnDetailPageProps = {
  params: Promise<{ returnId: string }>;
};

export default async function ReturnDetailPage({ params }: ReturnDetailPageProps) {
  const { returnId } = await params;

  return <PlaceholderPage eyebrow="After-sales" title={`Return ${returnId}`} description="Add inspection outcomes, line-level resolutions, and refund status here." />;
}