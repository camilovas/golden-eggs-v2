import { useLang } from '../i18n/LangContext'

export default function Hero() {
  const { tr } = useLang()

  return (
    <section className="relative min-h-screen flex items-center hero-bg overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      {/* Gold glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-ge-gold/[0.04] rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ge-gold/30 bg-ge-gold/5 text-ge-gold text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-ge-gold animate-pulse-slow" />
            {tr.hero_badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ge-cream leading-tight tracking-tight">
            {tr.hero_title}
            <br />
            <span className="text-ge-gold">{tr.hero_title2}</span>
          </h1>

          {/* Sub */}
          <p className="mt-6 text-lg text-ge-muted max-w-xl leading-relaxed">
            {tr.hero_sub}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#services" className="btn-primary">
              {tr.hero_cta1}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">
              {tr.hero_cta2}
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 flex flex-wrap gap-8">
            {[
              { value: '50+', label: tr.hero_stat1 },
              { value: '10+', label: tr.hero_stat2 },
              { value: '3+', label: tr.hero_stat3 },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col">
                <span className="text-3xl font-black text-ge-gold">{value}</span>
                <span className="text-sm text-ge-faint mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative card right side (desktop) */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-72">
          <div className="card space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs text-ge-faint">Disponible para proyectos</span>
            </div>
            {[
              { icon: '⚡', label: 'React / Next.js' },
              { icon: '🦀', label: 'Rust / Node / Java' },
              { icon: '📱', label: 'Android / React Native' },
              { icon: '🤖', label: 'AI / ML / Python' },
              { icon: '☁️', label: 'AWS / DigitalOcean' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <span className="text-base w-6 text-center">{icon}</span>
                <span className="text-ge-muted">{label}</span>
                <div className="ml-auto w-16 h-1.5 rounded-full bg-ge-bg overflow-hidden">
                  <div className="h-full bg-ge-gold/70 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-5 h-8 border border-ge-faint rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-ge-gold rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
