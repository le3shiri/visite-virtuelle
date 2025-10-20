// lib/fbpixel.js
// Facebook Pixel integration for Next.js App Router
// Only works in production mode (not localhost)

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1379895966809439';

// Check if we're in production mode
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' && 
         typeof window !== 'undefined' && 
         !window.location.hostname.includes('localhost') &&
         !window.location.hostname.includes('127.0.0.1');
};

// Initialize Facebook Pixel
export const pageview = () => {
  if (isProduction() && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

// Track custom events
export const event = (name, options = {}) => {
  if (isProduction() && window.fbq) {
    window.fbq('track', name, options);
  }
};

// Common event helpers
export const trackAddToCart = (data = {}) => {
  event('AddToCart', {
    content_name: data.content_name || '',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    value: data.value || 0,
    currency: data.currency || 'USD',
    ...data
  });
};

export const trackPurchase = (data = {}) => {
  event('Purchase', {
    value: data.value || 0,
    currency: data.currency || 'USD',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    ...data
  });
};

export const trackLead = (data = {}) => {
  event('Lead', {
    content_name: data.content_name || '',
    content_category: data.content_category || '',
    value: data.value || 0,
    currency: data.currency || 'USD',
    ...data
  });
};

export const trackContact = (data = {}) => {
  event('Contact', {
    content_name: data.content_name || '',
    ...data
  });
};

export const trackSearch = (data = {}) => {
  event('Search', {
    search_string: data.search_string || '',
    content_category: data.content_category || '',
    ...data
  });
};

export const trackViewContent = (data = {}) => {
  event('ViewContent', {
    content_name: data.content_name || '',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    value: data.value || 0,
    currency: data.currency || 'USD',
    ...data
  });
};

export const trackCompleteRegistration = (data = {}) => {
  event('CompleteRegistration', {
    content_name: data.content_name || '',
    value: data.value || 0,
    currency: data.currency || 'USD',
    status: data.status || true,
    ...data
  });
};
