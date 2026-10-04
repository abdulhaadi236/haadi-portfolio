'use client'

import { useState } from 'react'
import '../app/globals.css'

export default function Home() {
  const [activeNav, setActiveNav] = useState('home')

  const projects = [
    {
      id: 1,
      title: 'Project Title',
      description: 'Video art exploring political landscapes through animated visuals.',
      year: '2024',
      category: 'Video Art',
    },
    {
      id: 2,
      title: 'Project Title',
      description: 'Animation series examining ecological transformation.',
      year: '2024',
      category: 'Animation',
    },
    {
      id: 3,
      title: 'Project Title',
      description: 'Visual narrative on land and memory in contemporary context.',
      year: '2023',
      category: 'Mixed Media',
    },
  ]

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Navigation — frosted glass bar (Figma: Desktop - 1 / Rectangle 1) */}
      <nav className="site-nav">
        <div className="site-nav__inner">
          <button onClick={() => scrollToSection('home')} className="site-nav__logo">
            Haadi
          </button>
          <div className="site-nav__links">
            <button onClick={() => scrollToSection('work')} className={`nav-link${activeNav === 'work' ? ' is-active' : ''}`}>work</button>
            <button onClick={() => scrollToSection('about')} className={`nav-link${activeNav === 'about' ? ' is-active' : ''}`}>about</button>
            <button onClick={() => scrollToSection('contact')} className={`nav-link${activeNav === 'contact' ? ' is-active' : ''}`}>contact</button>
          </div>
        </div>
      </nav>

      {/* Hero — full-screen looping background video */}
      <section id="home" className="hero">
        {/* Browser plays the first source it supports: 1080p on wider screens, 720p on phones;
            HEVC where supported (smaller), H.264 everywhere else. */}
        <video
          className="hero__video"
          poster="/video/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/video/hero-1080-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L120.90"' media="(min-width: 768px)" />
          <source src="/video/hero-1080-h264.mp4" type='video/mp4; codecs="avc1.640032"' media="(min-width: 768px)" />
          <source src="/video/hero-720-hevc.mp4" type='video/mp4; codecs="hvc1.1.6.L93.90"' />
          <source src="/video/hero-720-h264.mp4" type='video/mp4; codecs="avc1.64001F"' />
        </video>
      </section>

      {/* About Section */}
      <section id="about" style={{ paddingTop: '6rem', paddingBottom: '6rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '3rem', background: 'linear-gradient(135deg, #0066FF 0%, #00CC66 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            About
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'rgba(0, 0, 0, 0.7)', marginBottom: '1.5rem' }}>
                Haadi is a Lahore-based visual artist working primarily in video and animation.
              </p>
              <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(0, 0, 0, 0.6)' }}>
                Their practice explores the intersecting ideas of politics, land, and ecology. Through imaginative visual narratives that resemble moving paintings, they create worlds that interrogate complex social and environmental themes.
              </p>
            </div>
            <div>
              <div style={{ borderLeft: '4px solid #0066FF', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#0066FF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Location</h3>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>Lahore, Pakistan</p>
              </div>
              <div style={{ borderLeft: '4px solid #00CC66', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ color: '#00CC66', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Practice</h3>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>Video Art, Animation, Digital Media</p>
              </div>
              <div style={{ borderLeft: '4px solid #0066FF', paddingLeft: '1.5rem' }}>
                <h3 style={{ color: '#0066FF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Focus</h3>
                <p style={{ fontSize: '1.1rem', margin: 0 }}>Politics, Land, Ecology, Visual Narrative</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" style={{ paddingTop: '6rem', paddingBottom: '6rem', backgroundColor: '#000000', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '3rem', color: '#00CC66' }}>Works</h2>
          <div>
            {projects.map((project) => (
              <div key={project.id} className="project-item" style={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '2rem 0',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{project.title}</h3>
                    <p style={{ fontSize: '1rem', color: 'rgba(255, 255, 255, 0.7)' }}>{project.description}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: '#0066FF', fontWeight: 600 }}>{project.year}</p>
                    <p style={{ color: '#00CC66', fontSize: '0.9rem' }}>{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ paddingTop: '6rem', paddingBottom: '6rem', backgroundColor: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '2rem', background: 'linear-gradient(135deg, #0066FF 0%, #00CC66 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Get In Touch
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(0, 0, 0, 0.7)', marginBottom: '2rem' }}>
            Interested in collaborating or discussing work? Feel free to reach out.
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <a href="mailto:abdulhadi.tahir98@gmail.com" style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#0066FF',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '1rem',
            }}>
              abdulhadi.tahir98@gmail.com
            </a>
            <a href="tel:+18046168110" style={{
              fontSize: '1.5rem',
              fontWeight: 600,
              color: '#0066FF',
              textDecoration: 'none',
              display: 'block',
            }}>
              +1 (804) 616-8110
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
            <a href="#" style={{ color: '#0066FF', fontWeight: 600, textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#0066FF', fontWeight: 600, textDecoration: 'none' }}>LinkedIn</a>
            <a href="#" style={{ color: '#0066FF', fontWeight: 600, textDecoration: 'none' }}>Vimeo</a>
          </div>

          <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', paddingTop: '2rem', marginTop: '2rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'rgba(0, 0, 0, 0.5)' }}>© 2024 Abdul Haadi. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
