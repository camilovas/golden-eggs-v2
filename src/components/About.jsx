import { useLang } from '../i18n/LangContext'

const TECH_LOGOS = [
  { name: 'React', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'TypeScript', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: '.NET', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { name: 'Java', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'Python', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Node.js', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Android', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'PostgreSQL', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Redis', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'Docker', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', svg: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
]

export default function About() {
  const { tr } = useLang()

  return (
    <section id="about" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* About me */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Photo */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              {/* Glow behind photo */}
              <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-2xl scale-110" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-[#111118]">
                <img
                  src={`${import.meta.env.BASE_URL}camilo.png`}
                  alt="Camilo Vasquez"
                  className="w-full h-full object-contain object-bottom p-4 pb-0"
                />
              </div>
              {/* Badge disponible */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111118] border border-[#1e1e2e] text-xs font-medium text-gray-300 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                {tr.about_available}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-2 md:order-1">
            <span className="badge mb-3">{tr.about_label}</span>
            <h2 className="section-heading mb-4">{tr.about_title}</h2>
            <p className="text-gray-400 leading-relaxed mb-4">{tr.about_p1}</p>
            <p className="text-gray-400 leading-relaxed mb-6">{tr.about_p2}</p>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '10+', label: tr.about_stat1 },
                { value: '50+', label: tr.about_stat2 },
                { value: '3', label: tr.about_stat3 },
              ].map(({ value, label }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-[#111118] border border-[#1e1e2e]">
                  <div className="text-2xl font-black text-amber-400">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech logos strip */}
        <div className="border-t border-[#1e1e2e] pt-12">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest mb-8">{tr.about_stack}</p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {TECH_LOGOS.map(({ name, svg }) => (
              <div key={name} className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-10 h-10 p-1.5 rounded-xl bg-[#111118] border border-[#1e1e2e] group-hover:border-amber-500/30 transition-colors flex items-center justify-center">
                  <img src={svg} alt={name} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-gray-600 group-hover:text-gray-400 transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
