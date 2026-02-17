// src/lib/services/serviceColors.ts

export const SERVICE_COLOR_MAP: Record<string, string> = {
  "Hard Services": "#5C677D",
  "Soft Services": "#D4AF37",
  "Ground Services": "#4CAF50",
  "Engineering Services": "#007ACC",
  "Catering Services": "#C69C6D",
  "Special Projects Services": "#6C63FF",
};

// Random 
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 55%)`;
}

// Resolver 
export function resolveServiceColor(serviceNameEn: string): string {
  return (
    SERVICE_COLOR_MAP[serviceNameEn] ||
    stringToColor(serviceNameEn)
  );
}
