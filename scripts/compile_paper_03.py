#!/usr/bin/env python3
"""
compile_paper_03.py
Combines Section A, B, C, D, E of APPSC Group 2 Prelims (25 Feb 2024),
validates schema and data integrity for all 150 questions,
and outputs src/data/papers/paper-03.json.
"""

import os
import sys
import json

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAPERS_DIR = os.path.join(ROOT_DIR, "src", "data", "papers")
TARGET_FILE = os.path.join(PAPERS_DIR, "paper-03.json")

sys.path.insert(0, os.path.join(ROOT_DIR, "scripts"))

from data_p3_sec_a import QUESTIONS_P3_SEC_A
from data_p3_sec_b import QUESTIONS_P3_SEC_B
from data_p3_sec_c import QUESTIONS_P3_SEC_C
from data_p3_sec_d import QUESTIONS_P3_SEC_D
from data_p3_sec_e import QUESTIONS_P3_SEC_E

def compile_paper_03():
    all_questions = []
    all_questions.extend(QUESTIONS_P3_SEC_A)
    all_questions.extend(QUESTIONS_P3_SEC_B)
    all_questions.extend(QUESTIONS_P3_SEC_C)
    all_questions.extend(QUESTIONS_P3_SEC_D)
    all_questions.extend(QUESTIONS_P3_SEC_E)

    print(f"Total questions gathered: {len(all_questions)}")
    assert len(all_questions) == 150, f"Expected 150 questions, got {len(all_questions)}"

    # Validate each question
    seen_ids = set()
    for idx, q in enumerate(all_questions):
        expected_num = idx + 1
        q_id = q["id"]
        q_num = q["questionNumber"]
        assert q_id == expected_num, f"Mismatch at index {idx}: id {q_id} != {expected_num}"
        assert q_num == expected_num, f"Mismatch at index {idx}: questionNumber {q_num} != {expected_num}"
        assert q_id not in seen_ids, f"Duplicate id {q_id}"
        seen_ids.add(q_id)

        assert len(q["options"]) == 4, f"Question {q_id} does not have 4 options"
        option_ids = [opt["id"] for opt in q["options"]]
        assert option_ids == ["A", "B", "C", "D"], f"Question {q_id} options not A, B, C, D: {option_ids}"
        assert q["correctOption"] in ["A", "B", "C", "D"], f"Question {q_id} invalid correctOption: {q['correctOption']}"
        assert len(q["questionText"].strip()) > 0, f"Question {q_id} has empty questionText"
        assert len(q["explanation"].strip()) > 0, f"Question {q_id} has empty explanation"

    os.makedirs(PAPERS_DIR, exist_ok=True)
    with open(TARGET_FILE, "w", encoding="utf-8") as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)

    print(f"✅ Successfully compiled {len(all_questions)} verified questions into {TARGET_FILE}")
    return all_questions

if __name__ == "__main__":
    compile_paper_03()
