export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  roughness: number;
  metalness: number;
  accentHex: string;
  badge?: string;
}

export interface ProductSpec {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlight?: string;
}

export type CameraPreset = 'default' | 'front' | 'side' | 'top' | 'detail';

export type LightingPreset = 'studio' | 'city' | 'sunset' | 'cyber';

export interface ProductData {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  description: string;
  price: number;
  formattedPrice: string;
  rating: number;
  reviewsCount: number;
  category: string;
  colors: ColorOption[];
  specs: ProductSpec[];
  features: ProductFeature[];
}
