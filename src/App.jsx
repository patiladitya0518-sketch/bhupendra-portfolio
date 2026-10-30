import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Menu, X, Code2, Layers3, Sparkles } from "lucide-react";


function CursorSmokeCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let width = 0, height = 0, raf = 0, lastX = null, lastY = null;
    const particles = [];
    const colors = ["#789b78", "#b87958", "#a8c4a2", "#d5a58a"];
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth; height = window.innerHeight;
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px"; canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const move = (e) => {
      const x = e.clientX, y = e.clientY;
      if (lastX !== null && Math.hypot(x-lastX,y-lastY)>5) {
        particles.push({x,y,vx:(Math.random()-.5)*.55,vy:-.35-Math.random()*.65,r:1.5+Math.random()*2.8,life:1,decay:.012+Math.random()*.009,color:colors[Math.floor(Math.random()*colors.length)],twinkle:Math.random()*Math.PI*2});
      }
      lastX=x; lastY=y;
      if(particles.length>48) particles.splice(0,particles.length-48);
    };
    const draw = () => {
      ctx.clearRect(0,0,width,height);
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i]; p.x+=p.vx; p.y+=p.vy; p.vx*=.99; p.vy*=.99; p.life-=p.decay; p.twinkle+=.12;
        if(p.life<=0){particles.splice(i,1);continue;}
        const alpha=Math.max(0,p.life)*(.45+.35*Math.sin(p.twinkle));
        ctx.globalAlpha=alpha; ctx.fillStyle=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r*p.life,0,Math.PI*2); ctx.fill();
        if(p.r>3){ctx.strokeStyle=p.color;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(p.x-3,p.y);ctx.lineTo(p.x+3,p.y);ctx.moveTo(p.x,p.y-3);ctx.lineTo(p.x,p.y+3);ctx.stroke();}
      }
      ctx.globalAlpha=1; raf=requestAnimationFrame(draw);
    };
    resize(); window.addEventListener("resize",resize,{passive:true}); window.addEventListener("pointermove",move,{passive:true}); raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("pointermove",move);};
  },[]);
  return <canvas ref={canvasRef} className="smoke-trail-canvas soft-particle-trail" aria-hidden="true" />;
}


const projects = [
  {
    number: "01",
    name: "TraceMate",
    type: "AI-Powered Lost & Found Platform",
    description: "A lost-and-found platform that helps people report missing items and discover potential matches using image, text, and visual-detail signals.",
    tags: ["React", "JavaScript", "AI Matching"],
    color: "violet",
    icon: "⌕",
    url: "https://github.com/ProjectTesting18/TraceMate18"
  },
  {
    number: "02",
    name: "MarketIQ",
    type: "AI Trading & Market Analysis Assistant",
    description: "An AI trading assistant concept for Indian markets, bringing together technical indicators, candlestick patterns, market structure, and explainable signals.",
    tags: ["Next.js", "Python", "Finance"],
    color: "cyan",
    icon: "↗",
    url: "https://github.com/patiladitya0518-sketch/MarketIQ"
  },
  {
    number: "03",
    name: "Body Fixer Fitness",
    type: "Fitness & Wellness Website",
    description: "A responsive fitness website with workout programs, nutrition plans, a calorie calculator, water-intake tracking, saved plans, sign-in, and a demo fitness assistant.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    color: "pink",
    icon: "✦",
    url: "https://github.com/patiladitya0518-sketch/Body-Fixer-Fitness"
  },
  {
    number: "04",
    name: "Real Estate Voice Agent",
    type: "AI Voice Assistant · Appointment Booking",
    description: "A voice-based real-estate assistant built with Millis AI. It was designed to let prospective customers speak naturally, ask about property details, and arrange appointments or property visits without needing to call an agent manually.",
    tags: ["Millis AI", "Voice AI", "Real Estate", "Appointment Booking"],
    color: "violet",
    icon: "🎙",
    note: "The original demo token has expired, so the live voice demo is currently unavailable. This card documents the project's purpose; no access token is exposed."
  }
];
const skills = ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React", "Next.js", "PHP", "MySQL", "Python", "Git", "Millis AI", "REST APIs", "Prompt Engineering"] ;

function Reveal({ children, className = "", delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay, ease: "easeOut" }}>{children}</motion.div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollY, setScrollY] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["AI Voice & Chatbot Developer", "UI/UX Design Explorer", "Website Developer", "Website Publishing & Deployment", "Frontend Developer", "Creative Problem Solver"] ;
  useEffect(() => {
    const scroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { window.removeEventListener("scroll", scroll); };
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => setRoleIndex(index => (index + 1) % roles.length), 2400);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const ids = ["home", "about", "projects", "skills", "contact"];
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-35% 0px -55% 0px" });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  const closeMenu = () => setMenuOpen(false);
  const nav = [["about", "About"], ["projects", "Projects"], ["skills", "Skills"], ["contact", "Contact"]];

  return <div className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <CursorSmokeCanvas />

    <header className="topbar">
      <a className="brand brand-avatar" href="#home" onClick={closeMenu} aria-label="Bhupendra Patil — home"><img src="/profile.jpg" alt="" /><span className="brand-name">Bhupendra Patil</span></a>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        {nav.map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#contact">Let's connect <ArrowUpRight size={16} /></a>
    </header>

    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .6 }}>
            <span className="status-dot" /> MCA STUDENT · ASPIRING DEVELOPER
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .1 }}>
            Turning ideas into <span className="gradient-text">digital experiences.</span>
          </motion.h1>
          <div className="role-line" aria-label={`Role: ${roles[roleIndex]}`}><span className="role-prefix">I create as a</span><span className="role-word-wrap"><AnimatePresence mode="wait"><motion.span key={roles[roleIndex]} className="role-word" initial={{ y: 22, opacity: 0, filter: "blur(7px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={{ y: -20, opacity: 0, filter: "blur(5px)" }} transition={{ duration: .42, ease: "easeOut" }}>{roles[roleIndex]}</motion.span></AnimatePresence></span></div>
          <motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35, duration: .8 }}>
            Hey, I'm <strong>Bhupendra Patil</strong>. I enjoy building responsive websites and practical applications with thoughtful design and useful technology.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .45 }}>
            <a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a>
            <a className="button button-quiet" href="#contact">Get in touch</a>
          </motion.div>
          <div className="hero-meta"><span><Code2 size={16} /> Responsive web experiences</span><span><Sparkles size={16} /> AI voice & chatbot projects</span><span><Layers3 size={16} /> UI/UX, deployment & publishing</span><span><Sparkles size={16} /> Always learning by building</span></div>
        </div>
        <motion.div className="hero-visual" onMouseMove={e => { const box = e.currentTarget.getBoundingClientRect(); const px = (e.clientX - box.left) / box.width - 0.5; const py = (e.clientY - box.top) / box.height - 0.5; const photo = e.currentTarget.querySelector(".profile-photo"); if (photo) photo.style.transform = "perspective(700px) rotateX(" + (-py * 9) + "deg) rotateY(" + (px * 11) + "deg) scale(1.045)"; }} onMouseLeave={e => { const photo = e.currentTarget.querySelector(".profile-photo"); if (photo) photo.style.transform = ""; }} initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .2 }}>
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="planet"><div className="planet-shine" /><div className="planet-grid" /></div>
          <div className="floating-label label-top"><span className="mini-dot cyan" /> Creative developer</div>
          <div className="floating-label label-bottom"><span className="label-icon"><Layers3 size={17} /></span><span><small>Currently building</small><b>Projects with purpose</b></span></div>
          <motion.div className="profile-photo-frame" animate={{ x: Math.min(scrollY * 0.045, typeof window !== "undefined" && window.innerWidth < 650 ? 8 : 42), y: Math.min(scrollY * 0.008, 9), rotate: Math.min(scrollY * 0.001, 0.8) }} transition={{ type: "spring", stiffness: 75, damping: 22 }}><img className="profile-photo" src="/profile.jpg" alt="Bhupendra Patil" /></motion.div>
        </motion.div>
      </section>

      <div className="quick-stats section-wrap" aria-label="Portfolio highlights">
        <div><strong>04</strong><span>Featured projects</span></div>
        <div><strong>AI + Web</strong><span>Areas of interest</span></div>
        <div><strong>Build · Learn</strong><span>My approach</span></div>
      </div>

      <section id="about" className="section-wrap section-block">
        <Reveal><div className="section-kicker">01 / ABOUT</div><h2>A little about <span className="gradient-text">me.</span></h2></Reveal>
        <div className="about-grid">
          <Reveal className="panel about-main"><h3>Curious by nature. <span className="muted">Builder by practice.</span></h3><p>I'm Bhupendra Patil, an MCA student interested in web development, software projects, and user-friendly digital experiences. I like learning by creating things, testing ideas, and improving them step by step.</p><p>My current focus is strengthening my frontend skills and learning how frontend and backend technologies work together to build useful applications.</p><a className="text-link" href="#projects">See what I'm working on <ArrowUpRight size={16}/></a></Reveal>
          <Reveal className="panel about-side" delay={.12}><div className="side-icon"><Sparkles /></div><h3>My approach</h3><ul><li>Keep the experience simple</li><li>Build, test, and improve</li><li>Learn something every day</li></ul></Reveal>
        </div>
      </section>

      <section id="projects" className="section-wrap section-block">
        <Reveal><div className="section-kicker">02 / SELECTED WORK</div><h2>Things I've <span className="gradient-text">worked on.</span></h2><p className="section-lead">A selection of projects I have built and explored. Open each GitHub repository to browse the source code.</p></Reveal>
        <div className="project-grid">{projects.map((p, i) => <Reveal key={p.name} delay={i * .1} className={`project-card ${p.color}`}>
          <div className="project-art"><span className="project-number">{p.number} / PROJECT</span><span className="project-symbol">{p.icon}</span><span className="art-ring ring-one" /><span className="art-ring ring-two" /></div>
          <div className="project-content"><p className="project-type">{p.type}</p><h3>{p.name}</h3><p className="project-description">{p.description}</p><div className="tag-list">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{p.url ? <a href={p.url} className="project-link" target="_blank" rel="noreferrer" aria-label={`View ${p.name} source code on GitHub`}>View source on GitHub <ArrowUpRight size={16}/></a> : <p className="project-note">{p.note}</p>}</div>
        </Reveal>)}</div>
      </section>

      <section id="skills" className="section-wrap section-block">
        <Reveal><div className="section-kicker">03 / TOOLKIT</div><h2>Tools I'm <span className="gradient-text">learning.</span></h2><p className="section-lead">Keep the skills that you can confidently explain and demonstrate.</p></Reveal>
        <Reveal className="panel skills-panel"><div className="skill-heading"><div className="skill-icon"><Code2 /></div><div><h3>Development toolkit</h3><p>Technologies and tools</p></div></div><div className="skill-list">{skills.map((s, i) => <span key={s} style={{ "--i": i }}>{s}</span>)}</div></Reveal>
      </section>

      <section id="contact" className="section-wrap section-block contact-section">
        <Reveal className="contact-panel"><div className="section-kicker">04 / CONTACT</div><h2>Let's make something <span className="gradient-text">useful.</span></h2><p>If you'd like to discuss a project, share an idea, or connect about web development and AI voice assistants, feel free to reach out.</p><div className="contact-details"><a className="contact-detail" href="mailto:Bhupendrapatil1218@gmail.com?subject=Portfolio%20Enquiry"><span className="contact-detail-icon"><Mail size={18}/></span><span><small>Email me</small><strong>Bhupendrapatil1218@gmail.com</strong></span><ArrowUpRight className="contact-detail-arrow" size={17}/></a><a className="contact-detail" href="tel:+919168919121"><span className="contact-detail-icon phone-icon">☎</span><span><small>Call me</small><strong>+91 91689 19121</strong></span><ArrowUpRight className="contact-detail-arrow" size={17}/></a></div><div className="education-card"><span className="education-label">EDUCATION</span><strong>Master of Computer Applications (MCA)</strong><span>Current studies</span><div className="education-divider"/><strong>Bachelor of Computer Science</strong><span>K.R.T. Arts, B.H. Commerce and A.M. Science College</span></div><div className="social-links"><a href="https://github.com/ProjectTesting18" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://github.com/patiladitya0518-sketch" target="_blank" rel="noreferrer">More projects ↗</a></div></Reveal>
      </section>
    </main>
    <footer className="footer"><a className="brand brand-avatar footer-brand-avatar" href="#home" aria-label="Bhupendra Patil — home"><img src="/profile.jpg" alt="" /><span className="brand-name">Bhupendra Patil</span></a><span>Designed and built by Bhupendra Patil · <span id="year">{new Date().getFullYear()}</span></span><a href="#home" className="back-top">Back to top ↑</a></footer>
  </div>;
}