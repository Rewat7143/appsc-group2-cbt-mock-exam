import json
import re

with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    pages = json.load(f)

from scripts.map_boxes_to_questions import page_q_map

# Print summary of all 44 pages
print(f"{'Page':<6} {'Questions':<35} {'Boxes':<6}")
print("-" * 50)
for p in pages:
    pno = p['page']
    qs = page_q_map.get(pno, [])
    q_str = f"Q{qs[0]} - Q{qs[-1]} ({len(qs)} qs)" if qs else "None"
    print(f"{pno:<6} {q_str:<35} {p['box_count']:<6}")
