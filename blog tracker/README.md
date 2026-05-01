# Blog Tracker

Full-stack blog tracking website using **Vue + Tailwind CSS** (frontend) and **FastAPI** (backend).

## Features

- Create and manage blog entries
- Track series, topics, publishing status, and deadlines
- Filter entries by series and topic
- Deadline visibility (`days left`, `due today`, `overdue`)
- Send blog reminder items to your Notion dashboard

## Folder Structure

```text
blog tracker/
├── frontend/   # Vue + Tailwind CSS
└── backend/    # FastAPI + SQLite + Notion integration
```

## 1. Run Backend

```bash
cd "blog tracker/backend"
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend API runs on `http://127.0.0.1:8000`.

## 2. Configure Notion

1. Create a Notion integration and copy your API key.
2. Share your target Notion database with that integration.
3. Set `.env` values in `backend/.env`:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
   - Property name variables if your database uses custom names.

## 3. Run Frontend

```bash
cd "blog tracker/frontend"
cp .env.example .env
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.
