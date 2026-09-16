'use client'

import { useState, useEffect } from 'react'
import '../app/globals.css'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 50,
        backgroundColor: isScrolled ? 'white' : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1.5rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #0066FF 0%, #00CC66 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            HAADI
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button onClick={() => scrollToSection('home')} className="nav-link" style={{ color: activeNav === 'home' ? '#0066FF' : 'inherit' }}>Home</button>
            <button onClick={() => scrollToSection('about')} className="nav-link" style={{ color: activeNav === 'about' ? '#0066FF' : 'inherit' }}>About</button>
            <button onClick={() => scrollToSection('work')} className="nav-link" style={{ color: activeNav === 'work' ? '#0066FF' : 'inherit' }}>Work</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link" style={{ color: activeNav === 'contact' ? '#0066FF' : 'inherit' }}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        overflow: 'hidden',
        padding: 0,
      }}>
        <div style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          animation: 'fadeIn 1s ease-in',
        }}>
          <h1 style={{
            fontSize: '5rem',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            color: 'white',
          }}>
            ABDUL
            <br />
            <span style={{ color: '#00CC66' }}>HAADI</span>
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '2rem',
          }}>
            Visual Artist | Video & Animation
          </p>
          <button
            onClick={() => scrollToSection('work')}
            className="cta-button"
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#0066FF',
              color: 'white',
              fontWeight: 600,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            Explore Work
          </button>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          animation: 'bounce 2s infinite',
        }}>
          <svg style={{ width: '1.5rem', height: '1.5rem', color: '#00CC66' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
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
