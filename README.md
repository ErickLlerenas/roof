# RoofMetrics SaaS 🏠📐

Welcome to the **RoofMetrics SaaS** repository. This is a modern, scalable Software as a Service designed specifically for roofing contractors in the US. It provides tools for lead management, satellite-based roof measurement (manual polygon drawing), and automated estimate generation in PDF format.

## 🚀 Project Overview & Architecture

This project is built with the modern standard stack for scalable SaaS applications:

### Frontend (Current implementation)

- **Framework:** Next.js 15 (App Router) with React 19.
- **Language:** TypeScript for type safety and better developer experience.
- **Styling:** Tailwind CSS v4 + `shadcn/ui` for beautiful, accessible, and customizable components.
- **Icons:** `lucide-react`.

### Core Features & Libraries

- **Mapping & Measurement:**
  - `mapbox-gl` & `react-map-gl`: For rendering high-quality satellite imagery.
  - `@mapbox/mapbox-gl-draw`: To allow users to manually draw polygons over roofs.
  - `@turf/turf`: For complex geospatial mathematics, specifically calculating the area of the drawn polygons in square feet/meters.
- **PDF Generation:**
  - `@react-pdf/renderer`: To generate professional estimate reports directly in the browser.

### Backend & Database (Planned Infrastructure)

While this MVP currently uses mock data in the frontend, the architecture is designed to seamlessly integrate with **Supabase**.

- **Database:** PostgreSQL (via Supabase) to store Leads, Clients, Projects, and Measurements.
- **Authentication:** Supabase Auth (Email/Password, Google OAuth).
- **Storage:** Supabase Storage to save the generated PDF reports and roof screenshots.
- **Row Level Security (RLS):** To ensure each roofing company only sees their own data.

## 🏗️ Folder Structure

```
roof-metrics/
├── src/
│   ├── app/                # Next.js App Router pages (Dashboard, Leads, Clients, Cotizador)
│   ├── components/         # React components
│   │   ├── ui/             # shadcn/ui generic components (Buttons, Cards, Tables, etc.)
│   │   ├── Sidebar.tsx     # App navigation sidebar
│   │   └── AppLayout.tsx   # Main layout wrapper
│   └── lib/                # Utility functions (e.g., tailwind merge)
├── public/                 # Static assets
└── package.json            # Dependencies and scripts
```

## 🗺️ The Measurement Logic (How it works)

1. **Satellite View:** Mapbox displays a high-res satellite view. The user searches for an address to center the map.
2. **Drawing:** Using Mapbox Draw, the user clicks the corners of the roof to create a polygon.
3. **Flat Area Calculation:** Turf.js takes the polygon coordinates and calculates the flat 2D area.
4. **Pitch Adjustment (Crucial for Roofing):** Roofs are angled, meaning the actual surface area is larger than the flat footprint.
   - We apply a multiplier based on the Roof Pitch (e.g., 4/12, 6/12 pitch).
   - Formula: `Total Area = Flat Area × Pitch Multiplier`
5. **Waste Factor:** Typically, roofers add a 10-15% waste factor to account for cut shingles.
6. **Estimate:** The final square footage is divided by 100 to get "Squares" (1 roofing square = 100 sq ft), which is how materials are ordered.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- A Mapbox Access Token (Create a free account at mapbox.com)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your Mapbox token:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_mapbox_token_here
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📋 Future Roadmap

- [ ] **Phase 1:** UI/UX, Navigation, Mock CRUDs (Completed)
- [ ] **Phase 2:** Mapbox integration, drawing tools, Turf.js calculations (In Progress)
- [ ] **Phase 3:** PDF Generation with react-pdf
- [ ] **Phase 4:** Connect to Supabase (Auth, Database, Storage)
- [ ] **Phase 5:** Stripe Integration for SaaS subscriptions
- [ ] **Phase 6:** AI auto-detection of roof boundaries (Future implementation using Computer Vision APIs)
