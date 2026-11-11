import json

# Test paper integrity
with open("src/data/papers/paper-01.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

print(f"Total questions loaded: {len(questions)}")
assert len(questions) == 150, "Total count is not 150"

# Check options and keys
correct_options_distribution = {"A": 0, "B": 0, "C": 0, "D": 0}
for q in questions:
    correct_options_distribution[q["correctOption"]] += 1
    assert len(q["options"]) == 4
    assert [o["id"] for o in q["options"]] == ["A", "B", "C", "D"]
    assert len(q["explanation"]) > 0

print("Correct options distribution:", correct_options_distribution)

# Test scoring simulation
# Case 1: 150 correct answers
perfect_answers = {q["questionNumber"]: q["correctOption"] for q in questions}
correct_count = sum(1 for q in questions if perfect_answers.get(q["questionNumber"]) == q["correctOption"])
assert correct_count == 150
print("Simulation 1 (150/150): Passed")

# Case 2: 100 correct, 30 incorrect, 20 unanswered
simulated_answers = {}
for q in questions:
    qnum = q["questionNumber"]
    if qnum <= 100:
        simulated_answers[qnum] = q["correctOption"] # correct
    elif qnum <= 130:
        # choose a wrong option
        opts = [o["id"] for o in q["options"] if o["id"] != q["correctOption"]]
        simulated_answers[qnum] = opts[0]
    # remaining 20 unanswered

corr = sum(1 for q in questions if simulated_answers.get(q["questionNumber"]) == q["correctOption"])
inc = sum(1 for q in questions if q["questionNumber"] in simulated_answers and simulated_answers.get(q["questionNumber"]) != q["correctOption"])
unans = sum(1 for q in questions if q["questionNumber"] not in simulated_answers)

assert corr == 100
assert inc == 30
assert unans == 20
assert corr + inc + unans == 150
print(f"Simulation 2 (100 Correct, 30 Incorrect, 20 Unanswered, Total = {corr+inc+unans}): Passed")
print("All integrity and scoring tests passed successfully!")
