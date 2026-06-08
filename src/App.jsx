import { LangProvider } from './i18n/LangContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Differentiators from './components/Differentiators'
import Process from './components/Process'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

export default function App() {
  return (
    <LangProvider>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Differentiators />
        <Process />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </LangProvider>
  )
}
