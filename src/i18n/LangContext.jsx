import { createContext, useContext, useState } from 'react'
import { translations } from './translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('lang') || 'es' } catch { return 'es' }
  })

  function toggle() {
    const next = lang === 'es' ? 'en' : 'es'
    setLang(next)
    try { localStorage.setItem('lang', next) } catch { /* ignore */ }
    document.documentElement.lang = next
  }

  const tr = translations[lang]

  return (
    <LangContext.Provider value={{ lang, toggle, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
