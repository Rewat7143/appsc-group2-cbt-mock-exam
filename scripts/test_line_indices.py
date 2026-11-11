import cv2
import numpy as np
import pytesseract
import json
import re
import os

with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)
raw_dict = {p['page']: p for p in raw_pages}

from scripts.map_boxes_to_questions import page_q_map

def clean_text(s):
    # remove excessive whitespace
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r'\n+', '\n', s)
    return s.strip()

questions_raw = []

for pno, qlist in sorted(page_q_map.items()):
    p_data = raw_dict[pno]
    full_text = p_data['full_text']
    boxes = p_data['boxes']
    
    # Let's split full_text by question numbers
    # Each question begins with a line starting with `Q.` or `Q)`
    lines = full_text.split('\n')
    
    # Find start line for each q
    q_indices = []
    for q in qlist:
        found_idx = None
        for idx, line in enumerate(lines):
            line_s = line.strip()
            # check if line starts with q
            if re.match(rf'^{q}[\.\)]\s*', line_s):
                found_idx = idx
                break
        if found_idx is not None:
            q_indices.append((q, found_idx))
        else:
            q_indices.append((q, -1))
            
    print(f"Page {pno:2d}: Q {qlist} -> line indices {[idx for _, idx in q_indices]}")
