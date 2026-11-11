import pymupdf
import cv2
import numpy as np
import re
import os

pdf_path = 'pyqs/APPSC Group 2 (Mains) Examination Official Paper-I (Held On_ 23 Feb, 2025).pdf'
doc = pymupdf.open(pdf_path)

print(f"Total pages: {len(doc)}")

# Pages with questions are 5 to 48 (0-indexed: 4 to 47)
# Let's inspect the text blocks and detected boxes for each page
page_summary = []

for pno in range(4, 48):
    page = doc[pno]
    text = page.get_text()
    
    # Let's find question number candidates in text
    lines = text.split('\n')
    q_candidates = []
    for line in lines:
        s = line.strip()
        # Clean potential OCR misreads of digits
        m = re.match(r'^([0-9Il\|]{1,3})[\.\)]\s*(.*)', s)
        if m:
            raw_num = m.group(1).replace('I', '1').replace('l', '1').replace('|', '1')
            if raw_num.isdigit():
                num = int(raw_num)
                if 1 <= num <= 150:
                    rest = m.group(2).strip()
                    if len(rest) > 3 and any(c.isalpha() for c in rest):
                        q_candidates.append((num, rest[:40]))
    
    page_summary.append({
        'page': pno + 1,
        'candidates': q_candidates
    })

for ps in page_summary:
    print(f"Page {ps['page']:2d}: {len(ps['candidates'])} questions found -> {[c[0] for c in ps['candidates']]}")
