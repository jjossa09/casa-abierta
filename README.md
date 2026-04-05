# Casa Abierta

A bilingual (English/Spanish) utility-savings platform that helps immigrant and underserved communities compare energy, water, and phone providers, analyze bills, and estimate savings from solar panels and rainwater harvesting.

---

## Table of Contents

- [Quick Start — Running Both Servers](#quick-start--running-both-servers)
- [How Frontend and Backend Connect](#how-frontend-and-backend-connect)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Pages → Backend Endpoint Mapping](#frontend-pages--backend-endpoint-mapping)
- [API Client Functions → Route Mapping](#api-client-functions--route-mapping)
- [Data Flow: End to End](#data-flow-end-to-end)
- [Backend Architecture](#backend-architecture)
  - [API Endpoints](#api-endpoints)
  - [Database Models](#database-models)
  - [Services](#services)
  - [Environment Variables](#environment-variables)
- [Frontend Details](#frontend-details)

---

## Quick Start — Running Both Servers

The app requires **two servers running simultaneously**: the FastAPI backend on port `8000` and the React frontend on port `5173`.

### Prerequisites

- Python 3.11+
- Node.js 18+ and npm
- Tesseract OCR *(only required for uploading image-format bills)*
  - Ubuntu/Debian: `sudo apt install tesseract-ocr`
  - macOS: `brew install tesseract`

### Terminal 1 — Backend

```bash
cd casa-abierta

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env and set OPENEI_API_KEY (free key at https://openei.org/services/api/signup/)

# Seed the database with phone provider data
python seed.py

# Start the backend server
uvicorn main:app --reload --port 8000
```

Backend is live at: `http://localhost:8000`
Interactive API docs: `http://localhost:8000/docs`

### Terminal 2 — Frontend

```bash
cd casa-abierta/frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App is live at: `http://localhost:5173`

> Both servers must stay running. CORS is pre-configured to allow the frontend origin (`http://localhost:5173`) to talk to the backend (`http://localhost:8000`).

---

## How Frontend and Backend Connect

```
Browser (http://localhost:5173)
        │
        │  HTTP fetch requests
        ▼
frontend/src/lib/api.ts       ← single API client file
        │
        │  BASE_URL = "http://localhost:8000"
        │  Authorization: Bearer <JWT from localStorage "ca_token">
        ▼
FastAPI backend (http://localhost:8000)
        │
        ├── /auth/*       ← authentication & user profile
        ├── /bills/*      ← bill upload & OCR parsing
        ├── /energy/*     ← provider comparison & solar estimation
        ├── /water/*      ← provider comparison & rainwater estimation
        └── /phone/*      ← phone plan comparison
```

**Authentication flow:**
1. User registers or logs in via the auth modal in the frontend
2. Backend returns a JWT access token (60-minute expiry)
3. Token is saved to `localStorage` under the key `ca_token`
4. All subsequent API calls include `Authorization: Bearer <token>` in the headers
5. `GET /auth/me` is used to restore the session on page load

**No proxy is configured** — the frontend calls the backend directly at `http://localhost:8000`. If you change the backend port, update `BASE_URL` in `frontend/src/lib/api.ts`.

---

## Project Overview

Casa Abierta lets users:

- **Upload a utility bill** (PDF or image) and have it automatically parsed for amount, usage, provider, and rate
- **Compare energy providers** using live data from the OpenEI Utility Rates API
- **Compare water providers** with curated Atlanta-area provider data
- **Compare phone plans** from a seeded provider database
- **Calculate solar savings** — upfront cost, annual savings, 10-year ROI, and break-even period
- **Calculate rainwater harvesting savings** — estimated monthly gallons collected, cost offset, and payback period
- **Create an account** and log in to save and review their bill history

The entire UI is available in both English and Spanish via a toggle in the top navigation bar.

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Backend   | Python 3.11+, FastAPI, SQLAlchemy, SQLite       |
| Auth      | JWT (python-jose), bcrypt (passlib)             |
| Bill OCR  | pdfplumber (PDF), pytesseract + Pillow (images) |
| External  | OpenEI Utility Rates API                        |
| Frontend  | React 18, TypeScript, Vite 6                    |
| Styling   | Tailwind CSS 4, Radix UI, Lucide icons          |
| Charts    | Recharts                                        |

---

## Project Structure

```
casa-abierta/
├── main.py                  # FastAPI app entry point, CORS, router registration
├── database.py              # SQLAlchemy engine, session factory, startup migrations
├── seed.py                  # Seeds phone_providers table from JSON
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables (not committed)
├── .env.example             # Environment variable template
├── casa_abierta.db          # SQLite database (auto-created on first run)
│
├── app/
│   ├── models/              # SQLAlchemy ORM table definitions
│   │   ├── user.py
│   │   ├── bill.py
│   │   ├── provider.py
│   │   └── estimate.py
│   │
│   ├── schemas/             # Pydantic request/response shapes
│   │   ├── user.py          # RegisterReq, LoginReq, UserRes
│   │   ├── bill.py          # ParsedBillRes
│   │   ├── energy.py        # CompareReq, SolarReq, SolarRes
│   │   ├── water.py         # WaterCompareReq, RainwaterRes
│   │   └── phone.py         # PhoneCompareReq, PhoneCompareRes
│   │
│   ├── routers/             # Route handlers (thin controllers)
│   │   ├── auth.py          # /auth/*
│   │   ├── bills.py         # /bills/*
│   │   ├── energy.py        # /energy/*
│   │   ├── water.py         # /water/*
│   │   └── phone.py         # /phone/*
│   │
│   ├── services/            # Business logic
│   │   ├── auth.py
│   │   ├── extractor.py
│   │   ├── parser.py
│   │   ├── provider_lookup.py
│   │   ├── energy_cmp.py
│   │   ├── water_cmp.py
│   │   ├── solar.py
│   │   ├── rainwater.py
│   │   └── phone_cmp.py
│   │
│   └── data/                # JSON seed files
│       ├── phone_providers.json
│       ├── energy_providers.json
│       └── water_providers.json
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx             # React entry point
        ├── lib/
        │   └── api.ts           # All backend API calls + TypeScript types
        ├── assets/              # Static images
        ├── styles/              # Tailwind, fonts, theme CSS
        └── app/
            ├── App.tsx          # All pages and components (single-file SPA)
            └── components/
                ├── ui/          # Radix UI / shadcn component library
                └── figma/       # ImageWithFallback utility component
```

---

## Frontend Pages → Backend Endpoint Mapping

Each page in the frontend maps to one or more backend endpoints. Navigation is managed by a `currentPage` state string in `App.tsx` — there is no URL router.

| Frontend Page       | Nav Path                              | Backend Endpoint(s) Called                         |
|---------------------|---------------------------------------|-----------------------------------------------------|
| Home                | Home                                  | None (static)                                       |
| Bill Analyzer       | Energy / Water / Phone → Insert Bill  | `POST /bills/upload/energy` or `/bills/upload/water` then `POST /energy/compare` or `/water/compare` or `/phone/compare` |
| Solar Calculator    | Energy → Solar Solutions              | `POST /energy/solar`                                |
| Water Solutions     | Water → Water Solutions               | `POST /water/rainwater`                             |
| Battery Storage     | Energy → Battery Storage              | None (static)                                       |
| Conservation Tips   | Water → Conservation Tips             | None (static)                                       |
| Phone Plans         | Phone → Plans                         | `POST /phone/compare`                               |
| Our Mission         | About → Our Mission                   | None (static)                                       |
| Our Team            | About → Our Team                      | None (static)                                       |
| History             | About → History                       | None (static)                                       |
| Profile             | User icon (top right)                 | `GET /auth/me`                                      |
| Auth Modal          | Login / Register buttons              | `POST /auth/login`, `POST /auth/register`           |

---

## API Client Functions → Route Mapping

All API communication lives in `frontend/src/lib/api.ts`. Each exported function maps 1:1 to a backend route.

```
Frontend function          HTTP method + Backend route
──────────────────────────────────────────────────────────────────
register(payload)       →  POST  /auth/register
login(email, password)  →  POST  /auth/login
getMe()                 →  GET   /auth/me              (requires JWT)

uploadBill(file, type)  →  POST  /bills/upload/energy
                           POST  /bills/upload/water

compareEnergy(payload)  →  POST  /energy/compare
calculateSolar(payload) →  POST  /energy/solar

compareWater(payload)   →  POST  /water/compare
calculateRainwater(p)   →  POST  /water/rainwater

comparePhone(payload)   →  POST  /phone/compare
```

---

## Data Flow: End to End

### Bill Upload + Provider Comparison

```
User selects a PDF or image bill
    │
    ▼
frontend: uploadBill(file, billType)
    │   multipart/form-data POST → /bills/upload/{energy|water}
    ▼
backend: extractor.py  →  extracts raw text (pdfplumber or pytesseract)
         parser.py     →  parses text into structured fields
         (saves Bill record to SQLite if user is logged in)
    │
    │   returns ParsedBillRes { provider, usage, amount_due, ... }
    ▼
frontend: pre-fills the comparison form with parsed values
    │
    ▼
frontend: compareEnergy(payload) or compareWater(payload)
    │   POST → /energy/compare or /water/compare
    ▼
backend: provider_lookup.py  →  fetches live rates (OpenEI API or curated data)
         energy_cmp.py / water_cmp.py  →  ranks providers by estimated savings
    │
    │   returns ranked list of providers with estimated costs
    ▼
frontend: renders comparison table / chart (Recharts)
```

### Solar Savings Estimation

```
User fills out the solar form (roof size, monthly kWh, zip code)
    │
    ▼
frontend: calculateSolar(payload)
    │   POST → /energy/solar
    ▼
backend: solar.py
    │   Uses Atlanta sun hours, 30% federal tax credit,
    │   $3/W panel cost, and provided usage to compute:
    │     - number of panels needed
    │     - upfront cost (after tax credit)
    │     - annual savings
    │     - break-even year
    │     - 10-year net savings
    │
    │   returns SolarRes
    ▼
frontend: displays ROI breakdown with Recharts bar chart
```

### Rainwater Harvesting Estimation

```
User fills out the water form (roof area, monthly water usage)
    │
    ▼
frontend: calculateRainwater(payload)
    │   POST → /water/rainwater
    ▼
backend: rainwater.py
    │   Uses Atlanta average monthly rainfall (inches),
    │   roof catchment efficiency, and local water rates to compute:
    │     - gallons collected per month
    │     - monthly cost offset
    │     - system payback period
    │
    │   returns RainwaterRes
    ▼
frontend: displays payback summary
```

### Phone Plan Comparison

```
User enters monthly GB usage and current monthly cost
    │
    ▼
frontend: comparePhone(payload)
    │   POST → /phone/compare
    ▼
backend: phone_cmp.py
    │   Queries seeded Provider table (ConnectMX, BudgetCell, FamilyLink)
    │   Scores each plan by (monthly_gb / monthly_cost) affordability ratio
    │
    │   returns ranked PhoneCompareRes
    ▼
frontend: renders plan cards sorted by value
```

---

## Backend Architecture

The backend follows a layered MVC pattern:

```
HTTP Request
    → Router      (validates input, calls service)
    → Schema      (Pydantic request/response models)
    → Service     (business logic, external API calls)
    → Model       (SQLAlchemy ORM, SQLite database)
```

### API Endpoints

#### Auth — `/auth`

| Method | Path             | Auth Required | Description                        |
|--------|------------------|---------------|------------------------------------|
| POST   | `/auth/register` | No            | Create a new user account          |
| POST   | `/auth/login`    | No            | Log in, returns a JWT access token |
| GET    | `/auth/me`       | Yes           | Get current user's profile         |

#### Bills — `/bills`

| Method | Path                   | Auth Required | Description                                           |
|--------|------------------------|---------------|-------------------------------------------------------|
| POST   | `/bills/upload/energy` | Optional      | Upload energy bill (PDF/JPG/PNG), returns parsed data |
| POST   | `/bills/upload/water`  | Optional      | Upload water bill (PDF/JPG/PNG), returns parsed data  |

#### Energy — `/energy`

| Method | Path              | Auth Required | Description                                         |
|--------|-------------------|---------------|-----------------------------------------------------|
| POST   | `/energy/compare` | No            | Compare electricity providers by location and usage |
| POST   | `/energy/solar`   | No            | Estimate solar panel savings and ROI                |

#### Water — `/water`

| Method | Path               | Auth Required | Description                                        |
|--------|--------------------|---------------|----------------------------------------------------|
| POST   | `/water/compare`   | No            | Compare water providers by location and usage      |
| POST   | `/water/rainwater` | No            | Estimate rainwater harvesting savings and payback  |

#### Phone — `/phone`

| Method | Path             | Auth Required | Description                       |
|--------|------------------|---------------|-----------------------------------|
| POST   | `/phone/compare` | No            | Compare phone plans by GB usage   |

#### Health

| Method | Path      | Description        |
|--------|-----------|--------------------|
| GET    | `/`       | API status message |
| GET    | `/health` | `{"status": "ok"}` |

Interactive docs: `http://localhost:8000/docs` (Swagger UI) · `http://localhost:8000/redoc` (ReDoc)

### Database Models

**User** — account info and bill snapshot data
- `id`, `email`, `password` (bcrypt hash)
- `first_name`, `last_name`, `address`, `language`
- `energy_bill_amount`, `energy_kwh_usage`, `water_bill_amount`, `water_gallons_usage`, `phone_bill_amount`

**Bill** — parsed bill records linked to a user
- `bill_type`, `provider_name`, `account_number`, `billing_period`
- `usage_amount`, `usage_unit`, `rate_per_unit`, `effective_rate`, `amount_due`, `raw_text`

**Provider** — seeded phone plan data
- `name`, `type`, `rate`, `service_area`, `zip_codes`

**Estimate** — model exists for persisting solar/rainwater results (not yet wired to endpoints)

The SQLite database (`casa_abierta.db`) is auto-created on first run. Startup migrations in `database.py` handle any missing columns.

### Services

| Service              | What it does                                                                    |
|----------------------|---------------------------------------------------------------------------------|
| `auth.py`            | bcrypt password hashing, JWT token generation (60-min expiry), user CRUD       |
| `extractor.py`       | Extracts text from PDF bills (pdfplumber) or image bills (pytesseract OCR)     |
| `parser.py`          | Parses raw bill text into structured fields for energy and water bill types     |
| `provider_lookup.py` | Calls OpenEI API for live electricity rates; returns curated Atlanta water data |
| `energy_cmp.py`      | Compares available energy providers against current bill, ranks by savings      |
| `water_cmp.py`       | Same logic as energy comparison but for water providers                         |
| `solar.py`           | Calculates solar panel ROI using Atlanta sun hours, 30% federal tax credit      |
| `rainwater.py`       | Estimates rainwater collection using Atlanta rainfall averages                  |
| `phone_cmp.py`       | Scores phone plans by `monthly_gb / monthly_cost` affordability ratio           |

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
OPENEI_API_KEY=your_openei_api_key_here
```

Get a free API key at: https://openei.org/services/api/signup/

This key is used by `provider_lookup.py` to fetch live electricity rate data by ZIP code via the OpenEI Utility Rates Database API. Energy comparisons will fall back to static data if the key is missing or invalid.

---

## Frontend Details

The frontend is a single-page React application. All pages and components live in `src/app/App.tsx`. Navigation is handled by a `currentPage` state string — no URL router is used.

**State management:**
- `currentPage` — controls which page renders
- `token` — JWT stored in `localStorage` under `ca_token`; read on mount to restore sessions
- `language` — `"en"` or `"es"`; switches all UI text via a translation map in `App.tsx`

**Component library:**
Radix UI primitives (Dialog, DropdownMenu, Tabs, etc.) wrapped with Tailwind CSS styles, sourced from `src/app/components/ui/`.

**Charts:**
Recharts is used on the Solar Calculator page to render bar charts for the 10-year ROI breakdown.

**Production build:**

```bash
cd frontend
npm run build
# Output written to frontend/dist/
# Serve dist/ with any static file server or CDN
```
