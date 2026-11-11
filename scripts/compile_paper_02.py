#!/usr/bin/env python3
"""
compile_paper_02.py
Compiles and validates all 150 questions of APPSC Group 2 Mains Paper-II (Held 23-Feb-2025).
Section A: Indian and AP Economy (Q1-Q75)
Section B: Science and Technology (Q76-Q150)
"""

import json
import os
import sys

# Ensure local scripts dir is in path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_p2_section_a_1 import QUESTIONS_P2_SEC_A_1
from data_p2_section_a_2 import QUESTIONS_P2_SEC_A_2
from data_p2_section_a_3 import QUESTIONS_P2_SEC_A_3
from data_p2_section_b_1 import QUESTIONS_P2_SEC_B_1
from data_p2_section_b_2 import QUESTIONS_P2_SEC_B_2
from data_p2_section_b_3 import QUESTIONS_P2_SEC_B_3

def compile_paper_02():
    all_questions = (
        QUESTIONS_P2_SEC_A_1 +
        QUESTIONS_P2_SEC_A_2 +
        QUESTIONS_P2_SEC_A_3 +
        QUESTIONS_P2_SEC_B_1 +
        QUESTIONS_P2_SEC_B_2 +
        QUESTIONS_P2_SEC_B_3
    )

    print(f"Total compiled questions: {len(all_questions)}")
    assert len(all_questions) == 150, f"Expected 150 questions, got {len(all_questions)}"

    # Validate sequence, options, and keys
    keys_count = {"A": 0, "B": 0, "C": 0, "D": 0}
    seen_nums = set()

    for idx, q in enumerate(all_questions, 1):
        q_num = q["questionNumber"]
        assert q_num == idx, f"Question number mismatch: expected {idx}, got {q_num}"
        assert q_num not in seen_nums, f"Duplicate question number: {q_num}"
        seen_nums.add(q_num)

        assert len(q["options"]) == 4, f"Q{q_num} must have exactly 4 options"
        opt_ids = [opt["id"] for opt in q["options"]]
        assert opt_ids == ["A", "B", "C", "D"], f"Q{q_num} invalid option ids: {opt_ids}"

        correct = q["correctOption"]
        assert correct in ["A", "B", "C", "D"], f"Q{q_num} invalid correctOption: {correct}"
        keys_count[correct] += 1

        assert len(q["questionText"].strip()) > 10, f"Q{q_num} text too short"
        assert len(q["explanation"].strip()) > 15, f"Q{q_num} explanation too short"

    print("✅ Validation successful!")
    print(f"Answer key distribution: {keys_count}")

    # Output file
    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "src", "data", "papers")
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, "paper-02.json")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(all_questions, f, indent=2, ensure_ascii=False)

    print(f"✅ Saved paper-02.json to: {out_path}")
    return all_questions

if __name__ == "__main__":
    compile_paper_02()
