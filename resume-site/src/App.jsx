import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion'
import './App.css'

// Floating Particles Component
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
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

// Animated Gradient Orbs
function GradientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
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
        className="absolute top-1/3 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl"
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
        className="absolute -bottom-40 right-1/3 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl"
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

// Animated Section Component with better animations
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

// Text Reveal Animation
function TextReveal({ children, className = '', delay = 0 }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
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

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
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
      role: 'Senior Software Developer',
      company: 'Tech Innovation Labs',
      period: '2022 - Present',
      description: 'Leading a team of developers in building scalable enterprise applications. Architecting microservices solutions and implementing CI/CD pipelines.',
      highlights: ['Team Leadership', 'System Architecture', 'Performance Optimization']
    },
    {
      role: 'Full Stack Developer',
      company: 'Digital Solutions Inc.',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client-facing web applications. Collaborated with design teams to implement pixel-perfect responsive interfaces.',
      highlights: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      role: 'Frontend Developer',
      company: 'Creative Agency Pro',
      period: '2018 - 2020',
      description: 'Created stunning user interfaces for various clients ranging from startups to Fortune 500 companies. Focused on accessibility and performance.',
      highlights: ['UI Development', 'Animation', 'A11y']
    },
  ]

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      {/* Animated Background */}
      <GradientOrbs />
      <FloatingParticles />

      {/* Cursor Glow Effect */}
      <motion.div
        className="fixed w-[500px] h-[500px] pointer-events-none z-0 opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-[#050505]/70 border-b border-white/5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">
          <motion.div
            className="text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Gabriel</span>
            <span className="text-gray-600"> Udoh</span>
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </div>
          <motion.button
            onClick={handleDownload}
            className="px-6 py-2.5 bg-gradient-to-r from-white to-gray-200 text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
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
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">
            <div className="max-w-5xl">
              <motion.div
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-white/10 to-white/5 border border-white/10 rounded-full mb-10"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <motion.span
                  className="relative flex h-2.5 w-2.5"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </motion.span>
                <span className="text-sm text-gray-300 font-medium">Available for new opportunities</span>
              </motion.div>

              <motion.p
                className="text-gray-500 text-xl mb-4 font-medium tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Hello, I'm
              </motion.p>

              <motion.h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Gabriel</span>
                <br />
                <span className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 bg-clip-text text-transparent">Udoh</span>
              </motion.h1>

              <motion.div
                className="flex flex-wrap items-center gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">Software Developer</span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">Full Stack Engineer</span>
                <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">Problem Solver</span>
              </motion.div>

              <motion.p
                className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                I transform complex problems into elegant, user-centric solutions.
                With a passion for clean code and pixel-perfect design, I create
                digital experiences that make a lasting impact.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume
                </motion.button>

                <motion.a
                  href="#resume"
                  className="group flex items-center gap-3 px-8 py-4 bg-white/5 text-white font-semibold rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Resume
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <AnimatedSection id="about" className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <motion.span
                  className="inline-block text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  About Me
                </motion.span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                  Crafting Digital
                  <span className="block bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Experiences</span>
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
                      <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20 rounded-3xl"></div>
                  <div className="absolute inset-4 bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden">
                    <motion.div
                      className="text-center p-8"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-40 h-40 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center text-7xl border border-white/10">
                        <motion.span
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          👨‍💻
                        </motion.span>
                      </div>
                      <p className="text-2xl font-bold mb-2">Gabriel Udoh</p>
                      <p className="text-gray-500">Software Developer</p>
                    </motion.div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30"
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ⚡
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-cyan-500/30"
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
        <AnimatedSection id="skills" className="py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <motion.span
                className="inline-block text-sm text-cyan-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                My Expertise
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Skills & <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Technologies</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl hover:border-white/20 transition-all duration-500"
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
                      className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 rounded-full bg-[length:200%_100%]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      style={{
                        animation: 'shimmer 2s linear infinite',
                      }}
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
                className="inline-block text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Career Journey
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Work <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="relative pl-12 pb-16 last:pb-0"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Timeline line */}
                  <div className="absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-white/20 to-transparent"></div>

                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 top-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-white/5 to-transparent border border-white/5 rounded-3xl p-8 ml-4 hover:border-white/20 transition-all duration-500"
                    whileHover={{ x: 10 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                        <p className="text-purple-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="px-4 py-2 bg-white/5 text-gray-400 text-sm font-medium rounded-full border border-white/10">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <span key={i} className="px-3 py-1 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-300 text-sm rounded-full border border-purple-500/20">
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

        {/* Resume PDF Section */}
        <AnimatedSection id="resume" className="py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <motion.span
                className="inline-block text-sm text-cyan-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Full Document
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                My <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Resume</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                View my complete professional resume below or download it for your records.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <motion.div
                className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl overflow-hidden"
                whileHover={{ borderColor: 'rgba(255,255,255,0.2)' }}
                transition={{ duration: 0.3 }}
              >
                {/* PDF Viewer Header */}
                <div className="flex items-center justify-between px-8 py-5 bg-[#0a0a0a] border-b border-white/5">
                  <div className="flex items-center gap-5">
                    <div className="flex gap-2">
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] cursor-pointer"
                        whileHover={{ scale: 1.3 }}
                      />
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] cursor-pointer"
                        whileHover={{ scale: 1.3 }}
                      />
                      <motion.div
                        className="w-3.5 h-3.5 rounded-full bg-[#28ca42] cursor-pointer"
                        whileHover={{ scale: 1.3 }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 font-medium hidden sm:inline">Gabriel_Udoh_Resume.pdf</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={() => window.open('/resume.pdf', '_blank')}
                      className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Open in new tab"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={handleDownload}
                      className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Download"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </motion.button>
                  </div>
                </div>

                {/* PDF Container */}
                <div className="relative bg-[#111]" style={{ minHeight: '75vh' }}>
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-[#111] z-10"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex flex-col items-center gap-6">
                          <div className="relative">
                            <motion.div
                              className="w-16 h-16 border-4 border-white/10 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <motion.div
                              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                          </div>
                          <span className="text-gray-400 font-medium">Loading resume...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <iframe
                    src="/resume.pdf"
                    className="w-full h-full"
                    style={{ minHeight: '75vh' }}
                    title="Gabriel Udoh Resume"
                    onLoad={() => setIsLoading(false)}
                  />
                </div>
              </motion.div>

              {/* Download CTA */}
              <motion.div
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.button
                  onClick={handleDownload}
                  className="group inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                className="inline-block text-sm text-purple-400 uppercase tracking-widest mb-6 font-semibold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                Let's Build Something
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Amazing Together</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
                I'm always excited to collaborate on innovative projects and bring creative ideas to life.
                Let's connect and create something extraordinary.
              </p>

              <div className="flex flex-wrap justify-center gap-5 mb-16">
                <motion.a
                  href="mailto:gabriel@example.com"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Email
                </motion.a>
                <motion.button
                  onClick={handleDownload}
                  className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-2xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
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
                    className="p-5 text-gray-400 hover:text-white bg-white/5 hover:bg-gradient-to-br hover:from-purple-500/10 hover:to-cyan-500/10 rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300"
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
        <footer className="py-10 border-t border-white/5">
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
                  className="text-red-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
                React & Tailwind CSS
              </motion.p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
