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

                {/* HumanGuard */}
                <div>
                  <button
                    type="button"
                    onClick={triggerHG}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      hgStatus === 'verified'
                        ? 'border-green-500/40 bg-green-500/5 text-green-400 cursor-default'
                        : hgStatus === 'loading'
                        ? 'border-amber-500/30 bg-amber-500/5 text-amber-400 cursor-wait'
                        : 'border-[#1e1e2e] hover:border-amber-500/30 text-gray-400 hover:text-amber-400 cursor-pointer'
                    }`}
                  >
                    <span className="text-base">
                      {hgStatus === 'verified' ? '✅' : hgStatus === 'loading' ? '⏳' : '☐'}
                    </span>
                    <span>
                      {hgStatus === 'verified' ? tr.hg_verified : tr.hg_not_robot}
                    </span>
                    <span className="ml-auto text-xs text-gray-600">HumanGuard</span>
                  </button>
                  <div ref={hgRef} className="mt-2" />
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
