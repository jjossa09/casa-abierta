# Casa Abierta

Casa Abierta is a platform that helps families discover and understand home technologies that fit their needs, lifestyle, and monthly budget, so they can improve their quality of life with solutions they can actually afford and use.

A FastAPI backend that helps households compare utility providers, upload bills for parsing, and estimate savings from solar panels and rainwater harvesting.

---

## Tech Stack

- **Backend**: FastAPI + Uvicorn
- **Database**: SQLite via SQLAlchemy
- **Auth**: JWT (python-jose) + bcrypt (passlib)
- **Bill parsing**: pdfplumber (PDF), pytesseract (images)

---

## Project Structure

```
main.py             # App entry point — registers routers, creates DB tables
database.py         # SQLAlchemy engine, session, and get_db() dependency
seed.py             # One-time script to load provider JSON into the DB
requirements.txt    # Python dependencies

app/
  routers/          # CONTROLLER — HTTP routes only, no business logic
    auth.py         #   POST /auth/register, POST /auth/login
    bills.py        #   POST /bills/upload/energy, POST /bills/upload/water
    energy.py       #   POST /energy/compare, POST /energy/solar
    water.py        #   POST /water/compare, POST /water/rainwater
    phone.py        #   POST /phone/compare

  schemas/          # VIEW — Pydantic request/response shapes
    user.py         #   RegisterReq, LoginReq, UserRes
    bill.py         #   BillUploadRes, ParsedBillRes
    energy.py       #   CompareReq, SolarReq, SolarRes
    water.py        #   WaterCompareReq, RainwaterRes
    phone.py        #   PhoneCompareReq, PhoneRes

  services/         # Business logic — no HTTP, no DB models imported directly
    auth.py         #   Hash passwords, verify tokens, create JWTs
    extractor.py    #   PDF → text (pdfplumber), image → text (OCR)
    parser.py       #   Regex patterns to extract kWh, rate, amount due
    solar.py        #   ROI calculation, break-even year, 10-yr savings
    rainwater.py    #   Rainfall estimate, cost offset, payback period
    energy_cmp.py   #   Score energy providers by ZIP + rate → ranked list
    water_cmp.py    #   Score water providers by gallons × rate → ranked list
    phone_cmp.py    #   Score phone plans by usage → ranked list

  models/           # MODEL — SQLAlchemy table definitions
    user.py         #   id, email, password, zip_code, language, housing_type
    bill.py         #   user_id, bill_type, provider, usage, amount_due, raw_text
    provider.py     #   name, type, rate, service_area, zip_codes
    estimate.py     #   user_id, type, upfront_cost, savings, break_even, roi_10yr

  data/             # Seed JSON files loaded by seed.py
    energy_providers.json
    water_providers.json
    phone_providers.json

casa_abierta.db     # Auto-generated SQLite database (not committed)
```

---

## Getting Started

### 1. Install dependencies

```bash
pip install -r requirements.txt
```

### 2. Seed the database

```bash
python seed.py
```

### 3. Run the server

```bash
uvicorn main:app --reload
```

### 4. Explore the API

Visit [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger UI.

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new user account |
| POST | `/auth/login` | Log in and receive a JWT |
| POST | `/bills/upload/energy` | Upload an energy bill (PDF or image) |
| POST | `/bills/upload/water` | Upload a water bill (PDF or image) |
| POST | `/energy/compare` | Compare energy providers by ZIP + usage |
| POST | `/energy/solar` | Estimate solar ROI |
| POST | `/water/compare` | Compare water providers by ZIP + usage |
| POST | `/water/rainwater` | Estimate rainwater harvesting savings |
| POST | `/phone/compare` | Compare phone plans by data usage |

---

## Architecture

This project follows a strict MVC pattern:

- **Routers** handle HTTP only — they validate input via schemas and delegate to services.
- **Services** contain all business logic — they are pure Python with no FastAPI dependencies.
- **Models** define the database schema — they are only imported by services and database setup.
- **Schemas** define the data shapes for requests and responses using Pydantic.
