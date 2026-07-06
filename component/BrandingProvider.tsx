'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const BrandingContext = createContext<any>(null);

export const useBranding = () => useContext(BrandingContext);

export default function BrandingProvider({ children }: { children: React.ReactNode }) {
  const [branding, setBranding] = useState<any>(null);

  useEffect(() => {
    const fetchBranding = async () => {
      try {
        const { data } = await axios.get('/api/branding');
        if (data.success && data.data) {
          setBranding(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch branding data", err);
      }
    };
    fetchBranding();
  }, []);

  useEffect(() => {
    if (branding?.favicon) {
      // Dynamically update the favicon
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = branding.favicon;
    }
  }, [branding?.favicon]);

  if (!branding) return <>{children}</>;

  // A helper function to slightly darken a hex color (very basic implementation)
  const darkenHex = (hex: string, amount: number = 20) => {
    let color = hex.replace('#', '');
    if (color.length === 3) color = color.split('').map(c => c + c).join('');
    let num = parseInt(color, 16);
    let r = (num >> 16) - amount;
    let b = ((num >> 8) & 0x00FF) - amount;
    let g = (num & 0x0000FF) - amount;
    r = Math.max(Math.min(255, r), 0);
    b = Math.max(Math.min(255, b), 0);
    g = Math.max(Math.min(255, g), 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
  };

  const primaryColor = branding.primaryColor || '#9EE939';
  const primaryColorDark = darkenHex(primaryColor, 30);
  const primaryColorDarker = darkenHex(primaryColor, 50);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --color-primary-300: ${primaryColor};
          --color-primary-400: ${primaryColor};
          --color-primary-500: ${primaryColorDark};
          --color-primary-600: ${primaryColorDarker};
          
          --color-dark-bg: ${branding.surfaceBackdrop || '#101415'};
          --color-dark-surface: ${darkenHex(branding.surfaceBackdrop || '#101415', -10)};
        }
      `}} />
      <BrandingContext.Provider value={branding}>
        {children}
      </BrandingContext.Provider>
    </>
  );
}
