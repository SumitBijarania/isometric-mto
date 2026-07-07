import os
from fastapi import UploadFile, HTTPException
from app.core.config import UPLOAD_FOLDER, MAX_FILE_SIZE

ALLOWED_EXTENSIONS = {".pdf", ".png", ".jpg", ".jpeg"}
ALLOWED_MIME_TYPES = {"application/pdf", "image/png", "image/jpeg"}

def validate_and_save(file: UploadFile) -> str:
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Invalid file type")

    contents = file.file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail="File too large (max 20 MB)")

    safe_filename = f"{os.urandom(8).hex()}{ext}"
    file_path = UPLOAD_FOLDER / safe_filename
    with open(file_path, "wb") as f:
        f.write(contents)

    return str(file_path)