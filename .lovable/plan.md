

# RESQ - Street Animal Rescue Platform (Phase 1)

## Overview
A platform to report, track, and support rescue of street animals in Bangalore. Uses the RESQ logo provided, with a clean teal/green + white color palette inspired by the branding.

---

## Phase 1 Features

### 1. Authentication & Roles
- Sign up / Login with email and password
- Two roles: **User** (citizen) and **NGO** (rescue organization)
- Role selection during signup
- Protected routes based on role

### 2. Landing Page
- Hero section with the RESQ logo and mission statement
- Quick stats (total reports, animals rescued, active NGOs)
- Call-to-action buttons: "Report an Animal" and "View Reports"
- Clean, modern design with teal/green branding

### 3. Report an Animal (Logged-in Users)
- Form with: animal type, description of condition, image upload (stored in Supabase Storage), address, city (defaulting to Bangalore), state, optional landmark, contact phone
- Interactive Leaflet map to pick location (click to set pin, or search address)
- Stores latitude/longitude along with address
- Report status defaults to "Open"

### 4. Public Animal Feed
- Card-based feed showing all reported animals with photo, status, location, and description
- Filter by city and status (Open, In Progress, Rescued, Closed)
- Click a card to view full details with map pin showing the animal's location
- "I want to help" button for logged-in users (adopt, foster, donate food, medical support)

### 5. User Dashboard
- My submitted reports with status tracking
- My support/adoption interests
- Notifications (in-app) when report status changes

### 6. NGO Dashboard
- View all open reports (filterable by status, city, date)
- Claim/assign a report to their NGO
- Update report status (Open → In Progress → Rescued → Closed)
- Add internal notes to reports
- Simple stats: open vs closed reports, bar chart of reports over time
- View adoption/support interests on their assigned reports

### 7. In-App Notifications
- Notification bell in the navbar
- Triggered when: report status changes, new support interest on a report, report assigned to NGO

### 8. Seed Data
- Sample rescue reports across Bangalore locations (Koramangala, Indiranagar, Jayanagar, etc.) with placeholder animal images
- Sample NGO accounts
- Real Bangalore veterinary clinics data (for future Phase 2 clinics page)

---

## Design & UX
- **Color palette**: Teal (#0d7377) primary, warm white backgrounds, subtle green accents — matching the RESQ logo
- **Logo**: The uploaded RESQ logo used in navbar and landing page
- **Responsive**: Mobile-first, works on all screen sizes
- **Components**: Reusable card, form, and navigation components using shadcn/ui

---

## Database Structure (Supabase)
- **profiles** — user info, role reference
- **user_roles** — role-based access (user, ngo, admin)
- **rescue_reports** — animal reports with images, location, status
- **adoption_interests** — user support/adoption interest per report
- **notifications** — in-app notifications
- **Storage bucket** — for report images

---

## Phase 2 (Future)
- Nearby Pet Clinics page with Leaflet map + real Bangalore clinic data
- Email/SMS notification hooks
- Admin dashboard
- User reviews/references for NGOs
- Advanced analytics and reporting

