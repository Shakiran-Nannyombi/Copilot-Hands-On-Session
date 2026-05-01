import os

import httpx
from fastapi import HTTPException

from .models import Blog

NOTION_VERSION = "2022-06-28"


def _required_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise HTTPException(
            status_code=400,
            detail=f"Missing {name}. Set it in your backend environment before creating reminders.",
        )
    return value


def _rich_text(value: str):
    return {"rich_text": [{"text": {"content": value}}]}


async def create_reminder_page(blog: Blog) -> str:
    notion_token = _required_env("NOTION_API_KEY")
    notion_database_id = _required_env("NOTION_DATABASE_ID")
    title_property = os.getenv("NOTION_TITLE_PROPERTY", "Name")
    deadline_property = os.getenv("NOTION_DEADLINE_PROPERTY", "Deadline")
    series_property = os.getenv("NOTION_SERIES_PROPERTY", "Series")
    topics_property = os.getenv("NOTION_TOPICS_PROPERTY", "Topics")
    status_property = os.getenv("NOTION_STATUS_PROPERTY", "Status")

    properties = {
        title_property: {"title": [{"text": {"content": blog.title}}]},
        series_property: _rich_text(blog.series or "General"),
        topics_property: _rich_text(", ".join(blog.topics) if blog.topics else "Uncategorized"),
        status_property: _rich_text(blog.status),
    }
    if blog.deadline:
        properties[deadline_property] = {"date": {"start": blog.deadline.isoformat()}}

    payload = {
        "parent": {"database_id": notion_database_id},
        "properties": properties,
    }

    headers = {
        "Authorization": f"Bearer {notion_token}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post("https://api.notion.com/v1/pages", headers=headers, json=payload)
        if response.status_code >= 400:
            raise HTTPException(
                status_code=400,
                detail=f"Notion error: {response.text}",
            )
        data = response.json()
        return data["id"]
