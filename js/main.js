// Golden Eggs Portfolio v2 — main.js
// i18n ES/EN + HumanGuard integration + UI helpers

const HG_SITE_KEY = '0fb21a42-400b-4f44-a814-1e09c280e21b';
const HG_API_URL  = 'https://api.humanguard.app';
const CONTACT_URL = 'https://api.humanguard.app/contact';

// ─── TRANSLATIONS ──────────────────────────────────────────────────────────

const translations = {
  es: {
    page_title:    'Camilo Vasquez — Desarrollador Full Stack & Consultor',
    page_desc:     'Desarrollador Full Stack con más de 10 años de experiencia. Aplicaciones web, móvil, backend, BI, ETL y consultoría de software.',
    nav_services:  'Servicios',
    nav_projects:  'Proyectos',
    nav_about:     'Sobre mí',
    nav_contact:   'Contacto',
    nav_cta:       'Contactar',
    hero_badge:    'Disponible para nuevos proyectos',
    hero_title:    'Desarrollador Full Stack & Consultor de Software',
    hero_tagline:  'Más de 10 años construyendo soluciones robustas en web, móvil, backend, datos e inteligencia artificial. Trabajo en proyectos propios y con equipos externos.',
    hero_cta1:     'Ver mis servicios',
    hero_cta2:     'Hablemos',
    stat_years:    'años de experiencia',
    stat_services: 'servicios especializados',
    stat_delivery: 'entrega rápida y confiable',
    services_label:'Servicios',
    services_title:'¿En qué puedo ayudarte?',
    services_sub:  'Desarrollo completo de soluciones digitales, desde la idea hasta el despliegue en producción.',
    svc_web_title:      'Aplicaciones Web',
    svc_web_desc:       'SPAs, portales, dashboards y plataformas SaaS con interfaz moderna y rendimiento óptimo.',
    svc_desktop_title:  'Aplicaciones de Escritorio',
    svc_desktop_desc:   'Herramientas y sistemas para Windows/Mac/Linux, con UI nativa o web embebida.',
    svc_mobile_title:   'Aplicaciones Móviles',
    svc_mobile_desc:    'Apps nativas para Android o multiplataforma con experiencia fluida en cualquier dispositivo.',
    svc_backend_title:  'Backend & APIs',
    svc_backend_desc:   'Microservicios, APIs REST/GraphQL, autenticación, integración de pagos y terceros.',
    svc_db_title:       'Bases de Datos',
    svc_db_desc:        'Diseño de esquemas, optimización de consultas, migraciones y mantenimiento continuo.',
    svc_bi_title:       'Business Intelligence',
    svc_bi_desc:        'Dashboards interactivos, reportes automáticos y análisis de datos para tomar mejores decisiones.',
    svc_etl_title:      'ETL & Pipelines de Datos',
    svc_etl_desc:       'Extracción, transformación y carga de datos entre sistemas. Automatización de flujos de información.',
    svc_cicd_title:     'Despliegue Continuo',
    svc_cicd_desc:      'Pipelines CI/CD, contenedores Docker, despliegue en la nube y monitoreo de producción.',
    diff_label:    'Por qué elegirnos',
    diff_title:    'Lo que me distingue',
    diff1_title:   'Desarrollo rápido',
    diff1_desc:    'Entrego proyectos en tiempos que otros consideran imposibles, sin sacrificar calidad ni buenas prácticas.',
    diff2_title:   '10+ años de experiencia',
    diff2_desc:    'He trabajado en proyectos de todos los tamaños — desde startups hasta sistemas empresariales complejos en producción.',
    diff3_title:   'Proyectos propios reales',
    diff3_desc:    'Construyo y mantengo plataformas propias en producción activa. Lo que aplico a tus proyectos lo he probado antes en los míos.',
    process_label: 'Proceso',
    process_title: 'Cómo trabajo',
    step1_title:   'Análisis',
    step1_desc:    'Entender el problema real antes de escribir una sola línea de código.',
    step2_title:   'Diseño',
    step2_desc:    'Arquitectura clara, tecnologías adecuadas y plan de entrega definido.',
    step3_title:   'Desarrollo',
    step3_desc:    'Código limpio, pruebas y entregables parciales con comunicación constante.',
    step4_title:   'Entrega & Soporte',
    step4_desc:    'Deploy en producción, documentación y acompañamiento post-lanzamiento.',
    projects_label:'Proyectos',
    projects_title:'Lo que he construido',
    projects_sub:  'Proyectos propios en producción activa — diseñados, desarrollados y mantenidos por mí.',
    proj_hg_badge: 'Plataforma SaaS · En producción',
    proj_hg_desc:  'Plataforma anti-bots con IA propia. SDK web/Android, 17 challenges interactivos, modelo ensemble XGBoost+LSTM, panel de analíticas en tiempo real y modo pasivo de detección.',
    proj_link:     'Ver proyecto →',
    proj_cards_title: 'Plantillas Digitales',
    proj_cards_badge: 'Diseño · Producción',
    proj_cards_desc:  'Tarjetas digitales personalizadas para eventos especiales. Diseño interactivo, animaciones y versiones para diferentes ocasiones.',
    proj_soon_title:  'Más proyectos próximamente',
    proj_soon_sub:    'Nuevos proyectos en desarrollo',
    about_label:   'Sobre mí',
    about_title:   'Desarrollador que entiende el negocio',
    about_p1:      'Soy Camilo Vasquez, desarrollador Full Stack con más de 10 años construyendo software que funciona en producción real. He trabajado con startups, empresas medianas y proyectos propios desde cero.',
    about_p2:      'Mi enfoque es directo: entender el problema, diseñar la solución correcta y entregar rápido sin deuda técnica. Trabajo con equipos distribuidos, clientes directos y como consultor independiente.',
    about_stat1:   'años de experiencia',
    about_stat2:   'especialidades técnicas',
    about_stat3:   'Proyectos propios activos en producción',
    contact_label: 'Contacto',
    contact_title: '¿Tienes un proyecto en mente?',
    contact_sub:   'Cuéntame sobre tu proyecto y te respondo en menos de 24 horas.',
    contact_alt:   'O contáctame directo:',
    channel_wa:    'Respuesta rápida',
    form_name:     'Nombre',
    form_name_ph:  'Tu nombre',
    form_email:    'Email',
    form_email_ph: 'tu@email.com',
    form_type:     'Tipo de proyecto',
    form_msg:      'Mensaje',
    form_msg_ph:   'Cuéntame sobre tu proyecto...',
    form_send:     'Enviar mensaje',
    form_success:  '✅ Mensaje enviado correctamente. Te respondo en menos de 24 horas.',
    form_error:    '❌ Hubo un error al enviar. Por favor contáctame directamente.',
    type_web:      'Aplicación web',
    type_mobile:   'Aplicación móvil',
    type_backend:  'Backend / API',
    type_data:     'Datos / BI / ETL',
    type_consulting: 'Consultoría',
    type_other:    'Otro',
    hg_not_robot:  'No soy robot',
    footer_protected: 'Protegido por',
  },
  en: {
    page_title:    'Camilo Vasquez — Full Stack Developer & Consultant',
    page_desc:     'Full Stack Developer with 10+ years of experience. Web, mobile, backend, BI, ETL and software consulting.',
    nav_services:  'Services',
    nav_projects:  'Projects',
    nav_about:     'About',
    nav_contact:   'Contact',
    nav_cta:       'Contact me',
    hero_badge:    'Available for new projects',
    hero_title:    'Full Stack Developer & Software Consultant',
    hero_tagline:  'Over 10 years building robust solutions in web, mobile, backend, data and artificial intelligence. I work on my own projects and with external teams.',
    hero_cta1:     'View my services',
    hero_cta2:     "Let's talk",
    stat_years:    'years of experience',
    stat_services: 'specialized services',
    stat_delivery: 'fast and reliable delivery',
    services_label:'Services',
    services_title:'How can I help you?',
    services_sub:  'Full development of digital solutions, from idea to production deployment.',
    svc_web_title:      'Web Applications',
    svc_web_desc:       'SPAs, portals, dashboards and SaaS platforms with modern UI and optimal performance.',
    svc_desktop_title:  'Desktop Applications',
    svc_desktop_desc:   'Tools and systems for Windows/Mac/Linux with native or embedded web UI.',
    svc_mobile_title:   'Mobile Applications',
    svc_mobile_desc:    'Native Android apps or cross-platform with smooth experience on any device.',
    svc_backend_title:  'Backend & APIs',
    svc_backend_desc:   'Microservices, REST/GraphQL APIs, authentication, payment and third-party integrations.',
    svc_db_title:       'Databases',
    svc_db_desc:        'Schema design, query optimization, migrations and continuous maintenance.',
    svc_bi_title:       'Business Intelligence',
    svc_bi_desc:        'Interactive dashboards, automated reports and data analytics to make better decisions.',
    svc_etl_title:      'ETL & Data Pipelines',
    svc_etl_desc:       'Data extraction, transformation and loading between systems. Workflow automation.',
    svc_cicd_title:     'Continuous Deployment',
    svc_cicd_desc:      'CI/CD pipelines, Docker containers, cloud deployment and production monitoring.',
    diff_label:    'Why choose me',
    diff_title:    'What sets me apart',
    diff1_title:   'Fast development',
    diff1_desc:    'I deliver projects in timeframes others consider impossible, without sacrificing quality or best practices.',
    diff2_title:   '10+ years of experience',
    diff2_desc:    "I've worked on projects of all sizes — from startups to complex enterprise systems in production.",
    diff3_title:   'Real own projects',
    diff3_desc:    'I build and maintain my own production platforms. What I apply to your projects I've tested on mine first.',
    process_label: 'Process',
    process_title: 'How I work',
    step1_title:   'Analysis',
    step1_desc:    'Understanding the real problem before writing a single line of code.',
    step2_title:   'Design',
    step2_desc:    'Clear architecture, appropriate technologies and a defined delivery plan.',
    step3_title:   'Development',
    step3_desc:    'Clean code, tests and partial deliverables with constant communication.',
    step4_title:   'Delivery & Support',
    step4_desc:    'Production deployment, documentation and post-launch accompaniment.',
    projects_label:'Projects',
    projects_title:'What I have built',
    projects_sub:  'Own projects in active production — designed, developed and maintained by me.',
    proj_hg_badge: 'SaaS Platform · Live in production',
    proj_hg_desc:  'Anti-bot platform with proprietary AI. Web/Android SDK, 17 interactive challenges, XGBoost+LSTM ensemble model, real-time analytics dashboard and passive detection mode.',
    proj_link:     'View project →',
    proj_cards_title: 'Digital Templates',
    proj_cards_badge: 'Design · Production',
    proj_cards_desc:  'Custom digital cards for special events. Interactive design, animations and versions for different occasions.',
    proj_soon_title:  'More projects coming soon',
    proj_soon_sub:    'New projects in development',
    about_label:   'About me',
    about_title:   'Developer who understands the business',
    about_p1:      "I'm Camilo Vasquez, Full Stack developer with 10+ years building software that works in real production. I've worked with startups, mid-sized companies and own projects from scratch.",
    about_p2:      'My approach is direct: understand the problem, design the right solution and deliver fast without technical debt. I work with distributed teams, direct clients and as an independent consultant.',
    about_stat1:   'years of experience',
    about_stat2:   'technical specialties',
    about_stat3:   'Active own projects in production',
    contact_label: 'Contact',
    contact_title: 'Have a project in mind?',
    contact_sub:   'Tell me about your project and I will reply within 24 hours.',
    contact_alt:   'Or contact me directly:',
    channel_wa:    'Quick response',
    form_name:     'Name',
    form_name_ph:  'Your name',
    form_email:    'Email',
    form_email_ph: 'you@email.com',
    form_type:     'Project type',
    form_msg:      'Message',
    form_msg_ph:   'Tell me about your project...',
    form_send:     'Send message',
    form_success:  '✅ Message sent successfully. I will reply within 24 hours.',
    form_error:    '❌ There was an error sending. Please contact me directly.',
    type_web:      'Web application',
    type_mobile:   'Mobile application',
    type_backend:  'Backend / API',
    type_data:     'Data / BI / ETL',
    type_consulting: 'Consulting',
    type_other:    'Other',
    hg_not_robot:  "I'm not a robot",
    footer_protected: 'Protected by',
  }
};

// ─── LANGUAGE ──────────────────────────────────────────────────────────────

let currentLang = localStorage.getItem('lang') || 'es';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  const t = translations[lang];

  // Text content — if element has child elements (e.g. SVG inside a button),
  // only replace the first text node to avoid destroying child markup
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] === undefined) return;
    if (el.children.length === 0) {
      el.textContent = t[key];
    } else {
      let replaced = false;
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
          node.textContent = ' ' + t[key] + ' ';
          replaced = true;
          break;
        }
      }
      if (!replaced) el.prepend(document.createTextNode(t[key]));
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Page title & meta
  if (t.page_title) document.title = t.page_title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && t.page_desc) metaDesc.setAttribute('content', t.page_desc);

  // Lang toggle label
  document.getElementById('lang-label').textContent = lang === 'es' ? '🇺🇸 EN' : '🇨🇴 ES';

  // HTML lang attribute
  document.documentElement.lang = lang;
}

function toggleLang() {
  setLang(currentLang === 'es' ? 'en' : 'es');
}

// ─── HUMANGUARD ────────────────────────────────────────────────────────────

let hgToken = null;
let hgMounted = false;

function triggerHG() {
  if (hgMounted) return;
  hgMounted = true;

  const btn = document.getElementById('hg-btn');
  const container = document.getElementById('hg-container');

  btn.disabled = true;
  const loadingText = currentLang === 'es' ? 'Verificando...' : 'Verifying...';
  document.getElementById('hg-text').textContent = loadingText;

  var hg = document.createElement('human-guard');
  hg.setAttribute('api-url', HG_API_URL);
  hg.setAttribute('site-key', HG_SITE_KEY);
  hg.setAttribute('challenge', 'auto');
  container.appendChild(hg);

  hg.addEventListener('challenge-complete', function(e) {
    hgToken = e.detail.result_token || e.detail.token;
    btn.className = 'hg-btn-verified w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-default';
    document.getElementById('hg-icon').textContent = '✓';
    document.getElementById('hg-text').textContent = currentLang === 'es' ? 'Verificado' : 'Verified';
    document.getElementById('submit-btn').disabled = false;
    container.innerHTML = '';
  });

  hg.addEventListener('challenge-failed', function() {
    hgMounted = false;
    btn.disabled = false;
    document.getElementById('hg-icon').textContent = '☐';
    document.getElementById('hg-text').textContent = translations[currentLang].hg_not_robot;
    container.innerHTML = '';
  });

  hg.show();
}

// ─── CONTACT FORM ──────────────────────────────────────────────────────────

async function submitContact(event) {
  event.preventDefault();

  const name    = document.getElementById('f-name').value.trim();
  const email   = document.getElementById('f-email').value.trim();
  const type    = document.getElementById('f-type').value;
  const message = document.getElementById('f-msg').value.trim();
  const btn     = document.getElementById('submit-btn');
  const t       = translations[currentLang];

  if (!hgToken) return;

  btn.disabled = true;
  btn.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

  try {
    const res = await fetch(CONTACT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: `[${type}] ${message}`,
        hg_token: hgToken
      })
    });

    if (res.ok) {
      document.getElementById('form-success').classList.remove('hidden');
      document.getElementById('form-success').textContent = t.form_success;
      document.getElementById('contact-form').reset();
      hgToken = null;
      hgMounted = false;
      // Reset HG button
      const hgBtn = document.getElementById('hg-btn');
      hgBtn.className = 'hg-btn-idle w-full flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all';
      hgBtn.disabled = false;
      document.getElementById('hg-icon').textContent = '☐';
      document.getElementById('hg-text').textContent = t.hg_not_robot;
    } else {
      throw new Error('Server error');
    }
  } catch {
    document.getElementById('form-error').classList.remove('hidden');
    document.getElementById('form-error').textContent = t.form_error;
    btn.disabled = false;
    btn.textContent = t.form_send;
  }
}

// ─── INIT ──────────────────────────────────────────────────────────────────

(function init() {
  // Lang toggle
  document.getElementById('lang-toggle').addEventListener('click', function() {
    setLang(currentLang === 'es' ? 'en' : 'es');
  });

  // Mobile menu toggle
  var mobileBtn  = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
  });

  // Close mobile menu when clicking a link inside it
  document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('hidden');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });

  // HumanGuard button
  document.getElementById('hg-btn').addEventListener('click', triggerHG);

  // Contact form submit
  document.getElementById('contact-form').addEventListener('submit', submitContact);

  // Apply language on load
  setLang(currentLang);
}());
