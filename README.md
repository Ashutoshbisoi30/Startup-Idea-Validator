#Startup Idea Validator

A full-stack AI-powered web application that allows users to submit startup ideas and receive an instant AI-generated validation report including market analysis, competitors, tech stack, risk level, and profitability score.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- OpenAI API (or other AI provider)
- MongoDB Atlas
- Mongoose
- Dotenv
- CORS

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/Ashutoshbisoi30/startup-idea-validator.git
cd startup-idea-validator

cd server
npm install

Frontend

cd client
npm install
npm run dev

## AI Prompt Used
You are an expert startup consultant. Analyze the given startup idea
and return a structured JSON object with the fields:
problem, customer, market, competitor, tech_stack, risk_level,
profitability_score, justification.

Rules:
- Keep answers concise and realistic.
- 'competitor' should contain exactly 3 competitors with one-line differentiation each.
- 'tech_stack' should be 4–6 practical technologies for MVP.
- 'profitability_score' must be an integer between 0–100.
Return ONLY JSON.

Input:
{ "title": "", "description": "" }


