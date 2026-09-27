import { motion } from 'framer-motion';
import { Code2, Box, Cpu, Sparkles, Layers, ShieldCheck, Terminal } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
}

const TECH_STACK: TechItem[] = [
  {
    name: 'React',
    category: 'UI Architecture',
    description: 'Powers declarative component composition, reactive state management, and seamless UI transitions.',
    icon: Code2,
    badge: 'v19.0',
  },
  {
    name: 'TypeScript',
    category: 'Type Safety',
    description: 'Enforces strict data interfaces, model types, and robust compile-time error checking.',
    icon: Terminal,
    badge: 'v5.6',
  },
  {
    name: 'Three.js',
    category: '3D Graphics Engine',
    description: 'Core WebGL graphics library handling scenes, perspective camera projections, PBR lighting, and mesh geometry.',
    icon: Box,
    badge: 'WebGL2',
  },
  {
    name: 'React Three Fiber',
    category: 'R3F Renderer',
    description: 'Bridges Three.js scene graph directly into React lifecycle with high-performance render loops.',
    icon: Cpu,
    badge: 'r3f',
  },
  {
    name: 'Drei',
    category: '3D Helper Library',
    description: 'Provides OrbitControls camera physics, studio environment lighting, contact shadows, and GLTF preloading.',
    icon: Layers,
    badge: 'drei',
  },
  {
    name: 'Framer Motion',
    category: 'Animation Engine',
    description: 'Drives butter-smooth UI spring animations, entrance transitions, and color picker layout feedback.',
    icon: Sparkles,
    badge: 'Motion',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling & Design System',
    description: 'Delivers responsive layouts, glassmorphism panel backdrops, dark mode aesthetics, and crisp typography.',
    icon: ShieldCheck,
    badge: 'v4.0',
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-neutral-800/80">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-widest font-mono mb-3">
          Architecture & Stack
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading max-w-2xl">
          Powered by Industry Standard Web Tech
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base max-w-xl mt-4">
          Proto3D combines real-time WebGL rendering with modern reactive frontend technologies for ultra-fast load times.
        </p>
      </div>

      {/* Grid of 7 Technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TECH_STACK.map((tech, idx) => {
          const IconComp = tech.icon;
          return (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card p-6 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-md">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                    {tech.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 font-heading group-hover:text-indigo-300 transition-colors">
                  {tech.name}
                </h3>
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3 font-mono">
                  {tech.category}
                </span>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
