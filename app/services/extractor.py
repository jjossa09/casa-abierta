import io


def extract_text(file_bytes: bytes, content_type: str) -> str:
    """
    Given raw file bytes and the MIME content type,
    extract and return the raw text string.

    Supported:
      application/pdf        → pdfplumber
      image/jpeg, image/png  → pytesseract OCR
    """
    if content_type == "application/pdf":
        return _extract_from_pdf(file_bytes)
    elif content_type in ("image/jpeg", "image/png", "image/jpg"):
        return _extract_from_image(file_bytes)
    else:
        raise ValueError(f"Unsupported file type: {content_type}. Upload a PDF or image.")


def _extract_from_pdf(file_bytes: bytes) -> str:
    try:
        import pdfplumber
    except ImportError:
        raise RuntimeError("pdfplumber is not installed. Run: pip install pdfplumber")

    text = ""
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    if not text.strip():
        raise ValueError("Could not extract any text from this PDF. Try uploading an image instead.")

    return text


def _extract_from_image(file_bytes: bytes) -> str:
    try:
        import pytesseract
        from PIL import Image
    except ImportError:
        raise RuntimeError(
            "pytesseract or Pillow is not installed. "
            "Run: pip install pytesseract Pillow  "
            "Also install Tesseract: https://github.com/tesseract-ocr/tesseract"
        )

    image = Image.open(io.BytesIO(file_bytes))

    # Convert to RGB if needed (handles PNG with transparency)
    if image.mode not in ("RGB", "L"):
        image = image.convert("RGB")

    text = pytesseract.image_to_string(image)

    if not text.strip():
        raise ValueError("Could not read text from this image. Try a clearer photo or PDF.")

    return text
