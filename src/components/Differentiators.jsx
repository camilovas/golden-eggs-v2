import { useLang } from '../i18n/LangContext'

export default function Differentiators() {
  const { tr } = useLang()

  const items = [
    { icon: '⚡', titleKey: 'diff1_title', descKey: 'diff1_desc' },
    { icon: '🏭', titleKey: 'diff2_title', descKey: 'diff2_desc' },
    { icon: '🚀', titleKey: 'diff3_title', descKey: 'diff3_desc' },
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-ge-alt">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading">{tr.diff_title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="relative card text-center py-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-ge-alt flex items-center justify-center text-xl" style={{ border: '1px solid rgba(217,164,65,0.25)' }}>
                {icon}
              </div>
              <h3 className="font-bold text-ge-cream text-lg mt-4 mb-3">{tr[titleKey]}</h3>
              <p className="text-ge-muted text-sm leading-relaxed">{tr[descKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
