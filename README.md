# APPSC Group 2 Mains CBT Mock Examination Portal

A professional, high-performance Computer-Based Test (CBT) mock examination website inspired by the TCS iON examination interface for Andhra Pradesh Public Service Commission (APPSC) Group 2 aspirants.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Deployable on Vercel.

---

## 🌟 Key Features

1. **Official Question Bank (Paper-I — 23 February 2025):**
   - Exactly **150 questions** extracted and verified against the official APPSC Paper-I examination paper.
   - Section A: *Social and Cultural History of Andhra Pradesh* (Questions 1 to 75).
   - Section B: *General Overview of the Indian Constitution* (Questions 76 to 150).
   - 100% verified answer keys corresponding directly to the official boxed rectangles in the APPSC question paper.
   - In-depth subject explanations and option-by-option rationale for all 150 questions.

2. **Authentic TCS iON Examination Interface:**
   - Three-section examination screen with professional navy-blue/white styling.
   - Real-time countdown timer (150 minutes / 02:30:00) using reliable timestamp-based calculation that persists across page refreshes.
   - Interactive 150-question palette with official color-coded statuses:
     - ⚪ Grey: Not Visited
     - 🔴 Red: Not Answered / Visited
     - 🟢 Green: Answered
     - 🟣 Purple: Marked for Review
     - 🟣🟢 Purple with Green Indicator: Answered & Marked for Review (evaluated for scoring).
   - Navigation actions: **Save & Next**, **Mark for Review & Next**, **Clear Response**, **Previous**, and direct jump navigation.
   - Multi-paper portal architecture: dynamically supports 4–5+ question papers from `src/data/papers-metadata.json`.

3. **Complete Examination Workflow:**
   - **Homepage:** Clean examination portal listing available question papers with key details.
   - **Candidate Details:** Verification and registration of Candidate Name and Roll Number.
   - **General Instructions:** Official 10-point examination rules with configurable negative marking.
   - **Submission Confirmation Modal:** Displays total answered, not answered, and marked for review before final submission.
   - **Results Dashboard:** Instant score calculation (`Correct + Incorrect + Unanswered = 150`), accuracy percentage, and score breakdown.
   - **Detailed Answer Review:** Filter questions by *All*, *Correct*, *Incorrect*, and *Unanswered*, showing candidate choice, official boxed key, and complete subject explanations.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (TCS iON Examination Theme)
- **Icons:** Lucide React
- **Storage:** LocalStorage for client-side persistence (no database or external API overhead)
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17+ or v20+)
- npm

### 1. Installation

```bash
git clone <repository-url>
cd "appsc exam website"
npm install
```

### 2. Local Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

Test the production build:

```bash
npm run build
npm run start
```

---

## 📄 Adding Another Question Paper

The application uses an extensible, decoupled multi-paper architecture:

1. **Place the PDF:**
   Drop your question paper PDF into the `pyqs/` folder.

2. **Extract & Verify Questions:**
   Process the PDF and extract questions and boxed answer keys into a structured JSON file:
   `src/data/papers/paper-02.json`

   Each question must adhere to the `Question` schema:
   ```json
   {
     "id": 1,
     "questionNumber": 1,
     "questionText": "Question text here...",
     "options": [
       {"id": "A", "text": "Option A text"},
       {"id": "B", "text": "Option B text"},
       {"id": "C", "text": "Option C text"},
       {"id": "D", "text": "Option D text"}
     ],
     "correctOption": "B",
     "explanation": "Detailed explanation...",
     "whyCorrect": "Why B is correct...",
     "whyIncorrect": { "A": "...", "C": "...", "D": "..." },
     "sourcePage": 5,
     "extractionConfidence": "high",
     "verificationStatus": "verified",
     "section": "Section A: ..."
   }
   ```

3. **Register in Metadata:**
   Add the paper record to `src/data/papers-metadata.json`:
   ```json
   {
     "id": "paper-02",
     "paperCode": "APPSC-G2-2024-P1",
     "title": "APPSC Group 2 Mains — Previous Year Paper",
     "subtitle": "Paper-I | General Studies & Mental Ability",
     "examDate": "2024",
     "totalQuestions": 150,
     "maxMarks": 150,
     "durationMinutes": 150,
     "negativeMarking": 0,
     "sections": [
       { "name": "Section A", "startQuestion": 1, "endQuestion": 75 },
       { "name": "Section B", "startQuestion": 76, "endQuestion": 150 }
     ]
   }
   ```

4. **Dynamic Import Support:**
   In `src/lib/paper-registry.ts`, map the new paper ID to its JSON import:
   ```ts
   if (paperId === 'paper-02') {
     const data = await import('@/data/papers/paper-02.json');
     return data.default as Question[];
   }
   ```
   The homepage card grid will automatically render the new examination paper card!

---

## 🔑 Updating Answer Keys & Explanations

To update or correct any answer key or explanation:
1. Locate the relevant paper file (e.g. `src/data/papers/paper-01.json`).
2. Search for the `questionNumber`.
3. Update `correctOption` (`"A" | "B" | "C" | "D"`), `explanation`, `whyCorrect`, or `whyIncorrect`.
4. Run `npm run build` to verify syntax and types.

---

## 🌐 Deploying to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard (Git Integration)

1. Push the code to a GitHub, GitLab, or Bitbucket repository.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New...** -> **Project**.
4. Import your repository.
5. Framework preset: **Next.js**.
6. Click **Deploy**.

No environment variables or external databases are required.

---

## 📋 Extraction & Verification Report (Paper-I 2025)

- **Total Questions Expected:** 150
- **Successfully Extracted:** 150
- **Verified Boxed Answers:** 150
- **High Confidence Rate:** 100%
- **Uncertain Questions:** 0
- **Missing Questions:** 0
- **Duplicate Questions:** 0
- **Section A (AP History):** Questions 1 to 75
- **Section B (Indian Constitution):** Questions 76 to 150
