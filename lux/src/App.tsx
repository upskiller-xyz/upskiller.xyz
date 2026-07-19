import { SharedButton } from "@shared/components";

const SIGNUP_FORM_URL =
  "https://docs.google.com/forms/d/19p6IUGgH7YBV7W9smQDx1ISpL2WiRiKaHgJDGndTj1M/viewform";

export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-primary)] px-6 text-center">
      <h1 className="text-5xl font-bold text-[var(--color-text-light)]">
        LUX LIVE
      </h1>
      <p className="max-w-md text-lg text-[var(--color-secondary-light)]">
        Near-real-time daylight analysis for Revit and IFC workflows.
      </p>
      <div className="btn-product-wrapper mt-4">
        <SharedButton
          appearance={{ variant: "product", size: "md" }}
          behavior={{ onClick: () => window.open(SIGNUP_FORM_URL, "_blank") }}
        >
          Try Now
        </SharedButton>
      </div>
    </main>
  );
}
