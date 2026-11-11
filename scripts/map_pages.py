import pymupdf
import pytesseract
import cv2
import numpy as np
import re
import json

doc = pymupdf.open('pyqs/APPSC Group 2 (Mains) Examination Official Paper-I (Held On_ 23 Feb, 2025).pdf')

page_q_map = {}

for pno in range(4, 48):
    page_num = pno + 1
    pix = doc[pno].get_pixmap(dpi=150)
    img = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    if pix.n >= 3:
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    
    # We can detect question numbers by finding text lines that start with digits followed by . or )
    # at the left margin
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
    
    q_found = []
    for i in range(len(data['text'])):
        t = data['text'][i].strip()
        # Look for 1., 2., ... 150.
        m = re.match(r'^([0-9]{1,3})[\.\)]$', t)
        if m:
            num = int(m.group(1))
            x = data['left'][i]
            y = data['top'][i]
            # Left margin in 150 dpi is around x < 200, and y > 100
            if 1 <= num <= 150 and x < 220 and y > 100:
                q_found.append((num, y, x))
                
    # Sort by y
    q_found = sorted(q_found, key=lambda item: item[1])
    
    # Filter out false positives (e.g. if numbers are out of sequence or duplicated)
    cleaned = []
    for q, y, x in q_found:
        if not cleaned or q > cleaned[-1][0] or (q == cleaned[-1][0] + 1):
            cleaned.append((q, y, x))
            
    page_q_map[page_num] = [item[0] for item in cleaned]

print("Page to Questions map:")
total_q = 0
for p, qs in sorted(page_q_map.items()):
    print(f"Page {p:2d}: {qs}")
    total_q += len(qs)

print("Total questions found via margin detection:", total_q)
