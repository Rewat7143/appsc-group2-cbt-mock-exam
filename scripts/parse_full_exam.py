import cv2
import numpy as np
import pytesseract
import json
import re
import os

def detect_boxes(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, bin_img = cv2.threshold(gray, 70, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(bin_img, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    candidates = []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if y < 100 or y > img.shape[0] - 60:
            continue
        # Option boxes at 150 dpi: w between 80 and 1150, h between 18 and 65
        if 80 < w < 1150 and 18 <= h <= 65 and (w / h > 1.8):
            candidates.append((x, y, w, h))
            
    # Merge duplicate strokes (inner and outer contours)
    merged = []
    for b in sorted(candidates, key=lambda b: (b[1], b[0])):
        if not any(abs(b[0]-m[0]) < 18 and abs(b[1]-m[1]) < 18 for m in merged):
            merged.append(b)
    return merged

def process_page(pno, img_path):
    img = cv2.imread(img_path)
    h, w, _ = img.shape
    boxes = detect_boxes(img)
    
    # Run Tesseract to get all words with bounding boxes
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
    
    # Filter words inside each box to see what option prefix (1), (2), (3), (4) is inside
    box_details = []
    for bx, by, bw, bh in boxes:
        # crop inside box
        crop = img[max(0, by+2):min(h, by+bh-2), max(0, bx+2):min(w, bx+bw-2)]
        txt = pytesseract.image_to_string(crop, config='--psm 6').strip()
        
        # Check option number in txt
        opt_match = re.search(r'[\(\[\{]?([1-4])[\)\]\}]', txt)
        opt_num = int(opt_match.group(1)) if opt_match else None
        
        box_details.append({
            'box': (bx, by, bw, bh),
            'text': txt,
            'opt_num': opt_num,
            'is_english': any(c.isascii() and c.isalpha() for c in txt)
        })
        
    # Full page text
    full_text = pytesseract.image_to_string(img)
    
    return {
        'page': pno,
        'boxes': box_details,
        'full_text': full_text
    }

print("Script template ready")
