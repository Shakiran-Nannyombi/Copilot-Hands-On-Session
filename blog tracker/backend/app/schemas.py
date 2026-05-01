from datetime import date, datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class BlogBase(BaseModel):
    title: str
    url: str | None = None
    series: str | None = None
    topics: list[str] = Field(default_factory=list)
    status: str = "draft"
    deadline: date | None = None
    notes: str | None = None

    @field_validator("title")
    @classmethod
    def title_required(cls, value: str):
        stripped = value.strip()
        if not stripped:
            raise ValueError("Title is required.")
        return stripped

    @field_validator("topics")
    @classmethod
    def normalize_topics(cls, value: list[str]):
        return [topic.strip() for topic in value if topic.strip()]


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: str | None = None
    url: str | None = None
    series: str | None = None
    topics: list[str] | None = None
    status: str | None = None
    deadline: date | None = None
    notes: str | None = None

    @field_validator("topics")
    @classmethod
    def normalize_topics(cls, value: list[str] | None):
        if value is None:
            return None
        return [topic.strip() for topic in value if topic.strip()]


class BlogRead(BlogBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    notion_page_id: str | None = None
    created_at: datetime
    updated_at: datetime
