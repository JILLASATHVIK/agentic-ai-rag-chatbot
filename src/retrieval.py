from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore

from src.config import (
    EMBEDDING_MODEL,
    PINECONE_API_KEY,
    PINECONE_INDEX_NAME,
    TOP_K,
)


def create_retriever():
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )

    vector_store = PineconeVectorStore(
        index_name=PINECONE_INDEX_NAME,
        embedding=embeddings,
        pinecone_api_key=PINECONE_API_KEY,
    )

    return vector_store.as_retriever(
        search_kwargs={"k": TOP_K * 3}
    )


if __name__ == "__main__":
    retriever = create_retriever()

    question = "What is Agentic AI?"

    print(f"\nQuestion: {question}")
    print("\nSearching Pinecone...\n")

    results = retriever.invoke(question)

    print(f"Retrieved {len(results)} chunks.\n")

    for i, document in enumerate(results, 1):
        print(f"--- Result {i} ---")
        print(document.page_content[:500])
        print("Metadata:", document.metadata)
        print()