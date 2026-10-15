'use client'

import { useEffect, useRef, useState } from 'react'

const capabilities = [
  ['01', 'WEB DEVELOPMENT', 'FULL-STACK DEVELOPMENT', 'Complete web applications built from frontend to backend.'],
  ['02', 'CUSTOM SOFTWARE', 'CUSTOM WEB APPLICATIONS', 'Purpose-built software designed around your workflows and requirements.'],
  ['03', 'MOBILE', 'MOBILE APPLICATION DEVELOPMENT', 'Modern mobile experiences for iOS and Android.'],
  ['04', 'FRONTEND', 'FRONTEND DEVELOPMENT', 'Fast, responsive interfaces built around great user experiences.'],
  ['05', 'BACKEND', 'BACKEND DEVELOPMENT', 'Reliable APIs, business logic, databases, and authentication.'],
  ['06', 'INTEGRATION', 'API INTEGRATION', 'Connect products and services so systems work together.'],
  ['07', 'AUTOMATION', 'WEB AUTOMATION', 'Automate repetitive processes and connect workflows with software.'],
  ['08', 'AI', 'AI INTEGRATION', 'Integrate practical AI capabilities into products, workflows, and business systems.'],
]
const layers = [['FRONTEND', ['React', 'Next.js', 'TypeScript', 'JavaScript']], ['BACKEND', ['Node.js', 'APIs', 'Databases', 'Authentication']], ['INTEGRATION', ['REST APIs', 'Webhooks', 'Third-party Services']], ['AUTOMATION', ['Workflow Automation', 'Queues', 'Background Jobs', 'AI APIs']]]
const process = [['01', 'DISCOVER', 'Understand the business, users, requirements, and goals.'], ['02', 'PLAN', 'Define the product, architecture, technology, and roadmap.'], ['03', 'BUILD', 'Develop the product through focused iterations.'], ['04', 'TEST', 'Validate functionality, reliability, and performance.'], ['05', 'LAUNCH', 'Deploy the product into production.'], ['06', 'IMPROVE', 'Continue developing, optimizing, and scaling.']]
const principles = [['BUILT FOR THE REAL WORLD', 'We focus on useful software without unnecessary complexity.'], ['FULL-STACK THINKING', 'Frontend, backend, APIs, data, and automation work together.'], ['CLEAR COMMUNICATION', 'You should always know what is being built and why.'], ['FLEXIBLE COLLABORATION', 'Work with Webblock as a development partner, an extension of your team, or for a specific project.'], ['BUILT TO EVOLVE', 'Software should be able to grow with the business.']]

// Makes the <a> invisible to layout so the existing .project grid/styles still apply,
// while the whole card stays clickable.
const projectLinkStyle: React.CSSProperties = { display: 'contents', color: 'inherit', textDecoration: 'none' }

// Renders a live, non-interactive, scaled-down view of a site inside a card.
// The site is laid out at 1280px wide, then shrunk to fit whatever width the card has.
function SitePreview({ url, title }: { url: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.3)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => setScale(el.clientWidth / 1280)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: '#111' }}>
      <iframe
        src={url}
        title={`${title} preview`}
        loading="lazy"
        tabIndex={-1}
        referrerPolicy="no-referrer"
        style={{ width: 1280, height: `${100 / scale}%`, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }}
      />
    </div>
  )
}

function Architecture({ dark = false }: { dark?: boolean }) {
  const nodes = ['FRONTEND', 'API', 'BACKEND', 'DATABASE', 'AUTOMATION']
  return <div className={`architecture ${dark ? 'architecture-dark' : ''}`} aria-label="Software architecture diagram"><div className="architecture-label">SYSTEM / 001</div><div className="architecture-line" /><div className="architecture-nodes">{nodes.map((node, index) => <div className="architecture-node" key={node}><span className="node-dot" /><span>{node}</span>{index < nodes.length - 1 && <span className="node-arrow">→</span>}</div>)}</div><div className="architecture-footer"><span>INPUT</span><span>LOGIC</span><span>OUTPUT</span></div></div>
}
function HeroArchitecture() {
  const ecosystem = ['WEB', 'MOBILE', 'API', 'AI', 'AUTOMATION', 'DATA', 'BACKEND']
  return <div className="hero-globe" aria-label="Animated digital globe showing Webblock software systems">
    <div className="globe-grid" aria-hidden="true" />
    <div className="globe-orbit orbit-one" aria-hidden="true"><div className="orbit-labs">{ecosystem.map((label, index) => <span className={`globe-node node-${index + 1}`} key={label}><i />{label}</span>)}</div></div>
    <div className="globe-orbit orbit-two" aria-hidden="true" />
    <div className="globe-core" aria-hidden="true"><div className="globe-latitudes" /><div className="globe-longitudes" /><div className="globe-shine" /></div>
    <div className="globe-status status-api"><b />API / ACTIVE</div>
    <div className="globe-status status-ai"><b />AI / PROCESSING</div>
    <div className="globe-status status-auto"><b />AUTOMATION / RUNNING</div>
    <div className="globe-status status-data"><b />DATABASE / CONNECTED</div>
    <div className="globe-caption"><span>WEBBLOCK / GLOBAL SYSTEMS</span><span>NETWORK 001 · 2026</span></div>
  </div>
}
function ButtonLink({ children, href = '#contact', light = false }: { children: React.ReactNode; href?: string; light?: boolean }) { return <a className={`button-link ${light ? 'button-link-light' : ''}`} href={href}>{children}<span aria-hidden="true">↗</span></a> }
function SectionIntro({ eyebrow, title, children, light = false }: { eyebrow: string; title: string; children?: React.ReactNode; light?: boolean }) { return <div className={`section-intro ${light ? 'section-intro-light' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children && <p className="section-description">{children}</p>}</div> }

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return <main>
    <header className="site-header"><a className="wordmark" href="#top" aria-label="Webblock home">WEBBLOCK<span>■</span></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button><nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation"><a href="#build" onClick={() => setMenuOpen(false)}>What We Build</a><a href="#technology" onClick={() => setMenuOpen(false)}>Technology</a><a href="#work" onClick={() => setMenuOpen(false)}>Selected Work</a><a href="#process" onClick={() => setMenuOpen(false)}>How We Work</a><a href="#agencies" onClick={() => setMenuOpen(false)}>Who We Work With</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><ButtonLink>Start a Project</ButtonLink></nav></header>
    <section className="hero section-pad" id="top"><div className="hero-copy"><p className="eyebrow">WEBBLOCK — SOFTWARE DEVELOPMENT &amp; AUTOMATION</p><h1>BUILD.<br /><em>AUTOMATE.</em><br />SCALE.</h1><p className="hero-description">We build web and mobile software, backend systems, integrations, AI solutions, and automation for businesses, startups, and agencies.</p><div className="hero-actions"><ButtonLink>Start a Project</ButtonLink><a className="text-link" href="#work">View Our Work <span>↓</span></a></div></div><HeroArchitecture /><div className="hero-meta"><span>WEB / MOBILE / SYSTEMS</span><span>EST. 2026</span></div></section>
    <section className="section-pad build-section" id="build"><SectionIntro eyebrow="WHAT WE BUILD" title="Software built around your business.">From customer-facing products to internal systems, Webblock designs and develops the technology your business needs to operate and grow.</SectionIntro><div className="capability-list">{capabilities.map(([num, category, title, description]) => <div className="capability-row" key={num}><span className="row-number">{num}</span><div className="capability-title"><p className="eyebrow orange">{category}</p><h3>{title}</h3></div><p>{description}</p><span className="row-arrow">↗</span></div>)}</div></section>
    <section className="section-pad technology-section" id="technology"><SectionIntro eyebrow="TECHNOLOGY" title="Modern technology. Practical engineering.">We use modern development tools and engineering practices to build software that is reliable, maintainable, and ready to evolve.</SectionIntro><div className="layers">{layers.map(([title, items], index) => <div className="layer" key={title}><div className="layer-index">0{index + 1}</div><h3>{title}</h3><div className="layer-items">{items.map(item => <span key={item}>{item}</span>)}</div><div className="layer-connector" /></div>)}</div></section>
    <section className="section-pad work-section" id="work"><SectionIntro eyebrow="SELECTED WORK" title="Ideas turned into working software.">A selection of products, applications, and systems we&apos;ve designed and developed.</SectionIntro><div className="work-showcase">
      <article className="project project-main"><a href="https://popwin-landing-page.web.app/" target="_blank" rel="noopener noreferrer" aria-label="Visit Popwin (opens in a new tab)" style={projectLinkStyle}><div className="project-visual" style={{ position: 'relative', overflow: 'hidden' }}><SitePreview url="https://popwin-landing-page.web.app/" title="Popwin" /><div className="visual-top" style={{ position: 'relative', zIndex: 2 }}>PROJECT / 001 <span>LIVE</span></div></div><div className="project-info"><p className="eyebrow">LIVE / GAMING WEBSITE</p><h3>Popwin</h3><p>A gaming website with a landing page built to introduce the product and bring players in.</p><span className="project-tech">VISIT SITE ↗</span></div></a></article>
      <article className="project project-side"><a href="https://my-survico.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="Visit Survico (opens in a new tab)" style={projectLinkStyle}><div className="project-visual project-visual-orange" style={{ position: 'relative', overflow: 'hidden' }}><SitePreview url="https://my-survico.vercel.app/" title="Survico" /><div className="visual-top" style={{ position: 'relative', zIndex: 2 }}>PROJECT / 002 <span>LIVE</span></div></div><div className="project-info"><p className="eyebrow">LIVE / REWARDS PLATFORM</p><h3>Survico</h3><p>An offers and rewards website where users complete offers to earn rewards.</p><span className="project-tech">VISIT SITE ↗</span></div></a></article>
    </div></section>
    <section className="section-pad process-section" id="process"><SectionIntro eyebrow="HOW WE WORK" title="A clear path from idea to production." /><div className="timeline">{process.map(([num, title, description], index) => <div className="timeline-step" key={num}><div className="timeline-top"><span>{num}</span>{index < process.length - 1 && <i />}</div><h3>{title}</h3><p>{description}</p></div>)}</div></section>
    <section className="dark-section section-pad agencies-section" id="agencies"><SectionIntro light eyebrow="WHO WE WORK WITH" title="Technology built for what you&apos;re trying to accomplish.">Whether you're launching a startup, growing an existing business, or delivering projects for clients, Webblock provides the engineering expertise to turn ideas and requirements into working software.</SectionIntro><div className="agency-grid audience-grid">{[['01 / STARTUPS','Build your MVP, launch your product, and create the technical foundation for growth.'],['02 / BUSINESSES','Build custom software, automate operations, integrate systems, and improve existing technology.'],['03 / AGENCIES','Extend your development capacity with white-label development, technical implementation, and ongoing engineering support.']].map(([title, desc]) => <div key={title}><h3>{title}</h3><p>{desc}</p></div>)}</div></section>
    <section className="section-pad principles-section" id="why"><SectionIntro eyebrow="WHY WEBBLOCK" title="Good software starts with good engineering." /><div className="principles">{principles.map(([title, text], index) => <div className="principle" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
    <section className="section-pad about-section" id="about"><div className="about-copy"><p className="eyebrow">ABOUT WEBBLOCK</p><h2>WE BUILD SOFTWARE THAT MOVES BUSINESSES FORWARD.</h2><div className="about-body"><p>Webblock is a software development company focused on building practical, reliable technology for businesses, startups, and digital teams.</p><p>From web and mobile applications to backend systems, integrations, AI, and automation, we turn ideas and business requirements into software that works.</p></div></div><div className="about-principles"><div className="about-principle"><span>01</span><div><h3>ENGINEERED TO WORK</h3><p>We focus on clean architecture, reliable systems, and technology that performs in the real world.</p></div></div><div className="about-principle"><span>02</span><div><h3>BUILT AROUND YOUR NEEDS</h3><p>We don&apos;t force businesses into generic solutions. We build technology around the problem you&apos;re actually trying to solve.</p></div></div><div className="about-principle"><span>03</span><div><h3>DESIGNED TO SCALE</h3><p>We build with the future in mind, creating foundations that can evolve as your product and business grow.</p></div></div></div></section>
    <section className="dark-section contact-section" id="contact"><div className="contact-cta"><p className="eyebrow orange">START A CONVERSATION</p><h2>Have something<br /><em>to build?</em></h2><p>Tell us what you&apos;re working on. We&apos;ll help turn the idea into a practical technical plan.</p></div><form onSubmit={handleSubmit}>{status === 'sent' ? <div className="success-message"><span>✓</span><h3>Inquiry received.</h3><p>Thanks for reaching out. We&apos;ll be in touch soon.</p><a className="text-link" href="https://wa.me/message/MZ7Y3CHJ56JUB1" target="_blank" rel="noopener noreferrer">Need a faster reply? Message us on WhatsApp <span>↗</span></a></div>: <><div className="form-heading"><p className="eyebrow">CONTACT</p><h3>Let&apos;s build something.</h3></div><div className="form-grid"><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} /><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label><label>Company<input name="company" placeholder="Company name" /></label><label>Service<select name="service" defaultValue=""><option value="" disabled>Select a service</option>{['Full-Stack Web Development','Custom Web Application','Mobile Application','Frontend Development','Backend Development','API Integration','Web Automation','Other'].map(item => <option key={item}>{item}</option>)}</select></label><label className="full-field">Project details<textarea required name="details" placeholder="Tell us a little about what you want to build." /></label><label>Timeline<input name="timeline" placeholder="When do you want to start?" /></label><label>Budget <span className="optional">(optional)</span><input name="budget" placeholder="Project range" /></label></div>{status === 'error' && <p role="alert">Something went wrong. Email Webblock000@gmail.com or message us on WhatsApp.</p>}<button className="form-submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Project Inquiry'} <span>↗</span></button></>}</form></section>
    <footer className="site-footer">
  <div>
    <a className="wordmark" href="#top">WEBBLOCK<span>■</span></a>
    <p>BUILD · AUTOMATE · SCALE</p>
  </div>
  <div className="footer-nav">
    <a href="#build">What We Build</a>
    <a href="#technology">Technology</a>
    <a href="#work">Selected Work</a>
    <a href="#process">How We Work</a>
    <a href="#agencies">Who We Work With</a>
    <a href="#contact">Contact</a>
  </div>
  <div className="footer-social">
    <a href="https://www.linkedin.com/in/oyetoyinbo-isaac-30b846219" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="https://github.com/kehinde2025" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://x.com/webblockai" target="_blank" rel="noopener noreferrer">X</a>
    <a href="https://www.instagram.com/webblock.ai" target="_blank" rel="noopener noreferrer">Instagram</a>
    <a href="https://www.tiktok.com/@webblock1" target="_blank" rel="noopener noreferrer">TikTok</a>
    <a href="https://wa.me/message/MZ7Y3CHJ56JUB1" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href="mailto:Webblock000@gmail.com">Email</a>
  </div>
  <div className="footer-bottom">
    <span>© 2026 Webblock. All rights reserved.</span>
    <span>WEB / MOBILE / SYSTEMS</span>
  </div>
</footer></main>
}