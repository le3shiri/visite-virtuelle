// global.d.ts
// TypeScript global type definitions

interface Window {
  fbq: (action: string, event: string, data?: Record<string, any>) => void;
  _fbq: any;
}
