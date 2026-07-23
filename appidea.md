**citysarthi** – Ek proper, end‑to‑end online Car & All Vehicle Booking Platform (App + Website) ki poori feature list neeche di gayi hai. Yeh blueprint ke hisaab se aap MVP se lekar full‑fledged product bana sakte ho. Sab kuch online hoga – booking, payment, verification, tracking, support.

---

## 1. Customer App (Android / iOS)
Yeh un users ke liye hai jo gadiyan (car, bike, auto, tempo, bus) book karna chahte hain – self‑drive ho ya driver‑driven.

### 1.1 Onboarding & Authentication
- **Sign Up / Login** – Phone number (OTP), Email, Google, Facebook, Apple ID
- **Profile Set‑up** – Naam, photo, email, phone, preferred language, emergency contact
- **KYC (Agar self‑drive ya long‑term rental hai)** – Driving licence scan, ID proof upload, selfie verification

### 1.2 Home Screen
- **Location Picker** (Google Maps/Mapbox)
  - “Pickup location” & “Drop location” (for cab/auto/bike taxi)
  - Delivery address (for self‑drive door‑step delivery)
- **Vehicle Category Tiles** – Sedan, Hatchback, SUV, MUV, Luxury, Bike, Auto, Tempo, Bus
- **Quick Filters** – Running on CNG, Electric, Petrol/Diesel, Automatic/Manual, AC/non‑AC
- **Banner Carousel** – Offers, new launches, referral banners
- **“Nearby Vehicles”** – Real‑time map pe available gaadiyan dikhein
- **Search Bar** – Vehicle model, brand, feature search

### 1.3 Booking Flow (End‑to‑End)
- **Trip Type Selection**
  - Instant Ride (Cab/Auto/Bike) – Abhi pickup
  - Schedule for Later – Date/Time picker
  - Self‑Drive Rental – Pickup & drop date/time, delivery option
- **Vehicle List** – Availability, fare estimate, rating, features
- **Vehicle Detail Page**
  - Full‑screen photos, 360° view
  - Specifications (mileage, fuel type, transmission, seating capacity, boot space)
  - Amenities icon (AC, sunroof, airbags, music system, child seat available)
  - User reviews & ratings
  - Price breakup (base fare, per km, per minute, tolls, taxes, convenience fee)
- **Add‑ons (optional)**
  - Doorstep delivery/pickup
  - Child seat, GPS navigator, dashcam
  - Additional driver
  - Insurance upgrade (zero‑dep, personal accident)
- **Promo Code** – Apply coupon, referral credit auto‑apply
- **Payment Method**
  - Cards (Credit/Debit)
  - UPI (Google Pay, PhonePe, Paytm)
  - Net Banking
  - Wallets (citysarthi wallet, Paytm, Mobikwik)
  - Partial payment: Book with 20% now, rest later
  - **Cash payment bhi rakho agar offline bhi chahiye** (par aap online prefer kar rahe ho toh sirf digital rakho)
- **Booking Confirmation** – Confirmation ID, invoice, driver/vehicle details, OTP (for ride‑hailing)

### 1.4 Live Trip & Tracking (Ride‑Hailing / With Driver)
- **Driver Allocation** – Driver details (naam, photo, vehicle number, rating)
- **Live Map Tracking** – Driver ka movement, ETA, route preview
- **In‑App Communication**
  - Call button (masked calling via Twilio)
  - Chat (pre‑defined messages aur free text)
- **Emergency SOS** – Local police/ambulance, share live location with emergency contacts
- **Trip Actions**
  - Cancel ride with reason
  - Modify drop location while on trip
  - Share ride status (link via WhatsApp/SMS)
- **After Trip**
  - Rating & Review for driver/vehicle
  - Tip option
  - Receipt push certificate

### 1.5 Self‑Drive Specific Features
- **Check‑In (Start Trip)** – OTP / QR code scan to unlock car, fuel & odometer reading photo upload, damage marking on car diagram
- **Check‑Out (End Trip)** – Fuel check, odometer, damage report, calculate extra km/fuel charges
- **Trip Summary** – Used km, extra hours, refund due, fine breakdown

### 1.6 User Account & Management
- **My Bookings** – Upcoming, Ongoing, Completed, Cancelled
- **Trip History** – Filters by date, vehicle type, download invoices (PDF)
- **Favourite Locations** – Home, Work, other saved addresses
- **Payments** – Linked cards/UPI, wallet balance, add money, transaction history
- **Notifications** – Push, SMS, email (booking updates, reminders, offers, news)
- **Referral Program** – Unique referral code, share app, earn credits
- **Support & Help**
  - In‑app ticket system
  - Live chat with AI + human agent
  - Call support with IVR
  - FAQ, Terms of Service, Privacy Policy

### 1.7 Additional User Requirements
- **Multi‑language Support** – Hindi, English, regional languages
- **Dark Mode / Accessibility**
- **Ride‑Schedule Reminder** – Calendar integration
- **Guest Booking** – Without login, limited to one‑time booking

---

## 2. Driver / Partner App (for Cab, Auto, Bike Taxi)
Agar driver‑driven service bhi chahiye toh separate driver app banegi.

### 2.1 Registration & Verification
- **Document Upload** – Driving Licence, RC, Insurance, Pollution Certificate, Aadhaar/PAN, profile photo
- **Background Verification** – Admin se approve hone ke baad hi login
- **Vehicle Inspection** – Photos upload, fitness certificate

### 2.2 Dashboard & Online/Offline
- **Go Online** – GPS on, auto‑assign nearby rides
- **Ride Alert** – Pickup/drop location, distance, estimated fare, accept/reject with timer
- **Accepted Ride** – Navigation start, pickup passenger (OTP verification)
- **During Trip** – Navigation, call/customer chat, SOS button
- **Complete Trip** – Collect cash (if enabled), end trip, invoice
- **Break/Offline** – Manual pause, auto‑pause if idle

### 2.3 Earnings & Wallet
- **Earnings Summary** – Daily, weekly, monthly
- **Trip‑wise Breakdown** – Fare, tips, incentives, toll reimbursement
- **Withdrawal** – Bank transfer, UPI
- **Commission Deduction** – Show clearly

### 2.4 Additional Driver Features
- **Performance Metrics** – Acceptance rate, cancellation rate, rating
- **Training & Updates** – Videos, notifications about new policies
- **Support** – Help center, raise ticket, emergency contact

---

## 3. Vehicle Owner App (for Self‑Drive / Car Rental)
Agar koi apni personal gaadi rent pe daalna chahta hai (host model), toh yeh app.

### 3.1 Onboarding
- **Register as Host** – KYC documents, bank details for payout
- **Vehicle Listing** – Add car: make, model, year, variant, colour, photos, registration number, insurance, features
- **Pricing & Availability** – Hourly/daily/weekly rates, extra km charges, minimum booking hours, blackout dates calendar
- **Delivery Options** – Offer free/paid delivery, pickup location settings

### 3.2 Booking Management
- **Booking Requests** – Accept / Decline with reason
- **Upcoming Handovers** – OTP generation, fuel/odometer check‑in
- **Return Management** – Check‑out verification, claim for damages
- **Earnings Dashboard** – Total earned, commission deducted, upcoming payout
- **Payout Setup** – Bank account, UPI, settlement cycle

---

## 4. admin Panel (Web‑Based)
Poori system ko control karne ke liye super admin.

### 4.1 Dashboard
- **Live Metrics** – Total bookings today, active users, online drivers, revenue, cancellations
- **Graphical Reports** – Revenue trend, booking volume per hour/day, utilisation rate
- **Alerts** – Pending verifications, refund requests, disputes

### 4.2 User Management
- List/view/edit/ban/unban customers
- View KYC documents, manual verification
- Manage wallets, add loyalty points

### 4.3 Driver / Partner Management
- Verify documents, approve/reject, block drivers
- Assign vehicles (if company owned), view live location
- Rating & complaint history
- Incentive / penalty management

### 4.4 Vehicle Management
- Add/remove vehicle models, variants, specifications
- Manage own fleet – insurance expiry reminders, maintenance logs, GPS device status
- Bulk Upload/Edit via Excel

### 4.5 Booking Management
- View all bookings, search by ID, user, date, status
- Modify booking – change vehicle, adjust fare, add discount, cancel
- Assign driver manually (for schedule rides)
- Handle disputes – refund, compensation

### 4.6 Pricing & Fare Engine
- **Base Configuration** – Base fare, per km, per minute, waiting charges, night surcharge
- **Vehicle Category wise** – Different slab for hatchback, sedan, SUV, luxury
- **Dynamic / Surge Pricing** – Rule‑based multiplier based on demand, weather, events
- **Toll & Tax** – Auto‑calculate or manual
- **Cancellation Policy** – Time‑based charges (free within 5 min, etc.)
- **Discount & Promotions**
  - Create coupon codes (percentage/flat, max discount, validity, limit per user)
  - Referral program rules (referer credit, referee credit)
  - Flash sales, festive offers, first‑ride free

### 4.7 Payment & Finance
- View all transactions, recharge, refunds
- Manual refund initiation
- Settlements to drivers/hosts – auto/manual
- Commission settings – percentage/flat per booking, tiered
- Revenue reports, daily collection, GST/Tax invoices

### 4.8 Support System
- Ticket queue – assign to support team, status tracking
- Bulk email/SMS/push notification to users/drivers by filter
- FAQ & CMS – Update static pages (About Us, Privacy, Terms, Help)

### 4.9 Analytics & Reports
- Booking & revenue by city, vehicle type, time range
- User acquisition funnel, retention
- Driver performance score
- Vehicle utilisation rate, idle time
- Export reports (CSV, Excel, PDF)

### 4.10 System Configuration
- Role‑based access (Admin, Support, Finance)
- City / Zone management for geo‑fencing
- Operating hours, holiday list
- API key management (maps, SMS, payment)

---

## 5. Website (Customer‑Facing + PWA)
- **Responsive Design** – Same features as customer app, accessed via browser
- **SEO Optimised** – Vehicle listing pages, city pages, blog for traffic
- **PWA Support** – Installable icon, push notifications, offline cache
- **Quick Booking Widget** – Home page pe pickup/drop, date, search
- **Corporate / Bulk Booking** – Separate login, credit billing, reporting
- **Blog / City Guide** – Tips, travel articles
- **Download App Banner** – Deep‑link QR code to App Store/Play Store
- **Chatbot Integration** – FAQ, booking assistance

---

## 6. Technology Stack (Recommended)
- **Frontend**
  - User App: Flutter (cross‑platform) ya React Native
  - Driver/Host App: Flutter/React Native
  - Admin Panel: React.js + Material‑UI / Ant Design
  - Website: Next.js (SSR for SEO) + Tailwind CSS
- **Backend & API**
  - Node.js (Express/NestJS) ya Python Django REST
  - GraphQL ya RESTful APIs
  - Real‑time: WebSocket (Socket.io) ya Firebase Realtime DB for tracking
- **Database**
  - PostgreSQL (main transactional)
  - MongoDB (logs, unstructured data)
  - Redis (caching, session, pub‑sub)
- **Cloud & DevOps**
  - AWS / Google Cloud / Azure
  - Docker, Kubernetes for scaling
  - CI/CD (GitHub Actions, Jenkins)
- **Third‑Party Integrations**
  - Maps & Navigation: Google Maps (Places, Directions, Distance Matrix) ya Mapbox
  - Payments: Razorpay / Stripe / Paytm All‑in‑One
  - SMS: Twilio, MSG91, TextLocal
  - Email: SendGrid, SES
  - OTP: Firebase Auth / custom via SMS gateway
  - File Storage: AWS S3 for vehicle images, documents
  - Analytics: Google Analytics, Firebase Analytics, Mixpanel
  - Support Chat: Intercom, Freshchat, or custom socket

---

## 7. Security & Compliance
- SSL everywhere, encrypt sensitive data
- PCI DSS compliant (if storing cards – better to use tokenisation from payment gateway)
- KYC documents encrypted at rest
- Role‑based access, API rate limiting
- OWASP best practices
- Legal: Terms of Service, Privacy Policy, Cancellation & Refund policy, Motor Vehicle Act compliance (for rental)

---

## 8. How to Build in Phases (MVP to Full)
1. **Phase 1 – MVP** (basic cab booking + self‑drive): User app with signup, search, booking, payment, basic driver/owner module, admin basic.
2. **Phase 2** – Add advanced filters, scheduling, live tracking, rating system, referral, multilanguage.
3. **Phase 3** – Bike/auto/bus categories, dynamic pricing, host model, corporate bookings, website.
4. **Phase 4** – AI/ML for demand prediction, fraud detection, voice booking, smart recommendations.

---

Yeh complete feature set hai **citysarthi** app aur website ke liye. Agar kisi specific module (jaise ki payment flow, database schema, ya UI wireframe) ke baare mein aur detail chahiye toh batao, main turant bana dunga.