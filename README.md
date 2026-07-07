# Isometric MTO Generator

A full-stack **AI-powered Material Take-Off (MTO) Generator** that extracts a structured Bill of Materials (BOM) from piping isometric drawings. The application uses **Next.js 15** for the frontend, **FastAPI** for the backend, and **Google Gemini 2.5 Flash** for vision-based AI extraction.

---

# Table of Contents

* Project Overview
* Architecture
* Features
* Technology Stack
* Quick Start
* Environment Variables
* Docker Setup
* API Endpoints
* AI Pipeline
* Assumptions
* Known Limitations
* Future Improvements
* Testing
* Submission Notes

---

# Project Overview

The application allows users to upload a piping isometric drawing (PDF, PNG, or JPG) and automatically generates a structured Material Take-Off (MTO).

The generated MTO includes:

* Drawing metadata
* Pipes
* Fittings
* Flanges
* Valves
* Gaskets
* Bolt sets
* Material summary
* CSV export

If a **Gemini API key** is not configured, the application automatically switches to a realistic **mock pipeline**, ensuring the complete workflow remains functional for evaluation.

---

# Architecture

```text
                        User Browser
                              │
               ┌──────────────┴──────────────┐
               │                             │
         Next.js Frontend              FastAPI Backend
           (Port 3000)                  (Port 8000)
               │                             │
               │ POST /api/extract           │
               └──────────────┬──────────────┘
                              │
                    File Validation
                    (PDF / PNG / JPG)
                              │
                  PDF → Image Conversion
                              │
                    Gemini Vision AI
                              │
               Structured JSON Extraction
                              │
                 Pydantic Validation
                              │
        Summary Calculation & Derived Items
                              │
               JSON Response + CSV Export
```

---

# Features

## Frontend

* Drag-and-drop file upload
* PDF, PNG, and JPG support
* Upload progress indicator
* Client-side validation
* Drawing preview
* Interactive MTO table
* Summary cards
* CSV export
* Responsive UI

## Backend

* FastAPI REST API
* Swagger documentation
* File validation
* PDF to image conversion
* Gemini Vision integration
* Structured JSON validation with Pydantic
* Automatic gasket and bolt set derivation
* Mock pipeline fallback
* CSV generation
* Health check endpoint

---

# Technology Stack

## Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Axios

## Backend

* FastAPI
* Python 3.10+
* Pydantic
* Pandas
* Pillow
* pdf2image
* google-genai SDK

## AI

* Google Gemini 2.5 Flash
* Structured JSON Output

---

# Quick Start (Without Docker)

## Prerequisites

* Python 3.10 or later
* Node.js 18 or later

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

cp .env.example .env

# (Optional)
# Add your GEMINI_API_KEY to the .env file

uvicorn app.main:app --reload --port 8000
```

API Documentation:

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Application:

```
http://localhost:3000
```

Upload an isometric drawing to generate the Material Take-Off.

---

# Environment Variables

| Variable         | Description                      | Default               |
| ---------------- | -------------------------------- | --------------------- |
| `GEMINI_API_KEY` | Google Gemini API key (optional) | Empty (Mock Pipeline) |
| `MAX_FILE_SIZE`  | Maximum upload size              | `20971520` (20 MB)    |
| `UPLOAD_FOLDER`  | Upload directory                 | `uploads`             |
| `OUTPUT_FOLDER`  | Converted image directory        | `outputs`             |

---

# Docker Setup 

```bash
cp backend/.env.example backend/.env

docker compose up --build
```

Application URLs:

Frontend:

```
http://localhost:3000
```

Backend:

```
http://localhost:8000
```

---

# API Endpoints

| Method | Endpoint            | Description                     |
| ------ | ------------------- | ------------------------------- |
| GET    | `/api/health`       | Health check                    |
| POST   | `/api/extract`      | Upload drawing and generate MTO |
| GET    | `/api/mto/{id}`     | Retrieve processed MTO          |
| GET    | `/api/mto/{id}/csv` | Download MTO as CSV             |

---

# AI Pipeline

## Model

* Google Gemini 2.5 Flash
* `google-genai` SDK
* Structured Output (Response Schema)

## Processing Flow

1. Upload PDF, PNG, or JPG.
2. Validate file size and type.
3. Convert PDF to PNG (first page only).
4. Resize and normalize the image.
5. Send the image to Gemini Vision.
6. Receive structured JSON output.
7. Validate the response using Pydantic.
8. Recalculate summary values.
9. Automatically derive gasket and bolt set quantities.
10. Return the validated MTO to the frontend.

---

# Prompt Strategy

The prompt instructs Gemini to behave as a **Senior Piping Engineer** and extract:

* Drawing metadata
* Pipes
* Fittings
* Flanges
* Valves
* Supports
* Material specifications
* Sizes
* Schedules
* Quantities

The model is constrained to return only valid JSON following the predefined schema.

---

# Validation

The backend validates all extracted data using **Pydantic**.

Validation includes:

* Required fields
* Data types
* JSON schema validation
* Summary recalculation
* Automatic gasket derivation
* Automatic bolt set derivation

---

# Graceful Degradation

If:

* `GEMINI_API_KEY` is missing
* Gemini API fails
* Invalid JSON is returned

the application automatically switches to a predefined **Mock Pipeline**.

This ensures evaluators can test the complete application without requiring API credentials.

---

# Assumptions

* One isometric drawing is processed per upload.
* Pipe is quantified in **metres (M)**.
* All other components are quantified as **Each (EA)**.
* One gasket and one bolt set are derived for every flanged joint.
* The application uses synchronous processing (`POST → immediate response`), which is sufficient for a single-user demonstration.

---

# Known Limitations

* Best suited for clean digital isometric drawings.
* Dense or poorly scanned drawings may reduce extraction accuracy.
* Small or rotated text can affect OCR performance.
* Uncommon engineering symbols may not be detected reliably.
* Only the first page of a multi-page PDF is processed.

---

# Future Improvements

* OCR-based BOM table extraction
* Symbol detection using Computer Vision or YOLO
* Multi-page PDF support
* Background job processing (Celery + Redis)
* Confidence visualization in the UI
* Excel (.xlsx) export
* Bounding-box overlay for detected symbols
* PostgreSQL database integration
* User authentication and project history

---

# Testing

Run backend tests:

```bash
cd backend

pytest
```

The project includes tests for:

* Health endpoint
* Mock extraction pipeline
* Pydantic schema validation
* CSV export
* API endpoints

Full test coverage is not expected for this assessment.

---

# Submission Notes

* No API keys are committed to the repository.
* Only `.env.example` is included.
* `uploads/` and `outputs/` are created automatically at runtime.
* `node_modules/`, `.next/`, `venv/`, and other generated files are excluded from the submission.
* The ZIP archive is under the required **10 MB** size limit.
* Sample isometric drawings are included in the `samples/` directory for testing.

---

# Author

**Sumit**

AI Engineer Assessment

July 2026
