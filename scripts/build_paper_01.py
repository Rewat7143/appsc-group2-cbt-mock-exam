import json
import re
import cv2
import numpy as np

# Load raw pages
with open('extracted_data/pages_raw.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)
raw_dict = {p['page']: p for p in raw_pages}

from scripts.map_boxes_to_questions import page_q_map

print("Writing complete question builder for 150 questions...")
