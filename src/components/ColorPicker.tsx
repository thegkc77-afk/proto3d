import type { ColorOption } from '../types/product';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export function ColorPicker({
  colors,
  selectedColor,
  onSelectColor,
}: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
          Product Color finish
        </span>
        <span className="text-xs font-medium text-indigo-400 flex items-center gap-1.5 font-mono">
          <span>{selectedColor.name}</span>
          {selectedColor.badge && (
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-sans">
              {selectedColor.badge}
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-3 py-1 overflow-x-auto">
        {colors.map((color) => {
          const isSelected = selectedColor.id === color.id;
          return (
            <button
              key={color.id}
              onClick={() => onSelectColor(color)}
              aria-label={`Select color ${color.name}`}
              className="relative group p-0.5 focus:outline-none"
            >
              {/* Animated Ring Indicator when Selected */}
              {isSelected && (
                <motion.div
                  layoutId="selectedColorRing"
                  className="absolute -inset-1.5 rounded-full border-2 border-indigo-400 shadow-lg shadow-indigo-500/20"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              {/* Color Swatch Dot */}
              <div
                className={`relative w-9 h-9 rounded-full transition-transform duration-200 group-hover:scale-110 flex items-center justify-center shadow-md border ${
                  color.hex === '#F8FAFC' || color.hex === '#E2E8F0'
                    ? 'border-neutral-400/40 text-neutral-900'
                    : 'border-white/10 text-white'
                }`}
                style={{
                  backgroundColor: color.hex,
                }}
              >
                {/* Metallic Highlight Gloss */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

                {isSelected && (
                  <Check
                    className={`w-4 h-4 stroke-[3] ${
                      color.hex === '#F8FAFC' || color.hex === '#E2E8F0'
                        ? 'text-neutral-900'
                        : 'text-white'
                    }`}
                  />
                )}
              </div>

              {/* Tooltip on Hover */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20 whitespace-nowrap bg-neutral-900 text-neutral-200 text-[10px] py-0.5 px-2 rounded-md border border-neutral-800 shadow-lg">
                {color.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
