# Casa Abierta Backend

Casa Abierta is a FastAPI backend for comparing home utility options and estimating savings from home-improvement scenarios. It supports:

- user registration and login
- utility provider comparison for energy and water
- phone plan comparison
- solar savings estimation
- rainwater harvesting estimation
- bill upload and text extraction from PDFs and images

This README documents how the backend is structured today, how the modules relate to each other, how requests flow through the system, how to run it locally, and which parts are still incomplete or partially migrated.

## High-Level Architecture

The backend follows a layered structure:

- `routers/` expose HTTP endpoints
- `schemas/` define request and response shapes
- `services/` contain business logic
- `models/` define database tables
- `database.py` configures SQLAlchemy and DB sessions
- `main.py` wires the application together

The normal request flow is:

1. A client sends an HTTP request to a router.
2. FastAPI validates the request body using a schema.
3. The router calls a service function.
4. The service performs business logic, optionally calling external APIs or the database.
5. The router returns the result, optionally validated against a response schema.

For database-backed routes:

1. FastAPI injects a database session using `get_db()` from `database.py`.
2. The router or service queries SQLAlchemy models.
3. The session is closed automatically after the request finishes.

## Runtime Overview

### Application Entry Point

File: [main.py](/home/david/Documents/hackathon2/casa-abierta/main.py)

Responsibilities:

- loads environment variables from `.env`
- creates all SQLAlchemy tables with `Base.metadata.create_all(bind=engine)`
- creates the FastAPI app
- enables CORS for local frontend development
- registers all routers
- exposes:
  - `GET /`
  - `GET /health`

This is the module Uvicorn runs when you start the backend.

### Database Configuration

File: [database.py](/home/david/Documents/hackathon2/casa-abierta/database.py)

Responsibilities:

- defines the SQLite connection string: `sqlite:///./casa_abierta.db`
- creates the SQLAlchemy engine
- creates `SessionLocal`, the database session factory
- defines `Base`, the declarative base used by all models
- defines `get_db()`, the dependency used by FastAPI routes that need a DB session

How it relates to other files:

- every model class imports `Base` from here
- every DB-backed router uses `get_db()`
- table creation in `main.py` depends on the models having been imported somewhere in the app lifecycle

## Project Structure

```text
main.py
database.py
requirements.txt
seed.py
.env.example

app/
  data/
  models/
  routers/
  schemas/
  services/
```

## Routers

Routers define the HTTP interface of the backend.

### Auth Router

File: [app/routers/auth.py](/home/david/Documents/hackathon2/casa-abierta/app/routers/auth.py)

Endpoints:

- `POST /auth/register`
- `POST /auth/login`

How it works:

- receives validated auth payloads
- uses `get_db()` to open a SQLAlchemy session
- queries the `User` model directly to check whether an email already exists
- delegates password hashing and JWT creation to `app.services.auth`

Dependencies:

- [app/schemas/user.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/user.py)
- [app/services/auth.py](/home/david/Documents/hackathon2/casa-abierta/app/services/auth.py)
- [app/models/user.py](/home/david/Documents/hackathon2/casa-abierta/app/models/user.py)
- [database.py](/home/david/Documents/hackathon2/casa-abierta/database.py)

### Bills Router

File: [app/routers/bills.py](/home/david/Documents/hackathon2/casa-abierta/app/routers/bills.py)

Endpoints:

- `POST /bills/upload/energy`
- `POST /bills/upload/water`

How it works:

- accepts uploaded files as `UploadFile`
- reads the raw bytes
- calls `extract_text()` to turn PDF or image bytes into text
- calls `parse_bill()` to convert the raw text into structured bill fields
- returns parsed bill data as `ParsedBillRes`

Dependencies:

- [app/services/extractor.py](/home/david/Documents/hackathon2/casa-abierta/app/services/extractor.py)
- [app/services/parser.py](/home/david/Documents/hackathon2/casa-abierta/app/services/parser.py)
- [app/schemas/bill.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/bill.py)

Important note:

- the route currently injects a DB session but does not save uploaded bills to the `bills` table yet

### Energy Router

File: [app/routers/energy.py](/home/david/Documents/hackathon2/casa-abierta/app/routers/energy.py)

Endpoints:

- `POST /energy/compare`
- `POST /energy/solar`

How it works:

- `compare` validates location and usage input, then calls `compare_energy_providers()`
- `solar` calls `calculate_solar()` and returns a `SolarRes`

Dependencies:

- [app/schemas/energy.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/energy.py)
- [app/services/energy_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/energy_cmp.py)
- [app/services/solar.py](/home/david/Documents/hackathon2/casa-abierta/app/services/solar.py)

### Water Router

File: [app/routers/water.py](/home/david/Documents/hackathon2/casa-abierta/app/routers/water.py)

Endpoints:

- `POST /water/compare`
- `POST /water/rainwater`

How it works:

- `compare` validates location and water usage input, then calls `compare_water_providers()`
- `rainwater` calls `calculate_rainwater()` and returns `RainwaterRes`

Dependencies:

- [app/schemas/water.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/water.py)
- [app/services/water_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/water_cmp.py)
- [app/services/rainwater.py](/home/david/Documents/hackathon2/casa-abierta/app/services/rainwater.py)

### Phone Router

File: [app/routers/phone.py](/home/david/Documents/hackathon2/casa-abierta/app/routers/phone.py)

Endpoint:

- `POST /phone/compare`

How it works:

- validates phone usage input
- loads `phone` providers from the database using the `Provider` table
- computes a simple cost/score ranking through `compare_phone_plans()`

Dependencies:

- [app/schemas/phone.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/phone.py)
- [app/services/phone_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/phone_cmp.py)
- [app/models/provider.py](/home/david/Documents/hackathon2/casa-abierta/app/models/provider.py)

## Schemas

Schemas define API contracts.

### User Schemas

File: [app/schemas/user.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/user.py)

Classes:

- `RegisterReq`
  - request body for `POST /auth/register`
  - fields: `first_name`, `last_name`, `email`, `password`, `address`, `language`
- `LoginReq`
  - request body for `POST /auth/login`
  - fields: `email`, `password`
- `UserRes`
  - response model returned after registration
  - fields: `id`, `first_name`, `last_name`, `email`, `address`, `language`

Relationship to other modules:

- consumed by `app/routers/auth.py`
- partially mapped to the `User` SQLAlchemy model

### Bill Schemas

File: [app/schemas/bill.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/bill.py)

Classes:

- `BillUploadRes`
  - legacy placeholder schema from the earlier upload flow
- `ParsedBillRes`
  - current response shape for parsed bill uploads
  - includes:
    - `bill_id`
    - `bill_type`
    - `provider_name`
    - `account_number`
    - `billing_period`
    - `usage_amount`
    - `usage_unit`
    - `rate_per_unit`
    - `effective_rate`
    - `amount_due`
    - `raw_text`

Relationship to other modules:

- returned by `app/routers/bills.py`
- populated by `app/services/parser.py`

### Energy Schemas

File: [app/schemas/energy.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/energy.py)

Classes:

- `LocationInput`
  - reusable location validator
  - supports:
    - `address`
    - `zip_code`
    - `lat` and `lon`
  - enforces that at least one usable location format is provided
- `CompareReq`
  - used by `POST /energy/compare`
  - extends `LocationInput`
  - adds:
    - `current_usage_kwh`
    - `current_bill_amount`
    - `current_rate_per_kwh`
- `SolarReq`
  - used by `POST /energy/solar`
  - extends `LocationInput`
  - adds:
    - `monthly_kwh`
    - `num_panels`
    - `current_rate`
- `SolarRes`
  - response for solar calculations
  - includes:
    - `num_panels`
    - `monthly_kwh_generated`
    - `upfront_cost`
    - `annual_savings`
    - `total_savings_10yr`
    - `break_even_years`
    - `roi_10yr`

Why location is modeled this way:

- utility territory matching works better with a full address or coordinates than with ZIP codes
- ZIP codes are still supported as a fallback

### Water Schemas

File: [app/schemas/water.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/water.py)

Classes:

- `LocationInput`
  - same concept as the energy location validator
- `WaterCompareReq`
  - request body for `POST /water/compare` and `POST /water/rainwater`
  - fields:
    - `address` or `zip_code` or `lat/lon`
    - `monthly_gallons`
    - `current_bill_amount`
    - `current_rate_per_gallon`
- `RainwaterRes`
  - response for rainwater estimates
  - includes:
    - `estimated_gallons`
    - `cost_offset`
    - `payback_years`

### Phone Schemas

File: [app/schemas/phone.py](/home/david/Documents/hackathon2/casa-abierta/app/schemas/phone.py)

Classes:

- `PhoneCompareReq`
  - request body for `POST /phone/compare`
  - fields:
    - `monthly_gb`
    - `num_lines`
- `PhoneRes`
  - response model for each ranked provider offer

Important note:

- phone comparison currently ranks provider-level offers, not distinct named plans

## Models

Models define the database tables.

### User Model

File: [app/models/user.py](/home/david/Documents/hackathon2/casa-abierta/app/models/user.py)

Class: `User`

Purpose:

- stores account, household, and bill-related user information

Fields:

- auth:
  - `id`
  - `email`
  - `password`
- personal:
  - `first_name`
  - `last_name`
- location:
  - `address`
- legacy compatibility:
  - `zip_code`
  - `house_sqft`
- bill data:
  - `energy_bill_amount`
  - `energy_kwh_usage`
  - `water_bill_amount`
  - `water_gallons_usage`
  - `phone_bill_amount`
- settings:
  - `language`
- timestamps:
  - `created_at`
  - `updated_at`

Relationship to other modules:

- queried in `auth.py`
- created by `app/services/auth.py`
- conceptually linked to uploaded bills and estimates

Important note:

- `address` is the active user-facing location field
- `zip_code` and `house_sqft` are retained only for compatibility with the current SQLite schema

### Provider Model

File: [app/models/provider.py](/home/david/Documents/hackathon2/casa-abierta/app/models/provider.py)

Class: `Provider`

Purpose:

- stores provider records in the local DB for seeded comparison use cases

Fields:

- `id`
- `name`
- `type`
- `rate`
- `service_area`
- `zip_codes`

Relationship to other modules:

- used by `phone_cmp.py`
- historically used by local energy and water comparison
- populated by `seed.py`

Important note:

- energy comparison has moved to live OpenEI lookup, and water comparison now uses curated in-code fallback data for Atlanta-area demos. That means the `Provider` table is still useful for phone plans, but no longer represents the full comparison strategy across all verticals.

### Bill Model

File: [app/models/bill.py](/home/david/Documents/hackathon2/casa-abierta/app/models/bill.py)

Class: `Bill`

Purpose:

- intended to store uploaded and parsed bill records

Fields:

- `id`
- `user_id`
- `bill_type`
- `provider_name`
- `account_number`
- `billing_period`
- `usage_amount`
- `usage_unit`
- `rate_per_unit`
- `effective_rate`
- `amount_due`
- `raw_text`

Relationship to other modules:

- logically tied to `bills.py` uploads
- populated by the active bill upload endpoints

### Estimate Model

File: [app/models/estimate.py](/home/david/Documents/hackathon2/casa-abierta/app/models/estimate.py)

Class: `Estimate`

Purpose:

- intended to persist estimate results such as solar or rainwater scenarios

Fields:

- `id`
- `user_id`
- `type`
- `upfront_cost`
- `savings`
- `break_even`
- `roi_10yr`

Relationship to other modules:

- conceptually related to `solar.py` and `rainwater.py`
- not currently written to by the active endpoints

## Services

Services hold the actual application logic.

### Auth Service

File: [app/services/auth.py](/home/david/Documents/hackathon2/casa-abierta/app/services/auth.py)

Functions:

- `hash_password(password)`
  - hashes a plaintext password using bcrypt via Passlib
- `verify_password(plain, hashed)`
  - verifies a submitted password against a stored hash
- `create_access_token(data)`
  - creates a JWT with an expiration
- `create_user(db, payload)`
  - creates and saves a `User` record
- `authenticate_user(db, payload)`
  - verifies credentials and returns a JWT if valid

How it relates to the router:

- `auth.py` uses this service for user creation and login

Important note:

- `SECRET_KEY` is hard-coded and should be moved to environment variables before production use

### Text Extraction Service

File: [app/services/extractor.py](/home/david/Documents/hackathon2/casa-abierta/app/services/extractor.py)

Functions:

- `extract_text(file_bytes, content_type)`
  - dispatches based on MIME type
- `_extract_from_pdf(file_bytes)`
  - uses `pdfplumber` to extract text page by page
- `_extract_from_image(file_bytes)`
  - uses `Pillow` and `pytesseract` OCR

How it relates to other modules:

- called by `app/routers/bills.py`
- output is passed to `app/services/parser.py`

Dependency split:

- PDF parsing is Python-only
- image OCR requires the host `tesseract` executable in addition to the Python package

### Bill Parser Service

File: [app/services/parser.py](/home/david/Documents/hackathon2/casa-abierta/app/services/parser.py)

Purpose:

- converts raw bill text into structured fields

Functions:

- `parse_bill(raw_text, bill_type)`
  - entry point
  - routes to energy or water parsing
- `_parse_energy(text)`
  - extracts provider, account number, billing period, kWh usage, rates, and amount due
- `_parse_water(text)`
  - extracts provider, account number, billing period, water usage, effective rate, and amount due
- `_find(...)`
  - generic regex helper
- `_find_float(...)`
  - float-conversion helper
- `_find_amount_due(...)`
  - parses common amount-due labels
- `_find_water_usage(...)`
  - parses gallons or converts `CCF` to gallons
- `_find_provider(...)`
  - matches against known provider names
- `_effective_rate(...)`
  - computes an implicit rate when only amount and usage are available

How it relates to other modules:

- called by `app/routers/bills.py`
- shaped to return `ParsedBillRes`

### Provider Lookup Service

File: [app/services/provider_lookup.py](/home/david/Documents/hackathon2/casa-abierta/app/services/provider_lookup.py)

Purpose:

- centralizes provider lookup logic for live energy comparison and curated water fallback

Functions:

- `lookup_energy_providers(...)`
  - calls the OpenEI utility rates API
  - supports `address`, `lat/lon`, or `zip_code`
  - prefers address or coordinates for better geographic accuracy
- `lookup_water_providers(...)`
  - returns curated Atlanta-area water provider demo data
- `_build_location_params(...)`
  - converts the location input into the parameter format OpenEI expects
- `_location_label(...)`
  - produces a human-readable location value for metadata
- `_normalize_location_text(...)`
  - used to evaluate fallback matches for curated water data
- `_looks_like_atlanta_coords(...)`
  - identifies coordinates within the Atlanta-area demo envelope
- `_extract_energy_rate(item)`
  - extracts an approximate effective `$ / kWh` from OpenEI rate structures

How it relates to other modules:

- used by `energy_cmp.py`
- used by `water_cmp.py`

Important note:

- OpenEI requires `OPENEI_API_KEY`
- water comparison is not backed by a national live API in this project

### Energy Comparison Service

File: [app/services/energy_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/energy_cmp.py)

Purpose:

- compares available electricity rate records against the user’s current bill

Function:

- `compare_energy_providers(payload)`

How it works:

1. calls `lookup_energy_providers(...)`
2. receives matching OpenEI rate entries
3. estimates a monthly bill for each returned rate
4. computes monthly and annual savings versus the current bill
5. sorts results by lowest estimated bill first

Returned fields include:

- `provider_id`
- `provider_name`
- `rate_per_kwh`
- `estimated_bill`
- `current_bill`
- `current_rate_per_kwh`
- `monthly_savings`
- `annual_savings`
- `service_area`
- `source`
- `metadata`

### Water Comparison Service

File: [app/services/water_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/water_cmp.py)

Purpose:

- compares curated water provider rates to the user’s current bill

Function:

- `compare_water_providers(payload)`

How it works:

1. calls `lookup_water_providers(...)`
2. receives curated provider records for Atlanta-area demo inputs
3. estimates a monthly bill for each
4. computes monthly and annual savings
5. sorts results by lowest estimated bill first

Important note:

- unlike energy, this is currently demo-oriented curated data, not a national live API integration

### Solar Service

File: [app/services/solar.py](/home/david/Documents/hackathon2/casa-abierta/app/services/solar.py)

Purpose:

- estimates solar cost, generation, savings, break-even time, and 10-year ROI from a selected panel count

Function:

- `calculate_solar(payload)`

How it works:

1. converts the chosen `num_panels` into total system size
2. calculates gross cost and federal tax credit
3. estimates monthly generation from the chosen system
4. compares generated power to the current monthly usage
5. computes annual savings and break-even years
6. projects 10-year savings with annual panel degradation

### Rainwater Service

File: [app/services/rainwater.py](/home/david/Documents/hackathon2/casa-abierta/app/services/rainwater.py)

Purpose:

- estimates monthly water capture and payback for a standard rainwater system

Function:

- `calculate_rainwater(payload)`

How it works:

1. uses an Atlanta-area rainfall assumption
2. calculates potential captured water from a standard collection setup
3. caps collection by tank capacity and user monthly usage
4. estimates monthly savings using an average local water rate
5. computes payback years

### Phone Comparison Service

File: [app/services/phone_cmp.py](/home/david/Documents/hackathon2/casa-abierta/app/services/phone_cmp.py)

Purpose:

- compares seeded phone providers using a simple affordability score

Function:

- `compare_phone_plans(db, payload)`

How it works:

1. loads all `phone` providers from the `Provider` table
2. computes total monthly cost based on `num_lines`
3. computes a score as `monthly_gb / monthly_cost`
4. sorts highest score first

## Seed Data

The project includes local JSON data files:

- [app/data/phone_providers.json](/home/david/Documents/hackathon2/casa-abierta/app/data/phone_providers.json)
- [app/data/energy_providers.json](/home/david/Documents/hackathon2/casa-abierta/app/data/energy_providers.json)
- [app/data/water_providers.json](/home/david/Documents/hackathon2/casa-abierta/app/data/water_providers.json)

These are loaded by [seed.py](/home/david/Documents/hackathon2/casa-abierta/seed.py).

Current usage:

- phone provider data is still relevant for `/phone/compare`
- energy and water seed data reflect an older local-comparison approach and are no longer the primary runtime source for those endpoints

## External Integrations

### OpenEI Utility Rates API

Used by:

- `app/services/provider_lookup.py`
- `POST /energy/compare`

Purpose:

- fetch electricity utility rate records based on geography

Current location strategy:

- best: full street address
- next best: `lat` and `lon`
- fallback: ZIP code

Why:

- utility service territories are geographic, not purely postal

### Tesseract OCR

Used by:

- `app/services/extractor.py`

Purpose:

- extract text from uploaded bill images

Requirement:

- installing the Python package `pytesseract` is not enough
- the native `tesseract` binary must also be installed on the host machine

## Environment Variables

The backend currently expects:

- `OPENEI_API_KEY`

Example:

```env
OPENEI_API_KEY=replace_with_your_real_openei_key
```

File:

- [.env.example](/home/david/Documents/hackathon2/casa-abierta/.env.example)

The app loads `.env` automatically at startup.

## Local Startup Instructions

### 1. Create and activate a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Python dependencies

```bash
pip install -r requirements.txt
```

### 3. Create your environment file

```bash
cp .env.example .env
```

Then edit `.env` and add your real OpenEI key.

### 4. Install the OCR system dependency if you want image bill uploads

On Ubuntu:

```bash
sudo apt-get update
sudo apt-get install -y tesseract-ocr
```

Without this package:

- PDF bill upload should still work
- image bill upload will fail

### 5. Seed the database if you want local provider records for phone comparison

```bash
python seed.py
```

This is mainly useful for:

- `/phone/compare`

### 6. Start the backend

```bash
uvicorn main:app --reload
```

The server will be available at:

- `http://localhost:8000`

Useful URLs:

- API root: `http://localhost:8000/`
- health check: `http://localhost:8000/health`
- Swagger docs: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Example Requests

### Health Check

```bash
curl http://localhost:8000/health
```

### Energy Compare Using Address

```bash
curl -X POST http://localhost:8000/energy/compare \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Atlanta, GA",
    "current_usage_kwh": 900,
    "current_bill_amount": 150,
    "current_rate_per_kwh": 0.1667
  }'
```

### Energy Compare Using Coordinates

```bash
curl -X POST http://localhost:8000/energy/compare \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 33.7490,
    "lon": -84.3880,
    "current_usage_kwh": 900,
    "current_bill_amount": 150,
    "current_rate_per_kwh": 0.1667
  }'
```

### Water Compare

```bash
curl -X POST http://localhost:8000/water/compare \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Atlanta, GA",
    "monthly_gallons": 4000,
    "current_bill_amount": 55,
    "current_rate_per_gallon": 0.01375
  }'
```

### Solar Estimate

```bash
curl -X POST http://localhost:8000/energy/solar \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Atlanta, GA",
    "monthly_kwh": 900,
    "num_panels": 12,
    "current_rate": 0.17
  }'
```

### Rainwater Estimate

```bash
curl -X POST http://localhost:8000/water/rainwater \
  -H "Content-Type: application/json" \
  -d '{
    "address": "Atlanta, GA",
    "monthly_gallons": 4000,
    "current_bill_amount": 55,
    "current_rate_per_gallon": 0.01375
  }'
```

### Phone Compare

```bash
curl -X POST http://localhost:8000/phone/compare \
  -H "Content-Type: application/json" \
  -d '{
    "monthly_gb": 20,
    "num_lines": 2
  }'
```

## Current Integration Status

These paths are usable now:

- `/health`
- `/energy/compare`
- `/energy/solar`
- `/water/compare`
- `/water/rainwater`
- `/phone/compare` if the DB has been seeded
- PDF bill uploads
- persisted bill uploads

These paths require extra setup or cleanup:

- image bill uploads require host-level Tesseract
- estimate results do not persist records yet
- water compare is currently curated demo data, not a national live API

## Known Gaps and Drift

This repo is functional, but not fully consistent yet. Important gaps:

- `Estimate` exists, but active estimate routes do not persist to it yet
- `Provider` model still reflects an older seeded-data architecture while energy comparison now uses OpenEI
- `SECRET_KEY` should be moved into environment variables

## Recommended Next Cleanup Steps

1. Decide whether to persist estimate results, then connect the active estimate routes to `Estimate`.
2. Move auth secrets into `.env`.
3. Decide whether water comparison should remain curated demo data or move to a richer live/curated dataset strategy.
