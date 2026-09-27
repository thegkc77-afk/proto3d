import { motion } from 'framer-motion';
import { RotateCw, Sparkles, Palette, Smartphone, Shield, Zap, Layers, Cpu } from 'lucide-react';
import type { ProductFeature } from '../types/product';

interface FeatureSectionProps {
  features: ProductFeature[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  RotateCw,
  Sparkles,
  Palette,
  Smartphone,
  Shield,
  Zap,
  Layers,
  Cpu,
};

export function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <section id="features" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-widest font-mono mb-3">
          Interactive Capabilities
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading max-w-2xl">
          Engineered for Deep Product Exploration
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-xl mt-4">
          Discover why Proto3D delivers an unparalleled interactive visualization experience built on modern web standards.
        </p>
      </div>

      {/* Grid of 4 Core Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, idx) => {
          const IconComponent = ICON_MAP[feature.icon] || Sparkles;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-200/90 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
            >
              {/* Card Ambient Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {feature.highlight && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                      {feature.highlight}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 font-heading group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-slate-500 group-hover:text-indigo-600 transition-colors">
                <span>Explore Feature Details</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
