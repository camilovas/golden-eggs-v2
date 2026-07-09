import { useLang } from '../i18n/LangContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const SERVICE_ICONS = ['🌐', '🖥️', '📱', '⚙️', '🗄️', '📊', '🔄', '🚀', '🤖', '💬', '📈']
const SERVICE_KEYS = [
  ['svc1_title', 'svc1_desc'],
  ['svc2_title', 'svc2_desc'],
  ['svc3_title', 'svc3_desc'],
  ['svc4_title', 'svc4_desc'],
  ['svc5_title', 'svc5_desc'],
  ['svc6_title', 'svc6_desc'],
  ['svc7_title', 'svc7_desc'],
  ['svc8_title', 'svc8_desc'],
  ['svc9_title', 'svc9_desc'],
  ['svc10_title', 'svc10_desc'],
  ['svc11_title', 'svc11_desc'],
]

export default function Services() {
  const { tr } = useLang()
  const { ref, visible } = useScrollAnimation()

  return (
    <section id="services" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge">{tr.services_title}</span>
          <h2 className="section-heading mt-3">{tr.services_title}</h2>
          <p className="section-subheading">{tr.services_sub}</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICE_KEYS.map(([titleKey, descKey], i) => (
            <div
              key={titleKey}
              className="card group cursor-default transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-ge-gold/10 flex items-center justify-center text-xl mb-4 group-hover:bg-ge-gold/20 transition-colors">
                {SERVICE_ICONS[i]}
              </div>
              <h3 className="font-semibold text-ge-cream text-sm mb-2">{tr[titleKey]}</h3>
              <p className="text-ge-faint text-xs leading-relaxed">{tr[descKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
