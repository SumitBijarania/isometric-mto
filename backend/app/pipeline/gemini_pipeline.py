import json
from typing import Optional
from google import genai
from google.genai import types

from app.core.config import GEMINI_API_KEY
from app.models.mto import MTOResponse
from app.pipeline.mock_pipeline import generate_mock_mto
from app.pipeline.prompt import EXTRACTION_PROMPT

def extract_with_gemini(image_path: str) -> Optional[MTOResponse]:
    if not GEMINI_API_KEY:
        return generate_mock_mto()

    client = genai.Client(api_key=GEMINI_API_KEY)

    # Read image file
    with open(image_path, "rb") as f:
        image_bytes = f.read()

    # Configure structured output according to the schema
    config = types.GenerateContentConfig(
        response_mime_type="application/json",
        response_schema=MTOResponse,
        temperature=0.1,
    )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(data=image_bytes, mime_type="image/png"),
                EXTRACTION_PROMPT,
            ],
            config=config,
        )

        # Gemini returns already validated JSON; we trust the schema
        mto = response.parsed  # This is an MTOResponse instance
        if mto is None:
            raise ValueError("No structured output returned")

        # Derive gaskets/bolt sets if missing
        flanges = sum(1 for i in mto.items if i.category.upper() == "FLANGE")
        if mto.summary.gaskets == 0:
            mto.summary.gaskets = flanges
        if mto.summary.bolt_sets == 0:
            mto.summary.bolt_sets = flanges

        # Recalc summary from items if needed
        _recalc_summary(mto)
        return mto

    except Exception:
        # On any failure fall back to mock
        return generate_mock_mto()

def _recalc_summary(mto: MTOResponse):
    pipe_len = 0.0
    fittings = 0
    flanges = 0
    valves = 0
    for item in mto.items:
        if item.category.upper() == "PIPE":
            pipe_len += item.length_m or 0
        elif item.category.upper() == "FITTING":
            fittings += int(item.quantity)
        elif item.category.upper() == "FLANGE":
            flanges += int(item.quantity)
        elif item.category.upper() == "VALVE":
            valves += int(item.quantity)
    mto.summary.total_pipe_length_m = pipe_len or mto.summary.total_pipe_length_m
    mto.summary.fittings = fittings or mto.summary.fittings
    mto.summary.flanges = flanges or mto.summary.flanges
    mto.summary.valves = valves or mto.summary.valves
    if mto.summary.gaskets == 0:
        mto.summary.gaskets = flanges
    if mto.summary.bolt_sets == 0:
        mto.summary.bolt_sets = flanges