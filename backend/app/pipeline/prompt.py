EXTRACTION_PROMPT = """
You are a senior piping engineer. Extract the material take-off from this isometric drawing.

Return a JSON object with the following schema:

{
  "drawing_meta": {
    "drawing_no": "string or null",
    "revision": "string or null",
    "line_number": "string or null",
    "nps": "string or null",
    "material_class": "string or null",
    "service": "string or null"
  },
  "items": [
    {
      "item_no": integer,
      "category": "one of PIPE, FITTING, FLANGE, VALVE, GASKET, BOLT, SUPPORT",
      "description": "full engineering description",
      "size_nps": "NPS, e.g. 6 inch",
      "schedule_rating": "e.g. SCH40 or CL150",
      "material_spec": "ASTM grade",
      "end_type": "BW, SW, THD, FLGD etc.",
      "quantity": number,
      "unit": "M for pipe, EA for others",
      "length_m": number or null,
      "confidence": number between 0 and 1,
      "remarks": "optional notes"
    }
  ],
  "summary": {
    "total_pipe_length_m": number,
    "fittings": integer,
    "flanges": integer,
    "valves": integer,
    "gaskets": integer,
    "bolt_sets": integer,
    "field_welds": integer
  }
}

Rules:
- Pipe quantity is number of pieces, unit "M", and length_m must be filled.
- Fittings, flanges, valves, gaskets, bolts are counted each, unit "EA".
- Gaskets and bolt sets equal number of flanges (1 per flanged joint).
- Derive summary totals from items.
- Confidence reflects your certainty (0-1).
- Do not add extra text. Only return valid JSON.
"""