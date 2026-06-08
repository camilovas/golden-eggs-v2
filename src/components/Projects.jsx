import { useLang } from '../i18n/LangContext'

function TagList({ tags, colorClass }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.split(' • ').map(tag => (
        <span
          key={tag}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${colorClass}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function ProjectCard({ icon, title, desc, tags, tagColor, accent, link, linkLabel }) {
  return (
    <div className={`card group ${accent} flex flex-col`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${icon.bg}`}>
          {icon.emoji}
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            {linkLabel}
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
      <h3 className="font-bold text-white text-base mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{desc}</p>
      <TagList tags={tags} colorClass={tagColor} />
    </div>
  )
}

export default function Projects() {
  const { tr } = useLang()

  const projects = [
    {
      icon: { emoji: '🛡️', bg: 'bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-500/30' },
      title: tr.proj1_title,
      desc: tr.proj1_desc,
      tags: tr.proj1_badge,
      tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      accent: 'border-amber-500/20 hover:border-amber-500/50',
      link: 'https://humanguard.app',
      linkLabel: tr.proj_view,
    },
    {
      icon: { emoji: '🤖', bg: 'bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30' },
      title: tr.proj3_title,
      desc: tr.proj3_desc,
      tags: tr.proj3_badge,
      tagColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      accent: 'border-cyan-500/20 hover:border-cyan-500/50',
    },
    {
      icon: { emoji: '💬', bg: 'bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/30' },
      title: tr.proj4_title,
      desc: tr.proj4_desc,
      tags: tr.proj4_badge,
      tagColor: 'bg-green-500/10 text-green-400 border-green-500/20',
      accent: 'border-green-500/20 hover:border-green-500/50',
    },
    {
      icon: { emoji: '💌', bg: 'bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30' },
      title: tr.proj2_title,
      desc: tr.proj2_desc,
      tags: tr.proj2_badge,
      tagColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      accent: 'border-purple-500/20 hover:border-purple-500/40',
    },
  ]

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-[#0d0d15]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge">{tr.projects_title}</span>
          <h2 className="section-heading mt-3">{tr.projects_title}</h2>
          <p className="section-subheading">{tr.projects_sub}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">{tr.proj_more} →</p>
        </div>
      </div>
    </section>
  )
}
