import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  specs: {
    general: {
      model: string;
      brand: string;
      releaseDate: string;
      status: string;
    };
    build: {
      dimensions: string;
      weight: string;
      build: string;
      sim: string;
    };
    display: {
      type: string;
      size: string;
      resolution: string;
      protection: string;
    };
    os: {
      os: string;
      ui: string;
    };
    processor: {
      chipset: string;
      cpu: string;
      gpu: string;
    };
    memory: {
      ram: string;
      internal: string;
      cardSlot: string;
    };
    camera: {
      main: string;
      telephoto: string;
      ultraWide: string;
      features: string;
      video: string;
      selfie: string;
      selfieVideo: string;
    };
    connectivity: {
      fiveG: string;
      fourG: string;
      threeG: string;
      twoG: string;
      wlan: string;
      bluetooth: string;
      gps: string;
      nfc: string;
      usb: string;
    };
    battery: {
      type: string;
      charging: string;
      wireless: string;
    };
    sensors: {
      sensors: string;
    };
  };
  aiInsights: string;
  rating: number;
}

export { MOCK_PHONES } from './data';
