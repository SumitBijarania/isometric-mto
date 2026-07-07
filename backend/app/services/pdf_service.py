from pdf2image import convert_from_path
from pathlib import Path

def pdf_to_image(pdf_path: str, output_dir: str) -> str:
    images = convert_from_path(pdf_path, first_page=1, last_page=1)
    if not images:
        raise ValueError("PDF has no pages")
    output_path = Path(output_dir) / f"{Path(pdf_path).stem}.png"
    images[0].save(str(output_path), "PNG")
    return str(output_path)