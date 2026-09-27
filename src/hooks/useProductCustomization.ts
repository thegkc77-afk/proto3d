import { useState, useCallback } from 'react';
import type { ColorOption, CameraPreset, LightingPreset } from '../types/product';
import { PROTO_PRODUCT_DATA } from '../data/productData';

export interface UseProductCustomizationReturn {
  selectedColor: ColorOption;
  activeView: CameraPreset;
  lightingPreset: LightingPreset;
  autoRotate: boolean;
  wireframe: boolean;
  showGrid: boolean;
  zoomCount: number;
  setColor: (color: ColorOption) => void;
  setCameraView: (view: CameraPreset) => void;
  setLightingPreset: (preset: LightingPreset) => void;
  toggleAutoRotate: () => void;
  toggleWireframe: () => void;
  toggleGrid: () => void;
  resetCamera: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export function useProductCustomization(): UseProductCustomizationReturn {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    PROTO_PRODUCT_DATA.colors[0]
  );
  const [activeView, setActiveView] = useState<CameraPreset>('default');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('studio');
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomCount, setZoomCount] = useState<number>(0);

  const setColor = useCallback((color: ColorOption) => {
    setSelectedColor(color);
  }, []);

  const setCameraView = useCallback((view: CameraPreset) => {
    setActiveView(view);
  }, []);

  const toggleAutoRotate = useCallback(() => {
    setAutoRotate((prev) => !prev);
  }, []);

  const toggleWireframe = useCallback(() => {
    setWireframe((prev) => !prev);
  }, []);

  const toggleGrid = useCallback(() => {
    setShowGrid((prev) => !prev);
  }, []);

  const resetCamera = useCallback(() => {
    setActiveView('default');
    setAutoRotate(false);
    setZoomCount(0);
  }, []);

  const zoomIn = useCallback(() => {
    setZoomCount((prev) => prev - 1);
  }, []);

  const zoomOut = useCallback(() => {
    setZoomCount((prev) => prev + 1);
  }, []);

  return {
    selectedColor,
    activeView,
    lightingPreset,
    autoRotate,
    wireframe,
    showGrid,
    zoomCount,
    setColor,
    setCameraView,
    setLightingPreset,
    toggleAutoRotate,
    toggleWireframe,
    toggleGrid,
    resetCamera,
    zoomIn,
    zoomOut,
  };
}
