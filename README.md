# Agentic AI RAG Chatbot

A full-stack Retrieval-Augmented Generation (RAG) chatbot that answers questions using information retrieved from an Agentic AI PDF knowledge base.

The project combines local Hugging Face embeddings, Pinecone vector search, FastAPI, Ollama, Qwen 2.5 7B, and a React/Vite frontend.

## Features

- PDF document ingestion
- Recursive text chunking
- Local Hugging Face embeddings
- Semantic vector search using Pinecone
- Qwen 2.5 7B through Ollama
- FastAPI backend
- React + Vite frontend
- Retrieved document context
- Source metadata
- RAG-based question answering
- Futuristic AI-themed interface

## Architecture

```text
Agentic AI PDF
      |
      v
   PyPDFLoader
      |
      v
Text Chunking
      |
      v
Hugging Face Embeddings
all-MiniLM-L6-v2
      |
      v
Pinecone Vector Database
      |
      v
Semantic Retrieval
      |
      v
FastAPI Backend
      |
      v
Ollama
Qwen 2.5 7B
      |
      v
React + Vite Frontend
```

## Tech Stack

### Backend

- Python
- FastAPI
- LangChain
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

```text
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
```

## Requirements

- Python 3.10+
- Node.js
- Ollama
- Pinecone account

## Environment Variables

Create a `.env` file in the project root:

```env
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=agentic-ai-index-384
```

Never commit API keys or `.env` files to GitHub.

## Embedding Model

The project uses:

```text
all-MiniLM-L6-v2
```

The embedding model runs locally.

Pinecone configuration used by the project:

```text
Index: agentic-ai-index-384
Dimension: 384
Cloud: AWS
Region: us-east-1
Capacity: On-demand
```

## Ollama Model

The project uses:

```text
qwen2.5:7b
```

Check the installed model:

```powershell
ollama list
```

The model can be started with:

```powershell
ollama run qwen2.5:7b
```

## Installation

Clone the repository:

```powershell
git clone https://github.com/JILLASATHVIK/agentic-ai-rag-chatbot.git
```

Move into the project:

```powershell
cd agentic-ai-rag-chatbot
```

Create the Python virtual environment:

```powershell
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

Install Python dependencies:

```powershell
pip install -r requirements.txt
```

Install frontend dependencies:

```powershell
cd frontend
npm install
cd ..
```

## PDF Ingestion

The knowledge base PDF is:

```text
data/Ebook-Agentic-AI.pdf
```

Run:

```powershell
python -m src.ingestion
```

The ingestion process:

1. Loads the PDF.
2. Splits the document into chunks.
3. Generates local embeddings.
4. Connects to Pinecone.
5. Uploads the vectors.

## Start the Backend

Run from the project root:

```powershell
uvicorn src.api:app --reload --port 8000
```

Backend:

```text
http://127.0.0.1:8000
```

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "healthy"
}
```

### Ask a Question

```http
POST /ask
```

Example request:

```json
{
  "question": "What is Agentic AI?"
}
```

## Start the Frontend

Open another terminal:

```powershell
cd frontend
npm run dev
```

Open the URL shown by Vite in the terminal.

The development server normally starts at:

```text
http://localhost:5173
```

If that port is already in use, Vite automatically selects another available port.

## Example Questions

Try questions such as:

```text
What is Agentic AI?
```

```text
How does Agentic AI differ from traditional AI?
```

```text
What can Agentic AI do?
```

```text
What value does Agentic AI bring?
```

```text
How does Agentic AI perform proactive problem solving?
```

## Retrieval

The chatbot retrieves relevant document chunks from Pinecone before generating an answer.

Current retrieval configuration:

```text
Top K: 3
Embedding model: all-MiniLM-L6-v2
Vector dimension: 384
```

## RAG Workflow

```text
User Question
     |
     v
FastAPI
     |
     v
Question Embedding
     |
     v
Pinecone Similarity Search
     |
     v
Top 3 Relevant Chunks
     |
     v
Retrieved Context
     |
     v
Qwen 2.5 7B
     |
     v
Generated Answer
     |
     v
React Frontend
```

## Security

API credentials are stored using environment variables.

The following should not be committed:

```text
.env
venv/
node_modules/
frontend/dist/
```

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
- GitHub repository: Complete

## Project Overview

Agentic AI RAG Chatbot is a full-stack Retrieval-Augmented Generation application that combines local embeddings, Pinecone vector search, FastAPI, Ollama, Qwen 2.5 7B, and a React frontend.

The system retrieves relevant information from an Agentic AI PDF knowledge base and uses the retrieved context to generate answers through a locally running Qwen 2.5 7B model.

## Repository

GitHub:

https://github.com/JILLASATHVIK/agentic-ai-rag-chatbot