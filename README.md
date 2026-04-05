# Casa Abierta

A bilingual (English/Spanish) utility-savings platform that helps immigrant and underserved communities compare energy, water, and phone providers, analyze bills, and estimate savings from solar panels and rainwater harvesting.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Architecture](#architecture)
  - [API Endpoints](#api-endpoints)
  - [Database Models](#database-models)
  - [Services](#services)
  - [Environment Variables](#environment-variables)
- [Frontend](#frontend)
  - [Pages & Features](#pages--features)
  - [API Client](#api-client)
- [Running the Project](#running-the-project)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)

---

## Project Overview

Casa Abierta lets users:

- **Upload a utility bill** (PDF or image) and have it automatically parsed for amount, usage, provider, and rate
- **Compare energy providers** using live data from the OpenEI Utility Rates API
- **Compare water providers** with curated Atlanta-area provider data
- **Compare phone plans** from a seeded provider database
- **Calculate solar savings** — upfront cost, annual savings, 10-year ROI, and break-even period
- **Calculate rainwater harvesting savings** — estimated monthly gallons collected, cost offset, and payback period
- **Create an account** and log in to manage their session

The entire UI is available in both English and Spanish.

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
│   ├── models/
│   │   ├── user.py          # User table (auth, preferences, bill data)
│   │   ├── bill.py          # Bill table (parsed bill records)
│   │   ├── provider.py      # Provider table (phone plans seed data)
│   │   └── estimate.py      # Estimate table (solar/rainwater results)
│   │
│   ├── schemas/
│   │   ├── user.py          # RegisterReq, LoginReq, UserRes
│   │   ├── bill.py          # ParsedBillRes
│   │   ├── energy.py        # CompareReq, SolarReq, SolarRes, LocationInput
│   │   ├── water.py         # WaterCompareReq, RainwaterRes, LocationInput
│   │   └── phone.py         # PhoneCompareReq, PhoneRes, PhoneCompareRes
│   │
│   ├── routers/
│   │   ├── auth.py          # POST /auth/register, /auth/login, GET /auth/me
│   │   ├── bills.py         # POST /bills/upload/energy, /bills/upload/water
│   │   ├── energy.py        # POST /energy/compare, /energy/solar
│   │   ├── water.py         # POST /water/compare, /water/rainwater
│   │   └── phone.py         # POST /phone/compare
│   │
│   ├── services/
│   │   ├── auth.py          # Password hashing, JWT creation, user CRUD
│   │   ├── extractor.py     # Text extraction from PDF/image bills
│   │   ├── parser.py        # Structured bill parsing (energy & water)
│   │   ├── provider_lookup.py  # OpenEI energy lookup, Atlanta water data
│   │   ├── energy_cmp.py    # Energy provider comparison logic
│   │   ├── water_cmp.py     # Water provider comparison logic
│   │   ├── solar.py         # Solar panel savings estimation
│   │   ├── rainwater.py     # Rainwater harvesting payback calculation
│   │   └── phone_cmp.py     # Phone plan affordability scoring
│   │
│   └── data/
│       ├── phone_providers.json   # Seeded phone plan data
│       ├── energy_providers.json  # Legacy energy data (superseded by OpenEI)
│       └── water_providers.json   # Legacy water data
│
└── frontend/
    ├── package.json
    ├── vite.config.ts
    └── src/
        ├── main.tsx             # React entry point
        ├── lib/
        │   └── api.ts           # All backend API calls + TypeScript types
        ├── assets/              # Static images (logo, etc.)
        ├── styles/              # Tailwind, fonts, theme CSS
        └── app/
            ├── App.tsx          # All pages and components (single-file SPA)
            └── components/
                ├── ui/          # Radix UI / shadcn component library
                └── figma/       # ImageWithFallback utility component
```

---

## Backend

### Architecture

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

| Method | Path             | Description                                      |
|--------|------------------|--------------------------------------------------|
| POST   | `/auth/register` | Create a new user account                        |
| POST   | `/auth/login`    | Log in, returns a JWT access token               |
| GET    | `/auth/me`       | Get the current user's profile (requires token)  |

#### Bills — `/bills`

| Method | Path                    | Description                                               |
|--------|-------------------------|-----------------------------------------------------------|
| POST   | `/bills/upload/energy`  | Upload energy bill (PDF/JPG/PNG), returns parsed data     |
| POST   | `/bills/upload/water`   | Upload water bill (PDF/JPG/PNG), returns parsed data      |

#### Energy — `/energy`

| Method | Path              | Description                                              |
|--------|-------------------|----------------------------------------------------------|
| POST   | `/energy/compare` | Compare electricity providers by location and usage      |
| POST   | `/energy/solar`   | Estimate solar panel savings and ROI                     |

#### Water — `/water`

| Method | Path               | Description                                             |
|--------|--------------------|---------------------------------------------------------|
| POST   | `/water/compare`   | Compare water providers by location and usage           |
| POST   | `/water/rainwater` | Estimate rainwater harvesting savings and payback       |

#### Phone — `/phone`

| Method | Path              | Description                               |
|--------|-------------------|-------------------------------------------|
| POST   | `/phone/compare`  | Compare phone plans by GB usage           |

#### Health

| Method | Path      | Description        |
|--------|-----------|--------------------|
| GET    | `/`       | API status message |
| GET    | `/health` | `{"status": "ok"}` |

Auto-generated interactive docs are available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Database Models

**User** — stores account info and bill snapshot data
- `id`, `email`, `password` (hashed)
- `first_name`, `last_name`, `address`, `language`
- `energy_bill_amount`, `energy_kwh_usage`, `water_bill_amount`, `water_gallons_usage`, `phone_bill_amount`

**Bill** — parsed bill records linked to a user
- `bill_type`, `provider_name`, `account_number`, `billing_period`
- `usage_amount`, `usage_unit`, `rate_per_unit`, `effective_rate`, `amount_due`, `raw_text`

**Provider** — seeded phone plan data
- `name`, `type`, `rate`, `service_area`, `zip_codes`

**Estimate** — intended for persisting solar/rainwater results (model exists, not yet wired to endpoints)

### Services

| Service               | What it does                                                                   |
|-----------------------|--------------------------------------------------------------------------------|
| `auth.py`             | bcrypt password hashing, JWT token generation (60-min expiry), user CRUD       |
| `extractor.py`        | Extracts text from PDF bills (pdfplumber) or image bills (pytesseract OCR)     |
| `parser.py`           | Parses raw bill text into structured fields for energy and water bill types     |
| `provider_lookup.py`  | Calls OpenEI API for live electricity rates; returns curated Atlanta water data |
| `energy_cmp.py`       | Compares available energy providers against current bill, ranks by savings      |
| `water_cmp.py`        | Same logic as energy comparison but for water providers                         |
| `solar.py`            | Calculates solar panel ROI using Atlanta sun hours, 30% federal tax credit      |
| `rainwater.py`        | Estimates rainwater collection using Atlanta rainfall averages                  |
| `phone_cmp.py`        | Scores phone plans by `monthly_gb / monthly_cost` affordability ratio           |

### Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
OPENEI_API_KEY=your_openei_api_key_here
```

Get a free API key at: https://openei.org/services/api/signup/

---

## Frontend

The frontend is a single-page React application. All pages and components live in `src/app/App.tsx`. Navigation is handled via a `currentPage` state string — no URL router is used.

### Pages & Features

| Page               | Nav Path                             | Description                                               |
|--------------------|--------------------------------------|-----------------------------------------------------------|
| Home               | Home                                 | Hero carousel, services grid, overpaying banner           |
| Bill Analyzer      | Energy / Water / Phone → Insert Bill | Upload or manually enter bill → compare providers         |
| Solar Calculator   | Energy → Solar Solutions             | Form → calls `/energy/solar` → shows ROI breakdown        |
| Water Solutions    | Water → Water Solutions              | Form → calls `/water/rainwater` → shows payback period    |
| Battery Storage    | Energy → Battery Storage             | Static informational page                                 |
| Conservation Tips  | Water → Conservation Tips            | Expandable tips sections                                  |
| Plans              | Phone → Plans                        | Network technology comparison page                        |
| Our Mission        | About → Our Mission                  | Mission statement and data on utility burden              |
| Our Team           | About → Our Team                     | Team member cards                                         |
| History            | About → History                      | Organization history timeline                             |
| Profile            | User icon (top right)                | Session info and bill history (requires login)            |

**Authentication** is handled via a modal. JWT tokens are stored in `localStorage` under the key `ca_token`.

**Language toggle** (EN/ES) is available in the top navigation bar and switches all UI text.

### API Client

`src/lib/api.ts` contains all backend communication using the native `fetch` API pointed at `http://localhost:8000`.

Key exported functions:

```typescript
login(email, password)          // POST /auth/login
register(payload)               // POST /auth/register
getMe()                         // GET  /auth/me
uploadBill(file, billType)      // POST /bills/upload/{energy|water}
compareEnergy(payload)          // POST /energy/compare
calculateSolar(payload)         // POST /energy/solar
compareWater(payload)           // POST /water/compare
calculateRainwater(payload)     // POST /water/rainwater
comparePhone(payload)           // POST /phone/compare
```

---

## Running the Project

### Prerequisites

- Python 3.11+
- Node.js 18+ and npm
- Tesseract OCR — only required for image bill uploads
  - Ubuntu/Debian: `sudo apt install tesseract-ocr`
  - macOS: `brew install tesseract`

### Backend Setup

```bash
# 1. Enter the project directory
cd casa-abierta

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Set up environment variables
cp .env.example .env
# Edit .env and add your OPENEI_API_KEY

# 5. Seed the database with phone provider data
python seed.py

# 6. Start the backend server
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.  
Interactive docs: `http://localhost:8000/docs`

### Frontend Setup

Open a second terminal window:

```bash
# 1. Enter the frontend directory
cd casa-abierta/frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

To build for production:

```bash
npm run build
# Output is written to frontend/dist/
```

> Both servers must be running simultaneously. The backend runs on port `8000` and the frontend dev server on port `5173`. CORS is pre-configured to allow these two origins.
