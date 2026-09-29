from langchain_community.document_loaders import PyPDFLoader
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter

from src.config import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
    EMBEDDING_MODEL,
    PINECONE_API_KEY,
    PINECONE_INDEX_NAME,
)


def load_and_split_pdf(pdf_path: str):
    print("Loading PDF...")

    loader = PyPDFLoader(pdf_path)
    documents = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
    )

    chunks = splitter.split_documents(documents)

    print(f"Number of chunks created: {len(chunks)}")

    return chunks


def create_vector_store(pdf_path: str):
    if not PINECONE_API_KEY:
        raise ValueError(
            "PINECONE_API_KEY is missing. Set it in the root .env file."
        )

    print("Loading and splitting PDF...")
    chunks = load_and_split_pdf(pdf_path)

    print("Loading local embedding model...")
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )

    print("Connecting to Pinecone...")

    vector_store = PineconeVectorStore(
        index_name=PINECONE_INDEX_NAME,
        embedding=embeddings,
        pinecone_api_key=PINECONE_API_KEY,
    )

    print("Uploading documents to Pinecone...")

    vector_store.add_documents(chunks)

    print("Ingestion completed successfully!")

    return vector_store


if __name__ == "__main__":
    pdf_path = "data/Ebook-Agentic-AI.pdf"

    print("Starting ingestion...")

    create_vector_store(pdf_path)