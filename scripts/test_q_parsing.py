import json
import re

with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

print(f"Loaded {len(pages)} pages")

# Let's inspect the questions extracted by splitting text on each page
page_map = {p['page']: p for p in pages}

all_extracted_questions = []

for pno in range(5, 49):
    p_data = page_map.get(pno)
    if not p_data:
        continue
    text = p_data['full_text']
    # Let's see what questions start on this page
    # Search for question patterns: number at start of line followed by . or )
    lines = text.split('\n')
    print(f"--- Page {pno} ---")
    for l in lines:
        m = re.match(r'^\s*([0-9]{1,3})[\.\)]\s*([A-Za-z\"\'\‘\“].*)', l.strip())
        if m:
            print(f"   Q{m.group(1)}: {m.group(2)[:60]}")
