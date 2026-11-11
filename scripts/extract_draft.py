import cv2
import numpy as np
import pytesseract
import json
import re
import os

# Verified Page to Question mapping for all 150 questions
page_q_map = {
    5: [1, 2, 3, 4],
    6: [5, 6, 7, 8],
    7: [9, 10, 11],
    8: [12, 13, 14],
    9: [15, 16, 17],
    10: [18, 19, 20],
    11: [21, 22, 23],
    12: [24, 25, 26, 27],
    13: [28, 29, 30],
    14: [31, 32, 33, 34],
    15: [35, 36, 37],
    16: [38, 39],
    17: [40, 41, 42],
    18: [43, 44, 45, 46, 47],
    19: [48, 49, 50, 51, 52],
    20: [53, 54],
    21: [55, 56, 57, 58, 59],
    22: [60, 61, 62, 63, 64, 65, 66, 67, 68],
    23: [69, 70, 71, 72, 73, 74, 75],
    24: [76, 77, 78],
    25: [79, 80, 81, 82, 83, 84],
    26: [85, 86],
    27: [87, 88, 89],
    28: [90, 91, 92, 93],
    29: [94, 95, 96],
    30: [97, 98, 99, 100, 101],
    31: [102, 103],
    32: [104, 105, 106],
    33: [107, 108, 109],
    34: [110, 111],
    35: [112, 113, 114],
    36: [115, 116, 117, 118],
    37: [119, 120],
    38: [121, 122, 123],
    39: [124, 125],
    40: [126, 127, 128],
    41: [129, 130, 131],
    42: [132, 133, 134],
    43: [135, 136],
    44: [137, 138, 139],
    45: [140, 141, 142, 143, 144],
    46: [145, 146],
    47: [147, 148],
    48: [149, 150]
}

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

with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)

raw_dict = {p['page']: p for p in raw_pages}

print("Loaded raw data for", len(raw_dict), "pages.")
