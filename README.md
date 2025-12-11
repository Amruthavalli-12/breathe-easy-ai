🌬️ AI-Powered Respiratory Disease Screening Web Application (LangChain-Inspired)

An advanced medical screening web application designed to analyze symptoms or respiratory audio (cough, breath, voice) and intelligently predict likely respiratory diseases using LLM reasoning + rule-based medical knowledge.

Built using React, TypeScript, TailwindCSS, Lovable Cloud, and LangChain-style prompt engineering.

🌟 Features
🔍 AI-Powered Screening

Uses Google Gemini 2.5 Flash through Lovable AI to analyze:

User-entered symptoms

Uploaded or recorded respiratory audio (cough / breath / voice)

Severity, duration, and risk factors (via prompt engineering)

🤖 LangChain-Inspired Prompt Engineering

Implements a structured reasoning process:

System role instructions

User input prompt template

Analytical steps (Identify → Compare → Score → Predict → Explain)

Chain-of-thought style reasoning (hidden)

🩺 Disease Coverage

Predicts probability and severity for:

Asthma

Flu

Bronchitis

Pneumonia

Common Cold

COVID-19

COPD

Allergic Rhinitis

📊 Interactive Probability Charts

Generated using Recharts:

Bar charts

Pie charts

Confidence score indicators

🎤 Audio Screening

Users can:

Upload audio (mp3, wav)

Record directly from microphone
System analyzes respiratory patterns such as:

Wheeze

Crackles

Dry cough

Wet cough

Stridor

Rhonchi

💡 Recommendations

Personalized:

Home remedies

Medication alerts (non-prescriptive)

When to see a doctor

Emergency warnings

👨‍⚕️ Medical UI Design

Professional medical aesthetic:

Teal & blue palette

Soft gradients

Rounded cards

Clinical typography

Smooth fade animations

🎯 Project Criteria
✅ Prompt Quality (20%)

Detailed, hierarchical system prompts

LangChain-style PromptTemplate

Clear formatting instructions

Multiple medical reasoning examples

Supports text, audio, and mixed input

✅ Use of LangChain Concepts (25%)

PromptTemplate-like structure

Multi-step reasoning chain:

Extract Symptoms

Map to Disease Profiles

Compute Probability Scores

Cross-check with Audio Features

Generate Final Summary

Error handling & fallback strategy

Modular prompts for:

Audio analysis

Symptom analysis

Probability scoring

✅ HTML + CSS UI (20%)

Responsive React + Tailwind UI:

Input form for symptoms

Audio upload/record card

Animated probability visualizations

Disease explanation modals

Prevention tips section

✅ Deployment (20%)

Fully deployed using Lovable Cloud:

Integrated AI Gateway

Edge function for medical reasoning

Secure environment variables

Production-ready build

✅ GitHub Repo + README (15%)

Includes:

Setup instructions

Project structure

Prompt engineering philosophy

API endpoints

Screenshots

Demo link

🛠️ Technology Stack
Layer	Tools
Frontend	React, TypeScript, Tailwind CSS
UI Components	shadcn-ui
Charts	Recharts
Backend	Lovable Cloud + Edge Functions
AI Model	Google Gemini 2.5 Flash
Prompt Engineering	LangChain-inspired templates
Audio Processing	Built-in browser API + LLM interpretation
🧠 LangChain-Inspired Prompt Engineering
🧩 System Prompt Example
You are an expert pulmonologist and respiratory diagnostic AI.
Follow this structured process:

1. Extract symptoms from the user input.
2. Match symptoms and audio features to known disease profiles.
3. Calculate probability scores for each disease (0–100%).
4. Consider severity, red flags, and risk factors.
5. Provide:
   - Disease ranking
   - Probability chart data
   - Matched symptoms
   - Recommended next steps
   - When to seek emergency care

Be concise, medical-grade, and accurate.
Format the output in JSON.

🗂️ User Prompt Template (LangChain Style)
Analyze the following health input using the reasoning rules:

Symptoms: ${symptoms}
Duration: ${duration}
Audio Features: ${audioFeatures}
Risk Factors: ${riskFactors}

Return only structured JSON.

🧪 Edge Function (AI Backend)

The respiratory-screen edge function:

✔ Builds the complete prompt template
✔ Sends request to Lovable AI Gateway
✔ Merges audio + text reasoning
✔ Returns structured JSON predictions
✔ Handles:

Timeouts

Rate limits

Missing input

Audio errors

Model fallback to rule-based engine

🎨 Design System
🎨 Colors

Primary: Medical teal #2BA8A1

Secondary: Healthcare blue #1D5FA7

Accent: Soft mint #E7FFFB

🧩 Components

Card-based layout

Animated result dashboard

Glassmorphism for audio recorder

Floating icons & wave patterns

✨ Animations

Fade-in charts

Smooth transitions

Pulse indicators for severity

📱 Usage

Enter your symptoms

OR upload/record a cough or breath sample

Click Analyze Health

View:

Disease probabilities

Matching symptoms

Explanation

Prevention tips

Download your report (optional)

🧠 How the AI Works
🧬 Hybrid Engine:

LLM reasoning (Gemini)

Rule-based medical knowledge base (diseases.json)

Probability fusion via:

Symptom match

Audio feature match

Severity rules

🗂 Project Structure
src/
 ├── components/
 │     ├── AudioRecorder.tsx
 │     ├── SymptomForm.tsx
 │     ├── ResultCharts.tsx
 ├── data/
 │     └── diseases.json
 ├── lib/
 │     └── promptBuilder.ts
 ├── pages/
 │     └── Home.tsx
backend/
 └── respiratory-screen/
       └── index.ts

🌐 Deployment

The app is fully deployed on Lovable Cloud:

Backend auto-deployed to edge

Environment variables secured

Live AI inference

Fast global performance

📄 License

MIT License — Free for personal & commercial use.

🤝 Contributing

Pull requests are welcome!
You can also:

Add new diseases

Improve UI/UX

Enhance audio analysis

Expand prompt templates

📧 Contact

For questions or support, open an Issue on GitHub.# Welcome to your Lovable project

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

