"""Extract raw text from uploaded bill files (PDF or image)."""
import io
import pdfplumber
from PIL import Image
import pytesseract


def extract_text(contents: bytes, content_type: str) -> str:
    if content_type == "application/pdf":
        return _extract_from_pdf(contents)
    elif content_type.startswith("image/"):
        return _extract_from_image(contents)
    else:
        return contents.decode("utf-8", errors="ignore")


def _extract_from_pdf(contents: bytes) -> str:
    text_parts = []
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            text_parts.append(page.extract_text() or "")
    return "\n".join(text_parts)


def _extract_from_image(contents: bytes) -> str:
    image = Image.open(io.BytesIO(contents))
    return pytesseract.image_to_string(image)
