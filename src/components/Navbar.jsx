import { useState, useEffect } from 'react'
import { useLang } from '../i18n/LangContext'

export default function Navbar() {
  const { tr, lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { key: 'nav_services', href: '#services' },
    { key: 'nav_projects', href: '#projects' },
    { key: 'nav_about', href: '#about' },
    { key: 'nav_contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0a0a0f]/95 backdrop-blur-md border-b border-[#1e1e2e]' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-black text-sm select-none">
            GE
          </div>
          <span className="font-bold text-white text-sm hidden sm:block">Golden Eggs</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {tr[key]}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggle}
            className="text-xs font-medium text-gray-400 hover:text-amber-400 transition-colors px-2 py-1 rounded-lg hover:bg-amber-500/10 select-none"
          >
            {lang === 'es' ? '🇺🇸 EN' : '🇨🇴 ES'}
          </button>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden sm:inline-flex btn-primary text-xs py-2 px-4"
          >
            {tr.nav_cta}
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
            aria-label="Menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0f]/98 border-b border-[#1e1e2e] px-4 pb-4">
          {links.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-gray-300 hover:text-white border-b border-[#1e1e2e] last:border-0"
            >
              {tr[key]}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-3 w-full justify-center text-sm">
            {tr.nav_cta}
          </a>
        </div>
      )}
    </nav>
  )
}
