# AI Financial Advisory Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

This is the frontend for a sophisticated, proof-of-concept (PoC) financial advisory platform. It's designed to showcase a unique AI-driven approach to stock analysis and provide users with personalized financial planning tools, real-time market news, and a suite of financial calculators.

---

## 💡 The Core Innovation: AI-Driven Stock Ranking

While this repository contains the frontend, its primary purpose is to serve as the user interface for a unique backend model. The core innovation of this project is a proprietary stock analysis model that uses:

1.  **Elo Rating System:** Traditionally used for games like chess, this system is adapted to rank stocks against each other based on performance.
2.  **Reinforcement Learning (RL):** An RL agent is used to dynamically adjust the Elo rating parameters, allowing the system to learn and adapt to changing market conditions.

This creates a dynamic, self-improving ranking system that goes beyond traditional static analysis.

---

## ✨ Key Features

*   **Multi-Step AI Financial Planner:** A guided wizard that collects user data on income, expenses, and goals to generate a personalized financial plan.
*   **Comprehensive News Dashboard:** Aggregates global and financial news, with features for a user-managed watchlist and a view of trending stocks.
*   **Suite of Financial Tools:** A collection of calculators for retirement, loans, investments, and more.
*   **Interactive Stock Charting:** Visualizes historical stock data for analysis.
*   **Secure User Authentication:** Full auth flow (Register, Login, Password Reset) managed by Supabase Auth.
*   **Modern & Responsive UI:** Built with a focus on a clean, intuitive, and accessible user experience.

---

## 🛠️ Tech Stack & Architecture

This project leverages a modern, scalable, and type-safe technology stack.

*   **Framework:** **React** with **Vite** for a blazing-fast development environment and optimized builds.
*   **Language:** **TypeScript** for end-to-end type safety.
*   **Backend-as-a-Service (BaaS):** **Supabase** for the PostgreSQL database, user authentication, and serverless functions that run the AI models.
*   **Styling:** **Tailwind CSS** for a utility-first styling workflow.
*   **UI Components:** Built with **shadcn/ui**, providing a set of accessible, composable, and beautifully designed components.
*   **Data Fetching:** Integration with external APIs like Alpha Vantage and NewsAPI for real-time financial data.
*   **State Management:** React Context API for managing global state (Authentication, Planner Data, Watchlist).

---

## 🏁 Getting Started

To run this project locally, you will need to set up the Supabase backend first.

### Prerequisites

*   Node.js (v18.x or later) and `npm` or `bun`.
*   A Supabase account ([supabase.com](https://supabase.com/)).

### Installation & Running Locally

1.  **Set Up Supabase:**
    *   Create a new project on your Supabase dashboard.
    *   Use the SQL editor to set up your database schema (tables for users, stocks, etc.).
    *   (Optional) Set up Supabase Functions if your AI/RL model runs there.

2.  **Clone the Frontend Repository:**
    ```sh
    git clone https://github.com/iamsjeevan/finance-advisory-platform.git
    cd finance-advisory-platform
    ```

3.  **Install Dependencies:**
    ```sh
    npm install
    ```
    *(or `bun install` if you are using Bun)*

4.  **Set Up Environment Variables:**
    Create a `.env.local` file in the project's root directory. You need to add your Supabase project URL and Anon Key. You can find these in your Supabase project's "API Settings".
    ```
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

5.  **Run the Development Server:**
    ```sh
    npm run dev
    ```
    The application should now be running on `http://localhost:5173`.

---

## 📧 Contact

Jeevan S. - [iamsjeevan@gmail.com](mailto:iamsjeevan@gmail.com)

Project Link: [https://github.com/iamsjeevan/finance-advisory-platform](https://github.com/iamsjeevan/finance-advisory-platform)