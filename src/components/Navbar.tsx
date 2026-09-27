import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.png';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Products', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav className="max-w-7xl mx-auto rounded-2xl glass-panel border border-neutral-800/80 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none">
          <img
            src={logoImg}
            alt="Proto3D Logo"
            className="w-10 h-10 object-contain rounded-lg group-hover:scale-105 transition-transform drop-shadow-sm"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-slate-900 font-heading leading-none">
              Proto<span className="text-indigo-600">3D</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">PROTOTYPE VISUALIZER</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-indigo-600 transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#showcase"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all duration-200 shadow-md hover:shadow-indigo-500/10 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Explore 3D</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-white/95 border border-slate-200 p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-800 hover:text-indigo-600 py-2 border-b border-slate-100 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </a>
            ))}

            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <span>Explore Product</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
