# AI_Developer_Assistant_Backend & Frontend – Fullstack LLM Chatbot

## 📚 Overview

**AI Dev Assistant** is a full-stack web application that allows users to interact with a Large Language Model (LLM) through a minimal, like ChatGPT-style interface. Built with React, Express, and LangChain, this app integrates to LLM model mistral from Ollama, answer natural language queries. All interactions are stored in a MySQL database for logging purposes.

> This project is part of a fullstack take-home assessment. It demonstrates LLM integration, clean API design, full-stack architecture, and optional Docker + DB implementation.

---
## ✅ Features
- Minimal chat UI (like ChatGPT)

- Chat history display (oldest → newest)

- Works seamlessly with backend via /api/query and /api/getchatlog

- LLM powered by Mistral via Ollama

---
## 🔗 Backend Repository & Additional Details 
For more information about the app architecture, backend setup, and API documentation, please visit:

👉[Backend](https://github.com/miwgu/AI_Developer_Assistant_Backend)

---

## ⚙️ Frontend Setup Instructions

1. Clone the Backend Repository
```bash
git clone https://github.com/miwgu/AI_Developer_Assistant_Frontend.git
```
2. Install Dependencies
```bash
npm install
``` 
---

## 🌍Enviroment file
- Add a .env file in the project root
- change settings for Docker or Local 

```bash
#local
#VITE_BACKEND_URL=http://localhost:3000
#Docker
VITE_BACKEND_URL=http://localhost:3001
``` 


## 🐳Docker Container Setup for `aida-frontend`

1. Create Custom Docker Network (only need once)
```bash
sudo docker network create --subnet=172.25.0.0/24 aida-net
docker network ls
docker inspect fwk-net
```
2. Build the Frontend Image
```bash
docker build -t aida-frontend .
```
3. Run the Container
```bash
docker stop aida-front
docker rm aida-front
docker run --name aida-front --network aida-net -p 4173:4173 -d aida-frontend
```
4. Access the App
http://localhost:4173/
