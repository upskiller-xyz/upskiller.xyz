export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-primary)] px-6 text-center">
      <h1 className="text-5xl font-bold text-[var(--color-text-light)]">
        LUX LIVE
      </h1>
      <p className="max-w-md text-lg text-[var(--color-secondary-light)]">
        Near-real-time daylight analysis for Revit and IFC workflows.
      </p>
      <a
        href="https://docs.google.com/forms/d/19p6IUGgH7YBV7W9smQDx1ISpL2WiRiKaHgJDGndTj1M/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 rounded bg-[var(--color-secondary)] px-8 py-3 font-bold text-[var(--color-text-dark)] transition-colors duration-200 hover:bg-[var(--color-accent)]"
      >
        Try Now
      </a>
    </main>
  );
}
