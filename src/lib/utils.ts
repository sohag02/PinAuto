import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const API_BASE_URL = 'http://localhost:5000';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '/placeholder.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}${imagePath}`;
};
