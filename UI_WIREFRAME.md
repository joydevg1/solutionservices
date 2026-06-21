# Appliance Services - UI Wireframe Documentation

## Design Philosophy
- **Aesthetic**: Soothing (soft blues, grays, warm whites), Classy (modern minimalism), Compact (efficient space usage)
- **Color Palette**: 
  - Primary: #1E3A5F (Deep Navy Blue)
  - Secondary: #4A90E2 (Soft Blue)
  - Accent: #FF6B6B (Warm Red for CTAs)
  - Neutral: #F5F7FA (Off-white), #E8EDF5 (Light gray)
  - Text: #2C3E50 (Dark blue-gray)

---

## 1. NAVIGATION STRUCTURE

```
┌─────────────────────────────────────────────────────┐
│ HEADER (Sticky, Compact)                            │
├─────────────────────────────────────────────────────┤
│  [Logo] Services  │ [Search]  │ [Cart] │ [?Chat] │ [Profile] │
│                   │           │  (3)   │         │           │
└─────────────────────────────────────────────────────┘
```

---

## 2. HOME PAGE LAYOUT

### 2.1 Hero Section (Top)
```
┌─────────────────────────────────────────────────────┐
│         INTERACTIVE IMAGE CAROUSEL                  │
│    (Auto-scrolling, touch-enabled, 4-5 images)     │
│     • Maintenance tips                              │
│     • Seasonal service offers                       │
│     • Customer testimonials                         │
│         [Dot Indicators] ● ○ ○ ○                    │
└─────────────────────────────────────────────────────┘
Spacing: 16px
```

### 2.2 Services Grid Section
```
┌──────────────────────────────────────────────────────────┐
│ SERVICES CATALOG (Responsive Grid: 2-5 tiles per row)    │
├──────────────────────────────────────────────────────────┤
│
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  │   Water     │  │    Air      │  │   Fridge    │
│  │  Purifier   │  │ Conditioner │  │             │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │
│  │             │  │             │  │             │
│  │  VIEW →     │  │  VIEW →     │  │  VIEW →     │
│  └─────────────┘  └─────────────┘  └─────────────┘
│
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  │   Washing   │  │  Microwave  │  │   Kitchen   │
│  │  Machine    │  │             │  │   Chimney   │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │
│  │             │  │             │  │             │
│  │  VIEW →     │  │  VIEW →     │  │  VIEW →     │
│  └─────────────┘  └─────────────┘  └─────────────┘
│
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  │   LED TV    │  │   Vacuum    │  │     Air     │
│  │             │  │   Cleaner   │  │   Purifier  │
│  │  [Image]    │  │  [Image]    │  │  [Image]    │
│  │             │  │             │  │             │
│  │  VIEW →     │  │  VIEW →     │  │  VIEW →     │
│  └─────────────┘  └─────────────┘  └─────────────┘
│
│  ┌─────────────┐
│  │   Geyser    │
│  │             │
│  │  [Image]    │
│  │             │
│  │  VIEW →     │
│  └─────────────┘
│
└──────────────────────────────────────────────────────────┘

TILE SPECIFICATIONS:
- Size: Responsive (120-160px for mobile, 180-220px for desktop)
- Content: Icon/Image (80%), Service Name, "VIEW →" Button
- Hover Effect: Subtle shadow lift, slight scale (1.05x)
- Border Radius: 12px
- Background: White with 1px border #E8EDF5
```

### 2.3 Customer Reviews Section
```
┌──────────────────────────────────────────────────────────┐
│ CUSTOMER REVIEWS & RATINGS (Scrollable Horizontal)       │
├──────────────────────────────────────────────────────────┤
│
│  ← [Review Card]    [Review Card]    [Review Card] →
│
│  ┌──────────────────────────────┐
│  │ ★★★★★ 4.8 / 5               │
│  │ "Best service I've received!"│
│  │ - Rajesh Kumar              │
│  │ ✓ Verified Purchase         │
│  │ 2 days ago                  │
│  └──────────────────────────────┘
│
└──────────────────────────────────────────────────────────┘
```

### 2.4 Promotional Banner
```
┌──────────────────────────────────────────────────────────┐
│          SEASONAL OFFERS / PROMOTIONS                    │
│                                                          │
│   🎉 Get 20% OFF on Annual Maintenance Plans            │
│      [SHOP NOW]                                         │
└──────────────────────────────────────────────────────────┘
```

### 2.5 Footer
```
┌──────────────────────────────────────────────────────────┐
│ About | Privacy Policy | Contact | Social Media         │
│ © 2026 Appliance Services. All Rights Reserved.         │
└──────────────────────────────────────────────────────────┘
```

---

## 3. SERVICE DETAIL PAGE

### Layout
```
┌──────────────────────────────────────────────────────────┐
│ [← Back]                                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │       SERVICE HERO IMAGE (Full Width)              ││
│  │          Air Conditioner Maintenance               ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  SERVICE OVERVIEW                                       │
│  ★★★★★ (847 reviews) | Starting at ₹299                 │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ SUB-SERVICES (Tiled Grid Layout)                        │
├──────────────────────────────────────────────────────────┤
│
│  ┌──────────────────┐  ┌──────────────────┐
│  │  Filter Cleaning │  │ Gas Refilling    │
│  │  ₹299            │  │  ₹899            │
│  │  ⏱ 45 mins       │  │  ⏱ 60 mins       │
│  │  [Add to Cart +] │  │  [Add to Cart +] │
│  └──────────────────┘  └──────────────────┘
│
│  ┌──────────────────┐  ┌──────────────────┐
│  │  Deep Servicing  │  │ Installation     │
│  │  ₹1,299          │  │  ₹2,499          │
│  │  ⏱ 120 mins      │  │  ⏱ 2 hours       │
│  │  [Add to Cart +] │  │  [Add to Cart +] │
│  └──────────────────┘  └──────────────────┘
│
│  ┌──────────────────┐  ┌──────────────────┐
│  │  Uninstallation  │  │ Annual Plan      │
│  │  ₹599            │  │  ₹3,999/year     │
│  │  ⏱ 90 mins       │  │  ⏱ Multiple      │
│  │  [Add to Cart +] │  │  [Add to Cart +] │
│  └──────────────────┘  └──────────────────┘
│
├──────────────────────────────────────────────────────────┤
│ SERVICE DESCRIPTION                                     │
│ "Comprehensive air conditioner maintenance ensuring...  │
│  • Professional technicians                             │
│  • Original spare parts                                 │
│  • Warranty on service                                  │
├──────────────────────────────────────────────────────────┤
│ [DONE] [CONTINUE SHOPPING]                              │
└──────────────────────────────────────────────────────────┘
```

---

## 4. CART PANEL (Side Drawer)

```
┌──────────────────────────┐
│ CART              [✕]    │
├──────────────────────────┤
│                          │
│ ┌────────────────────────┐│
│ │ Air Conditioner        ││
│ │ Filter Cleaning        ││
│ │ × 1                ₹299││
│ │ [Remove]               ││
│ └────────────────────────┘│
│                          │
│ ┌────────────────────────┐│
│ │ Washing Machine        ││
│ │ Deep Servicing         ││
│ │ × 1              ₹1,499││
│ │ [Remove]               ││
│ └────────────────────────┘│
│                          │
│ ─────────────────────────│
│ Subtotal          ₹1,798 │
│ Tax (18%)          ₹324  │
│ Delivery           ₹0    │
│ ─────────────────────────│
│ TOTAL             ₹2,122 │
│                          │
│ [PROCEED TO CHECKOUT]    │
│ [CONTINUE SHOPPING]      │
└──────────────────────────┘
```

---

## 5. CHECKOUT PAGE

```
┌──────────────────────────────────────────────────────────┐
│ CHECKOUT                                                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ STEP 1: DELIVERY ADDRESS                               │
│ ┌────────────────────────────────────────────────────┐ │
│ │ [📍 Use Current Location] [Manual Entry]          │ │
│ │                                                    │ │
│ │ Name: ________________    Phone: ____________    │ │
│ │ Address: _________________________________      │ │
│ │ City: ________________    Pincode: __________   │ │
│ │                                                    │ │
│ │ [✓ Save as Default]                              │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ STEP 2: SERVICE DATE & TIME                             │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Preferred Date: [Calendar]   Time: [Dropdown]    │ │
│ │ Select Time Slot:                                │ │
│ │  ◯ 09:00 AM - 12:00 PM                          │ │
│ │  ◯ 12:00 PM - 03:00 PM                          │ │
│ │  ◉ 03:00 PM - 06:00 PM                          │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ STEP 3: PAYMENT METHOD                                  │
│ ┌────────────────────────────────────────────────────┐ │
│ │ ◉ Credit/Debit Card                              │ │
│ │ ◯ UPI (Google Pay, PhonePe, PayTM)               │ │
│ │ ◯ Wallet                                         │ │
│ │ ◯ Net Banking                                    │ │
│ │ ◯ Cash on Service                                │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ STEP 4: ORDER SUMMARY                                   │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Air Conditioner Filter Cleaning      ₹299        │ │
│ │ Washing Machine Deep Servicing     ₹1,499        │ │
│ │                                                  │ │
│ │ Subtotal                          ₹1,798        │ │
│ │ Tax (18%)                           ₹324        │ │
│ │ TOTAL                             ₹2,122        │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ [CONFIRM & PROCEED TO PAYMENT]  [BACK]                 │
└──────────────────────────────────────────────────────────┘
```

---

## 6. PAYMENT GATEWAY PAGE

```
┌──────────────────────────────────────────────────────────┐
│ SECURE PAYMENT                                    🔒      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ Amount to Pay: ₹2,122                                   │
│                                                          │
│ CARD DETAILS                                           │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Card Number: [____ ____ ____ ____]               │ │
│ │ Expiry: [__/__]  CVV: [___]                       │ │
│ │ Cardholder Name: _______________________         │ │
│ │                                                    │ │
│ │ [✓ Save card for future transactions]            │ │
│ └────────────────────────────────────────────────────┘ │
│                                                          │
│ [PAY ₹2,122]  [CANCEL]                                 │
│                                                          │
│ 🔒 Secured by Stripe / Razorpay / Your Provider        │
└──────────────────────────────────────────────────────────┘
```

---

## 7. CHAT SUPPORT (AI + HUMAN)

### 7.1 Chat Window (Overlay/Modal)
```
┌──────────────────────────────────────────┐
│ Support Chat              [⊕] [✕]        │
├──────────────────────────────────────────┤
│                                          │
│ ⭕ Powered by AI Assistant              │
│ "Hello! How can I help you today?"      │
│ [Quick Options Below ▼]                  │
│                                          │
│ ┌────────────────────────────────────┐  │
│ │ • Booking Information              │  │
│ │ • Track My Service                 │  │
│ │ • Pricing & Plans                  │  │
│ │ • Complaint/Feedback               │  │
│ │ • Connect to Human Agent           │  │
│ └────────────────────────────────────┘  │
│                                          │
│ Your Message: _____________________ [→] │
│                                          │
│ [If not resolved: "Connect to Agent"]   │
└──────────────────────────────────────────┘
```

### 7.2 Human Agent Connection
```
On selection of "Connect to Agent":

┌──────────────────────────────────────────┐
│ Connecting you to support team...         │
│ Average wait time: ~2 minutes            │
│                                          │
│ [CHAT_WITH_AGENT_UI]                    │
│                                          │
│ Agent: Priya (Support Representative)    │
│ Availability: Available                  │
│ ┌────────────────────────────────────┐  │
│ │ Agent Message:                     │  │
│ │ "Hi! Thank you for waiting..."     │  │
│ └────────────────────────────────────┘  │
│                                          │
│ Your Message: _____________________ [→] │
│ [End Chat] [Feedback]                    │
└──────────────────────────────────────────┘
```

---

## 8. LOGIN PAGE

### 8.1 Login Selection Screen
```
┌──────────────────────────────────────────────────────────┐
│                  APPLIANCE SERVICES                       │
│                        [Logo]                            │
│                                                          │
│              Select Login Type                           │
│                                                          │
│      ┌────────────────────────────────┐                 │
│      │   👤 CUSTOMER LOGIN            │                 │
│      │   Access your bookings & cart  │                 │
│      │     [LOGIN AS CUSTOMER]        │                 │
│      └────────────────────────────────┘                 │
│                                                          │
│      ┌────────────────────────────────┐                 │
│      │   👨‍💼 ADMIN LOGIN              │                 │
│      │   Manage services & analytics  │                 │
│      │     [LOGIN AS ADMIN]           │                 │
│      └────────────────────────────────┘                 │
│                                                          │
│                  [SIGN UP]  [GUEST]                     │
└──────────────────────────────────────────────────────────┘
```

### 8.2 Customer Login
```
┌──────────────────────────────────────────────────────────┐
│ CUSTOMER LOGIN                                           │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Email/Phone: _______________________________     │  │
│ │ Password: _______________________________        │  │
│ │ [✓ Remember Me]                                 │  │
│ │                                                  │  │
│ │ [SIGN IN]                                       │  │
│ │                                                  │  │
│ │ Don't have account? [SIGN UP]                   │  │
│ │ [Forgot Password?]                              │  │
│ │                                                  │  │
│ │ ─── OR ───                                      │  │
│ │ [Sign in with Google]  [Sign in with Apple]    │  │
│ └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### 8.3 Admin Login
```
┌──────────────────────────────────────────────────────────┐
│ ADMIN LOGIN                                              │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ Admin ID: _______________________________         │  │
│ │ Password: _______________________________        │  │
│ │ [✓ Remember Me]                                 │  │
│ │                                                  │  │
│ │ [SIGN IN]                                       │  │
│ │ [Forgot Credentials?]                           │  │
│ │                                                  │  │
│ │ ⚠️ This area is restricted to authorized        │  │
│ │    personnel only                               │  │
│ └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

---

## 9. CUSTOMER DASHBOARD

```
┌────────────────────────────────────────────────────────────┐
│ MY ACCOUNT                          [⚙️ Settings] [Logout]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│ PROFILE SECTION                                           │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ [👤 Profile Pic]  Name: Rajesh Kumar              │  │
│ │ Email: rajesh@email.com  Phone: +91-98765-43210  │  │
│ │ Location: Delhi, India                            │  │
│ │ [CHANGE LOCATION]  [EDIT PROFILE]                │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
│ MY BOOKINGS                                               │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ Upcoming Bookings (2)                              │  │
│ │                                                    │  │
│ │ 📅 Mar 15, 2026 | 03:00 PM - 06:00 PM            │  │
│ │    AC Maintenance at Home                         │  │
│ │    Technician: Suresh Kumar                       │  │
│ │    Status: Confirmed ✓                            │  │
│ │    [TRACK] [RESCHEDULE] [CANCEL]                │  │
│ │                                                    │  │
│ │ 📅 Mar 20, 2026 | 10:00 AM - 12:00 PM            │  │
│ │    Washing Machine Repair                         │  │
│ │    Technician: Assigned Soon                      │  │
│ │    Status: Pending                                │  │
│ │    [TRACK] [RESCHEDULE] [CANCEL]                │  │
│ │                                                    │  │
│ │ [PAST BOOKINGS]                                   │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
│ SAVED ADDRESSES                                           │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ ✓ Home (Default)     Flat 5B, Maple Tower, Delhi  │  │
│ │   [Edit] [Delete]                                 │  │
│ │                                                    │  │
│ │ ◯ Office              Tech Park, Sector 5, Noida  │  │
│ │   [Edit] [Delete]                                 │  │
│ │                                                    │  │
│ │ [+ ADD NEW ADDRESS]                               │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
│ PAYMENT METHODS                                           │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ ✓ **** **** **** 4242 (Default)                  │  │
│ │   Exp: 12/26                                      │  │
│ │   [Edit] [Delete]                                 │  │
│ │                                                    │  │
│ │ ◯ UPI: rajesh@okhdfcbank                          │  │
│ │   [Edit] [Delete]                                 │  │
│ │                                                    │  │
│ │ [+ ADD NEW PAYMENT METHOD]                        │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
│ PREFERENCES                                               │
│ ┌─────────────────────────────────────────────────────┐  │
│ │ [✓] Email Notifications                           │  │
│ │ [✓] SMS Notifications                             │  │
│ │ [✓] Marketing Emails                              │  │
│ │ [MANAGE NOTIFICATIONS]                            │  │
│ └─────────────────────────────────────────────────────┘  │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 10. ADMIN DASHBOARD

```
┌─────────────────────────────────────────────────────────────┐
│ ADMIN DASHBOARD                      [⚙️ Settings] [Logout]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ QUICK STATS                                                │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│ │ Total Orders │  │  This Month  │  │ Pending      │      │
│ │    2,847     │  │    342       │  │   23         │      │
│ └──────────────┘  └──────────────┘  └──────────────┘      │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│ │ Revenue      │  │ Avg Rating   │  │ Active       │      │
│ │  ₹8,94,500   │  │   4.7 / 5    │  │ Technicians  │      │
│ │              │  │              │  │   145        │      │
│ └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│ ANALYTICS SECTION                                          │
│                                                             │
│ ┌─────────────────────────┐  ┌─────────────────────────┐  │
│ │ ORDERS BY TYPE (Pie)    │  │ MONTHLY REVENUE (Line) │  │
│ │                         │  │                        │  │
│ │     AC ████ 35%         │  │ ₹                      │  │
│ │     WM ███ 25%          │  │  │     /‾‾\   /‾‾\   │  │
│ │     TV ██ 15%           │  │  │    /    \ /    \   │  │
│ │     Other ██ 25%        │  │  │___/      X      \  │  │
│ │                         │  │     Jan  Feb Mar Apr  │  │
│ └─────────────────────────┘  └─────────────────────────┘  │
│                                                             │
│ ┌─────────────────────────┐  ┌─────────────────────────┐  │
│ │ ORDERS BY LOCATION      │  │ TECHNICIAN PERFORMANCE│  │
│ │ (Geo Map)               │  │                        │  │
│ │                         │  │ Rank  Name    Rating   │  │
│ │ [MAP VISUALIZATION]     │  │ 1.    Suresh  4.9/5    │  │
│ │                         │  │ 2.    Priya   4.8/5    │  │
│ │ Delhi: 45%              │  │ 3.    Amit    4.6/5    │  │
│ │ Bangalore: 30%          │  │ 4.    Neha    4.5/5    │  │
│ │ Mumbai: 25%             │  │                        │  │
│ └─────────────────────────┘  └─────────────────────────┘  │
│                                                             │
│ RECENT ORDERS                                              │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ Order ID  Customer  Service      Amount  Status    │  │
│ │ #ORD2847  R. Kumar  AC Filter    ₹299    Completed │  │
│ │ #ORD2846  P. Gupta  WM Service   ₹1,899  In Progress│  │
│ │ #ORD2845  M. Singh  TV Repair    ₹2,499  Pending   │  │
│ │ #ORD2844  S. Verma  Geyser Fix   ₹799    Cancelled │  │
│ │                                                     │  │
│ │ [VIEW ALL ORDERS]                                  │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                             │
│ MANAGEMENT SECTIONS (Navigation)                          │
│ [Services] [Technicians] [Bookings] [Customers] [Reports] │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. RESPONSIVE BEHAVIOR

### Mobile (< 768px)
- Single column grid for services
- Bottom navigation bar with: Home, Services, Cart, Chat, Profile
- Full-screen modals for checkout and payment
- Drawer navigation from hamburger menu

### Tablet (768px - 1024px)
- 2-column grid for services
- Sidebar navigation collapsed
- Drawer cart panel

### Desktop (> 1024px)
- 3-5 column grid for services
- Full navigation bar
- Floating chat button at bottom-right
- Side drawer cart

---

## 12. KEY UX FEATURES

### Accessibility
- High contrast text (#2C3E50 on #F5F7FA)
- Large touch targets (min 44x44px)
- Proper heading hierarchy
- ARIA labels for screen readers
- Skip navigation links

### Performance
- Lazy loading for images
- Optimized bundle size
- Progressive enhancement
- Service worker for offline support

### Animations
- Smooth page transitions (300-400ms)
- Subtle hover effects (shadow, scale 1.05x)
- Loading skeletons for data
- Toast notifications for user feedback

### Security
- SSL/TLS encryption for payment
- Secure password storage (bcrypt)
- Session management
- Input validation & sanitization
- CSRF protection

---

## 13. COLOR REFERENCE

| Element | Color | Usage |
|---------|-------|-------|
| Primary Button | #FF6B6B | CTAs, Add to cart, Book now |
| Primary Text | #1E3A5F | Headers, important info |
| Secondary Text | #4A90E2 | Links, highlights |
| Borders | #E8EDF5 | Cards, dividers |
| Background | #F5F7FA | Page background |
| Error | #E74C3C | Alerts, errors |
| Success | #27AE60 | Confirmations |
| Warning | #F39C12 | Warnings |
| Disabled | #BDC3C7 | Disabled elements |

---

## 14. IMPLEMENTATION NOTES

- Build with React + Vite for performance
- Use TailwindCSS for responsive design
- Implement Redux for state management
- Use Stripe/Razorpay for payments
- Integrate Google Maps API for location services
- Use Socket.io for real-time chat
- Implement JWT for authentication
- Use MySQL for data persistence
- Deploy on AWS/GCP with CDN

---

