import axios from "axios";
import { MTOResponse } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export async function extractMTO(file: File): Promise<MTOResponse> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await api.post<MTOResponse>("/api/extract", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 120000, // 2 min
  });
  return res.data;
}

export async function downloadCSV(jobId: string): Promise<Blob> {
  const res = await api.get(`/api/mto/${jobId}/csv`, { responseType: "blob" });
  return res.data;
}