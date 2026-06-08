import { useLang } from '../i18n/LangContext'

export default function Process() {
  const { tr } = useLang()

  const steps = [
    { num: '01', titleKey: 'step1_title', descKey: 'step1_desc', icon: '🔍' },
    { num: '02', titleKey: 'step2_title', descKey: 'step2_desc', icon: '✏️' },
    { num: '03', titleKey: 'step3_title', descKey: 'step3_desc', icon: '💻' },
    { num: '04', titleKey: 'step4_title', descKey: 'step4_desc', icon: '🎯' },
  ]

  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading">{tr.process_title}</h2>
          <p className="section-subheading">{tr.process_sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          {steps.map(({ num, titleKey, descKey, icon }) => (
            <div key={num} className="relative text-center group">
              <div className="relative inline-flex">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl mx-auto group-hover:bg-amber-500/20 transition-colors">
                  {icon}
                </div>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-black flex items-center justify-center">
                  {num.slice(1)}
                </span>
              </div>
              <h3 className="font-semibold text-white mt-4 mb-2">{tr[titleKey]}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{tr[descKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
