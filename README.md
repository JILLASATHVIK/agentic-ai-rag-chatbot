# Agentic AI RAG Chatbot

A document-grounded chatbot using local Hugging Face embeddings, Pinecone retrieval, and Qwen 2.5 through Ollama.

## Prerequisites

- Python 3.12
- Node.js and npm
- Ollama with `qwen2.5:7b`
- A Pinecone API key and the `agentic-ai-index-384` index (384 dimensions, AWS `us-east-1`, on-demand)

The embedding model is `all-MiniLM-L6-v2` (384 dimensions). No OpenAI API key is needed; generation runs locally through Ollama.

On first use, Hugging Face may warn about unauthenticated Hub requests; model downloads still work and are cached locally. The PDF parser may also warn that `fontTools` is missing for a CFF Type1 font. Neither warning currently prevents the project from working. If PDF text encoding needs troubleshooting, install the optional helper with `python -m pip install fonttools`.

## Setup

Run these commands in PowerShell from the project root:

```powershell
cd C:\Users\JILLASATHVIK\Desktop\agentic-ai-rag-chatbot
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Create or edit `.env` in the project root. Keep actual credentials local and never put them in frontend files:

```dotenv
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=agentic-ai-index-384
```

`OPENAI_API_KEY` is not used by this local-embedding/Ollama architecture.

## Start Ollama

In a separate PowerShell window, start Ollama if it is not already running:

```powershell
ollama serve
```

In another window, download and verify the model:

```powershell
ollama pull qwen2.5:7b
ollama list
```

Confirm `qwen2.5:7b` appears in the list. If Ollama is already running as a service, just run the model verification commands.

## Ingest the PDF

From the project root with the virtual environment active:

```powershell
python -m src.ingestion
```

This reads `data/Ebook-Agentic-AI.pdf`, creates 384-dimensional local embeddings, and uploads its chunks to the configured Pinecone index. Run ingestion again only when you intend to add/re-upload documents.

## Start FastAPI

In a separate PowerShell window, activate the virtual environment and start the actual API module:

```powershell
cd C:\Users\JILLASATHVIK\Desktop\agentic-ai-rag-chatbot
.\venv\Scripts\Activate.ps1
python -m uvicorn src.api:app --reload
```

The API is available at `http://127.0.0.1:8000`. CORS allows the Vite development origins `http://localhost:5173` and `http://127.0.0.1:5173`.

## Verify the API

Check health:

```powershell
Invoke-RestMethod -Uri http://127.0.0.1:8000/health
```

Expected response:

```json
{"status":"healthy"}
```

Send a question:

```powershell
$body = @{ question = "What is Agentic AI?" } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:8000/ask -Method Post -ContentType "application/json" -Body $body
```

The response includes the question, answer, and source metadata when available.

## Start the Frontend

In a separate PowerShell window:

```powershell
cd C:\Users\JILLASATHVIK\Desktop\agentic-ai-rag-chatbot\frontend
npm install
npm run dev -- --host 127.0.0.1
```

Open `http://127.0.0.1:5173` (or the localhost URL printed by Vite), ask a suggested question, and confirm the answer and available sources appear. The UI also supports Enter to send and Shift+Enter for a new line.

To verify error handling, stop the FastAPI server and submit a question; the chat should keep the conversation visible and show a connection error. Restart the API and the status indicator will recover on its next health check.
