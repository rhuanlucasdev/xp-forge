export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* placeholder de sidebar por enquanto */}
      <aside className="hidden md:flex w-64 border-r bg-muted/30 p-4">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-muted-foreground">Tools</h2>

          <nav className="space-y-1">
            <div className="px-3 py-2 rounded-md bg-primary/10 font-medium">
              Calculator
            </div>
            <div className="px-3 py-2 rounded-md text-muted-foreground">
              Tracker (comming soon)
            </div>
          </nav>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
