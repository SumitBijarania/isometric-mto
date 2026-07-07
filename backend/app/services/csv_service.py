import pandas as pd
from io import StringIO
from app.models.mto import MTOResponse

def generate_csv(mto: MTOResponse) -> str:
    rows = []
    for item in mto.items:
        rows.append({
            "item_no": item.item_no,
            "category": item.category,
            "description": item.description,
            "size_nps": item.size_nps or "",
            "schedule_rating": item.schedule_rating or "",
            "material_spec": item.material_spec or "",
            "end_type": item.end_type or "",
            "quantity": item.quantity,
            "unit": item.unit,
            "length_m": item.length_m if item.unit == "M" else "",
            "remarks": item.remarks or "",
        })
    df = pd.DataFrame(rows)
    csv_buffer = StringIO()
    df.to_csv(csv_buffer, index=False)
    return csv_buffer.getvalue()