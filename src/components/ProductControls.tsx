import type { CameraPreset, LightingPreset } from '../types/product';
import {
  RotateCw,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Grid,
  Sun,
  Box,
} from 'lucide-react';

interface ProductControlsProps {
  activeView: CameraPreset;
  lightingPreset: LightingPreset;
  autoRotate: boolean;
  wireframe: boolean;
  showGrid: boolean;
  onSelectView: (view: CameraPreset) => void;
  onSelectLighting: (preset: LightingPreset) => void;
  onToggleAutoRotate: () => void;
  onToggleWireframe: () => void;
  onToggleGrid: () => void;
  onResetCamera: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const VIEW_PRESETS: { id: CameraPreset; label: string }[] = [
  { id: 'default', label: '360°' },
  { id: 'front', label: 'Front' },
  { id: 'side', label: 'Side' },
  { id: 'top', label: 'Top' },
  { id: 'detail', label: 'Detail' },
];

const LIGHTING_PRESETS: { id: LightingPreset; label: string }[] = [
  { id: 'studio', label: 'Studio' },
  { id: 'city', label: 'Daylight' },
  { id: 'sunset', label: 'Sunset' },
  { id: 'cyber', label: 'Cyber' },
];

export function ProductControls({
  activeView,
  lightingPreset,
  autoRotate,
  wireframe,
  showGrid,
  onSelectView,
  onSelectLighting,
  onToggleAutoRotate,
  onToggleWireframe,
  onToggleGrid,
  onResetCamera,
  onZoomIn,
  onZoomOut,
}: ProductControlsProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Top Floating Bar: View Angle Presets */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-1 overflow-x-auto py-1 px-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-500 px-2 uppercase tracking-wider hidden sm:inline">
            Camera:
          </span>
          {VIEW_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectView(preset.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                activeView === preset.id
                  ? 'bg-slate-900 text-white font-bold shadow-md scale-105'
                  : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Reset View Button */}
        <button
          onClick={onResetCamera}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
          title="Reset Camera to Default"
        >
          <RotateCcw className="w-3.5 h-3.5 text-indigo-600" />
          <span>Reset View</span>
        </button>
      </div>

      {/* Bottom Floating Toolbar: Interaction Tools & Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/90 border border-slate-200 shadow-sm backdrop-blur-md">
        {/* Navigation & Zoom Tools */}
        <div className="flex items-center gap-1.5">
          {/* Zoom In */}
          <button
            onClick={onZoomIn}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={onZoomOut}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-200"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={onToggleAutoRotate}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
              autoRotate
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
            title="Toggle 360° Auto Rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin text-indigo-600' : ''}`} />
            <span>Auto Rotate</span>
          </button>
        </div>

        {/* View Options & Lighting */}
        <div className="flex items-center gap-2">
          {/* Lighting Selector Dropdown/Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <Sun className="w-3.5 h-3.5 text-amber-500 ml-1.5 mr-0.5" />
            {LIGHTING_PRESETS.map((light) => (
              <button
                key={light.id}
                onClick={() => onSelectLighting(light.id)}
                className={`px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  lightingPreset === light.id
                    ? 'bg-white text-slate-900 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {light.label}
              </button>
            ))}
          </div>

          {/* Wireframe Mode Toggle */}
          <button
            onClick={onToggleWireframe}
            className={`p-2 rounded-xl transition-all border ${
              wireframe
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
            title="Toggle Wireframe Mesh View"
            aria-label="Toggle Wireframe Mesh View"
          >
            <Box className="w-4 h-4" />
          </button>

          {/* Grid Toggle */}
          <button
            onClick={onToggleGrid}
            className={`p-2 rounded-xl transition-all border ${
              showGrid
                ? 'bg-slate-200 text-slate-900 border-slate-300'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
            }`}
            title="Toggle Tech Floor Grid"
            aria-label="Toggle Tech Floor Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
