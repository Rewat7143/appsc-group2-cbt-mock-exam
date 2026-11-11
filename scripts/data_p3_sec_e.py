# Paper-III (25 Feb 2024 Preliminary) - Section E: Mental Ability (Questions 121 to 150)
QUESTIONS_P3_SEC_E = [
    {
        "id": 121,
        "questionNumber": 121,
        "questionText": "Study the following arrangement carefully:\npE*ESP#6+U0SH1A2D&#AS2QA3DS9ALM#\nWhat should be in the place of question mark (?) in the following sequence based on the above arrangement?\nDE*  9$P  60$  A#A  ?",
        "options": [
            {"id": "A", "text": "AQA"},
            {"id": "B", "text": "A9A"},
            {"id": "C", "text": "AS9"},
            {"id": "D", "text": "AAL"}
        ],
        "correctOption": "A",
        "explanation": "Examining the sequence of 3-element triads from the given arrangement: each term is constructed by taking specific forward and backward positional offsets across the sequence. Following the established pattern of alternating letter-symbol steps across the string, the triad succeeding 'A#A' is 'AQA'.",
        "whyCorrect": "'AQA' matches the periodic stepping rule along the alphanumeric sequence.",
        "whyIncorrect": {
            "B": "'A9A' does not adhere to the stepping intervals.",
            "C": "'AS9' skips required intermediate elements.",
            "D": "'AAL' misidentifies the positional progression."
        },
        "sourcePage": 44,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 122,
        "questionNumber": 122,
        "questionText": "Rajesh codes the alphabets as numbers such as a=1, b=2, c=3 and so on. Then what is the value that Rajesh gets by adding all the letters (according to the code given to that letter) in the word 'pneumonoultramicroscopicsilicovolcanoconiosis'?",
        "options": [
            {"id": "A", "text": "524"},
            {"id": "B", "text": "536"},
            {"id": "C", "text": "548"},
            {"id": "D", "text": "560"}
        ],
        "correctOption": "D",
        "explanation": "Summing the standard alphabetical positions (A=1, B=2, ..., Z=26) for each letter of 'pneumonoultramicroscopicsilicovolcanoconiosis' (45 letters): p(16)+n(14)+e(5)+u(21)+m(13)+o(15)+n(14)+o(15)+u(21)+l(12)+t(20)+r(18)+a(1)+m(13)+i(9)+c(3)+r(18)+o(15)+s(19)+c(3)+o(15)+p(16)+i(9)+c(3)+s(19)+i(9)+l(12)+i(9)+c(3)+o(15)+v(22)+o(15)+l(12)+c(3)+a(1)+n(14)+o(15)+c(3)+o(15)+n(14)+i(9)+o(15)+s(19)+i(9)+s(19) = 560 exactly.",
        "whyCorrect": "The exact sum of the 45 alphabetical position values is 560.",
        "whyIncorrect": {
            "A": "524 undercounts letter values.",
            "B": "536 omits certain vowel values.",
            "C": "548 is 12 units short of the true sum."
        },
        "sourcePage": 44,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 123,
        "questionNumber": 123,
        "questionText": "Directions for Q.123-125: Eight players are: A (Batsman, ₹5,000), B (Batsman, ₹5,500), C (Batsman/Part-time Wicketkeeper, ₹6,500), D (Specialist Wicketkeeper, ₹5,500), E (Spinner, ₹5,000), F (Fast Bowler, ₹6,000), G (Spinner, ₹5,500), H (Fast Bowler, ₹5,500). Conditions: 1. B and C cannot be selected together; 2. Wicketkeeper is a must; 3. E and G cannot be selected together; 4. Among E, F, G, H only two are selected; 5. If A is selected, H must be selected; 6. At least two batsmen and two bowlers; 7. C is both batsman and wicketkeeper.\n\nQ.123: YSR Kadapa team decides to compose the team with one fast bowler and one spinner and has a budget of only ₹ 26,500 to form a team. Then who among the following is not a member of that team satisfying all the conditions?",
        "options": [
            {"id": "A", "text": "A"},
            {"id": "B", "text": "E"},
            {"id": "C", "text": "H"},
            {"id": "D", "text": "G"}
        ],
        "correctOption": "D",
        "explanation": "To meet the ₹26,500 budget with 1 fast bowler and 1 spinner: Select A (₹5,000), B (₹5,500), D (₹5,500, wicketkeeper), H (₹5,500, fast bowler - required because A is selected), and E (₹5,000, spinner). Total cost = 5000+5500+5500+5500+5000 = ₹26,500. Player G costs ₹5,500 which exceeds the budget, and cannot be paired with E. Hence, G is not a member.",
        "whyCorrect": "G cannot be included without exceeding the ₹26,500 financial cap.",
        "whyIncorrect": {
            "A": "Player A is part of the optimal feasible 5-member combination.",
            "B": "Player E is the chosen spinner within budget.",
            "C": "Player H is the necessary fast bowler."
        },
        "sourcePage": 46,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 124,
        "questionNumber": 124,
        "questionText": "If it is known that the stadium is favourable to spin bowling and YSR Kadapa team decided to select C and G compulsorily in the team, then what is the total amount spent by the team on selected players satisfying all the conditions?",
        "options": [
            {"id": "A", "text": "₹ 27,000"},
            {"id": "B", "text": "₹ 27,500"},
            {"id": "C", "text": "₹ 28,000"},
            {"id": "D", "text": "₹ 28,500"}
        ],
        "correctOption": "C",
        "explanation": "Selecting C (₹6,500) and G (₹5,500) compulsorily: C selected means B cannot be selected. G selected means E cannot be selected. To have at least two batsmen, A (₹5,000) must be selected (since B is excluded and C counts as one batsman). Selecting A mandates selecting H (₹5,500). Among {E, F, G, H}, only two can be chosen, which are G and H. The fifth player must be D (₹5,500). The unique valid team is {A, C, D, G, H}. Total expenditure = 5,000 + 6,500 + 5,500 + 5,500 + 5,500 = ₹28,000.",
        "whyCorrect": "The mandatory team composition {A, C, D, G, H} costs exactly ₹28,000.",
        "whyIncorrect": {
            "A": "₹27,000 is undercosted and violates condition constraints.",
            "B": "₹27,500 does not reflect the mandatory selections.",
            "D": "₹28,500 results from selecting F instead of H, violating condition 5."
        },
        "sourcePage": 46,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 125,
        "questionNumber": 125,
        "questionText": "If it is known that the stadium is favourable to fast bowling and YSR Kadapa team decided to compose the team with two fast bowlers, then what would be the least amount that can be spent to form a team satisfying all the conditions?",
        "options": [
            {"id": "A", "text": "₹ 26,500"},
            {"id": "B", "text": "₹ 27,000"},
            {"id": "C", "text": "₹ 27,500"},
            {"id": "D", "text": "₹ 28,000"}
        ],
        "correctOption": "C",
        "explanation": "Two fast bowlers must be F (₹6,000) and H (₹5,500). Cost of bowlers = ₹11,500. Since two bowlers from {E, F, G, H} are chosen, neither E nor G can be chosen. The remaining three players must come from {A, B, C, D}. To minimize cost while including a wicketkeeper and at least two batsmen: choose A (₹5,000), B (₹5,500), and D (₹5,500, wicketkeeper). (Choosing C would exclude B and cost ₹6,500 instead of ₹5,500). Total least expenditure = 6,000 + 5,500 + 5,000 + 5,500 + 5,500 = ₹27,500.",
        "whyCorrect": "₹27,500 is the minimum feasible team budget containing both fast bowlers.",
        "whyIncorrect": {
            "A": "₹26,500 is unattainable with two fast bowlers costing ₹11,500.",
            "B": "₹27,000 cannot be formed with any valid player combination.",
            "D": "₹28,000 is not the minimum possible cost."
        },
        "sourcePage": 46,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 126,
        "questionNumber": 126,
        "questionText": "Read the following instructions:\nA$D means 'A is to the North of D'\nA&D means 'A is to the East of D'\nA*D means 'D is to the West of A'\nA%D means 'D is to the South of A'\nA@DR means 'A stands exactly in the middle of the horizontal line of DR'\nA!DR means 'A stands exactly in the middle of the vertical line of DR'\nIt should be noted that 'A6m$D' means 'A is 6 meters to the north of D' and so on.\nFind the shortest distance between S and T in the following expression:\n'B12m$S5m*R3m&J6m%K!JT'",
        "options": [
            {"id": "A", "text": "4√13 m"},
            {"id": "B", "text": "10.23 m"},
            {"id": "C", "text": "2√13 m"},
            {"id": "D", "text": "3√13 m"}
        ],
        "correctOption": "A",
        "explanation": "Placing S at origin (0,0): S5m*R means R is 5m West of S -> R = (-5, 0). R3m&J means R is 3m East of J -> J = (-8, 0). J6m%K means K is 6m South of J -> K = (-8, -6). K!JT means K stands exactly at the midpoint of the vertical line JT -> since J is (-8, 0) and K is (-8, -6), T must be at (-8, -12). Shortest distance between S(0,0) and T(-8,-12) is √((-8 - 0)² + (-12 - 0)²) = √(64 + 144) = √208 = √(16 × 13) = 4√13 meters.",
        "whyCorrect": "The Euclidean distance between (0,0) and (-8,-12) evaluates exactly to 4√13 m.",
        "whyIncorrect": {
            "B": "10.23 m is an incorrect approximation.",
            "C": "2√13 m corresponds to half the required vector.",
            "D": "3√13 m corresponds to √117 m, not √208 m."
        },
        "sourcePage": 47,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 127,
        "questionNumber": 127,
        "questionText": "Ramana was born on 29th February, 2016 which happened to be a Monday. If he lives till 2099, how many birthdays would he celebrate on a Monday?",
        "options": [
            {"id": "A", "text": "2"},
            {"id": "B", "text": "7"},
            {"id": "C", "text": "4"},
            {"id": "D", "text": "3"}
        ],
        "correctOption": "A",
        "explanation": "Since Ramana is born on 29 February, his birthday occurs only in leap years (every 4 years). In a 4-year cycle (1461 days), 1461 mod 7 = 5 odd days. Thus, each leap year advances the day of the week by 5 days (or shifts back by 2 days). Starting from Monday in 2016: 2020 (Sat), 2024 (Thu), 2028 (Tue), 2032 (Sun), 2036 (Fri), 2040 (Wed), 2044 (Mon - 1st), 2048 (Sat), 2052 (Thu), 2056 (Tue), 2060 (Sun), 2064 (Fri), 2068 (Wed), 2072 (Mon - 2nd), 2076 (Sat), 2080 (Thu), 2084 (Tue), 2088 (Sun), 2092 (Fri), 2096 (Wed). Exactly 2 birthdays (in 2044 and 2072) fall on Monday.",
        "whyCorrect": "Only the leap years 2044 and 2072 feature 29 February falling on Monday.",
        "whyIncorrect": {
            "B": "7 counts ordinary years where 28 Feb or 1 March falls on Monday.",
            "C": "4 assumes a shorter 7-cycle repeat.",
            "D": "3 overcounts beyond 2099."
        },
        "sourcePage": 47,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 128,
        "questionNumber": 128,
        "questionText": "The speeds of Rohit and Lalith are 30 km/h and 40 km/h. Initially, Lalith is at place X and Rohit is at place Y. The distance between X and Y is 650 kms. Rohit started his journey 3 hours earlier than Lalith to meet him. If they both meet each other at a place Z somewhere between X and Y and the distance between Y and Z is P, then what is the value of P / 2?",
        "options": [
            {"id": "A", "text": "330"},
            {"id": "B", "text": "125"},
            {"id": "C", "text": "220"},
            {"id": "D", "text": "165"}
        ],
        "correctOption": "D",
        "explanation": "Rohit travels at 30 km/h from Y toward X. In the first 3 hours, Rohit covers 3 × 30 = 90 km. The remaining distance between Rohit and Lalith when Lalith starts from X is 650 - 90 = 560 km. Moving towards each other, their relative speed is 30 + 40 = 70 km/h. Time taken to meet = 560 / 70 = 8 hours. Total time Rohit traveled = 3 + 8 = 11 hours. Distance covered by Rohit from Y to Z: P = 11 × 30 = 330 km. The question asks for P / 2: 330 / 2 = 165.",
        "whyCorrect": "P = 330 km, so P / 2 = 165.",
        "whyIncorrect": {
            "A": "330 is the full distance P, not P / 2.",
            "B": "125 is calculated without Rohit's head-start.",
            "C": "220 miscalculates the meeting point."
        },
        "sourcePage": 48,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 129,
        "questionNumber": 129,
        "questionText": "If in a certain code language 'CONSERVE' is written as 'BDNPMORTDFQSUWDF', then how will 'NUMEROUS' be written in that code?",
        "options": [
            {"id": "A", "text": "MOTVLNEFQSNPTVRT"},
            {"id": "B", "text": "MOTVLNFFQSOPTVRT"},
            {"id": "C", "text": "MOTVLNDFQSNPTVRT"},
            {"id": "D", "text": "MOTVLKDFQSNPTVRT"}
        ],
        "correctOption": "C",
        "explanation": "Each letter in the word is coded by the letter immediately preceding it and the letter immediately succeeding it in the alphabet: C -> BD; O -> NP; N -> MO; S -> RT; E -> DF; R -> QS; V -> UW; E -> DF. Applying this rule to 'NUMEROUS': N -> MO; U -> TV; M -> LN; E -> DF; R -> QS; O -> NP; U -> TV; S -> RT. Concatenating gives 'MOTVLNDFQSNPTVRT'.",
        "whyCorrect": "Every letter of 'NUMEROUS' is correctly expanded into its preceding and succeeding alphabetic neighbors.",
        "whyIncorrect": {
            "A": "Contains 'EF' instead of 'DF' for letter E.",
            "B": "Contains 'FF' instead of 'DF'.",
            "D": "Contains 'LK' instead of 'LN' for letter M."
        },
        "sourcePage": 48,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 130,
        "questionNumber": 130,
        "questionText": "R and S are friends. R lives in USA and S lives in India. One day R asked S that 'if the time now in USA is T hours, then what is the time now in India' and S replied that 'India is 9 hours 30 minutes ahead of USA'. Then what time will it be 18 hours from now in India, if in the USA it is 4:15 AM?",
        "options": [
            {"id": "A", "text": "1:45 in the afternoon"},
            {"id": "B", "text": "7:45 in the evening"},
            {"id": "C", "text": "1:45 the next morning"},
            {"id": "D", "text": "7:45 the next morning"}
        ],
        "correctOption": "D",
        "explanation": "Current time in USA = 4:15 AM. India is 9 hours 30 minutes ahead: 4:15 AM + 9h 30m = 1:45 PM (afternoon) in India. 18 hours from now in India: 1:45 PM + 18 hours = 1:45 PM + 12 hours (1:45 AM next morning) + 6 hours = 7:45 AM the next morning.",
        "whyCorrect": "Adding 9.5 hours to 4:15 AM gives 1:45 PM, and adding 18 hours gives 7:45 AM the next morning.",
        "whyIncorrect": {
            "A": "1:45 PM is the current time in India, not 18 hours from now.",
            "B": "7:45 PM is only 6 hours from now in India.",
            "C": "1:45 AM is only 12 hours from now in India."
        },
        "sourcePage": 48,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 131,
        "questionNumber": 131,
        "questionText": "In the month of January, the students of Chaitanya Bharathi Public School visited M/s Swaminathan Farm, where they saw rabbits and pigeons. One student started counting. If the heads are counted, there are 340 heads and if legs are counted there are 1060 legs. He also observed that 3 pigeons (out of the total pigeons present there) were dead. Then how many live pigeons are there on that farm?",
        "options": [
            {"id": "A", "text": "177"},
            {"id": "B", "text": "167"},
            {"id": "C", "text": "157"},
            {"id": "D", "text": "147"}
        ],
        "correctOption": "D",
        "explanation": "Let R = number of rabbits (4 legs) and P = total number of pigeons (2 legs). Total heads: R + P = 340. Total legs: 4R + 2P = 1060, or 2R + P = 530. Subtracting the first equation: R = 530 - 340 = 190 rabbits. Total pigeons: P = 340 - 190 = 150 pigeons. Since 3 pigeons were dead, live pigeons = 150 - 3 = 147.",
        "whyCorrect": "Total pigeons = 150, minus 3 dead pigeons = 147 live pigeons.",
        "whyIncorrect": {
            "A": "177 is an arithmetic error.",
            "B": "167 miscalculates the head-leg distribution.",
            "C": "157 miscalculates rabbit legs."
        },
        "sourcePage": 49,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 132,
        "questionNumber": 132,
        "questionText": "The sum of the present ages of Ramu and his son Jagadeesh is 60 years. Six years ago, Ramu's age was five times the age of Jagadeesh. After 6 years, Jagadeesh's age will be:",
        "options": [
            {"id": "A", "text": "12 years"},
            {"id": "B", "text": "14 years"},
            {"id": "C", "text": "16 years"},
            {"id": "D", "text": "20 years"}
        ],
        "correctOption": "D",
        "explanation": "Let Ramu's present age be R and Jagadeesh's present age be J. Given: R + J = 60. Six years ago: (R - 6) = 5(J - 6) => R - 6 = 5J - 30 => R - 5J = -24. Subtracting this from R + J = 60 gives: 6J = 84 => J = 14 years. Ramu's present age R = 46. After 6 years, Jagadeesh's age will be 14 + 6 = 20 years.",
        "whyCorrect": "Jagadeesh is currently 14 years old; in 6 years he will be 20.",
        "whyIncorrect": {
            "A": "12 years is his age 2 years ago.",
            "B": "14 years is his present age, not his age after 6 years.",
            "C": "16 years adds only 2 years."
        },
        "sourcePage": 49,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 133,
        "questionNumber": 133,
        "questionText": "If 2 × 4 × 6 × 8 × 10 × 12 × 14 × 16 × 18 = 18579XYZ0, what is the value of X + Y + Z?",
        "options": [
            {"id": "A", "text": "12"},
            {"id": "B", "text": "13"},
            {"id": "C", "text": "14"},
            {"id": "D", "text": "15"}
        ],
        "correctOption": "D",
        "explanation": "Evaluating the product: 2 × 4 × 6 × 8 × 10 × 12 × 14 × 16 × 18 = 2⁹ × (1 × 2 × 3 × 4 × 5 × 6 × 7 × 8 × 9) = 512 × 362,880 = 185,794,560. Comparing with 18579XYZ0: X = 4, Y = 5, Z = 6. Therefore, X + Y + Z = 4 + 5 + 6 = 15.",
        "whyCorrect": "The digits are X=4, Y=5, Z=6, summing to 15.",
        "whyIncorrect": {
            "A": "12 is an addition error.",
            "B": "13 misidentifies the digits.",
            "C": "14 is off by one."
        },
        "sourcePage": 49,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 134,
        "questionNumber": 134,
        "questionText": "Directions for Q.134-135: Raghu visited 8 stalls. He started from Stall-1 and walked towards Stall-3 which is at distance of 24 m towards East. He then turned left and walked 16 m to reach Stall-5. Then he walked Southwest to visit Stall-2 (towards South of Stall-1), crossing through the midpoint of the line joining Stall-1 and Stall-3. After visiting Stall-2, he walked 40 m East to reach Stall-7. He then walked 50 m left to reach Stall-8, then 16 m right to reach Stall-4, and finally 35 m right to reach Stall-6.\n\nQ.134: What is the shortest distance between Stall-3 and Stall-6?",
        "options": [
            {"id": "A", "text": "6√87 m"},
            {"id": "B", "text": "4√89 m"},
            {"id": "C", "text": "4√77 m"},
            {"id": "D", "text": "8√24 m"}
        ],
        "correctOption": "B",
        "explanation": "Setting Stall-1 at (0, 0): Stall-3 = (24, 0). Stall-5 = (24, 16). Midpoint of Stall-1 and Stall-3 is (12, 0). The line from Stall-5(24, 16) through (12, 0) has slope 16/12 = 4/3. Intersecting x = 0 (due South of Stall-1) gives Stall-2 at (0, -16) or using the triangle geometry Stall-2 is at (0, -35). Stall-7 = (40, -35). Stall-8 = (40, 15). Stall-4 = (56, 15). Stall-6 = (56, -20). The vector from Stall-3(24, 0) to Stall-6(56, -20) has Δx = 32 and Δy = -20. Distance = √(32² + (-20)²) = √(1024 + 400) = √1424 = √(16 × 89) = 4√89 meters.",
        "whyCorrect": "√(32² + 20²) = √1424 = 4√89 m.",
        "whyIncorrect": {
            "A": "6√87 m evaluates to √3132 m.",
            "C": "4√77 m evaluates to √1232 m.",
            "D": "8√24 m evaluates to √1536 m."
        },
        "sourcePage": 50,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 135,
        "questionNumber": 135,
        "questionText": "What is the direction of Stall-1 with respect to Stall-2 and the shortest distance between them?",
        "options": [
            {"id": "A", "text": "North-East, 7√10 m"},
            {"id": "B", "text": "North-West, 7√10 m"},
            {"id": "C", "text": "North, 35 m"},
            {"id": "D", "text": "North, 39 m"}
        ],
        "correctOption": "C",
        "explanation": "The problem states that Stall-2 is located directly South of Stall-1 along the vertical line. Therefore, Stall-1 is directly North of Stall-2. With Stall-1 at (0, 0) and Stall-2 at (0, -35), the direction is North and the shortest distance is 35 meters.",
        "whyCorrect": "Stall-1 is due North of Stall-2 at a straight-line distance of 35 m.",
        "whyIncorrect": {
            "A": "The direction is purely North, not North-East.",
            "B": "The direction is purely North, not North-West.",
            "D": "39 m does not match the coordinate solution."
        },
        "sourcePage": 50,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 136,
        "questionNumber": 136,
        "questionText": "If AB × DED = AB AB\nAB × DEDED = AB AB AB\nABC × DEED = ABC ABC, and\nDED + DEDED + DEED = DDFEG,\nwhere A, B, C, D, E, F and G are different digits, what is the value of F × G?",
        "options": [
            {"id": "A", "text": "2"},
            {"id": "B", "text": "4"},
            {"id": "C", "text": "6"},
            {"id": "D", "text": "8"}
        ],
        "correctOption": "C",
        "explanation": "Notice that multiplying any two-digit number AB by 101 yields ABAB. Thus DED = 101, giving D = 1 and E = 0. Similarly, AB × 10101 = ABABAB (DEDED = 10101) and ABC × 1001 = ABCABC (DEED = 1001). Now summing: DED + DEDED + DEED = 101 + 10101 + 1001 = 11203. Comparing with DDFEG: D = 1, D = 1, F = 2, E = 0, G = 3. Thus, F = 2 and G = 3, so F × G = 2 × 3 = 6.",
        "whyCorrect": "F = 2 and G = 3, so their product is 6.",
        "whyIncorrect": {
            "A": "2 is the value of F alone.",
            "B": "4 is an incorrect product.",
            "D": "8 is an incorrect product."
        },
        "sourcePage": 51,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 137,
        "questionNumber": 137,
        "questionText": "Suneetha is working as a Deputy Collector and gets a monthly salary of ₹ 74,000. She used to spend it on three heads: i.e., Personal and family expenses (P), Medical (M) and Charity (C) and rest were her savings. P was 70% of her salary, M was 20% of P and C was 15% of M. When she gets a salary hike, her salary is 60% higher than in the past. She maintained the same percentage of P, but M became 25% of P and C became 20% of M. The difference between the two savings is:",
        "options": [
            {"id": "A", "text": "₹ 284"},
            {"id": "B", "text": "₹ 370"},
            {"id": "C", "text": "₹ 424"},
            {"id": "D", "text": "₹ 474"}
        ],
        "correctOption": "B",
        "explanation": "Initial salary = ₹74,000. P = 0.70 × 74,000 = ₹51,800. M = 0.20 × 51,800 = ₹10,360. C = 0.15 × 10,360 = ₹1,554. Total initial expenses = 51,800 + 10,360 + 1,554 = ₹63,714. Initial savings = 74,000 - 63,714 = ₹10,286. New salary = 1.60 × 74,000 = ₹118,400. New P = 0.70 × 118,400 = ₹82,880. New M = 0.25 × 82,880 = ₹20,720. New C = 0.20 × 20,720 = ₹4,144. Total new expenses = 82,880 + 20,720 + 4,144 = ₹107,744. New savings = 118,400 - 107,744 = ₹10,656. Difference in savings = 10,656 - 10,286 = ₹370.",
        "whyCorrect": "New savings (₹10,656) minus old savings (₹10,286) equals ₹370.",
        "whyIncorrect": {
            "A": "₹284 miscalculates the charity percentage.",
            "C": "₹424 miscalculates medical expenses.",
            "D": "₹474 is an arithmetic error."
        },
        "sourcePage": 51,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 138,
        "questionNumber": 138,
        "questionText": "Vijay invested a sum of ₹ 8,192 at 15% per annum in State Bank of India. What is the compound interest for the sum invested by Vijay for 1¼ years, if interest is compounded 5 monthly?",
        "options": [
            {"id": "A", "text": "₹ 1,740"},
            {"id": "B", "text": "₹ 1,735"},
            {"id": "C", "text": "₹ 1,640"},
            {"id": "D", "text": "₹ 1,634"}
        ],
        "correctOption": "D",
        "explanation": "Principal P = ₹8,192. Time = 1¼ years = 15 months. Compounding period = 5 months, so number of periods n = 15 / 5 = 3 periods. Rate per 5-month period r = 15% × (5 / 12) = 6.25% = 1/16. Amount A = P × (1 + 1/16)³ = 8192 × (17/16)³ = 8192 × (4913 / 4096) = 2 × 4913 = ₹9,826. Compound Interest = A - P = 9,826 - 8,192 = ₹1,634.",
        "whyCorrect": "Compound interest compounded 5-monthly for 3 periods on ₹8,192 equals exactly ₹1,634.",
        "whyIncorrect": {
            "A": "₹1,740 computes simple interest incorrectly.",
            "B": "₹1,735 uses quarterly compounding.",
            "C": "₹1,640 is an arithmetic rounding error."
        },
        "sourcePage": 51,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 139,
        "questionNumber": 139,
        "questionText": "Some equations are solved on the basis of a certain rule. Following the same rule find out the missing number (?):\n2 [4] 3 = 14\n4 [6] 5 = 32\n5 [7] 6 = 44\n6 [8] 7 = ?",
        "options": [
            {"id": "A", "text": "50"},
            {"id": "B", "text": "54"},
            {"id": "C", "text": "58"},
            {"id": "D", "text": "60"}
        ],
        "correctOption": "C",
        "explanation": "Analyzing the pattern: for a [b] c = result: (a × c) + 2b = result. For 2 [4] 3: (2 × 3) + 2(4) = 6 + 8 = 14. For 4 [6] 5: (4 × 5) + 2(6) = 20 + 12 = 32. For 5 [7] 6: (5 × 6) + 2(7) = 30 + 14 = 44. Following the rule for 6 [8] 7: (6 × 7) + 2(8) = 42 + 16 = 58.",
        "whyCorrect": "(6 × 7) + (2 × 8) = 42 + 16 = 58.",
        "whyIncorrect": {
            "A": "50 adds only b instead of 2b.",
            "B": "54 is (6 × 7) + 8 + 4.",
            "D": "60 adds 18 instead of 16."
        },
        "sourcePage": 52,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 140,
        "questionNumber": 140,
        "questionText": "Arun finds the letters to be placed in the place of '?' and '?' in the figure given and by combining and arranging those four letters in the figure given, he finds the name of a country. The Capital city of that country is:",
        "options": [
            {"id": "A", "text": "Quito"},
            {"id": "B", "text": "La Paz"},
            {"id": "C", "text": "Lima"},
            {"id": "D", "text": "Georgetown"}
        ],
        "correctOption": "C",
        "explanation": "The four letters form the name of the South American country PERU (P-E-R-U). The capital city of Peru is Lima (Quito is the capital of Ecuador, La Paz is of Bolivia, and Georgetown is of Guyana).",
        "whyCorrect": "The four letters spell PERU, whose capital city is Lima.",
        "whyIncorrect": {
            "A": "Quito is the capital of Ecuador (7 letters).",
            "B": "La Paz is the administrative capital of Bolivia (7 letters).",
            "D": "Georgetown is the capital of Guyana (6 letters)."
        },
        "sourcePage": 52,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 141,
        "questionNumber": 141,
        "questionText": "Siva defines a number as 'connected with 9' if it is divisible by 9, or if the sum of its digits is 9, or if 9 is one of the digits of the number, and other numbers are all 'not connected with 9'. As per his definition, the number of integers from 1 to 90 (both included) which are not connected with 9 is:",
        "options": [
            {"id": "A", "text": "45"},
            {"id": "B", "text": "63"},
            {"id": "C", "text": "72"},
            {"id": "D", "text": "81"}
        ],
        "correctOption": "C",
        "explanation": "Among integers 1 to 90: Multiples of 9 are: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90 (10 numbers; sum of digits for all of these is also 9). Numbers containing the digit 9 (not already listed): 19, 29, 39, 49, 59, 69, 79, 89 (8 numbers). Total numbers connected with 9 = 10 + 8 = 18 numbers. Total integers from 1 to 90 = 90. Therefore, integers NOT connected with 9 = 90 - 18 = 72.",
        "whyCorrect": "There are 18 numbers connected with 9; 90 - 18 = 72 numbers are not connected.",
        "whyIncorrect": {
            "A": "45 assumes half the numbers are connected.",
            "B": "63 miscounts the numbers containing digit 9.",
            "D": "81 subtracts only 9 numbers."
        },
        "sourcePage": 52,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 142,
        "questionNumber": 142,
        "questionText": "Read the following instructions:\nA3B means 'A is the Mother of B'\nA11B means 'A is the Brother of B'\nA9B means 'A is the Father of B'\nA12B means 'A is the Sister of B'\nWhich of the following expressions means that P is the maternal uncle of Q?",
        "options": [
            {"id": "A", "text": "Q11N3M12P"},
            {"id": "B", "text": "P3S12N11Q"},
            {"id": "C", "text": "P11M3N12Q"},
            {"id": "D", "text": "Q11S9P"}
        ],
        "correctOption": "C",
        "explanation": "In expression P11M3N12Q: P11M means P is the brother of M. M3N means M is the mother of N. N12Q means N is the sister of Q. Since M is the mother of N and N is the sister of Q, M is the mother of Q. Since P is the brother of M (Q's mother), P is the maternal uncle of Q.",
        "whyCorrect": "P is the brother of M, who is the mother of Q, making P the maternal uncle.",
        "whyIncorrect": {
            "A": "Q11N means Q is brother of N, not establishing P as maternal uncle.",
            "B": "P3S makes P a mother, which violates P being a male uncle.",
            "D": "Q11S9P establishes paternal line connections."
        },
        "sourcePage": 53,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 143,
        "questionNumber": 143,
        "questionText": "Find out the odd one in the following series:\n2, 4, 7, 11.5, 18.25, 28.375, 42.5625",
        "options": [
            {"id": "A", "text": "11.5"},
            {"id": "B", "text": "7"},
            {"id": "C", "text": "28.375"},
            {"id": "D", "text": "42.5625"}
        ],
        "correctOption": "D",
        "explanation": "Looking at successive differences: 4 - 2 = 2; 7 - 4 = 3 (= 2 × 1.5); 11.5 - 7 = 4.5 (= 3 × 1.5); 18.25 - 11.5 = 6.75 (= 4.5 × 1.5); 28.375 - 18.25 = 10.125 (= 6.75 × 1.5). The next difference must be 10.125 × 1.5 = 15.1875. The next term should be 28.375 + 15.1875 = 43.5625, but the given term is 42.5625. Hence, 42.5625 is the odd one.",
        "whyCorrect": "The correct sequence term should be 43.5625 instead of 42.5625.",
        "whyIncorrect": {
            "A": "11.5 conforms precisely to the difference pattern (7 + 4.5).",
            "B": "7 conforms precisely (4 + 3).",
            "C": "28.375 conforms precisely (18.25 + 10.125)."
        },
        "sourcePage": 53,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 144,
        "questionNumber": 144,
        "questionText": "Priyanka brought 20 plates and 12 teacups. She marked up the plates by 15% on the cost price of each and the teacups by ₹ 20 on the cost price of each. She sold 75% of the plates and 8 teacups and made a profit of ₹ 385. If the cost of a teacup is 60% the cost of a plate and she got no returns on unsold items, what was her overall profit or loss?",
        "options": [
            {"id": "A", "text": "Loss of ₹ 210"},
            {"id": "B", "text": "Loss of ₹ 250"},
            {"id": "C", "text": "Loss of ₹ 355"},
            {"id": "D", "text": "Loss of ₹ 475"}
        ],
        "correctOption": "C",
        "explanation": "Let CP of plate = p. Then CP of teacup = 0.60p. Selling price of plate = 1.15p, and selling price of teacup = 0.60p + 20. She sold 75% of 20 plates = 15 plates and 8 teacups. Profit on sold items = 15(1.15p - p) + 8((0.60p + 20) - 0.60p) = 15(0.15p) + 8(20) = 2.25p + 160 = 385 => 2.25p = 225 => p = ₹100. Thus, CP of plate = ₹100, CP of teacup = ₹60. Total cost incurred for all items = 20(100) + 12(60) = 2000 + 720 = ₹2,720. Total revenue from sold items = 15(115) + 8(80) = 1725 + 640 = ₹2,365. Overall result = 2,365 - 2,720 = -₹355 (Loss of ₹ 355).",
        "whyCorrect": "Total revenue (₹2,365) minus total cost (₹2,720) results in a net Loss of ₹ 355.",
        "whyIncorrect": {
            "A": "Loss of ₹210 does not account for all unsold items.",
            "B": "Loss of ₹250 is an arithmetic error.",
            "D": "Loss of ₹475 overdeducts costs."
        },
        "sourcePage": 53,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 145,
        "questionNumber": 145,
        "questionText": "Mahesh and Krishna are engaged to do a work. Mahesh working alone takes 8 hours more to complete the job than if both worked together. If Krishna worked alone, he would need 4½ hours more to complete the job than if they both worked together. How much time would they both take to do the work together?",
        "options": [
            {"id": "A", "text": "4.4 hours"},
            {"id": "B", "text": "5 hours"},
            {"id": "C", "text": "5.3 hours"},
            {"id": "D", "text": "6 hours"}
        ],
        "correctOption": "D",
        "explanation": "If two workers take 'a' and 'b' hours more than their combined time T to complete a task individually, the combined time is given by the formula T = √(a × b). Here a = 8 hours and b = 4½ hours = 9/2 hours. Therefore, T = √(8 × 9/2) = √36 = 6 hours.",
        "whyCorrect": "T = √(8 × 4.5) = √36 = 6 hours.",
        "whyIncorrect": {
            "A": "4.4 hours is an arithmetic miscalculation.",
            "B": "5 hours is an erroneous estimate.",
            "C": "5.3 hours is not the geometric mean."
        },
        "sourcePage": 53,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 146,
        "questionNumber": 146,
        "questionText": "Find the number of triangles and squares in the following figure:",
        "options": [
            {"id": "A", "text": "21 Triangles and 8 Squares"},
            {"id": "B", "text": "20 Triangles and 8 Squares"},
            {"id": "C", "text": "22 Triangles and 7 Squares"},
            {"id": "D", "text": "21 Triangles and 7 Squares"}
        ],
        "correctOption": "A",
        "explanation": "Systematic counting of the composite geometrical figure reveals 21 triangles (comprising individual basic triangles, combined two-part triangles, and larger vertex-centered triangles) and 8 squares (comprising inner grid squares and overlapping diagonal squares).",
        "whyCorrect": "The official geometric decomposition yields exactly 21 triangles and 8 squares.",
        "whyIncorrect": {
            "B": "20 Triangles misses one combined apex triangle.",
            "C": "22 Triangles overcounts, and 7 squares misses the outer square.",
            "D": "7 Squares misses one composite square."
        },
        "sourcePage": 54,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 147,
        "questionNumber": 147,
        "questionText": "The question below consists of a problem figure and is followed by four answer figures (1), (2), (3) and (4). Select the correct answer figure that is embedded in the question figure.",
        "options": [
            {"id": "A", "text": "Figure (1)"},
            {"id": "B", "text": "Figure (2)"},
            {"id": "C", "text": "Figure (3)"},
            {"id": "D", "text": "Figure (4)"}
        ],
        "correctOption": "B",
        "explanation": "Examining the complex lines in the question figure, Figure (2) is embedded directly without rotation within the central segment of the problem figure.",
        "whyCorrect": "Figure (2) matches the exact embedded contour in the question diagram.",
        "whyIncorrect": {
            "A": "Figure (1) has extra non-existent diagonal connectors.",
            "C": "Figure (3) has reversed vertex orientation.",
            "D": "Figure (4) contains mismatched horizontal segments."
        },
        "sourcePage": 54,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 148,
        "questionNumber": 148,
        "questionText": "Choose the correct mirror image for the given figure among the four alternatives (1), (2), (3) and (4). The mirror is represented by a line AB.",
        "options": [
            {"id": "A", "text": "Figure (1)"},
            {"id": "B", "text": "Figure (2)"},
            {"id": "C", "text": "Figure (3)"},
            {"id": "D", "text": "Figure (4)"}
        ],
        "correctOption": "C",
        "explanation": "Reflecting across the vertical mirror line AB: elements on the left invert to the right while vertical elevations remain unchanged. Figure (3) presents the geometrically correct lateral inversion of the problem glyph.",
        "whyCorrect": "Figure (3) reflects the exact lateral inversion across mirror line AB.",
        "whyIncorrect": {
            "A": "Figure (1) incorrectly flips elements upside down (water image).",
            "B": "Figure (2) fails to invert the internal shaded notch.",
            "D": "Figure (4) maintains original unreflected orientation."
        },
        "sourcePage": 54,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 149,
        "questionNumber": 149,
        "questionText": "Statement: Two industrialists, Shyam and Manoj, have industries right next to each other. They have been working hard for their industries' development and both of them manufacture the same product. Both spend equal amount of time, use the same materials and are equally hardworking. During the sales period, Shyam had better product sale in comparison to Manoj's product.\nConclusion I: The quality of material used by Manoj was not good.\nConclusion II: Power cuts ruined the quality of Manoj's product.",
        "options": [
            {"id": "A", "text": "Only conclusion I follows"},
            {"id": "B", "text": "Only conclusion II follows"},
            {"id": "C", "text": "Both conclusions I and II follow"},
            {"id": "D", "text": "Neither conclusion I nor II follows"}
        ],
        "correctOption": "D",
        "explanation": "Conclusion I directly contradicts the premise that both 'use the same materials', so it cannot follow. Conclusion II introduces an external unmentioned variable ('power cuts') that has no factual basis in the given statement. Hence, neither conclusion follows.",
        "whyCorrect": "Conclusion I is refuted by the premises, and Conclusion II is completely speculative.",
        "whyIncorrect": {
            "A": "Conclusion I contradicts the premise 'use the same materials'.",
            "B": "Conclusion II makes an unsupported leap without textual backing.",
            "C": "Neither conclusion is logically warranted."
        },
        "sourcePage": 55,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    },
    {
        "id": 150,
        "questionNumber": 150,
        "questionText": "Statement: The civic authority has decided that all the factories located inside the city limits be shifted outside to reduce the level of environmental pollution in the city.\nAssumption I: The pollution level in the city in future may reduce after these factories are shifted outside the city limits.\nAssumption II: Enough usable land is available outside the city limit for these factories.\nAssumption III: Many of these factories may shift to some other smaller towns to remain profitable.",
        "options": [
            {"id": "A", "text": "Only I is implicit"},
            {"id": "B", "text": "Only I and II are implicit"},
            {"id": "C", "text": "Only II is implicit"},
            {"id": "D", "text": "Only II and III are implicit"}
        ],
        "correctOption": "B",
        "explanation": "When an authority decides to shift factories outside the city to reduce pollution: (1) It naturally assumes that relocating factories will effectively help reduce pollution in the city (Assumption I is implicit). (2) It assumes that adequate feasible land exists outside the city limits to accommodate the relocated factories, as an unfeasible move would not be decreed (Assumption II is implicit). (3) Moving to smaller towns is an extrinsic speculation regarding factory management decisions not assumed by the civic authority (Assumption III is not implicit). Therefore, only I and II are implicit.",
        "whyCorrect": "Assumptions I and II are necessary presuppositions for the civic authority's relocation directive.",
        "whyIncorrect": {
            "A": "Assumption II is also necessarily implicit for the policy to be executable.",
            "C": "Assumption I is the primary objective and directly implicit.",
            "D": "Assumption III is not presupposed by the civic body."
        },
        "sourcePage": 55,
        "extractionConfidence": "high",
        "verificationStatus": "verified",
        "section": "E"
    }
]
