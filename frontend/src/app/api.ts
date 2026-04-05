/**
 * api.ts — Casa Abierta frontend ↔ backend bridge
 *
 * Drop this file at: frontend/src/app/api.ts
 *
 * Every function talks to the FastAPI backend.
 * The JWT token is stored in localStorage and attached
 * automatically to every authenticated request.
 */

const API_BASE = "http://localhost:8000";

// ─── Token helpers ─────────────────────────────────────────────────

export function getToken(): string | null {
  return localStorage.getItem("ca_token");
}

export function setToken(token: string) {
  localStorage.setItem("ca_token", token);
}

export function clearToken() {
  localStorage.removeItem("ca_token");
  localStorage.removeItem("ca_user");
}

export function getSavedUser() {
  const raw = localStorage.getItem("ca_user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveUser(user: any) {
  localStorage.setItem("ca_user", JSON.stringify(user));
}

// ─── Generic fetch wrapper ─────────────────────────────────────────

async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  // Only set Content-Type for non-FormData bodies
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

// ─── Auth ──────────────────────────────────────────────────────────

export async function register(data: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  language?: string;
}) {
  const res = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Registration failed");
  }
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Invalid credentials");
  }
  const data = await res.json();
  setToken(data.access_token);
  saveUser(data.user);
  return data;
}

export async function getMe() {
  const res = await apiFetch("/auth/me");
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
}

export function logout() {
  clearToken();
}

// ─── Bill upload ───────────────────────────────────────────────────

export async function uploadBill(file: File, billType: "energy" | "water") {
  const formData = new FormData();
  formData.append("file", file);
  const res = await apiFetch(`/bills/upload/${billType}`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Upload failed");
  }
  return res.json();
}

export async function getBillHistory(limit = 20) {
  const res = await apiFetch(`/bills/history?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to load bill history");
  return res.json();
}

// ─── Energy ────────────────────────────────────────────────────────

export async function compareEnergy(data: {
  current_usage_kwh: number;
  current_bill_amount: number;
  current_rate_per_kwh: number;
  address?: string;
  zip_code?: string;
}) {
  const res = await apiFetch("/energy/compare", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Comparison failed");
  }
  return res.json();
}

export async function solarEstimate(data: {
  monthly_kwh: number;
  num_panels: number;
  current_rate: number;
  address?: string;
  zip_code?: string;
}) {
  const res = await apiFetch("/energy/solar", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Solar estimate failed");
  }
  return res.json();
}

// ─── Water ─────────────────────────────────────────────────────────

export async function compareWater(data: {
  monthly_gallons: number;
  current_bill_amount: number;
  current_rate_per_gallon: number;
  address?: string;
  zip_code?: string;
}) {
  const res = await apiFetch("/water/compare", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Comparison failed");
  }
  return res.json();
}

export async function rainwaterEstimate(data: {
  monthly_gallons: number;
  current_bill_amount: number;
  current_rate_per_gallon: number;
  address?: string;
  zip_code?: string;
}) {
  const res = await apiFetch("/water/rainwater", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Rainwater estimate failed");
  }
  return res.json();
}

// ─── Phone ─────────────────────────────────────────────────────────

export async function comparePhone(data: {
  monthly_gb: number;
  num_lines?: number;
}) {
  const res = await apiFetch("/phone/compare", {
    method: "POST",
    body: JSON.stringify({ monthly_gb: data.monthly_gb, num_lines: data.num_lines || 1 }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Phone comparison failed");
  }
  return res.json();
}
