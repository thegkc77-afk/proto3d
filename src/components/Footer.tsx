import { ArrowUp } from 'lucide-react';
import logoImg from '../assets/logo.png';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-200 bg-[#F8F9FA] pt-16 pb-12 px-4 sm:px-8 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-slate-200">
          {/* Logo & Tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="Proto3D Logo"
                className="w-10 h-10 object-contain rounded-lg drop-shadow-sm"
              />
              <span className="text-xl font-black text-slate-900 font-heading tracking-tight">
                Proto<span className="text-indigo-600">3D</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              Interactive 3D product visualizer built with React, Three.js, React Three Fiber, Drei, and Framer Motion.
            </p>
          </div>

          {/* Quick Links & Back To Top */}
          <div className="flex flex-wrap items-center gap-6">
            <a href="#showcase" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Showcase
            </a>
            <a href="#features" className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-semibold border border-slate-200 transition-all shadow-xs ml-2"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>
        </div>

        {/* Bottom Rights & Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Proto3D Inc. Built for modern product visualization.</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              WebGL Render Engine Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
