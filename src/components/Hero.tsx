import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Play, ShieldCheck, Cpu, RotateCw } from 'lucide-react';
import logoImg from '../assets/logo.png';

export function Hero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Background Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Brand Emblem Logo Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6 relative"
      >
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
        <img
          src={logoImg}
          alt="Proto3D Official Emblem"
          className="w-24 h-24 sm:w-28 sm:h-28 object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:scale-105 transition-transform duration-300"
        />
      </motion.div>


      {/* Top Innovation Pill */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 mb-6 shadow-md backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
        <span className="text-indigo-600 font-bold uppercase tracking-wider font-mono text-[11px]">Proto3D Engine v2.4</span>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="text-slate-600">Next-Gen Real-Time 3D Product Experience</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl font-heading leading-[1.1] mb-6"
      >
        Experience Products in{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          Real-Time 3D
        </span>
      </motion.h1>

      {/* Supporting Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed mb-8 font-normal"
      >
        Explore every detail. Rotate 360°, zoom, pan, and customize your product finish in real time with physically-based rendering.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="flex flex-col sm:flex-row items-center gap-4 mb-12"
      >
        <a
          href="#showcase"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm transition-all duration-200 shadow-xl hover:shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 group"
        >
          <span>Explore Product</span>
          <ArrowDown className="w-4 h-4 text-indigo-400 group-hover:translate-y-1 transition-transform" />
        </a>

        <a
          href="#features"
          className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Play className="w-4 h-4 text-indigo-600 fill-indigo-600" />
          <span>Interactive Features</span>
        </a>
      </motion.div>

      {/* Feature Highlights Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl w-full pt-4 border-t border-slate-200/80 text-left"
      >
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <RotateCw className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">360° Orbit View</div>
            <div className="text-[11px] text-slate-500">Sub-pixel drag control</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Live PBR Shaders</div>
            <div className="text-[11px] text-slate-500">6 Metallic colorways</div>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Interactive Zoom</div>
            <div className="text-[11px] text-slate-500">Full camera presets</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
