# Instagram Links Fix - Testing Guide

## PR #7: Fix Instagram Links (Remove Notion Links)

### Overview
Added URL validation to prevent Notion links from being displayed as Instagram links in the Events page.

---

## What Was Fixed

### Before
- Instagram field in Notion could contain any URL (including Notion links)
- Invalid URLs were passed through to the frontend
- Users clicking "Instagram" icon might be redirected to Notion pages

### After
- Instagram URLs are validated against Instagram domain patterns
- Non-Instagram URLs are filtered out and won't display icon
- Console warnings alert developers to data issues
- Only valid Instagram URLs display the Instagram icon

---

## Testing Checklist

### 1. Browser Testing
Test the Events page (`/events`) in:
- [ ] **Chrome** (Desktop)
- [ ] **Firefox** (Desktop)
- [ ] **Safari** (Desktop/Mac)
- [ ] **Edge** (Desktop)

### 2. Device/Responsive Testing
Test at different viewport sizes:
- [ ] **Desktop** (1920x1080+)
- [ ] **Laptop** (1366x768)
- [ ] **Tablet** (768px)
- [ ] **Mobile** (375px - iPhone SE)
- [ ] **Mobile** (414px - iPhone Plus)

### 3. Instagram Link Behavior

#### Valid Instagram URLs (Should Work)
Test with these URL formats in Notion:
- [ ] Profile: `https://instagram.com/colorstacknyu`
- [ ] Profile: `https://www.instagram.com/colorstacknyu`
- [ ] Post: `https://instagram.com/p/ABC123xyz`
- [ ] Post: `https://www.instagram.com/p/ABC123xyz/`
- [ ] Short URL: `https://instagr.am/colorstacknyu`

**Expected Behavior:**
- Instagram icon appears in top-right of event card
- Clicking card opens Instagram URL in new tab
- Link has `target="_blank"` and `rel="noopener noreferrer"`

#### Invalid URLs (Should Be Filtered)
Test with these URL formats in Notion:
- [ ] Notion: `https://notion.so/page-id`
- [ ] Notion: `https://www.notion.so/workspace/page`
- [ ] Other: `https://twitter.com/username`
- [ ] Other: `https://facebook.com/page`
- [ ] Empty: No URL provided

**Expected Behavior:**
- No Instagram icon appears
- Card still clickable but links to Notion page URL (fallback)
- Console shows warning: `⚠️ Invalid Instagram URL detected...`

### 4. Console Testing

#### Check Browser Console
- [ ] Open browser DevTools (F12)
- [ ] Navigate to `/events`
- [ ] Check for validation warnings if invalid URLs exist
- [ ] Verify no console errors

**Expected Warnings (if invalid URLs in data):**
```
⚠️ Invalid Instagram URL detected (possibly Notion link): "https://notion.so/..."
   Expected format: https://instagram.com/username or https://instagram.com/p/postid
```

### 5. Accessibility Testing
- [ ] Instagram icons have proper `title` attribute ("View on Instagram")
- [ ] Links have proper `aria-label` or context for screen readers
- [ ] Keyboard navigation works (Tab through cards)
- [ ] Focus states visible when tabbing
- [ ] Links announce as "opens in new tab/window"

### 6. Visual/UI Testing
- [ ] Instagram icon appears in correct position (top-right, 20px from edges)
- [ ] Icon color is brand purple (`var(--brand-1)`)
- [ ] Icon transitions smoothly on hover
- [ ] Card hover state works correctly
- [ ] No layout shifts when icon appears/disappears
- [ ] Icon doesn't overlap with title text

### 7. Edge Cases
- [ ] Event with no Instagram URL (icon should not appear)
- [ ] Event with Instagram URL (icon should appear)
- [ ] Mixed events (some with, some without Instagram)
- [ ] Past events with Instagram links (should still work)
- [ ] Upcoming events with Instagram links

### 8. API Testing

#### Test API Response
```bash
# Local development
curl http://localhost:3000/api/events | jq

# Check for events with instagramUrl field
curl http://localhost:3000/api/events | jq '.events[] | select(.instagramUrl != null)'
```

**Expected:**
- Valid Instagram URLs in `instagramUrl` field
- Invalid URLs filtered (field is `null` or missing)
- Console logs show validation warnings

### 9. Production Testing
- [ ] Deploy to staging/preview environment
- [ ] Verify Instagram links work in production
- [ ] Check production console for any issues
- [ ] Test with real Notion data

---

## Data Cleanup Checklist

After deploying this fix, clean up Notion database:

### Events Database Review
- [ ] Open Notion Events database
- [ ] Review all entries with "Instagram" field populated
- [ ] Identify entries with Notion URLs
- [ ] Replace with actual Instagram URLs or leave empty

### Valid Instagram URL Formats
```
✅ https://instagram.com/colorstacknyu
✅ https://www.instagram.com/colorstacknyu
✅ https://instagram.com/p/DOYxiXkjVEx/
✅ https://www.instagram.com/p/DOYxiXkjVEx/
✅ https://instagr.am/colorstacknyu
```

### How to Find Instagram URLs
1. **For profile**: `https://instagram.com/[username]`
2. **For specific post**: 
   - Open post on Instagram
   - Click "..." → "Copy Link"
   - Format: `https://instagram.com/p/[postId]/`

---

## General Testing Best Practices

### For All PRs
- [ ] No console errors in any browser
- [ ] Proper link behavior (external links open in new tab)
- [ ] Hover states working on all interactive elements
- [ ] Focus states visible for accessibility
- [ ] Smooth animations/transitions
- [ ] Text is readable (contrast, size)
- [ ] Images load properly
- [ ] No layout shifts (CLS)
- [ ] Mobile touch targets adequate (44x44px minimum)

---

## Regression Testing

### Areas That Should NOT Be Affected
- [ ] Navigation still works
- [ ] Footer Instagram link still works
- [ ] Team page LinkedIn links still work
- [ ] Events page layout unchanged
- [ ] Card click behavior unchanged (except Instagram validation)
- [ ] Past events display correctly
- [ ] Event tags display correctly
- [ ] Date formatting correct

---

## Success Criteria

### This fix is successful if:
1. ✅ No Notion URLs appear as Instagram links
2. ✅ Valid Instagram URLs display correctly with icon
3. ✅ Invalid URLs are filtered and logged
4. ✅ All links open in new tabs
5. ✅ No console errors
6. ✅ No visual regressions
7. ✅ Works across all browsers and devices

---

## Troubleshooting

### If Instagram icon doesn't appear:
1. Check if `instagramUrl` field exists in API response
2. Verify URL matches Instagram domain pattern
3. Check browser console for validation warnings
4. Confirm URL is in Notion database

### If wrong URL opens:
1. Verify URL in Notion database
2. Check API response for correct URL
3. Clear browser cache
4. Rebuild application

### If console shows warnings:
1. This is expected for invalid URLs
2. Review Notion database and update URLs
3. Warnings help identify data quality issues

---

## Related Files
- `src/app/api/events/route.ts` - Instagram URL validation logic
- `src/app/events/page.tsx` - Instagram icon rendering
- `src/app/globals.css` - Instagram icon styles

---

## Notes
- The fix is **backward compatible** - no breaking changes
- Invalid URLs are filtered gracefully (no errors thrown)
- Console warnings are for developer awareness only
- Card remains clickable even without Instagram URL (fallback to Notion page)
