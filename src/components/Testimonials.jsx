import { useLang } from '../i18n/LangContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Testimonials() {
  const { tr } = useLang()
  const { ref, visible } = useScrollAnimation()

  const testimonials = [
    {
      quote: tr.test1_quote,
      name: tr.test1_name,
      role: tr.test1_role,
      avatar: 'MA',
      color: 'bg-blue-500',
    },
    {
      quote: tr.test2_quote,
      name: tr.test2_name,
      role: tr.test2_role,
      avatar: 'LP',
      color: 'bg-purple-500',
    },
    {
      quote: tr.test3_quote,
      name: tr.test3_name,
      role: tr.test3_role,
      avatar: 'CR',
      color: 'bg-green-600',
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge">{tr.test_label}</span>
          <h2 className="section-heading mt-3">{tr.test_title}</h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, avatar, color }, i) => (
            <div
              key={name}
              className="card flex flex-col gap-4 transition-all duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 text-sm leading-relaxed flex-1">"{quote}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#1e1e2e]">
                <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-gray-500 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
