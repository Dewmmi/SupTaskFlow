# SupTaskFlow - Collaborative Kanban Application
SupTaskFlow is a full-stack task management platform built with React and Strapi. It allows users to create personalized boards, manage columns, and organize tasks with an intuitive Kanban interface.

# Technical Stack
- Frontend: React with Vite for fast builds and React Router for seamless navigation.
- Backend: Strapi (Headless CMS) to manage API logic and user authentication.
- Database: SQLite for lightweight, efficient data storage.

# Data Architecture & Relations
## The project is built on 4 main collection types with a relational hierarchy
- User: Can own multiple Boards.
- Board: Acts as the parent container for multiple Columns.
- Column: Contains multiple task Cards.
- Card: The individual task unit containing a title, description, due date, and labels (JSON format).

# Installation & Setup
Prerequisites

Node.js and npm must be installed on your system.

1. Backend Setup (Strapi)
Navigate to the backend directory and start the server:
cd sup-task-flow/backend
npm install
npm run develop
(Note: If develop fails, try npm run dev).

2. Frontend Setup (React)
Open a new terminal, navigate to the frontend directory, and start the application:

Bash
cd sup-task-flow
npm install
npm run dev

# User Guide
- Authentication: Create a new account via the Sign up page or log in with existing credentials.
- Board Management: Create multiple boards to separate different projects.
- Task Organization: Inside a board, create columns (e.g., To Do, In Progress, Done) and add cards to them.
- Card Details: Edit cards to add descriptions, set deadlines (due dates), and attach labels for better organization.
