"""Parse structured fields from raw bill text using regex patterns."""
import re
from app.schemas.bill import ParsedBillRes


def parse_bill(raw_text: str, bill_type: str) -> ParsedBillRes:
    return ParsedBillRes(
        bill_type=bill_type,
        provider=_find_provider(raw_text),
        usage=_find_usage(raw_text, bill_type),
        amount_due=_find_amount_due(raw_text),
        raw_text=raw_text,
    )


def _find_provider(text: str) -> str | None:
    match = re.search(r"(?:provider|company|utility)[:\s]+([A-Za-z &]+)", text, re.I)
    return match.group(1).strip() if match else None


def _find_usage(text: str, bill_type: str) -> float | None:
    if bill_type == "energy":
        match = re.search(r"([\d,]+\.?\d*)\s*kWh", text, re.I)
    else:
        match = re.search(r"([\d,]+\.?\d*)\s*(?:gallons?|gal)", text, re.I)
    if match:
        return float(match.group(1).replace(",", ""))
    return None


def _find_amount_due(text: str) -> float | None:
    match = re.search(r"(?:amount due|total due|balance due)[:\s$]*([\d,]+\.?\d*)", text, re.I)
    if match:
        return float(match.group(1).replace(",", ""))
    return None
