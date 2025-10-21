# Facebook Pixel Setup Instructions

## Quick Start

### 1. Get Your Facebook Pixel ID
1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager)
2. Select your Pixel or create a new one
3. Copy your Pixel ID (currently set to: `1379895966809439`)

### 2. Configure Environment Variable
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=1379895966809439
```

Replace with your actual Pixel ID.

### 3. Verify Installation
The Facebook Pixel is already integrated in your project:
- ✅ Pixel script loads on all pages
- ✅ Automatic page view tracking
- ✅ Custom event tracking ready
- ✅ Development mode logging enabled

### 4. Test in Development
1. Run your development server
2. Open browser console
3. Look for logs: `[FB Pixel - Dev Mode] PageView: {}`
4. Navigate between pages to see tracking

### 5. Verify in Production
1. Deploy your site
2. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/) extension
3. Visit your live site
4. Check that the extension shows your Pixel is active
5. View events in Facebook Events Manager

## Current Configuration

Your Facebook Pixel ID: **1379895966809439**

### Integrated Components
- `lib/fbpixel.js` - Core tracking library
- `components/FacebookPixel.tsx` - Route change tracking
- `components/FacebookPixelScript.tsx` - Pixel initialization
- `app/layout.tsx` - Root integration

### Available Tracking Functions
- ✅ Page views (automatic)
- ✅ Contact form submissions
- ✅ Lead generation
- ✅ Virtual tour views
- ✅ Pricing page views
- ✅ WhatsApp/Phone/Email clicks
- ✅ E-commerce events (Purchase, AddToCart, etc.)

## Next Steps

1. **Test Events**: See `FACEBOOK_PIXEL_GUIDE.md` for implementation examples
2. **Add Tracking**: Implement event tracking on key pages (contact forms, pricing, etc.)
3. **Create Audiences**: Use tracked events to create Custom Audiences in Facebook
4. **Optimize Ads**: Use conversion events to optimize your Facebook ad campaigns

## Important Notes

- ⚠️ Pixel only fires in production (not on localhost)
- ✅ All events are logged in development mode for testing
- ✅ Currency is set to MAD (Moroccan Dirham)
- ✅ Production mode checks prevent accidental tracking during development

## Support Resources

- [Facebook Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)
- [Events Manager](https://business.facebook.com/events_manager)
- [Pixel Helper Extension](https://chrome.google.com/webstore/detail/facebook-pixel-helper/)
- Project Guide: `docs/FACEBOOK_PIXEL_GUIDE.md`
