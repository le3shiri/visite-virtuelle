// lib/fbpixel.js
// Facebook Pixel integration for Next.js App Router
// Rebuilt with enhanced tracking capabilities

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1848322352445114';

// Check if we're in production mode
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' && 
         typeof window !== 'undefined' && 
         !window.location.hostname.includes('localhost') &&
         !window.location.hostname.includes('127.0.0.1');
};

// Log events in development for debugging
const logEvent = (eventName, data) => {
  if (!isProduction() && typeof window !== 'undefined') {
    console.log(`[FB Pixel - Dev Mode] ${eventName}:`, data);
  }
};

// Initialize Facebook Pixel - Page View
export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
    logEvent('PageView', {});
  }
};

// Track standard events
export const event = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options);
    logEvent(name, options);
  }
};

// Track custom events
export const customEvent = (name, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options);
    logEvent(`Custom: ${name}`, options);
  }
};

// === E-commerce Events ===

export const trackAddToCart = (data = {}) => {
  event('AddToCart', {
    content_name: data.content_name || '',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    value: data.value || 0,
    currency: data.currency || 'MAD',
    ...data
  });
};

export const trackPurchase = (data = {}) => {
  event('Purchase', {
    value: data.value || 0,
    currency: data.currency || 'MAD',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    ...data
  });
};

export const trackInitiateCheckout = (data = {}) => {
  event('InitiateCheckout', {
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    value: data.value || 0,
    currency: data.currency || 'MAD',
    num_items: data.num_items || 1,
    ...data
  });
};

// === Lead Generation Events ===

export const trackLead = (data = {}) => {
  event('Lead', {
    content_name: data.content_name || '',
    content_category: data.content_category || '',
    value: data.value || 0,
    currency: data.currency || 'MAD',
    ...data
  });
};

export const trackContact = (data = {}) => {
  event('Contact', {
    content_name: data.content_name || 'Contact Form',
    ...data
  });
};

export const trackSubmitApplication = (data = {}) => {
  event('SubmitApplication', {
    content_name: data.content_name || '',
    ...data
  });
};

// === Content & Engagement Events ===

export const trackViewContent = (data = {}) => {
  event('ViewContent', {
    content_name: data.content_name || '',
    content_ids: data.content_ids || [],
    content_type: data.content_type || 'product',
    value: data.value || 0,
    currency: data.currency || 'MAD',
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

export const trackCompleteRegistration = (data = {}) => {
  event('CompleteRegistration', {
    content_name: data.content_name || '',
    value: data.value || 0,
    currency: data.currency || 'MAD',
    status: data.status || true,
    ...data
  });
};

// === Custom Events for Virtual Tour Business ===

export const trackVirtualTourView = (tourName, category) => {
  customEvent('VirtualTourView', {
    tour_name: tourName,
    category: category,
  });
};

export const trackQuoteRequest = (packageName, value) => {
  event('Lead', {
    content_name: `Quote Request - ${packageName}`,
    content_category: 'Pricing',
    value: value || 0,
    currency: 'MAD',
  });
};

export const trackPortfolioView = (projectName) => {
  customEvent('PortfolioView', {
    project_name: projectName,
  });
};

export const trackPricingView = (packageName) => {
  customEvent('PricingView', {
    package_name: packageName,
  });
};

export const trackWhatsAppClick = () => {
  customEvent('WhatsAppClick', {
    source: 'Floating Button',
  });
};

export const trackPhoneClick = () => {
  customEvent('PhoneClick', {
    source: 'Contact Info',
  });
};

export const trackEmailClick = () => {
  customEvent('EmailClick', {
    source: 'Contact Info',
  });
};
