import type { MasterSetupCardVm } from "@features/master-setups";

type MasterSetupProps = {
  cards: MasterSetupCardVm[];
  isLoading: boolean;
  isError: boolean;
};

export default function MasterSetup({
  cards,
  isLoading,
  isError,
}: MasterSetupProps) {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Master Setup
        </h1>
        <p className="max-w-3xl text-base leading-relaxed text-[#8fb0d9]">
          For pre-configured system data. Manage core organizational structures
          and reporting timelines below.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.title}
              className="rounded-2xl border border-[#1a2742] bg-[#061125] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.25)]"
            >
              <div className="flex h-full min-h-72.5 flex-col gap-6">
                <div className="space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#2b3f64] bg-[#0d1a36] text-[#4e6dff]">
                    <Icon size={20} />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-white sm:text-3xl">
                      {card.title}
                    </h2>
                    <p
                      className={`text-lg text-[#9fc0ea] ${isLoading ? "animate-pulse" : ""}`}
                    >
                      {card.meta}
                    </p>
                  </div>

                  <p className="text-base leading-relaxed text-[#9db4d3]">
                    {card.description}
                  </p>
                </div>

                <a
                  href={card.href}
                  className="mt-auto w-full rounded-xl border border-[#2a3a55] bg-linear-to-b from-[#1c2636] to-[#171f2c] px-4 py-3 text-center text-xl font-semibold text-white transition hover:border-[#365288] hover:from-[#223047] hover:to-[#1b283d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f65f8]"
                >
                  {isError ? "Retry Later" : card.action}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
