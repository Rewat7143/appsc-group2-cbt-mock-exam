import cv2
import numpy as np
import pytesseract
import json
import re
import os
import sys

def detect_boxes(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, bin_img = cv2.threshold(gray, 70, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(bin_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    candidates = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if y < 100 or y > img.shape[0] - 60:
            continue
        if 80 < w < 1150 and 18 <= h <= 68 and (w / h > 1.8):
            candidates.append((x, y, w, h))
            
    merged = []
    for b in sorted(candidates, key=lambda b: (b[1], b[0])):
        if not any(abs(b[0]-m[0]) < 18 and abs(b[1]-m[1]) < 18 for m in merged):
            merged.append(b)
    return merged

pages_data = []
print("Processing pages 5 to 48...")
for pno in range(5, 49):
    img_path = f"page_images/page_{pno:02d}.png"
    if not os.path.exists(img_path):
        continue
    img = cv2.imread(img_path)
    h, w, _ = img.shape
    boxes = detect_boxes(img)
    
    box_details = []
    for bx, by, bw, bh in boxes:
        crop = img[max(0, by+2):min(h, by+bh-2), max(0, bx+2):min(w, bx+bw-2)]
        txt = pytesseract.image_to_string(crop, config='--psm 6').strip()
        opt_match = re.search(r'[\(\[\{]?([1-4])[\)\]\}]', txt)
        opt_num = int(opt_match.group(1)) if opt_match else None
        
        box_details.append({
            'box': [int(bx), int(by), int(bw), int(bh)],
            'ocr': txt,
            'opt_num': opt_num,
            'is_eng': any(c.isascii() and c.isalpha() for c in txt)
        })
        
    full_text = pytesseract.image_to_string(img)
    
    pages_data.append({
        'page': pno,
        'box_count': len(boxes),
        'boxes': box_details,
        'full_text': full_text
    })
    print(f"Page {pno:02d}: {len(boxes)} boxes detected")

with open('extracted_data/pages_raw.json', 'w', encoding='utf-8') as f:
    json.dump(pages_data, f, ensure_ascii=False, indent=2)

print("Saved raw data to extracted_data/pages_raw.json")
