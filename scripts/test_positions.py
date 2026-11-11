import cv2
import numpy as np
import pytesseract
import json
import re

page_to_qrange = {
    5: (1, 4),
    6: (5, 8),
    7: (9, 11),
    8: (12, 14),
    9: (15, 17),
    10: (18, 20),
    11: (21, 23),
    12: (24, 27),
    13: (28, 30),
    14: (31, 34),
    15: (35, 37),
    16: (38, 39),
    17: (40, 42),
    18: (43, 47),
    19: (48, 52),
    20: (53, 54),
    21: (55, 59),
    22: (60, 68),
    23: (69, 75),
    24: (76, 78),
    25: (79, 84),
    26: (85, 86),
    27: (87, 89),
    28: (90, 93),
    29: (94, 96),
    30: (97, 101),
    31: (102, 103),
    32: (104, 106),
    33: (107, 109),
    34: (110, 111),
    35: (112, 114),
    36: (115, 118),
    37: (119, 120),
    38: (121, 123),
    39: (124, 125),
    40: (126, 128),
    41: (129, 131),
    42: (132, 134),
    43: (135, 136),
    44: (137, 139),
    45: (140, 144),
    46: (145, 146),
    47: (147, 148),
    48: (149, 150),
}

# Let's test finding the vertical positions of each question on a page
def get_question_y_positions(img, start_q, end_q):
    h, w, _ = img.shape
    data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
    
    positions = {}
    for i in range(len(data['text'])):
        t = data['text'][i].strip()
        # Regex for question number
        m = re.match(r'^([0-9]{1,3})[\.\)]$', t)
        if m:
            qnum = int(m.group(1))
            if start_q <= qnum <= end_q:
                # check x is in margin
                x = data['left'][i]
                y = data['top'][i]
                if x < 250 and y > 100:
                    if qnum not in positions or y < positions[qnum]:
                        positions[qnum] = y
                        
    # If any question in range is missing from OCR data, interpolate or use fallback
    expected = list(range(start_q, end_q + 1))
    # Fill in missing by splitting intervals
    sorted_found = sorted(positions.items(), key=lambda x: x[0])
    
    # If first is missing, default to near top
    if expected[0] not in positions:
        positions[expected[0]] = 140
        
    for idx, q in enumerate(expected):
        if q not in positions:
            # interpolate between prev and next
            prev_y = positions.get(q - 1, 140)
            next_y = None
            for nxt in expected[idx+1:]:
                if nxt in positions:
                    next_y = positions[nxt]
                    break
            if next_y is None:
                next_y = h - 100
            positions[q] = int((prev_y + next_y) / 2)
            
    return positions

print("Testing on pages 5 and 6:")
for pno in [5, 6]:
    img = cv2.imread(f"page_images/page_{pno:02d}.png")
    sq, eq = page_to_qrange[pno]
    pos = get_question_y_positions(img, sq, eq)
    print(f"Page {pno} (Q{sq}-Q{eq}): {pos}")
