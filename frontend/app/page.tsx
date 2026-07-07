"use client";

import { useState } from "react";
import { MTOResponse } from "@/lib/types";
import { extractMTO, downloadCSV } from "@/lib/api";
import FileDropzone from "@/components/FileDropzone";
import SummaryCards from "@/components/SummaryCards";
import ResultsTable from "@/components/ResultsTable";
import toast from "react-hot-toast";

export default function Home() {
  const [result, setResult] = useState<MTOResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setLoading(true);
    // Show local preview
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }

    try {
      const data = await extractMTO(file);
      setResult(data);
      toast.success("Extraction complete!");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Extraction failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const blob = await downloadCSV("demo-job"); // In production, use real job id
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mto.csv";
      a.click();
      toast.success("CSV downloaded");
    } catch {
      toast.error("CSV download failed");
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Isometric MTO Generator</h1>

      <FileDropzone onFile={handleFile} />

      {loading && (
        <div className="mt-8 text-center text-gray-500">Processing drawing…</div>
      )}

      {result && (
        <div className="mt-10 space-y-8">
          {/* Metadata */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Drawing Info</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Object.entries(result.drawing_meta).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-xs text-gray-500 uppercase">{key.replace("_", " ")}</dt>
                  <dd className="text-sm font-medium">{value || "—"}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Preview */}
          {imagePreview && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Drawing Preview</h2>
              <img src={imagePreview} alt="Uploaded drawing" className="max-h-96 mx-auto" />
            </div>
          )}

          {/* Summary Cards */}
          <SummaryCards summary={result.summary} />

          {/* Table */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Material Take-Off</h2>
              <button
                onClick={handleDownloadCSV}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Export CSV
              </button>
            </div>
            <ResultsTable items={result.items} />
          </div>
        </div>
      )}
    </main>
  );
}