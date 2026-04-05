import re


# Known providers — used to identify the provider name from bill text
KNOWN_ENERGY_PROVIDERS = [
    "Georgia Power", "Cobb EMC", "Sawnee EMC",
    "Walton EMC", "Jackson EMC", "Coweta-Fayette EMC",
]

KNOWN_WATER_PROVIDERS = [
    "City of Atlanta", "Atlanta Watershed", "DeKalb County",
    "Gwinnett County", "Cobb County Water", "Cherokee County Water",
    "Fulton County Water",
]


def parse_bill(raw_text: str, bill_type: str) -> dict:
    """
    Parse raw extracted bill text into structured fields.
    bill_type must be "energy" or "water".
    Returns a dict matching ParsedBillRes schema.
    """
    if bill_type == "energy":
        return _parse_energy(raw_text)
    elif bill_type == "water":
        return _parse_water(raw_text)
    else:
        raise ValueError(f"Unknown bill_type: {bill_type}")


# ---------------------------------------------------------------------------
# Energy bill parser
# ---------------------------------------------------------------------------

def _parse_energy(text: str) -> dict:
    usage_amount = _find_float(r"([\d,]+(?:\.\d+)?)\s*kWh", text)
    amount_due = _find_amount_due(text)
    rate_per_unit = _find_float(r"\$?\s*(0\.\d{3,4})\s*(?:per\s*)?kWh", text)
    return {
        "bill_type":      "energy",
        "provider_name":  _find_provider(text, KNOWN_ENERGY_PROVIDERS),
        "account_number": _find(r"(?i)account\s*(?:no|number|#)?\s*[:\-]?\s*(\d[\d\-]{4,})", text),
        "billing_period": _find(r"(?i)(?:billing|service)\s*period[:\s]+([A-Za-z0-9\s,/\-]+?)(?:\n|$)", text),
        "usage_amount":   usage_amount,
        "usage_unit":     "kWh",
        "rate_per_unit":  rate_per_unit,
        "effective_rate": _effective_rate(amount_due, usage_amount, rate_per_unit),
        "amount_due":     amount_due,
        "raw_text":       text,
    }


# ---------------------------------------------------------------------------
# Water bill parser
# ---------------------------------------------------------------------------

def _parse_water(text: str) -> dict:
    usage_amount = _find_water_usage(text)
    amount_due = _find_amount_due(text)
    return {
        "bill_type":      "water",
        "provider_name":  _find_provider(text, KNOWN_WATER_PROVIDERS),
        "account_number": _find(r"(?i)account\s*(?:no|number|#)?\s*[:\-]?\s*(\d[\d\-]{4,})", text),
        "billing_period": _find(r"(?i)(?:billing|service)\s*period[:\s]+([A-Za-z0-9\s,/\-]+?)(?:\n|$)", text),
        "usage_amount":   usage_amount,
        "usage_unit":     "gallons",
        "rate_per_unit":  None,   # rarely printed on water bills
        "effective_rate": _effective_rate(amount_due, usage_amount),
        "amount_due":     amount_due,
        "raw_text":       text,
    }


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _find(pattern: str, text: str):
    """Return first regex group match as a stripped string, or None."""
    match = re.search(pattern, text)
    if match:
        return match.group(1).strip()
    return None


def _find_float(pattern: str, text: str):
    """Return first regex group match as a float, or None."""
    raw = _find(pattern, text)
    if raw:
        try:
            return float(raw.replace(",", ""))
        except ValueError:
            return None
    return None


def _find_amount_due(text: str):
    """
    Look for 'Amount Due', 'Total Due', 'Balance Due', or 'Total Amount Due'
    followed by a dollar amount.
    """
    pattern = r"(?i)(?:total\s+)?(?:amount|balance)\s+due[:\s]+\$?\s*([\d,]+\.\d{2})"
    return _find_float(pattern, text)


def _find_water_usage(text: str):
    """
    Water bills report usage in gallons or CCF (hundred cubic feet).
    1 CCF = 748 gallons. Try both.
    """
    # Gallons first
    gallons = _find_float(r"([\d,]+(?:\.\d+)?)\s*(?:gallons|gal\.?)\b", text)
    if gallons:
        return gallons

    # CCF → convert to gallons
    ccf = _find_float(r"([\d,]+(?:\.\d+)?)\s*CCF\b", text)
    if ccf:
        return round(ccf * 748, 2)

    return None


def _find_provider(text: str, known_providers: list):
    """Check if any known provider name appears in the bill text."""
    for name in known_providers:
        if name.lower() in text.lower():
            return name
    return None


def _effective_rate(amount_due: float | None, usage_amount: float | None, explicit_rate: float | None = None):
    if explicit_rate is not None:
        return explicit_rate
    if amount_due is None or usage_amount in (None, 0):
        return None
    return round(amount_due / usage_amount, 6)
