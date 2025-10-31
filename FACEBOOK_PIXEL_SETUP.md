# Facebook Pixel Integration for Next.js App Router

This setup provides a complete Facebook Pixel integration that **only works in production mode** (not on localhost).

## 📁 Files Created

### 1. `lib/fbpixel.js`
Contains all reusable Facebook Pixel functions:
- `pageview()` - Track page views
- `event(name, options)` - Track custom events
- Helper functions for common events (AddToCart, Purchase, Lead, Contact, etc.)

### 2. `components/FacebookPixelScript.tsx`
Injects the Facebook Pixel base code into the document. Only loads in production.

### 3. `components/FacebookPixel.tsx`
Client component that tracks page views on route changes using Next.js App Router.

### 4. `app/layout.tsx` (Modified)
Root layout updated to include Facebook Pixel components.

---

## 🚀 Setup Instructions

### Step 1: Add Environment Variable

Create or update your `.env.local` file:

```bash
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1848322352445114
```

**This is your actual Facebook Pixel ID from Meta Business Manager.**

### Step 2: Add to .gitignore (if not already there)

Ensure `.env.local` is in your `.gitignore`:

```
.env.local
```

### Step 3: Build and Deploy

The pixel will **only work in production mode**. To test:

```bash
# Build for production
npm run build

# Start production server
npm start
```

Or deploy to your hosting platform (Vercel, Netlify, etc.).

---

## 📊 Usage Examples

### Track Page Views (Automatic)

Page views are automatically tracked on every route change. No additional code needed!

### Track Custom Events

Import the functions in any component:

```tsx
'use client';

import * as fbq from '@/lib/fbpixel';

export default function MyComponent() {
  const handleAddToCart = () => {
    fbq.trackAddToCart({
      content_name: 'Product Name',
      content_ids: ['product_123'],
      content_type: 'product',
      value: 99.99,
      currency: 'USD'
    });
  };

  const handlePurchase = () => {
    fbq.trackPurchase({
      value: 199.99,
      currency: 'USD',
      content_ids: ['product_123', 'product_456'],
      content_type: 'product'
    });
  };

  const handleContact = () => {
    fbq.trackContact({
      content_name: 'Contact Form Submission'
    });
  };

  return (
    <div>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handlePurchase}>Complete Purchase</button>
      <button onClick={handleContact}>Submit Contact Form</button>
    </div>
  );
}
```

### Track Lead Generation

```tsx
import * as fbq from '@/lib/fbpixel';

const handleFormSubmit = async (data) => {
  // Submit form...
  
  fbq.trackLead({
    content_name: 'Newsletter Signup',
    value: 0,
    currency: 'USD'
  });
};
```

### Track Search

```tsx
import * as fbq from '@/lib/fbpixel';

const handleSearch = (query) => {
  fbq.trackSearch({
    search_string: query,
    content_category: 'products'
  });
};
```

### Track Content Views

```tsx
import * as fbq from '@/lib/fbpixel';

useEffect(() => {
  fbq.trackViewContent({
    content_name: 'Product Detail Page',
    content_ids: ['product_123'],
    content_type: 'product',
    value: 99.99,
    currency: 'USD'
  });
}, []);
```

### Track Custom Events

```tsx
import * as fbq from '@/lib/fbpixel';

const handleCustomAction = () => {
  fbq.event('CustomEventName', {
    custom_param_1: 'value1',
    custom_param_2: 'value2'
  });
};
```

---

## 🔧 Available Helper Functions

All functions are exported from `lib/fbpixel.js`:

| Function | Description |
|----------|-------------|
| `pageview()` | Track page views |
| `event(name, options)` | Track any custom event |
| `trackAddToCart(data)` | Track add to cart events |
| `trackPurchase(data)` | Track purchase events |
| `trackLead(data)` | Track lead generation |
| `trackContact(data)` | Track contact form submissions |
| `trackSearch(data)` | Track search queries |
| `trackViewContent(data)` | Track content/product views |
| `trackCompleteRegistration(data)` | Track user registrations |

---

## 🛡️ Production-Only Behavior

The pixel will **NOT fire** if:
- `NODE_ENV` is not `production`
- The hostname includes `localhost`
- The hostname includes `127.0.0.1`

This ensures your analytics stay clean during development.

---

## 🧪 Testing

### Local Testing (Won't Work)
```bash
npm run dev
# Pixel will NOT fire on localhost
```

### Production Testing
```bash
npm run build
npm start
# Pixel WILL fire
```

### Verify in Browser

1. Open your production site
2. Open browser DevTools (F12)
3. Go to Network tab
4. Filter by "facebook"
5. Navigate between pages
6. You should see requests to `facebook.com/tr`

### Facebook Pixel Helper

Install the [Facebook Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc) to verify your pixel is firing correctly.

---

## 📝 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Yes | `1848322352445114` | Your Facebook Pixel ID |

---

## 🔍 Troubleshooting

### Pixel Not Firing

1. **Check environment**: Ensure you're in production mode (`NODE_ENV=production`)
2. **Check hostname**: Make sure you're not on localhost
3. **Check console**: Look for any JavaScript errors
4. **Check Pixel ID**: Verify your `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` is correct

### Events Not Showing in Facebook

1. **Wait 20 minutes**: Facebook can take up to 20 minutes to show events
2. **Check Test Events**: Use Facebook's Test Events tool in Events Manager
3. **Verify Pixel Status**: Check if your pixel is active in Facebook Business Manager

### TypeScript Errors

If you get TypeScript errors about `window.fbq`, add this to your `global.d.ts` or create one:

```typescript
// global.d.ts
interface Window {
  fbq: (action: string, event: string, data?: Record<string, any>) => void;
  _fbq: any;
}
```

---

## 📚 Additional Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- [Standard Events Reference](https://developers.facebook.com/docs/meta-pixel/reference)
- [Next.js Script Component](https://nextjs.org/docs/app/api-reference/components/script)

---

## ✅ Checklist

- [x] `lib/fbpixel.js` created with reusable functions
- [x] `components/FacebookPixelScript.tsx` created
- [x] `components/FacebookPixel.tsx` created
- [x] `app/layout.tsx` updated with pixel components
- [x] Production-only mode configured
- [x] Automatic page view tracking on route changes
- [x] Custom event tracking support
- [x] Helper functions for common events

---

## 🎯 Next Steps

1. Replace the placeholder Pixel ID in `.env.local` with your actual ID
2. Build and deploy your application
3. Test the pixel using Facebook Pixel Helper
4. Add custom event tracking to your forms and buttons
5. Monitor events in Facebook Events Manager

**Your Facebook Pixel is now ready to use! 🎉**
