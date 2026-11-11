const AuthShell = ({ title, intro, children, footer }) => (
  <main className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)]">
    <aside className="hidden bg-cyan text-mount lg:flex lg:flex-col lg:justify-between lg:p-14">
      <p className="font-display text-lg font-semibold">Collection</p>
      <div>
        <p
          aria-hidden="true"
          className="font-display text-[clamp(5rem,10vw,9.5rem)] font-extrabold leading-[0.85] tracking-tight"
        >
          Keep
          <br />
          what you
          <br />
          see.
        </p>
        <p className="mt-8 max-w-sm text-lg leading-relaxed text-mount/80">
          A private wall for the photos you want to hold on to. Upload, name and revisit them any
          time.
        </p>
      </div>
    </aside>

    <section className="flex flex-col justify-center px-6 py-12 sm:px-12">
      <div className="mx-auto w-full max-w-sm">
        <p className="mb-10 font-display text-lg font-semibold text-cyan lg:hidden">Collection</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-graphite">{intro}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-8 border-t border-line pt-6 text-sm text-graphite">{footer}</p>
      </div>
    </section>
  </main>
);

export default AuthShell;
