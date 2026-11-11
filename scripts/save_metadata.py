import json
import os

# Metadata for available papers
papers_metadata = [
  {
    "id": "paper-01",
    "paperCode": "APPSC-G2-2025-P1",
    "title": "APPSC Group 2 Mains — Official Paper I",
    "subtitle": "Held on 23 February 2025 | Social & Cultural History of AP & Indian Constitution",
    "examDate": "23 February 2025",
    "totalQuestions": 150,
    "maxMarks": 150,
    "durationMinutes": 150,
    "negativeMarking": 0,
    "sections": [
      {
        "name": "Section A: Social and Cultural History of Andhra Pradesh",
        "startQuestion": 1,
        "endQuestion": 75
      },
      {
        "name": "Section B: General Overview of the Indian Constitution",
        "startQuestion": 76,
        "endQuestion": 150
      }
    ],
    "extractionStatus": {
      "totalExpected": 150,
      "extractedCount": 150,
      "verifiedCount": 150,
      "uncertainCount": 0,
      "duplicateCount": 0
    }
  }
]

os.makedirs('src/data', exist_ok=True)
with open('src/data/papers-metadata.json', 'w', encoding='utf-8') as f:
    json.dump(papers_metadata, f, ensure_ascii=False, indent=2)

print("Saved papers-metadata.json successfully.")
