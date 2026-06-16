import { useState, useRef } from 'react'
import { useLang } from '../i18n/LangContext'

const HG_SITE_KEY = '42f329d4-7790-4045-ab9c-e85b64f43a2e'
const HG_API_URL = 'https://api.humanguard.app'
const CONTACT_ENDPOINT = `${HG_API_URL}/contact`

export default function Contact() {
  const { tr } = useLang()
  const hgRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [hgStatus, setHgStatus] = useState('idle') // idle | loading | verified
  const [hgToken, setHgToken] = useState(null)
  const [submitStatus, setSubmitStatus] = useState('idle') // idle | sending | sent | error
  const [hgLoaded, setHgLoaded] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function triggerHG() {
    if (hgStatus === 'verified') return
    setHgStatus('loading')

    const mount = () => {
      if (!hgRef.current) return
      hgRef.current.innerHTML = ''
      const hg = document.createElement('human-guard')
      hg.setAttribute('api-url', HG_API_URL)
      hg.setAttribute('site-key', HG_SITE_KEY)
      hg.setAttribute('challenge', 'auto')
      hgRef.current.appendChild(hg)
      hg.addEventListener('challenge-complete', (e) => {
        const token = e.detail?.result_token || e.detail?.token
        setHgToken(token)
        setHgStatus('verified')
      })
      hg.addEventListener('challenge-failed', () => {
        setHgStatus('idle')
      })
      if (typeof hg.show === 'function') hg.show()
    }

    if (hgLoaded || window.HumanGuard) {
      setHgLoaded(true)
      mount()
    } else {
      const script = document.createElement('script')
      script.src = `${HG_API_URL}/sdk/humanguard.min.js`
      script.onload = () => {
        setHgLoaded(true)
        mount()
      }
      script.onerror = () => setHgStatus('idle')
      document.head.appendChild(script)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!hgToken || submitStatus === 'sending') return

    setSubmitStatus('sending')
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hg_token: hgToken }),
      })
      setSubmitStatus(res.ok ? 'sent' : 'error')
    } catch {
      setSubmitStatus('error')
    }
  }

  const canSubmit = hgStatus === 'verified' && form.name && form.email && form.message && submitStatus === 'idle'

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge">{tr.nav_contact}</span>
          <h2 className="section-heading mt-3">{tr.contact_title}</h2>
          <p className="section-subheading">{tr.contact_sub}</p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Form */}
          <div className="md:col-span-3 card">
            {submitStatus === 'sent' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-3xl">✓</div>
                <p className="font-semibold text-white text-lg">{tr.form_sent}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">{tr.form_name}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder={tr.form_name}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">{tr.form_email}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{tr.form_type}</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                  >
                    <option value="">{tr.form_type}</option>
                    <option value="web">{tr.form_type_web}</option>
                    <option value="mobile">{tr.form_type_mobile}</option>
                    <option value="desktop">{tr.form_type_desktop}</option>
                    <option value="backend">{tr.form_type_backend}</option>
                    <option value="data">{tr.form_type_data}</option>
                    <option value="consulting">{tr.form_type_consulting}</option>
                    <option value="other">{tr.form_type_other}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{tr.form_message_label}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                    placeholder={tr.form_message}
                  />
                </div>

                {/* HumanGuard constellation widget */}
                <div>
                  <div
                    onClick={hgStatus === 'idle' ? triggerHG : undefined}
                    className={`rounded-xl border overflow-hidden transition-all duration-200 ${hgStatus === 'idle' ? 'cursor-pointer hover:border-[#6C5CE7]/50' : ''}`}
                    style={{
                      background: '#141233',
                      borderColor: hgStatus === 'verified'
                        ? 'rgba(43,224,138,0.45)'
                        : hgStatus === 'loading'
                        ? 'rgba(108,92,231,0.45)'
                        : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-2.5 px-3.5 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {/* Constellation SVG */}
                      <svg width="20" height="22" viewBox="0 0 140 150" fill="none" aria-hidden="true">
                        <g stroke="#6C5CE7" strokeWidth="5" strokeLinecap="round">
                          <line x1="72" y1="34" x2="70" y2="66"/>
                          <line x1="70" y1="66" x2="44" y2="54"/>
                          <line x1="70" y1="66" x2="100" y2="50"/>
                          <line x1="70" y1="66" x2="56" y2="100"/>
                          <line x1="70" y1="66" x2="90" y2="102"/>
                        </g>
                        <g fill="#F7F7FB">
                          <circle cx="44" cy="54" r="9"/><circle cx="100" cy="50" r="9"/>
                          <circle cx="70" cy="66" r="10"/>
                          <circle cx="56" cy="100" r="9"/><circle cx="90" cy="102" r="9"/>
                        </g>
                        <circle cx="72" cy="22" r="13" fill="#2BE08A"/>
                      </svg>
                      {/* Wordmark */}
                      <span style={{ color: '#F7F7FB', fontWeight: 700, fontSize: 13, letterSpacing: '-0.01em' }}>
                        humanguard<span style={{ position: 'relative', display: 'inline-block' }}>
                          ı
                          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-2px', width: '4px', height: '4px', borderRadius: '50%', background: '#2BE08A', display: 'block' }} />
                        </span>
                      </span>
                      <span className="ml-auto" style={{ color: 'rgba(247,247,251,0.28)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        {tr.hg_label}
                      </span>
                    </div>

                    {/* Body — visual state only, ref lives outside */}
                    {hgStatus === 'verified' ? (
                      <div className="flex items-center gap-2.5 px-3.5 py-3">
                        <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#2BE08A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <span style={{ color: '#141233', fontSize: 11, fontWeight: 800, lineHeight: 1 }}>✓</span>
                        </div>
                        <span style={{ color: '#2BE08A', fontWeight: 600, fontSize: 13 }}>
                          {tr.hg_revealed}
                        </span>
                      </div>
                    ) : hgStatus === 'loading' ? (
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
                          <circle cx="12" cy="12" r="10" stroke="#6C5CE7" strokeWidth="2.5" strokeDasharray="31" strokeDashoffset="10"/>
                        </svg>
                        <p style={{ color: 'rgba(247,247,251,0.45)', fontSize: 12, fontFamily: 'monospace' }}>
                          {tr.hg_analyzing}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 px-3.5 py-3">
                        <div style={{ width: 16, height: 16, border: '1.5px solid rgba(247,247,251,0.18)', borderRadius: 3, flexShrink: 0 }} />
                        <span style={{ color: 'rgba(247,247,251,0.62)', fontSize: 13 }}>{tr.hg_not_robot}</span>
                        <svg style={{ marginLeft: 'auto', opacity: 0.25 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F7F7FB" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                      </div>
                    )}
                  </div>
                  {/* Mount point: siempre en el DOM para que el web component funcione */}
                  <div ref={hgRef} style={{ display: 'none' }} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    canSubmit
                      ? 'bg-amber-500 hover:bg-amber-400 text-black'
                      : 'bg-[#1e1e2e] text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {submitStatus === 'sending' ? tr.form_sending : tr.form_send}
                </button>

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-xs text-center">{tr.form_error}</p>
                )}
              </form>
            )}
          </div>

          {/* Contact channels */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="https://wa.me/573183990509"
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 hover:border-green-500/40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-xl shrink-0">
                💬
              </div>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-green-400 transition-colors">{tr.contact_wa}</p>
                <p className="text-gray-500 text-xs mt-0.5">+57 318 399 0509</p>
              </div>
            </a>

            <a
              href="https://t.me/camilovasquez"
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 hover:border-blue-500/40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-xl shrink-0">
                ✈️
              </div>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-blue-400 transition-colors">{tr.contact_tg}</p>
                <p className="text-gray-500 text-xs mt-0.5">@camilovasquez</p>
              </div>
            </a>

            <a
              href="mailto:j.camilo.v.v@gmail.com"
              className="card flex items-center gap-4 hover:border-amber-500/40 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl shrink-0">
                📧
              </div>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-amber-400 transition-colors">{tr.contact_email}</p>
                <p className="text-gray-500 text-xs mt-0.5">j.camilo.v.v@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/camilovas"
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 hover:border-gray-400/30 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-500/10 flex items-center justify-center text-xl shrink-0">
                🐙
              </div>
              <div>
                <p className="font-semibold text-white text-sm group-hover:text-gray-300 transition-colors">GitHub</p>
                <p className="text-gray-500 text-xs mt-0.5">github.com/camilovas</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
