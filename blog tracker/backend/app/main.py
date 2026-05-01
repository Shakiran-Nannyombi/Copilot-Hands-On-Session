from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import Base, engine, get_db
from .models import Blog
from .notion_service import create_reminder_page
from .schemas import BlogCreate, BlogRead, BlogUpdate

app = FastAPI(title="Blog Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/blogs", response_model=list[BlogRead])
def list_blogs(db: Session = Depends(get_db)):
    return db.query(Blog).order_by(Blog.created_at.desc()).all()


@app.post("/api/blogs", response_model=BlogRead, status_code=201)
def create_blog(payload: BlogCreate, db: Session = Depends(get_db)):
    blog = Blog(
        title=payload.title,
        url=payload.url,
        series=payload.series,
        status=payload.status,
        deadline=payload.deadline,
        notes=payload.notes,
    )
    blog.topics = payload.topics
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@app.put("/api/blogs/{blog_id}", response_model=BlogRead)
def update_blog(blog_id: int, payload: BlogUpdate, db: Session = Depends(get_db)):
    blog = db.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found.")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if key == "topics":
            blog.topics = value or []
        else:
            setattr(blog, key, value)

    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@app.delete("/api/blogs/{blog_id}", status_code=204)
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found.")
    db.delete(blog)
    db.commit()
    return None


@app.post("/api/blogs/{blog_id}/notion-reminder", response_model=BlogRead)
async def create_notion_reminder(blog_id: int, db: Session = Depends(get_db)):
    blog = db.get(Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found.")

    notion_page_id = await create_reminder_page(blog)
    blog.notion_page_id = notion_page_id
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog
