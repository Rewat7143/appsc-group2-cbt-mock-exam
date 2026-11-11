import json
import re

with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)
raw_dict = {p['page']: p for p in raw_pages}

def extract_page_english(pno):
    p = raw_dict[pno]
    text = p['full_text']
    # Filter out header lines
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    lines = [l for l in lines if 'testbook' not in l.lower() and 'google play' not in l.lower() and '2g/201' not in l.lower() and 'section' not in l.lower() and 'page' not in l.lower()]
    return lines

for p in [5, 6, 7]:
    print(f"=== PAGE {p} LINES ===")
    for l in extract_page_english(p)[:15]:
        print("  ", l)
