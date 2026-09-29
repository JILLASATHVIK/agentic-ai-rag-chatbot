from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from src.graph import graph


app = FastAPI(
    title="Agentic AI RAG Chatbot",
    description="RAG chatbot using Pinecone, LangGraph, and Qwen2.5",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)


class QuestionRequest(BaseModel):
    question: str


class AnswerResponse(BaseModel):
    question: str
    answer: str
    sources: list[dict[str, str | int]] = Field(default_factory=list)


@app.get("/")
def root():
    return {
        "message": "Agentic AI RAG Chatbot API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/ask", response_model=AnswerResponse)
def ask_question(request: QuestionRequest):
    result = graph.invoke(
        {
            "question": request.question,
            "context": "",
            "answer": "",
            "sources": [],
        }
    )

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result.get("sources", []),
    }