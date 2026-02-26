import pymupdf
import io

async def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """
    Extracts text from a fully loaded PDF byte array using PyMuPDF.
    """
    text = ""
    try:
        # Open PDF from memory
        doc = pymupdf.open(stream=pdf_bytes, filetype="pdf")
        for page_num in range(len(doc)):
            page = doc[page_num]
            text += page.get_text() + "\n"
        doc.close()
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""
    
    return text.strip()
