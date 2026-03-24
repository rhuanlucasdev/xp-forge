export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-background">{children}</main>;
}
