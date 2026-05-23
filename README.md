# 💖 Crush Detector AI — Beta Edition

> A futuristic cyberpunk prank web app built with Flask. Share with friends, watch them fall for the fake AI compatibility scanner, then hit them with the **GOTCHA** reveal.

![Python](https://img.shields.io/badge/Python-3.10+-blue?style=flat-square)
![Flask](https://img.shields.io/badge/Flask-3.0-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

---

## ✨ Features

- Cyberpunk neon UI with glassmorphism cards
- Animated particle background + floating hearts
- Custom glowing cursor
- Fake AI scanning terminal with live log feed
- Animated progress bar & percentage counter
- Convincing fake compatibility score cards (90–99% range)
- Dramatic GOTCHA reveal screen with random prank messages
- CSV logging of prank entries (`crush_log.csv`)
- Sound toggle (plug in `.mp3` files to `static/sounds/`)
- Fully mobile-responsive
- Deploy-ready for Render, Railway, PythonAnywhere

---

## 📁 Project Structure

```
crush-ai-web/
├── app.py               # Flask backend
├── requirements.txt
├── README.md
├── .gitignore
├── crush_log.csv        # Auto-created on first run
├── templates/
│   ├── index.html       # Input / landing page
│   ├── loading.html     # Fake AI scan screen
│   ├── results.html     # Fake compatibility results
│   └── prank.html       # GOTCHA reveal
└── static/
    ├── style.css        # All styles (cyberpunk theme)
    ├── script.js        # Cursor, hearts, sound toggle
    ├── particles.js     # Canvas particle system
    ├── sounds/          # Drop click.mp3 here (optional)
    └── images/          # Optional bg/logo assets
```

---

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/crush-ai-web.git
cd crush-ai-web
```

### 2. Create a virtual environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
python app.py
```

Visit `http://localhost:5000` in your browser.

---

## 🌐 GitHub Upload

```bash
git init
git add .
git commit -m "Initial commit — Crush Detector AI Beta Edition"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/crush-ai-web.git
git push -u origin main
```

---

## ☁️ Deploy on Render (Free)

1. Push your code to GitHub (steps above).
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your GitHub repo.
4. Set the following:

| Setting        | Value                         |
|----------------|-------------------------------|
| Build Command  | `pip install -r requirements.txt` |
| Start Command  | `gunicorn app:app`            |
| Environment    | Python 3                      |

5. Add an Environment Variable:
   - `SECRET_KEY` → any random string

6. Click **Deploy**. Done! 🎉

---

## 🚂 Deploy on Railway

1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub.
2. Select your repo.
3. Railway auto-detects Flask. Set start command: `gunicorn app:app`
4. Add env var: `SECRET_KEY=your_secret`
5. Click **Deploy**.

---

## 🐍 Deploy on PythonAnywhere

1. Upload project files via the **Files** tab or `git clone`.
2. In **Web** tab → Add new web app → Flask.
3. Set source code directory and WSGI file to point to `app.py`.
4. Install deps in a virtualenv: `pip install -r requirements.txt`
5. Reload the web app.

---

## 🔊 Adding Sound Effects

Drop `.mp3` files into `static/sounds/`:
- `click.mp3` — plays when Detect button is clicked
- `suspense.mp3` — loading screen background music (optional)
- `prank.mp3` — plays on the GOTCHA reveal (optional)

Free sounds: [freesound.org](https://freesound.org) | [zapsplat.com](https://zapsplat.com)

---

## 📋 Viewing Prank Logs

Visit `/logs` in your browser to download `crush_log.csv`.

Columns: `Timestamp`, `User Name`, `Crush Name`

---

## ⚠️ Note

This is a **harmless prank** app for fun with friends. No real AI is used — scores are randomly generated. Share responsibly and only prank people who'll laugh about it!

---

Made with 💖 and way too much neon CSS.
# lallntop
