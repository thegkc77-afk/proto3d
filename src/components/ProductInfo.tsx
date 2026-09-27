import { useState } from 'react';
import type { ProductData, ColorOption } from '../types/product';
import { ColorPicker } from './ColorPicker';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Zap,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface ProductInfoProps {
  product: ProductData;
  selectedColor: ColorOption;
  onSelectColor: (color: ColorOption) => void;
}

export function ProductInfo({
  product,
  selectedColor,
  onSelectColor,
}: ProductInfoProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');
  const [isOrdered, setIsOrdered] = useState(false);

  const handleOrder = () => {
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 4000);
  };

  return (
    <div className="flex flex-col gap-6 w-full bg-white/90 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Background Accent Mesh Glow */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none opacity-15 transition-all duration-500"
        style={{ backgroundColor: selectedColor.accentHex }}
      />

      {/* Category Badge & Rating */}
      <div className="flex items-center justify-between gap-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-widest font-mono">
          {product.category}
        </span>
        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-semibold bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
          <span>{product.rating}</span>
          <span className="text-slate-400">({product.reviewsCount})</span>
        </div>
      </div>

      {/* Main Title & Price */}
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {product.name}
          </h1>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {product.formattedPrice}
          </div>
        </div>
        <p className="text-sm font-semibold text-indigo-600 tracking-wide">
          {product.tagline}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
          {product.description}
        </p>
      </div>

      {/* Navigation Tabs: Overview vs Specifications */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'overview'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview & Finish
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'specs'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Technical Specifications
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Real-time Color Customization Picker */}
            <ColorPicker
              colors={product.colors}
              selectedColor={selectedColor}
              onSelectColor={onSelectColor}
            />

            {/* Core Specs Highlights Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Structure
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  Aerospace Titanium
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Net Weight
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  1.2 kg (with Stand)
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Driver Unit
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  50mm Beryllium
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Battery Life
                </span>
                <span className="text-xs font-semibold text-slate-800">
                  40 Hours Playback
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 py-1 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin"
          >
            {product.specs.map((spec) => (
              <div
                key={spec.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600">
                    {spec.label}
                  </span>
                  <span className="text-xs font-bold text-slate-900 font-mono">
                    {spec.value}
                  </span>
                </div>
                {spec.description && (
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {spec.description}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons: Add to Cart & Buy Now */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
        <button
          onClick={handleOrder}
          disabled={isOrdered}
          className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 group"
        >
          {isOrdered ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
              <span>Added to Bag!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform text-indigo-300" />
              <span>Configure & Order</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </>
          )}
        </button>

        <button className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 transition-all flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>Express Checkout</span>
        </button>
      </div>

      {/* Guarantee & Confidence Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-600 font-medium">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span>Free Express Shipping</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span>2-Year Warranty</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <RotateCcw className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
          <span>30-Day Risk-Free Trial</span>
        </div>
      </div>
    </div>
  );
}
