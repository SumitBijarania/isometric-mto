export interface DrawingMeta {
  drawing_no?: string;
  revision?: string;
  line_number?: string;
  nps?: string;
  material_class?: string;
  service?: string;
}

export interface MTOItem {
  item_no: number;
  category: string;
  description: string;
  size_nps?: string;
  schedule_rating?: string;
  material_spec?: string;
  end_type?: string;
  quantity: number;
  unit: string;
  length_m?: number;
  confidence?: number;
  remarks?: string;
}

export interface Summary {
  total_pipe_length_m: number;
  fittings: number;
  flanges: number;
  valves: number;
  gaskets: number;
  bolt_sets: number;
  field_welds: number;
}

export interface MTOResponse {
  drawing_meta: DrawingMeta;
  items: MTOItem[];
  summary: Summary;
}