# Facebook Pixel Integration Guide

## Overview
This project has a complete Facebook Pixel integration rebuilt with enhanced tracking capabilities for your virtual tour business.

## Setup

### 1. Environment Variables
Add your Facebook Pixel ID to your `.env.local` file:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1379895966809439
```

### 2. Files Structure
```
lib/
  └── fbpixel.js          # Core tracking functions
components/
  ├── FacebookPixel.tsx        # Client-side tracking component
  └── FacebookPixelScript.tsx  # Pixel initialization script
app/
  └── layout.tsx          # Root layout with pixel integration
```

## Features

### Automatic Page View Tracking
- Tracks every page navigation automatically
- Works with Next.js App Router
- Only fires in production mode

### Development Mode Logging
- All events are logged to console in development
- Helps debug tracking without sending real data
- Format: `[FB Pixel - Dev Mode] EventName: {data}`

## Available Tracking Functions

### Standard E-commerce Events

#### Track Add to Cart
```javascript
import { trackAddToCart } from '@/lib/fbpixel'

trackAddToCart({
  content_name: 'Pack Professionnel',
  content_ids: ['pack-pro'],
  content_type: 'product',
  value: 5500,
  currency: 'MAD'
})
```

#### Track Purchase
```javascript
import { trackPurchase } from '@/lib/fbpixel'

trackPurchase({
  value: 5500,
  currency: 'MAD',
  content_ids: ['pack-pro'],
  content_type: 'product'
})
```

#### Track Initiate Checkout
```javascript
import { trackInitiateCheckout } from '@/lib/fbpixel'

trackInitiateCheckout({
  value: 5500,
  currency: 'MAD',
  num_items: 1
})
```

### Lead Generation Events

#### Track Lead
```javascript
import { trackLead } from '@/lib/fbpixel'

trackLead({
  content_name: 'Contact Form Submission',
  content_category: 'Lead',
  value: 5500,
  currency: 'MAD'
})
```

#### Track Contact
```javascript
import { trackContact } from '@/lib/fbpixel'

trackContact({
  content_name: 'Contact Form'
})
```

### Content & Engagement Events

#### Track View Content
```javascript
import { trackViewContent } from '@/lib/fbpixel'

trackViewContent({
  content_name: 'Pack Professionnel',
  content_type: 'product',
  value: 5500,
  currency: 'MAD'
})
```

#### Track Search
```javascript
import { trackSearch } from '@/lib/fbpixel'

trackSearch({
  search_string: 'visite virtuelle hotel',
  content_category: 'Services'
})
```

### Custom Events for Virtual Tour Business

#### Track Virtual Tour View
```javascript
import { trackVirtualTourView } from '@/lib/fbpixel'

trackVirtualTourView('Hotel Matterport Tour', 'Hotellerie')
```

#### Track Quote Request
```javascript
import { trackQuoteRequest } from '@/lib/fbpixel'

trackQuoteRequest('Pack Professionnel', 5500)
```

#### Track Portfolio View
```javascript
import { trackPortfolioView } from '@/lib/fbpixel'

trackPortfolioView('Hotel Virtual Tour Project')
```

#### Track Pricing View
```javascript
import { trackPricingView } from '@/lib/fbpixel'

trackPricingView('Pack Professionnel')
```

#### Track WhatsApp Click
```javascript
import { trackWhatsAppClick } from '@/lib/fbpixel'

trackWhatsAppClick()
```

#### Track Phone Click
```javascript
import { trackPhoneClick } from '@/lib/fbpixel'

trackPhoneClick()
```

#### Track Email Click
```javascript
import { trackEmailClick } from '@/lib/fbpixel'

trackEmailClick()
```

## Implementation Examples

### Example 1: Track Contact Form Submission
```javascript
'use client'

import { trackContact, trackLead } from '@/lib/fbpixel'

function ContactForm() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Track the contact event
    trackContact({
      content_name: 'Contact Form - Home Page'
    })
    
    // Also track as a lead with potential value
    trackLead({
      content_name: 'Contact Form Lead',
      value: 5500, // Average package value
      currency: 'MAD'
    })
    
    // Submit form...
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

### Example 2: Track Pricing Card Click
```javascript
'use client'

import { trackPricingView, trackQuoteRequest } from '@/lib/fbpixel'
import Link from 'next/link'

function PricingCard({ plan }) {
  const handleClick = () => {
    trackPricingView(plan.name)
    trackQuoteRequest(plan.name, plan.value)
  }
  
  return (
    <Link href="/contact" onClick={handleClick}>
      Choose {plan.name}
    </Link>
  )
}
```

### Example 3: Track Virtual Tour View
```javascript
'use client'

import { trackVirtualTourView, trackViewContent } from '@/lib/fbpixel'
import { useEffect } from 'react'

function VirtualTourViewer({ tour }) {
  useEffect(() => {
    // Track custom event
    trackVirtualTourView(tour.title, tour.category)
    
    // Also track as standard ViewContent event
    trackViewContent({
      content_name: tour.title,
      content_type: 'virtual_tour',
      content_category: tour.category
    })
  }, [tour])
  
  return <iframe src={tour.url} />
}
```

### Example 4: Track WhatsApp Button Click
```javascript
'use client'

import { trackWhatsAppClick } from '@/lib/fbpixel'

function WhatsAppButton() {
  const handleClick = () => {
    trackWhatsAppClick()
  }
  
  return (
    <a 
      href="https://wa.me/212123456789"
      onClick={handleClick}
      target="_blank"
    >
      Contact via WhatsApp
    </a>
  )
}
```

## Testing

### Development Mode
- Events are logged to browser console
- No data sent to Facebook
- Format: `[FB Pixel - Dev Mode] EventName: {data}`

### Production Mode
- Events are sent to Facebook
- Only works on production domain (not localhost)
- Check Facebook Events Manager to verify events

## Best Practices

1. **Track Key Conversion Points**
   - Contact form submissions
   - Quote requests
   - Phone/WhatsApp clicks
   - Virtual tour views

2. **Use Consistent Naming**
   - Keep event names consistent
   - Use descriptive content_name values
   - Include relevant metadata

3. **Set Appropriate Values**
   - Use MAD as currency
   - Set realistic value estimates for leads
   - Include package prices where relevant

4. **Test Before Production**
   - Check console logs in development
   - Verify events in Facebook Events Manager
   - Use Facebook Pixel Helper browser extension

## Troubleshooting

### Events Not Showing in Facebook
1. Check that `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is set correctly
2. Verify you're in production mode (not localhost)
3. Check browser console for errors
4. Use Facebook Pixel Helper extension

### Events Firing Multiple Times
1. Make sure event tracking is not in a component that re-renders frequently
2. Use `useEffect` with proper dependencies
3. Debounce rapid-fire events

### Development Testing
1. Open browser console
2. Look for `[FB Pixel - Dev Mode]` logs
3. Verify event data is correct
4. Events won't appear in Facebook during development

## Facebook Ads Integration

Once events are tracking properly, you can:
1. Create Custom Audiences based on events
2. Set up Custom Conversions for specific actions
3. Optimize ad campaigns for specific events
4. Track ROI and conversion rates

## Support

For issues or questions:
- Check Facebook Events Manager
- Use Facebook Pixel Helper extension
- Review browser console logs
- Test in production environment
