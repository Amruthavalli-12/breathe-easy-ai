🌬️ AI-Powered Respiratory Disease Screening Web Application (Full-Stack + LangChain Prompt Engineering)

An end-to-end intelligent medical screening platform that analyzes symptoms, respiratory audio, and risk factors to predict possible respiratory diseases. Features multilanguage support, user authentication, AI reasoning, history dashboard, and medicine recommendations.

Built using React + TypeScript + TailwindCSS + Lovable Cloud + Google Gemini 2.5 Flash with LangChain-inspired structured prompts.

🌟 Updated Full Feature List
🤖 AI-Powered Diagnosis

Text-based symptom analysis

Audio-based cough/breath/voice pattern detection

LangChain-style structured prompt reasoning

Gemini 2.5 Flash LLM

🔐 Authentication System (Email + Password)

Signup & Login pages

Session management

Protected routes

User-specific history storage

📊 History Dashboard

Stores all user analyses with:

Symptoms

Detected diseases

Probabilities

Medicines suggested

Date & time

Stored securely in Lovable Cloud Database with Row-Level Security (RLS) enabled.

🌍 Multilanguage Support (i18n)

Fully localized UI in:

🇬🇧 English

🇮🇳 Telugu

🇮🇳 Hindi

Includes:

Translated buttons

Form labels

Disease names

Instructions

Medical tips

Languages are switchable using a LanguageSelector component.

Integrated into:

UI disease cards

AI analysis result pages

Downloadable reports

🧠 Enhanced AI Edge Function

Updated backend with:

Symptom extraction

Audio reasoning

Knowledge-base cross-check

Medicine recommendation module

Severity scoring

JSON output format

Error handling

🛡️ Database + RLS Policies

History table schema:

id
user_id
symptoms
audio_features
results_json
created_at


RLS ensures:

Users can only read/write their own analysis records

Admin policies can be added later

🛠️ Technology Stack (Updated)
Frontend

React (Lovable)

TypeScript

Tailwind CSS

shadcn/ui

i18next

Backend

Lovable Cloud Functions

Supabase-style database

Authentication system

Secure storage with RLS

AI Model

Google Gemini 2.5 Flash via Lovable AI Gateway

LangChain-style prompt templates with multi-step reasoning

Charts

Recharts (Bar, Pie)

🧠 LangChain-Inspired Prompt Engineering (Enhanced)
🔧 System Prompt
You are an advanced respiratory diagnostic AI with expertise in
pulmonology, symptom analysis, and audio pattern recognition.

Follow this reasoning chain:
1. Extract symptoms and risk factors
2. Analyze audio features if available
3. Compare against disease profiles
4. Compute probability scores (0–100)
5. Select matching OTC medicines (if appropriate)
6. Check for emergency indicators
7. Generate structured JSON only

🧩 User Prompt Template
Symptoms: ${symptoms}
Duration: ${duration}
Audio Features: ${audioFeatures}
Risk Factors: ${riskFactors}
Preferred Language: ${language}

Return JSON with:
- probabilities
- explanation
- matched symptoms
- suggested medicines
- severity
- recommendations

🧱 Project Structure (Updated)
src/
 ├── components/
 │     ├── AudioRecorder.tsx
 │     ├── SymptomForm.tsx
 │     ├── ResultCharts.tsx
 │     ├── LanguageSelector.tsx
 │     └── Auth/
 │            ├── Login.tsx
 │            └── Signup.tsx
 ├── data/
 │     └── diseases.json
 ├── pages/
 │     ├── Home.tsx
 │     ├── History.tsx
 │     └── Profile.tsx
 ├── lib/
 │     ├── promptBuilder.ts
 │     ├── aiAnalyzer.ts
 │     └── auth.ts
backend/
 └── respiratory-screen/
       ├── index.ts
       └── types.ts

🩺 Updated App Features
✔ Symptom Input
✔ Audio Upload + Recording
✔ AI Analysis
✔ Disease Probabilities
✔ Medicines Explained
✔ History Stored Per User
✔ Multilingual UI
✔ Login + Signup + Logout
📦 Setup Instructions
1️⃣ Clone repository
git clone <YOUR_GIT_URL>
cd respiratory-ai-screening

2️⃣ Install dependencies
npm install

3️⃣ Start dev server
npm run dev

4️⃣ Environment variables

Set inside Lovable Cloud:

AI API key

DB URL

Auth secret

🌐 Deployment

Using Lovable Cloud, you get:

Auto-deployed frontend

Serverless AI edge functions

Secure DB

Authentication system

Perfect production environment

📄 License

MIT License – free to use.

🤝 Contributing

Pull requests welcome:

Add more diseases

Enhance audio classifier

Improve multilingual support

Add doctor-connect feature

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

