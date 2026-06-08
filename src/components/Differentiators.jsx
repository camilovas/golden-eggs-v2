import { useLang } from '../i18n/LangContext'

export default function Differentiators() {
  const { tr } = useLang()

  const items = [
    { icon: '⚡', titleKey: 'diff1_title', descKey: 'diff1_desc' },
    { icon: '🏭', titleKey: 'diff2_title', descKey: 'diff2_desc' },
    { icon: '🚀', titleKey: 'diff3_title', descKey: 'diff3_desc' },
  ]

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading">{tr.diff_title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="relative card border-amber-500/20 hover:border-amber-500/50 text-center py-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0d0d15] border border-amber-500/30 flex items-center justify-center text-xl">
                {icon}
              </div>
              <h3 className="font-bold text-white text-lg mt-4 mb-3">{tr[titleKey]}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{tr[descKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
