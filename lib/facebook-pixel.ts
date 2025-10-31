export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '1848322352445114'

declare global {
  interface Window {
    fbq: any
    _fbq: any
  }
}

export const pageview = () => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

// Standard events
export const trackEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options)
  }
}

// Custom events
export const trackCustomEvent = (name: string, options = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', name, options)
  }
}

// Common e-commerce events
export const trackViewContent = (contentName: string, contentCategory?: string, value?: number) => {
  trackEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    value: value,
    currency: 'MAD',
  })
}

export const trackContact = () => {
  trackEvent('Contact')
}

export const trackLead = (value?: number) => {
  trackEvent('Lead', {
    value: value,
    currency: 'MAD',
  })
}

export const trackInitiateCheckout = (value?: number) => {
  trackEvent('InitiateCheckout', {
    value: value,
    currency: 'MAD',
  })
}

export const trackPurchase = (value: number, contentName?: string) => {
  trackEvent('Purchase', {
    value: value,
    currency: 'MAD',
    content_name: contentName,
  })
}

export const trackSearch = (searchString: string) => {
  trackEvent('Search', {
    search_string: searchString,
  })
}
