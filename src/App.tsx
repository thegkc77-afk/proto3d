import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductViewer } from './components/ProductViewer';
import { ProductControls } from './components/ProductControls';
import { ProductInfo } from './components/ProductInfo';
import { FeatureSection } from './components/FeatureSection';
import { Footer } from './components/Footer';
import { PROTO_PRODUCT_DATA } from './data/productData';
import { useProductCustomization } from './hooks/useProductCustomization';

export function App() {
  const customization = useProductCustomization();

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Header Section */}
      <Hero />

      {/* Main 3D Product Interactive Showcase Section */}
      <section
        id="showcase"
        className="py-10 px-4 sm:px-8 max-w-7xl mx-auto w-full scroll-mt-28"
      >
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest font-mono">
              Live 3D Viewport
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Interactive Product Studio
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Drag to rotate 360°, scroll to zoom, or select a preset view angle and finish below.
          </p>
        </div>

        {/* 2-Column Desktop Layout / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Viewer & Controls Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            <ProductViewer
              color={customization.selectedColor}
              activeView={customization.activeView}
              lightingPreset={customization.lightingPreset}
              autoRotate={customization.autoRotate}
              wireframe={customization.wireframe}
              showGrid={customization.showGrid}
              zoomCount={customization.zoomCount}
            />
            <ProductControls
              activeView={customization.activeView}
              lightingPreset={customization.lightingPreset}
              autoRotate={customization.autoRotate}
              wireframe={customization.wireframe}
              showGrid={customization.showGrid}
              onSelectView={customization.setCameraView}
              onSelectLighting={customization.setLightingPreset}
              onToggleAutoRotate={customization.toggleAutoRotate}
              onToggleWireframe={customization.toggleWireframe}
              onToggleGrid={customization.toggleGrid}
              onResetCamera={customization.resetCamera}
              onZoomIn={customization.zoomIn}
              onZoomOut={customization.zoomOut}
            />
          </div>

          {/* Product Info & Color Customizer Column (5 Cols) */}
          <div id="product" className="lg:col-span-5 flex flex-col gap-6 w-full scroll-mt-28">
            <ProductInfo
              product={PROTO_PRODUCT_DATA}
              selectedColor={customization.selectedColor}
              onSelectColor={customization.setColor}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureSection features={PROTO_PRODUCT_DATA.features} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
