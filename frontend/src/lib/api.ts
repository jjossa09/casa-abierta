const BASE_URL = "http://localhost:8000";

export function getToken(): string | null {
  return localStorage.getItem("ca_token");
}

export function clearToken(): void {
  localStorage.removeItem("ca_token");
  localStorage.removeItem("ca_user");
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

async function postForm<T>(path: string, formData: FormData): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { ...authHeaders() },
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

// ─── Types ────────────────────────────────────────────────────────

export interface UserRes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string | null;
  language: string;
}

export interface ParsedBillRes {
  bill_id: number | null;
  bill_type: string;
  provider_name: string | null;
  account_number: string | null;
  billing_period: string | null;
  usage_amount: number | null;
  usage_unit: string;
  rate_per_unit: number | null;
  effective_rate: number | null;
  amount_due: number | null;
  raw_text: string;
}

export interface EnergyProvider {
  provider_id: string;
  provider_name: string;
  rate_per_kwh: number;
  estimated_bill: number;
  current_bill: number;
  monthly_savings: number;
  annual_savings: number;
  service_area: string;
  source: string;
}

export interface WaterProvider {
  provider_id: string;
  provider_name: string;
  rate_per_gallon: number;
  estimated_bill: number;
  current_bill: number;
  monthly_savings: number;
  annual_savings: number;
  service_area: string;
  source: string;
}

export interface PhonePlan {
  provider: string;
  monthly_cost: number;
  score: number;
}

export interface SolarRes {
  num_panels: number;
  monthly_kwh_generated: number;
  upfront_cost: number;
  annual_savings: number;
  total_savings_10yr: number;
  break_even_years: number;
  roi_10yr: number;
}

export interface RainwaterRes {
  estimated_gallons: number;
  cost_offset: number;
  payback_years: number;
}

// ─── Auth ─────────────────────────────────────────────────────────

export async function login(email: string, password: string): Promise<string> {
  const data = await post<{ access_token: string; token_type: string }>(
    "/auth/login",
    { email, password }
  );
  localStorage.setItem("ca_token", data.access_token);
  return data.access_token;
}

export async function register(payload: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address?: string;
  language?: string;
}): Promise<UserRes> {
  return post<UserRes>("/auth/register", payload);
}

export async function getMe(): Promise<UserRes> {
  return get<UserRes>("/auth/me");
}

// ─── Bills ────────────────────────────────────────────────────────

export async function uploadBill(
  file: File,
  billType: "energy" | "water"
): Promise<ParsedBillRes> {
  const formData = new FormData();
  formData.append("file", file);
  return postForm<ParsedBillRes>(`/bills/upload/${billType}`, formData);
}

// ─── Energy ───────────────────────────────────────────────────────

export async function compareEnergy(payload: {
  address?: string;
  zip_code?: string;
  current_usage_kwh: number;
  current_bill_amount: number;
  current_rate_per_kwh: number;
}): Promise<{ providers: EnergyProvider[] }> {
  return post("/energy/compare", payload);
}

export async function calculateSolar(payload: {
  address?: string;
  zip_code?: string;
  monthly_kwh: number;
  num_panels: number;
  current_rate: number;
}): Promise<SolarRes> {
  return post("/energy/solar", payload);
}

// ─── Water ────────────────────────────────────────────────────────

export async function compareWater(payload: {
  address?: string;
  zip_code?: string;
  monthly_gallons: number;
  current_bill_amount: number;
  current_rate_per_gallon: number;
}): Promise<{ providers: WaterProvider[] }> {
  return post("/water/compare", payload);
}

export async function calculateRainwater(payload: {
  address?: string;
  zip_code?: string;
  monthly_gallons: number;
  current_bill_amount: number;
  current_rate_per_gallon: number;
}): Promise<RainwaterRes> {
  return post("/water/rainwater", payload);
}

// ─── Phone ────────────────────────────────────────────────────────

export async function comparePhone(payload: {
  monthly_gb: number;
  num_lines?: number;
}): Promise<{ plans: PhonePlan[] }> {
  return post("/phone/compare", payload);
}
