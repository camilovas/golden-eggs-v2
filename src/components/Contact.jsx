import { useState, useRef } from 'react'
import { useLang } from '../i18n/LangContext'
import SolNegroMark from './SolNegroMark'

const HG_SITE_KEY = 'c5d30722-b300-4aa9-aab9-fd5d76353133'
const HG_API_URL = 'https://api.humanguard.app'
const CONTACT_ENDPOINT = `${HG_API_URL}/contact`

// Estilos inline Sol Negro reutilizables
const GE = {
  bg:        '#0A0705',
  gold:      '#D9A441',
  amber:     '#C25E00',
  photon:    '#FFD37A',
  cream:     '#F2E9DC',
  muted:     '#a08d76',
  faint:     '#7a6c58',
  card:      { background: 'rgba(217,164,65,0.03)', border: '1px solid rgba(217,164,65,0.12)', borderRadius: 16 },
  cardHover: { borderColor: 'rgba(217,164,65,0.32)' },
  input:     { background: '#060402', border: '1px solid rgba(217,164,65,0.14)', borderRadius: 12, color: '#F2E9DC', fontSize: 14, padding: '10px 14px', width: '100%', outline: 'none', transition: 'border-color 0.2s' },
}

export default function Contact() {
  const { tr } = useLang()
  const hgRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [hgStatus, setHgStatus] = useState('idle')
  const [hgToken, setHgToken] = useState(null)
  const [submitStatus, setSubmitStatus] = useState('idle')
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
        setHgToken(e.detail?.result_token || e.detail?.token)
        setHgStatus('verified')
      })
      hg.addEventListener('challenge-failed', () => setHgStatus('idle'))
      if (typeof hg.show === 'function') hg.show()
    }
    if (hgLoaded || window.HumanGuard) {
      setHgLoaded(true); mount()
    } else {
      const script = document.createElement('script')
      script.src = `${HG_API_URL}/sdk/humanguard.min.js`
      script.onload = () => { setHgLoaded(true); mount() }
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

  // Borde del widget HumanGuard según estado
  const hgBorder = hgStatus === 'verified'
    ? 'rgba(217,164,65,0.55)'
    : hgStatus === 'loading'
    ? 'rgba(194,94,0,0.50)'
    : 'rgba(217,164,65,0.14)'

  return (
    <section id="contact" style={{ background: GE.bg }} className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center gap-5">
          <SolNegroMark size={72} />
          <div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.18em',
              color: GE.gold,
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: 12,
            }}>
              {tr.nav_contact}
            </span>
            <h2 style={{
              fontFamily: "'Marcellus', serif",
              fontSize: 'clamp(26px, 4vw, 38px)',
              letterSpacing: '0.06em',
              color: GE.cream,
              marginBottom: 14,
            }}>
              {tr.contact_title}
            </h2>
            <p style={{ color: GE.muted, fontSize: 15, lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
              {tr.contact_sub}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto">

          {/* ── Formulario ── */}
          <div className="md:col-span-3" style={{ ...GE.card, padding: '28px 26px' }}>
            {submitStatus === 'sent' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 0', gap: 16, textAlign: 'center' }}>
                <div style={{
                  width: 60, height: 60, borderRadius: '50%',
                  border: '1.5px solid rgba(217,164,65,0.40)',
                  background: 'rgba(217,164,65,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, color: GE.gold,
                }}>✓</div>
                <p style={{ fontFamily: "'Marcellus', serif", fontSize: 18, color: GE.cream, letterSpacing: '0.04em' }}>
                  {tr.form_sent}
                </p>
                <p style={{ color: GE.muted, fontSize: 13 }}>Nos pondremos en contacto pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: GE.faint, marginBottom: 7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tr.form_name}</label>
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange} required
                      placeholder={tr.form_name}
                      style={{ ...GE.input }}
                      onFocus={e => e.target.style.borderColor = 'rgba(217,164,65,0.45)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(217,164,65,0.14)'}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: GE.faint, marginBottom: 7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tr.form_email}</label>
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange} required
                      placeholder="tu@email.com"
                      style={{ ...GE.input }}
                      onFocus={e => e.target.style.borderColor = 'rgba(217,164,65,0.45)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(217,164,65,0.14)'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 11, color: GE.faint, marginBottom: 7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tr.form_type}</label>
                  <select
                    name="type" value={form.type} onChange={handleChange}
                    style={{ ...GE.input, appearance: 'none', cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(217,164,65,0.45)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(217,164,65,0.14)'}
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
                  <label style={{ display: 'block', fontSize: 11, color: GE.faint, marginBottom: 7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{tr.form_message_label}</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange} required
                    rows={4} placeholder={tr.form_message}
                    style={{ ...GE.input, resize: 'none' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(217,164,65,0.45)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(217,164,65,0.14)'}
                  />
                </div>

                {/* HumanGuard widget — reskinned Sol Negro */}
                <div>
                  <div
                    onClick={hgStatus === 'idle' ? triggerHG : undefined}
                    style={{
                      border: `1px solid ${hgBorder}`,
                      borderRadius: 12,
                      overflow: 'hidden',
                      background: '#060402',
                      cursor: hgStatus === 'idle' ? 'pointer' : 'default',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px',
                      borderBottom: '1px solid rgba(217,164,65,0.10)',
                    }}>
                      <SolNegroMark size={22} />
                      <span style={{ fontFamily: "'Marcellus', serif", fontSize: 12, letterSpacing: '0.10em', color: GE.cream }}>
                        GOLDEN <span style={{ color: GE.gold }}>EGGS</span>
                      </span>
                      <span style={{
                        marginLeft: 'auto',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9.5,
                        letterSpacing: '0.15em',
                        color: GE.faint,
                        textTransform: 'uppercase',
                      }}>
                        {tr.hg_label}
                      </span>
                    </div>

                    {/* Body */}
                    {hgStatus === 'verified' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px' }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: 'rgba(217,164,65,0.15)',
                          border: '1.5px solid rgba(217,164,65,0.55)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{ color: GE.gold, fontSize: 11, fontWeight: 700, lineHeight: 1 }}>✓</span>
                        </div>
                        <span style={{ color: GE.gold, fontWeight: 600, fontSize: 13 }}>
                          {tr.hg_revealed}
                        </span>
                      </div>
                    ) : hgStatus === 'loading' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.6, animation: 'spin 1s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke={GE.amber} strokeWidth="2.5" strokeDasharray="31" strokeDashoffset="10"/>
                        </svg>
                        <p style={{ color: GE.muted, fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
                          {tr.hg_analyzing}
                        </p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px' }}>
                        <div style={{
                          width: 16, height: 16,
                          border: '1.5px solid rgba(217,164,65,0.22)',
                          borderRadius: 3, flexShrink: 0,
                        }} />
                        <span style={{ color: GE.muted, fontSize: 13 }}>{tr.hg_not_robot}</span>
                        <svg style={{ marginLeft: 'auto', opacity: 0.25 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GE.cream} strokeWidth="2.5" strokeLinecap="round">
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div ref={hgRef} style={{ display: 'none' }} />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    width: '100%', padding: '12px 0',
                    borderRadius: 12, border: 'none',
                    fontFamily: "'Marcellus', serif",
                    fontSize: 14, letterSpacing: '0.10em',
                    cursor: canSubmit ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                    background: canSubmit
                      ? 'linear-gradient(135deg, #D9A441, #C25E00)'
                      : 'rgba(217,164,65,0.08)',
                    color: canSubmit ? '#0A0705' : GE.faint,
                    fontWeight: canSubmit ? 700 : 400,
                  }}
                >
                  {submitStatus === 'sending' ? tr.form_sending : tr.form_send}
                </button>

                {submitStatus === 'error' && (
                  <p style={{ color: '#e07070', fontSize: 12, textAlign: 'center' }}>{tr.form_error}</p>
                )}
              </form>
            )}
          </div>

          {/* ── Canales de contacto ── */}
          <div className="md:col-span-2" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                href: 'https://wa.me/573183990509',
                label: tr.contact_wa,
                sub: '+57 318 399 0509',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={GE.gold}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                ),
                hoverColor: '#3E5C50',
              },
              {
                href: 'https://t.me/camilovasquez',
                label: tr.contact_tg,
                sub: '@camilovasquez',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={GE.gold}>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                ),
                hoverColor: '#1e3a5f',
              },
              {
                href: 'mailto:j.camilo.v.v@gmail.com',
                label: tr.contact_email,
                sub: 'j.camilo.v.v@gmail.com',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GE.gold} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <polyline points="2,4 12,13 22,4"/>
                  </svg>
                ),
                hoverColor: '#3a2800',
              },
              {
                href: 'https://github.com/camilovas',
                label: 'GitHub',
                sub: 'github.com/camilovas',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={GE.gold}>
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
                hoverColor: '#1a1a2e',
              },
            ].map(({ href, label, sub, icon, hoverColor }) => (
              <ChannelCard key={href} href={href} label={label} sub={sub} icon={icon} />
            ))}

            {/* Origen */}
            <div style={{
              marginTop: 8, padding: '14px 16px',
              border: '1px solid rgba(217,164,65,0.08)',
              borderRadius: 12,
              background: 'rgba(217,164,65,0.02)',
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10.5, letterSpacing: '0.14em',
                color: GE.faint, lineHeight: 1.6,
              }}>
                Jamundí, Colombia → el mundo<br/>
                <span style={{ color: GE.gold, opacity: 0.7 }}>Software · Consultoría · IA</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        #contact input::placeholder,
        #contact textarea::placeholder {
          color: #7a6c58;
        }
        #contact select option {
          background: #060402;
          color: #F2E9DC;
        }
      `}</style>
    </section>
  )
}

function ChannelCard({ href, label, sub, icon }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 16px',
        borderRadius: 14,
        border: `1px solid ${hovered ? 'rgba(217,164,65,0.35)' : 'rgba(217,164,65,0.12)'}`,
        background: hovered ? 'rgba(217,164,65,0.05)' : 'rgba(217,164,65,0.02)',
        textDecoration: 'none',
        transition: 'all 0.2s',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: 'rgba(217,164,65,0.08)',
        border: '1px solid rgba(217,164,65,0.18)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#F2E9DC', marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: 11, color: '#7a6c58', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.04em' }}>{sub}</p>
      </div>
    </a>
  )
}
