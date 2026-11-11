import cv2
import numpy as np
import pytesseract
import json
import re

def detect_boxes_on_page(img):
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

# Test on page 5
img5 = cv2.imread('page_images/page_05.png')
boxes5 = detect_boxes_on_page(img5)
print(f"Page 5 detected {len(boxes5)} boxes:")
for b in boxes5:
    crop = img5[b[1]+2:b[1]+b[3]-2, b[0]+2:b[0]+b[2]-2]
    txt = pytesseract.image_to_string(crop, config='--psm 6').strip()
    print(f"   y={b[1]}, x={b[0]}, w={b[2]}, h={b[3]} -> {repr(txt[:60])}")
