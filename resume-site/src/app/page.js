'use client';

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'
import CustomCursor from '@/components/CustomCursor'
import Hero from '@/components/Hero'

// Floating Particles Component
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated Gradient Orbs - Black and White
function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-white/[0.03] to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-white/[0.02] to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-gradient-to-tl from-white/[0.02] to-transparent rounded-full blur-3xl"
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  )
}

// Animated Section Component
function AnimatedSection({ children, className = '', delay = 0, id }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

// Animated Counter
function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const num = parseInt(value)
      const duration = 2000
      const steps = 60
      const increment = num / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= num) {
          setCount(num)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Home() {

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume/resume.pdf'
    link.download = 'Gabriel_Udoh_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Skills data
  const skills = [
    { name: 'React / Next.js', level: 90, icon: '⚛️' },
    { name: 'JavaScript / TypeScript', level: 88, icon: '📜' },
    { name: 'Node.js / Express', level: 82, icon: '🟢' },
    { name: 'Python / Django', level: 75, icon: '🐍' },
    { name: 'UI/UX Design', level: 85, icon: '🎨' },
    { name: 'Database / SQL', level: 78, icon: '🗄️' },
  ]

  // Experience data
  const experience = [
    {
      role: 'Full Software Developer',
      company: 'AVS Studio | Remote',
      period: 'Feb 2025 – Present',
      description: 'Built the On-The-Go Mobile App using React Native & Node.js, enabling real-time services and boosting user adoption across Android/iOS. Designed and deployed multiple interactive dashboards for analytics and reporting. Integrated secure backend services with Express.js, PHP, and Laravel.',
      highlights: ['React Native', 'Node.js', 'Next.js', 'TypeScript', 'Laravel', 'Framer UI']
    },
    {
      role: 'Web Developer & Instructor',
      company: 'JavaPlus Innovation | Lagos',
      period: 'Jul 2023 – Jan 2025',
      description: 'Developed and maintained web platforms using React, Next.js, and Node.js, improving scalability and responsiveness. Designed a student learning portal with real-time assessments. Conducted coding workshops and mentorship programs improving trainee job placement rates.',
      highlights: ['React', 'Next.js', 'Node.js', 'LaTeX & TikZ', 'Performance Optimization']
    },
    {
      role: 'Software Developer',
      company: 'Fast Plus Innovation | Lagos',
      period: 'Oct 2022 – Apr 2023',
      description: 'Delivered a Finance SaaS application with Laravel & React, enabling secure transactions and analytics dashboards. Built a Digital Library System with PHP, Laravel, and MySQL. Migrated and optimized MySQL queries, reducing response time by 40%.',
      highlights: ['Laravel', 'React', 'PHP', 'MySQL', 'API Development']
    },
    {
      role: 'Software Developer (Internship)',
      company: 'First Lincoln Technology | Lagos',
      period: '2020 – 2022',
      description: 'Contributed to the development of e-commerce platforms using Laravel, WordPress, and React. Developed dynamic front-end UIs with React, JavaScript, and Bootstrap. Designed custom WordPress themes and plugins tailored to client branding needs.',
      highlights: ['Laravel', 'WordPress', 'React', 'Bootstrap', 'E-commerce']
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <GradientOrbs />
      <FloatingParticles />
      <CustomCursor />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/80 border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <motion.div
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-white">Gabriel</span>
            <span className="text-gray-500"> Udoh</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-10">
            {['About', 'Skills', 'Experience', 'Resume'].map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-gray-400 hover:text-white transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
          <motion.button
            onClick={handleDownload}
            className="relative inline-flex items-center gap-3 px-6 py-2 bg-white text-black text-sm font-semibold rounded-full border border-transparent overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)] hover:pr-8 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero handleDownload={handleDownload} />

        {/* About Section */}
        <AnimatedSection id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.span
                  className="inline-block text-sm text-gray-400 uppercase tracking-widest mb-6 font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Crafting Digital
                  <span className="block text-gray-400">Experiences</span>
                </h2>
                <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                  <p>
                    I'm a passionate software developer with over 5 years of experience
                    in creating innovative web solutions. My journey in tech started with
                    a curiosity about how things work, which evolved into a career dedicated
                    to building products that make a difference.
                  </p>
                  <p>
                    I specialize in full-stack development, combining robust backend
                    architectures with intuitive frontend experiences. I believe in
                    writing clean, maintainable code and staying up-to-date with the
                    latest industry trends and best practices.
                  </p>
                  <p>
                    Beyond coding, I'm an advocate for continuous learning and knowledge
                    sharing. I enjoy mentoring junior developers, contributing to open-source
                    projects, and participating in tech communities. When I'm not at my
                    computer, you'll find me exploring new technologies, reading about
                    software architecture, or working on side projects.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
                  {[
                    { value: '5', suffix: '+', label: 'Years Experience' },
                    { value: '50', suffix: '+', label: 'Projects Completed' },
                    { value: '30', suffix: '+', label: 'Happy Clients' },
                    { value: '99', suffix: '%', label: 'Satisfaction Rate' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 rounded-3xl"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-neutral-900 to-black rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <motion.div
                      className="text-center p-8"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-2 border-white/20 relative">
                        <Image
                          src="/profile.jpg"
                          alt="Gabriel Udoh"
                          fill
                          className="object-cover object-top"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </div>
                      <p className="text-2xl font-bold mb-2">Gabriel Udoh</p>
                      <p className="text-gray-500">Software Developer</p>
                    </motion.div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-white/10"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center text-xl border border-white/20"
                  animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                  🚀
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" className="py-32 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <motion.span
                className="inline-block text-sm text-gray-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                My Expertise
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Skills & <span className="text-gray-400">Technologies</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{skill.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white text-lg">{skill.name}</span>
                        <span className="text-sm text-gray-400 font-medium">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-white to-gray-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <motion.span
                className="inline-block text-sm text-gray-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Career Journey
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Work <span className="text-gray-400">Experience</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-10 sm:pl-12 pb-12 sm:pb-16 last:pb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-[14px] sm:left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-white via-white/20 to-transparent"></div>

                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-lg shadow-white/10"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <span className="font-bold text-xs sm:text-sm">{index + 1}</span>
                  </motion.div>

                  <motion.div
                    className="bg-white/[0.02] border border-white/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 ml-2 sm:ml-4 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start justify-between gap-2 sm:gap-4 mb-4">
                      <div>
                        <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-sm sm:text-base text-gray-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-gray-400 text-xs sm:text-sm font-medium rounded-full border border-white/10">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-4 sm:mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <span key={i} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/5 text-gray-300 text-xs sm:text-sm rounded-full border border-white/10">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Resume CTA Section */}
        <AnimatedSection id="resume" className="py-32 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <motion.span
                className="inline-block text-sm text-gray-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Full Document
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="text-gray-400">Resume</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                Ready to see the full picture? Download my resume to get a detailed overview of my experience, skills, and qualifications.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="relative inline-flex items-center gap-3 px-10 py-4 bg-white text-black text-lg font-semibold rounded-full border border-transparent overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)] hover:pr-12 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Full Resume
                </motion.button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection className="py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <motion.span
                className="inline-block text-sm text-gray-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                Let's Build Something
                <span className="block text-gray-400">Amazing Together</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative projects and bring creative ideas to life.
                Let's connect and create something extraordinary.
              </p>

              <div className="flex flex-wrap justify-center gap-5 mb-16">
                <motion.a
                  href="mailto:gabriel@example.com"
                  className="relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black font-semibold rounded-full border border-transparent overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)] hover:pr-10 group"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </motion.a>
                <motion.button
                  onClick={handleDownload}
                  className="relative inline-flex items-center gap-3 px-8 py-3 bg-transparent text-white font-semibold rounded-full border border-white/20 transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/5 hover:border-white hover:-translate-y-0.5"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </motion.button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-5">
                {[
                  { name: 'LinkedIn', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                  { name: 'GitHub', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
                  { name: 'Twitter', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                  { name: 'Dribbble', href: '#', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" /></svg> },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="p-5 text-gray-400 hover:text-white bg-white/5 hover:bg-white rounded-2xl border border-white/10 hover:border-white transition-all duration-300 hover:text-black"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Footer */}
        <footer className="py-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Gabriel Udoh. Crafted with passion.
              </p>
              <motion.p
                className="text-gray-600 text-sm flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Built with
                <motion.span
                  className="text-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ♥
                </motion.span>
                Next.js & Tailwind CSS
              </motion.p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
