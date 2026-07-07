from fastapi.testclient import TestClient
from app.main import app
from app.pipeline.mock_pipeline import generate_mock_mto
import json

client = TestClient(app)

def test_health():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_extract_mock():
    # Upload a tiny valid PNG file
    from PIL import Image
    import io
    img = Image.new("RGB", (100, 100), color="red")
    img_bytes = io.BytesIO()
    img.save(img_bytes, format="PNG")
    img_bytes.seek(0)

    response = client.post(
        "/api/extract",
        files={"file": ("test.png", img_bytes, "image/png")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "drawing_meta" in data
    assert "items" in data
    assert "summary" in data