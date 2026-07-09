import { useLang } from '../i18n/LangContext'
import SolNegroMark from './SolNegroMark'

export default function Footer() {
  const { tr } = useLang()

  return (
    <footer className="bg-ge-bg py-10 px-4 sm:px-6" style={{ borderTop: '1px solid rgba(217,164,65,0.10)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo Sol Negro */}
          <div className="flex items-center gap-2.5">
            <SolNegroMark size={26} />
            <div>
              <p className="font-semibold text-ge-cream text-sm" style={{ fontFamily: "'Marcellus', serif", letterSpacing: '0.06em' }}>
                GOLDEN <span className="text-ge-gold">EGGS</span>
              </p>
              <p className="text-ge-faint text-xs">{tr.footer_tagline}</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5">
            <a href="https://github.com/camilovas" target="_blank" rel="noopener noreferrer" className="text-ge-faint hover:text-ge-cream transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="mailto:j.camilo.v.v@gmail.com" className="text-ge-faint hover:text-ge-cream transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 text-center" style={{ borderTop: '1px solid rgba(217,164,65,0.08)' }}>
          <p className="text-ge-faint text-xs">{tr.footer_rights}</p>
        </div>
      </div>
    </footer>
  )
}
