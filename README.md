# Agentic AI RAG Chatbot

A futuristic Retrieval-Augmented Generation (RAG) chatbot that answers questions from an Agentic AI PDF knowledge base.

The application combines PDF ingestion, local Hugging Face embeddings, Pinecone vector search, FastAPI, LangChain, Ollama, Qwen 2.5 7B, and a React/Vite frontend.

## Features

- PDF document ingestion
- Recursive text chunking
- Local Hugging Face embeddings
- Semantic vector search using Pinecone
- Qwen 2.5 7B through Ollama
- FastAPI backend
- React + Vite frontend
- Source metadata retrieval
- Conversational RAG question answering
- Futuristic AI-themed interface

## Architecture

PDF
  |
  v
PyPDFLoader
  |
  v
Recursive Character Text Splitter
  |
  v
all-MiniLM-L6-v2
  |
  v
Pinecone Vector Database
  |
  v
Semantic Retrieval
  |
  v
FastAPI
  |
  v
Ollama - Qwen 2.5 7B
  |
  v
React/Vite Frontend

## Tech Stack

### Backend

- Python
- FastAPI
- LangChain
- LangGraph
- PyPDFLoader
- Pinecone

### Embeddings

- Hugging Face
- Sentence Transformers
- all-MiniLM-L6-v2

### LLM

- Ollama
- Qwen 2.5 7B

### Frontend

- React
- Vite
- JavaScript
- CSS

### Vector Database

- Pinecone
- Dense vector index
- 384-dimensional embeddings

## Project Structure

agentic-ai-rag-chatbot/
|
├── data/
│   └── Ebook-Agentic-AI.pdf
|
├── src/
│   ├── __init__.py
│   ├── api.py
│   ├── config.py
│   ├── generation.py
│   ├── graph.py
│   ├── ingestion.py
│   └── retrieval.py
|
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
|
├── .gitignore
├── README.md
└── requirements.txt

## Requirements

- Python 3.10+
- Node.js
- Ollama
- Pinecone account

## Environment Variables

Create a `.env` file in the project root:

PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=agentic-ai-index-384

Never commit API keys or `.env` files to GitHub.

## Embedding Model

The project uses:

all-MiniLM-L6-v2

The embedding model runs locally, so OpenAI API credits are not required for document embeddings.

Pinecone index configuration:

- Index: agentic-ai-index-384
- Dimension: 384
- Cloud: AWS
- Region: us-east-1
- Capacity: On-demand

## Ollama Model

The project uses:

qwen2.5:7b

Run:

ollama run qwen2.5:7b

Verify:

ollama list

## Installation

Activate the Python virtual environment:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

## PDF Ingestion

The knowledge base PDF is:

data/Ebook-Agentic-AI.pdf

Run:

python -m src.ingestion

The ingestion process:

1. Loads the PDF.
2. Splits the document into chunks.
3. Generates local embeddings.
4. Connects to Pinecone.
5. Uploads the vectors.

## Start Backend

Run from the project root:

uvicorn src.api:app --reload

Backend:

http://127.0.0.1:8000

Health endpoint:

GET /health

Example response:

{
  "status": "healthy"
}

## Start Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Open:

http://localhost:5173

## API

### Health Check

GET /health

### Ask Question

POST /ask

Example request:

{
  "question": "What is Agentic AI?"
}

## Example Questions

- What is Agentic AI?
- How does Agentic AI differ from traditional AI?
- What can Agentic AI do?
- What value does Agentic AI bring?
- How does Agentic AI perform proactive problem solving?

## Retrieval

The chatbot retrieves relevant document chunks from Pinecone before generating an answer.

Current retrieval configuration:

- Top K: 3
- Embedding model: all-MiniLM-L6-v2
- Vector dimension: 384

## Security

API keys are stored in environment variables.

The following files and directories should not be committed:

.env
venv/
node_modules/
frontend/dist/

These are excluded through `.gitignore`.

## Project Status

- PDF ingestion: Complete
- Document chunking: Complete
- Local embeddings: Complete
- Pinecone vector storage: Complete
- Semantic retrieval: Complete
- Qwen 2.5 7B generation: Complete
- FastAPI API: Complete
- React frontend: Complete
- Production frontend build: Complete
- GitHub repository: Complete

## Project Overview

Agentic AI RAG Chatbot is a full-stack Retrieval-Augmented Generation application that combines local embeddings, Pinecone vector search, FastAPI, Ollama, Qwen 2.5 7B, and a React frontend to answer questions using information retrieved from an Agentic AI PDF knowledge base.