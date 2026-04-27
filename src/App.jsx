import { useEffect, useRef, useState } from 'react'
import heroImg from './assets/photo_2026-04-26_22-55-34.jpg'
import './App.css'

function App() {
  const navRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState('idle') // idle, loading, success, error
  const [formResult, setFormResult] = useState('')

  const allProjects = [
    {
      id: 1,
      name: "Photo to Recipe App",
      description: "An AI-powered app that scans ingredients and suggests recipes instantly using Gemini AI.",
      tech: ["Flutter", "Dart", "Gemini AI"],
      link: "https://github.com/rebehhalkoum93-cmyk/photo-to-recipe-app",
      type: "mobile",
      color: "linear-gradient(135deg, #0d2b3e, #1a4a5e)"
    },
    {
      id: 2,
      name: "Todo & Pomodoro App",
      description: "A productivity suite featuring task management, Pomodoro timers, and progress analytics.",
      tech: ["Flutter", "Dart", "Provider"],
      link: "https://github.com/rebehhalkoum93-cmyk/todo-list-and-pomodoro-app",
      type: "mobile",
      color: "linear-gradient(135deg, #1a1a2e, #2d1b4e)"
    },
    {
      id: 3,
      name: "Algerian Spy Game",
      description: "Localized imposter party game with 300+ Algerian words and custom word pack support.",
      tech: ["Flutter", "Dart", "Game Dev"],
      link: "https://github.com/rebehhalkoum93-cmyk/algerian_spy_game",
      type: "mobile",
      color: "linear-gradient(135deg, #3e1e0d, #5e2e1a)"
    },
    {
      id: 4,
      name: "Online Market Frontend",
      description: "Modern e-commerce storefront built with React.js, featuring functional contact integration.",
      tech: ["React.js", "JavaScript", "CSS3"],
      link: "https://github.com/rebehhalkoum93-cmyk/online-store-frontend-only-",
      type: "web",
      color: "linear-gradient(135deg, #1e3a1e, #2e5a2e)"
    },
    {
      id: 5,
      name: "Full-Stack E-Commerce",
      description: "Comprehensive MERN stack platform with full shopping functionality and database integration.",
      tech: ["React", "Express", "MongoDB", "Node"],
      link: "https://github.com/rebehhalkoum93-cmyk/e-commerce-website",
      type: "web",
      color: "linear-gradient(135deg, #2d1b4e, #1a1a2e)"
    },
    {
      id: 6,
      name: "QR Scan & Generate",
      description: "Utility app for scanning and creating QR codes with a clean, optimized user interface.",
      tech: ["Flutter", "Dart"],
      link: "https://github.com/rebehhalkoum93-cmyk/qr-scan-and-generating-app",
      type: "mobile",
      color: "linear-gradient(135deg, #1a4a5e, #0d2b3e)"
    },
    {
      id: 7,
      name: "Full Auth App",
      description: "Secure authentication system with Flutter frontend and Express.js/MongoDB backend.",
      tech: ["Flutter", "Node.js", "MongoDB"],
      link: "https://github.com/rebehhalkoum93-cmyk/simple-sign_in-login-app-with-flutter",
      type: "mobile",
      color: "linear-gradient(135deg, #5e2e1a, #3e1e0d)"
    },
    {
      id: 8,
      name: "Telegram BG Remover",
      description: "Python-powered Telegram bot that automatically removes backgrounds from images.",
      tech: ["Python", "Telegram API"],
      link: "https://github.com/rebehhalkoum93-cmyk/telegram_backgrownd_remove_bot",
      type: "bot",
      color: "linear-gradient(135deg, #2e5a2e, #1e3a1e)"
    },
    {
      id: 9,
      name: "Smart School System",
      description: "Comprehensive management platform for schools with attendance and grading features.",
      tech: ["Flutter", "Dart", "Firebase"],
      link: "https://github.com/rebehhalkoum93-cmyk/Smart-School-Management-System-",
      type: "mobile",
      color: "linear-gradient(135deg, #0d2b3e, #1a1a2e)"
    },
    {
      id: 10,
      name: "tic-tac-toe-game",
      description: "A tic tac toe game with flutter",
      tech: ["Flutter", "Dart"],
      link: "https://github.com/rebehhalkoum93-cmyk/tic-tac-toe-x-o-",
      type: "mobile",
      color: "linear-gradient(135deg, #0d2b3e, #1a1a2e)"
    },
  ]

  const filteredProjects = activeFilter === 'all'
    ? allProjects
    : allProjects.filter(p => p.type === activeFilter)

  const visibleProjects = filteredProjects

  useEffect(() => {
    // Scroll-triggered reveal animations
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    revealElements.forEach((el) => observer.observe(el))

    // Navbar scroll effect
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', window.scrollY > 50)
      }
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleProjects])

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setFormStatus('loading')

    const formData = new FormData(event.target)
    const data = {
      service_id: 'service_iy6um3c',
      template_id: 'template_j84mmq7',
      user_id: 'x6hqVrNEp_GSasLoB',
      template_params: {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        to_name: 'rebeh'
      }
    }

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setFormStatus('success')
        setFormResult("Message sent successfully! I'll get back to you soon.")
        event.target.reset()
      } else {
        const errorData = await response.text()
        setFormStatus('error')
        setFormResult("Failed to send message: " + errorData)
      }
    } catch (error) {
      setFormStatus('error')
      setFormResult("Something went wrong. Please try again later.")
    }
  }

  const renderIcon = (type) => {
    switch (type) {
      case 'mobile':
        return <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
      case 'web':
        return <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
      case 'bot':
        return <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path><path d="M21 16v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path><rect x="3" y="8" width="18" height="8" rx="2"></rect><circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle></svg>
      default:
        return <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`} ref={navRef} id="navbar">
        <div className="nav-logo">
          port<span>folio.</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#home" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('home').scrollIntoView({ behavior: 'smooth' }); }}>home</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('skills').scrollIntoView({ behavior: 'smooth' }); }}>about</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }); }}>works</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>contact</a>
          <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>book a call</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="hero-bg-glow glow-1"></div>
        <div className="hero-bg-glow glow-2"></div>

        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge reveal delay-1">
              <span className="dot"></span>
              Available for work
            </div>

            <h1 className="hero-title reveal delay-2">
              <span className="line-reveal">
                <span className="line-content">I'm <span className="accent">rebeh.</span></span>
              </span>
              <span className="line-reveal">
                <span className="line-content">Web and mobile apps</span>
              </span>
              <span className="line-reveal">
                <span className="line-content outline-text">designer & developer.</span>
              </span>
            </h1>

            <p className="hero-description reveal delay-3">
              Specializing in building high-performance web and mobile applications.
              I bridge the gap between complex functionality and seamless user experiences.
            </p>

            <div className="hero-buttons reveal delay-4">
              <button className="btn-primary" id="hero-cta" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                book a free consult
                <span>→</span>
              </button>
              <button className="btn-secondary" id="hero-secondary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
                view my work
                <span>↓</span>
              </button>
            </div>

            <div className="hero-stats reveal delay-5">
              <div className="stat-item">
                <h3>2+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>20+</h3>
                <p>Projects Done</p>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper reveal-right delay-3">
            <div className="hero-image-container">
              <div className="hero-image-bg"></div>
              <img src={heroImg} alt="Portrait" className="hero-portrait" />
              <div className="hero-decorative-ring ring-1"></div>
              <div className="hero-decorative-ring ring-2"></div>
            </div>

            <div className="floating-card card-1">
              <div className="card-icon teal">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
              </div>
              <div>
                <div className="card-label">Specialty</div>
                <div className="card-value">App Developer</div>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-icon blue">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <div>
                <div className="card-label">studying</div>
                <div className="card-value">ESI student</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="skills-section" id="skills">
        <div className="section-container">
          <div className="section-label reveal">
            <span className="line"></span>
            What I Do
          </div>
          <h2 className="section-title reveal delay-1">
            Skills & Expertise
          </h2>
          <p className="section-subtitle reveal delay-2">
            Combining modern web technologies with native mobile performance to build robust digital solutions.
          </p>

          <div className="skills-grid">
            <div className="skill-card reveal delay-1">
              <div className="skill-icon teal">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <h3>UI/UX Design</h3>
              <p>Designing functional, developer-ready interfaces that translate perfectly into clean, responsive code.</p>
              <div className="skill-tags">
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Adobe XD</span>
                <span className="skill-tag">Prototyping</span>
                <span className="skill-tag">Wireframing</span>
              </div>
            </div>

            <div className="skill-card reveal delay-2">
              <div className="skill-icon orange">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <h3>Frontend Development</h3>
              <p>Architecting scalable web platforms using React and modern ecosystems for maximum performance.</p>
              <div className="skill-tags">
                <span className="skill-tag">React</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML/CSS</span>
                <span className="skill-tag">Next.js</span>
              </div>
            </div>

            <div className="skill-card reveal delay-3">
              <div className="skill-icon purple">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              </div>
              <h3>Mobile Development</h3>
              <p>Building cross-platform mobile apps that deliver native speed and high-quality user engagement.</p>
              <div className="skill-tags">
                <span className="skill-tag">React Native</span>
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">iOS</span>
                <span className="skill-tag">Android</span>
              </div>
            </div>

            <div className="skill-card reveal delay-4">
              <div className="skill-icon teal">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              </div>
              <h3>Backend & APIs</h3>
              <p>Engineering secure server-side logic and efficient database architectures to power your applications.</p>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Firebase</span>
                <span className="skill-tag">MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="projects-section" id="projects">
        <div className="section-container">
          <div className="section-label reveal">
            <span className="line"></span>
            Portfolio
          </div>
          <h2 className="section-title reveal delay-1">
            Featured Projects
          </h2>
          <p className="section-subtitle reveal delay-2">
            A look at my latest work in building scalable web platforms and mobile apps.
          </p>

          <div className="project-filters reveal delay-3">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Projects</button>
            <button className={`filter-btn ${activeFilter === 'mobile' ? 'active' : ''}`} onClick={() => setActiveFilter('mobile')}>Mobile Apps</button>
            <button className={`filter-btn ${activeFilter === 'web' ? 'active' : ''}`} onClick={() => setActiveFilter('web')}>Web Apps</button>
          </div>

          <div className="projects-grid">
            {visibleProjects.map((project, index) => (
              <div className="project-card reveal-scale" key={project.id} style={{ transitionDelay: `${(index % 4) * 0.1}s` }}>
                <div className="project-thumbnail" style={{ background: project.color }}>
                  {renderIcon(project.type)}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map(t => <span key={t}>{t}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link primary">Source Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <div className="section-label reveal">
            <span className="line"></span>
            Get In Touch
          </div>
          <h2 className="section-title reveal delay-1">
            Let's Work Together
          </h2>
          <p className="section-subtitle reveal delay-2">
            Have a project in mind? Let's discuss how we can bring your vision to life.
          </p>

          <div className="contact-grid">
            <div className="contact-info reveal-left delay-2">
              <h3>Let's discuss upgrades, free of charge!</h3>
              <p>
                Ready to build your next big idea? I'm always open to new opportunities
                and collaborations in web and mobile development. Let's discuss
                how I can help you develop a world-class application.
              </p>

              <div className="contact-methods">
                <div className="contact-method">
                  <div className="method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <div className="method-label">Email</div>
                    <div className="method-value">or_halkoum@esi.dz</div>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <div className="method-label">Location</div>
                    <div className="method-value">Algeria, BBA</div>
                  </div>
                </div>
                <div className="contact-method">
                  <div className="method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 {6} 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <div className="method-label">Phone</div>
                    <div className="method-value">0777380583</div>
                  </div>
                </div>
              </div>
            </div>

            {formStatus === 'success' ? (
              <div className="contact-success-message reveal">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>{formResult}</p>
                <button className="btn-secondary" onClick={() => setFormStatus('idle')}>Send Another Message</button>
              </div>
            ) : (
              <form className="contact-form reveal-right delay-3" id="contact-form" onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Tell me about your project..." required></textarea>
                </div>
                {formStatus === 'error' && <p className="form-error-text" style={{ color: 'var(--accent-secondary)', fontSize: '0.9rem' }}>{formResult}</p>}
                <button type="submit" className="btn-primary" id="submit-btn" style={{ width: '100%', justifyContent: 'center' }} disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Sending...' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 portfolio. All rights reserved.</p>
        <div className="footer-links">
          <a href="https://github.com/rebehhalkoum93-cmyk/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/halkoum-rabah-40a584395" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://www.instagram.com/repoo_4/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </footer>
    </>
  )
}

export default App
