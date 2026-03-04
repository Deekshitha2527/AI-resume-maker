# AI Resume Maker 🚀

A production-ready Full Stack AI Resume Maker built with Next.js 14, Supabase, and OpenRouter.

## ✨ Features

- **User Authentication**: Secure signup and login using Supabase Auth.
- **AI-Powered Builder**: Effortless resume generation using Mistral-7B via OpenRouter.
- **Resume History**: Save, view, and manage your previously generated resumes.
- **PDF Export**: Clean, print-ready layouts with one-click PDF download (via browser print).
- **Responsive Design**: Fully mobile-responsive UI built with Tailwind CSS.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase
- **AI Integration**: OpenRouter (Mistral-7B)
- **State Management**: React Hook Form + Zod

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+ installed.
- A Supabase account and project.
- An OpenRouter API key.

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

### 3. Database Setup
Run the following SQL in your Supabase SQL Editor to create the necessary table and security policies:

```sql
create table resumes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text,
  email text,
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table resumes enable row level security;

create policy "Users can view own resumes"
  on resumes for select using (auth.uid() = user_id);

create policy "Users can insert own resumes"
  on resumes for insert with check (auth.uid() = user_id);

create policy "Users can delete own resumes"
  on resumes for delete using (auth.uid() = user_id);
```

### 4. Installation & Run

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License
MIT
