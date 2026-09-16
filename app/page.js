'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
      link: '#'
    },
    {
      id: 2,
      title: 'Project Title',
      description: 'Animation series examining ecological transformation.',
      year: '2024',
      category: 'Animation',
      link: '#'
    },
    {
      id: 3,
      title: 'Project Title',
      description: 'Visual narrative on land and memory in contemporary context.',
      year: '2023',
      category: 'Mixed Media',
      link: '#'
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
    <div className="w-full">
      {/* Navigation */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="gradient-text">HAADI</span>
          </div>
          <div className="flex gap-8 items-center">
            <button onClick={() => scrollToSection('home')} className={`nav-link ${activeNav === 'home' ? 'text-primary font-semibold' : ''}`}>Home</button>
            <button onClick={() => scrollToSection('about')} className={`nav-link ${activeNav === 'about' ? 'text-primary font-semibold' : ''}`}>About</button>
            <button onClick={() => scrollToSection('work')} className={`nav-link ${activeNav === 'work' ? 'text-primary font-semibold' : ''}`}>Work</button>
            <button onClick={() => scrollToSection('contact')} className={`nav-link ${activeNav === 'contact' ? 'text-primary font-semibold' : ''}`}>Contact</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 z-0">
          {/* Replace this with your video */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-dark to-dark opacity-60 z-10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-20">
              <div className="animate-fadeIn">
                <h1 className="text-7xl md:text-8xl font-bold text-light mb-6 leading-tight">
                  ABDUL
                  <br />
                  <span className="text-accent">HAADI</span>
                </h1>
                <p className="text-xl text-light/70 max-w-2xl mx-auto mb-8">
                  Visual Artist | Video & Animation
                </p>
                <button
                  onClick={() => scrollToSection('work')}
                  className="px-8 py-4 bg-primary text-light font-semibold rounded-full hover:bg-accent transition-all duration-300 hover:shadow-xl"
                >
                  Explore Work
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-light">
        <div className="max-w-4xl mx-auto">
          <div className="animate-slideUp">
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              <span className="gradient-text">About</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-xl text-dark/70 leading-relaxed mb-6">
                  Haadi is a Lahore-based visual artist working primarily in video and animation.
                </p>
                <p className="text-lg text-dark/60 leading-relaxed">
                  Their practice explores the intersecting ideas of politics, land, and ecology. Through imaginative visual narratives that resemble moving paintings, they create worlds that interrogate complex social and environmental themes.
                </p>
              </div>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Location</h3>
                  <p className="text-lg">Lahore, Pakistan</p>
                </div>
                <div className="border-l-4 border-accent pl-6">
                  <h3 className="text-accent font-semibold text-sm uppercase tracking-wider mb-2">Practice</h3>
                  <p className="text-lg">Video Art, Animation, Digital Media</p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h3 className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Focus</h3>
                  <p className="text-lg">Politics, Land, Ecology, Visual Narrative</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-24 px-6 bg-dark text-light">
        <div className="max-w-5xl mx-auto">
          <div className="animate-slideUp">
            <h2 className="text-5xl md:text-6xl font-bold mb-16">
              <span className="text-accent">Works</span>
            </h2>
            <div className="space-y-12">
              {projects.map((project, index) => (
                <div key={project.id} className="project-card group cursor-pointer">
                  <div className="border-b border-light/20 pb-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-2 group-hover:text-accent transition-colors">{project.title}</h3>
                        <p className="text-light/60">{project.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-semibold">{project.year}</p>
                        <p className="text-accent text-sm">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 pt-8 border-t border-light/20">
              <p className="text-light/50 text-sm">More works coming soon. Update with your project details and links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-light">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-slideUp">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <p className="text-xl text-dark/60 mb-12">
              Interested in collaborating or discussing work? Feel free to reach out.
            </p>

            <div className="space-y-6 mb-12">
              <div>
                <a
                  href="mailto:abdulhadi.tahir98@gmail.com"
                  className="text-2xl font-semibold text-primary hover:text-accent transition-colors"
                >
                  abdulhadi.tahir98@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="tel:+18046168110"
                  className="text-2xl font-semibold text-primary hover:text-accent transition-colors"
                >
                  +1 (804) 616-8110
                </a>
              </div>
            </div>

            <div className="flex justify-center gap-8 mb-12">
              <a href="#" className="text-primary hover:text-accent font-semibold transition-colors">Instagram</a>
              <a href="#" className="text-primary hover:text-accent font-semibold transition-colors">LinkedIn</a>
              <a href="#" className="text-primary hover:text-accent font-semibold transition-colors">Vimeo</a>
            </div>

            <div className="pt-8 border-t border-dark/10">
              <p className="text-sm text-dark/50">© 2024 Abdul Haadi. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
