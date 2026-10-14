# AI Surveillance and Inventory Management Bot

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-10B981?style=flat&logo=githubpages&logoColor=white)](https://patora-ai-it-services.github.io/AI_Surveillance_and_Inventory_Management_Bot/)
[![License](https://img.shields.io/badge/License-Proprietary-teal?style=flat)](#)

> **"See More. Know More. Manage Smarter."**  
> An enterprise computer-vision platform concept that transforms compatible CCTV camera footage into operational intelligence for retail stores, supermarkets, warehouses, and commercial facilities.

---

## 🌟 Executive Summary

Retail stores and warehouses typically treat security cameras as passive recording devices. **AI Surveillance and Inventory Management Bot** turns camera feeds into active operational intelligence by combining:

1. **Vision Security & People Analytics**: Bi-directional foot traffic counting, occupancy thresholds, peak customer inflow windows, and restricted zone detection.
2. **Vision Inventory Intelligence**: Overhead and aisle camera monitoring of shelf product availability, automated detection of empty shelf gaps, and low-stock replenishment dispatch.
3. **Unified Operational Incident Center**: Actionable alert queue connecting visual discrepancies directly to shelf locations and camera streams, with one-click resolution auditing and CSV/PDF reports.

---

## 🚀 Key Modules & Capabilities

### 1. Product Landing & Showcase (`/landing`)
- Value proposition overview, high-level system metrics, and dual module pillars.
- Interactive **Edge Vision Pipeline** explainer (RTSP Ingest $\rightarrow$ YOLO Edge Inference $\rightarrow$ Metadata Telemetry $\rightarrow$ Operations).
- 3-Phase technical roadmap (Level 1 UI Prototype $\rightarrow$ Level 2 AI Video Validation $\rightarrow$ Level 3 Live Hardware Pilot).
- Interactive on-site pilot consultation request modal.

### 2. Executive Operations Dashboard (`/dashboard`)
- **5 Core Real-time KPI Cards**: Active Cameras (5/6 Online), Visitors Today (2,842), Current Occupancy (184/350), Inventory Voids (3 alerts), and Security Incidents (2 flagged).
- **Hourly Inflow vs. Occupancy Curve**: Interactive Recharts telemetry comparing customer entrance velocity with live building occupancy.
- **Camera Health Matrix**: Quick thumbnail status feed across all store zones.
- **Urgent Shelf Depletion Discrepancies**: High-priority restock targets with direct planogram links.

### 3. CCTV Camera Surveillance Matrix (`/cameras`)
- 6 Configured sample cameras:
  - `CAM-01`: Main Entrance & Vestibule (Tripwire entry line, 1080p 30 FPS)
  - `CAM-02`: Retail Floor - Grocery Aisles 1-4 (Heat corridor tracking, 1080p 30 FPS)
  - `CAM-03`: Shelf Monitoring - Pantry & Canned Goods (2K 2560x1440, empty void detection)
  - `CAM-04`: High-Value Electronics Showcase (Perimeter dwell monitoring, 1080p 30 FPS)
  - `CAM-05`: Backroom Loading Dock & Stock Inflow (Intermittent packet loss telemetry, 18 FPS)
  - `CAM-06`: Checkout Lanes & Exit Gate (Outflow turnstile counting, 1080p 30 FPS)
- Animated simulated CCTV raster feeds with live timestamps, REC status, and YOLO bounding box classifications (`person 0.96`, `shopping_cart 0.92`, `empty_shelf 0.93`).
- Deep camera inspection modal detailing RTSP URIs, UDP packet loss, resolution, and event histories.

### 4. People Counting & Traffic Analytics (`/analytics`)
- Bi-directional foot traffic tracking (Total Inflow vs Total Outflow).
- Peak window identification (18:00 dinner rush detection with 410 entries/hr).
- 7-day visitor volume and peak occupancy curves.
- Departmental zone traffic heat distribution table.

### 5. Vision Shelf Inventory Intelligence (`/inventory`)
- **Interactive Rack-B 2D Planogram Matrix**: Visual shelf layout displaying Slots B1–B4 with live status coloring (Optimal, Low Stock, Empty Void Gap).
- SKU table detailing Expected Stock (from ERP/POS record), Visible Stock (detected by camera), and Discrepancy Variance.
- Interactive **Stock Adjustment Modal**: Simulates physical restocking from the backroom, updates visible stock, changes status to Optimal, and automatically resolves active alerts across the application.

### 6. Incident Management & Reporting (`/alerts`)
- Unified alert queue categorized by Inventory, Security, and Stream Health.
- Full resolution workflow (Acknowledge $\rightarrow$ Resolve with staff note capture).
- **Export CSV Dataset**: Generates and downloads real, valid `.csv` operational report.
- **Executive Briefing PDF**: Formatted printable executive report with key metrics and sign-off block.

---

## 🎨 Enterprise Design System

- **Surveillance-Grade Dark Palette**: Deep charcoal and navy monitoring backgrounds (`#070A10`, `#0D131F`, `#131B2D`).
- **Restrained Accents**: Forest green primary (`#123B2A`, `#10B981`), teal secondary (`#2D7565`, `#14B8A6`), and subtle cyan highlights (`#06B6D4`).
- **Status Pills**: Clear visual distinction for Online (Emerald), Degraded (Amber), Offline/Critical (Rose), and Verified (Blue).
- **Persistent Disclaimer**: Prominent `DEMO MODE — SAMPLE DATA` indicator with detailed operational safeguards.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript + Vite 8 |
| **Data Visualizations** | Recharts (Area, Bar, Line) |
| **UI Icons** | Lucide React |
| **State & Persistence** | React Context API with `localStorage` synchronization |
| **Styling** | Vanilla CSS Design System with CSS variables and responsive grid |
| **Production Target** | Edge inference with Ultralytics YOLOv11 + ByteTrack and FastAPI backend |

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js 18+ (tested on Node v24)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/patora-ai-it-services/AI_Surveillance_and_Inventory_Management_Bot.git

# Navigate into directory
cd AI_Surveillance_and_Inventory_Management_Bot

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Typecheck and build bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🛡️ Operational Safeguards & Limitations

1. **Synthetic Data Disclaimer**: This prototype operates with centralized mock data and simulated visual streams for client evaluation. No actual live cameras or biometric face recognition models are run in Phase 1.
2. **Estimated Visible vs Ground Truth**: Computer vision can estimate visible front-facing products on open shelves, but cannot inspect stock inside closed cartons or backrooms without POS/ERP integration.
3. **Privacy by Design**: In commercial deployment, detection processing runs on edge hardware, extracting bounding-box metadata and immediately discarding raw image frames in compliance with GDPR/CCPA.

---

## 📄 License & Rights

Proprietary enterprise demonstration software developed for **AI Surveillance and Inventory Management Bot**. All rights reserved.
