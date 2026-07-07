from typing import List, Optional
from pydantic import BaseModel, Field

class DrawingMeta(BaseModel):
    drawing_no: Optional[str] = None
    revision: Optional[str] = None
    line_number: Optional[str] = None
    nps: Optional[str] = None
    material_class: Optional[str] = None
    service: Optional[str] = None

class MTOItem(BaseModel):
    item_no: int
    category: str = Field(description="PIPE, FITTING, FLANGE, VALVE, GASKET, BOLT, SUPPORT")
    description: str
    size_nps: Optional[str] = None
    schedule_rating: Optional[str] = None
    material_spec: Optional[str] = None
    end_type: Optional[str] = None
    quantity: float = 1
    unit: str = "EA"
    length_m: Optional[float] = None
    confidence: Optional[float] = None
    remarks: Optional[str] = ""

class Summary(BaseModel):
    total_pipe_length_m: float = 0.0
    fittings: int = 0
    flanges: int = 0
    valves: int = 0
    gaskets: int = 0
    bolt_sets: int = 0
    field_welds: int = 0

class MTOResponse(BaseModel):
    drawing_meta: DrawingMeta
    items: List[MTOItem]
    summary: Summary