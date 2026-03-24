export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* HEADER (futuramente) */}
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">XP Forge</h1>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-purple-500/10" />

        {/* Content */}
        <div className="relative z-10 w-full flex justify-center px-4">
          {children}
        </div>
      </main>
    </div>
  );
}
