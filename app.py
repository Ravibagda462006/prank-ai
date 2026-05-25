"""
Crush Detector AI — Beta Edition
Flask backend: handles routes, fake scoring, and CSV logging.
"""

import csv
import os
import random
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, session, send_file

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "crush-ai-beta-secret-2025")

LOG_FILE = "crush_log.csv"

# ── Ensure CSV exists with headers ──────────────────────────────────────────
def init_csv():
    if not os.path.exists(LOG_FILE):
        with open(LOG_FILE, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Timestamp", "User Name", "Crush Name"])

init_csv()


def save_entry(user_name: str, crush_name: str):
    """Append a new prank entry to the CSV log."""
    with open(LOG_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            user_name,
            crush_name,
        ])


def fake_scores() -> dict:
    """Generate random but convincing-looking compatibility scores (90-99)."""
    return {
        "overall":        random.randint(90, 99),
        "physical":       random.randint(88, 99),
        "mental":         random.randint(87, 99),
        "destiny":        random.randint(89, 99),
        "communication":  random.randint(85, 99),
        "emotional":      random.randint(88, 99),
    }


# ── Routes ───────────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def index():
    """Landing / input screen."""
    return render_template("index.html")


@app.route("/scan", methods=["POST"])
def scan():
    """Accept form data, stash in session, redirect to loading screen."""
    user_name  = request.form.get("user_name", "").strip()
    crush_name = request.form.get("crush_name", "").strip()

    if not user_name or not crush_name:
        return redirect(url_for("index"))

    session["user_name"]  = user_name
    session["crush_name"] = crush_name
    session["scores"]     = fake_scores()
    session["timestamp"]  = datetime.now().strftime("%d %b %Y, %H:%M:%S")

    # Log to CSV immediately
    save_entry(user_name, crush_name)

    return redirect(url_for("loading"))


@app.route("/loading")
def loading():
    """Fake AI scanning / loading screen."""
    if "user_name" not in session:
        return redirect(url_for("index"))
    return render_template("loading.html",
                           user_name=session["user_name"],
                           crush_name=session["crush_name"])


@app.route("/results")
def results():
    """Fake compatibility results screen."""
    if "user_name" not in session:
        return redirect(url_for("index"))
    return render_template("results.html",
                           user_name=session["user_name"],
                           crush_name=session["crush_name"],
                           scores=session["scores"])


@app.route("/prank")
def prank():
    """The big gotcha reveal."""
    if "user_name" not in session:
        return redirect(url_for("index"))
    return render_template("prank.html",
                           user_name=session["user_name"],
                           crush_name=session["crush_name"],
                           timestamp=session.get("timestamp", ""))


@app.route("/logs")
def logs():
    """Download the CSV log file."""
    if os.path.exists(LOG_FILE):
        return send_file(LOG_FILE, as_attachment=True)
    return "No logs yet.", 404


@app.route("/reset")
def reset():
    """Clear session and go back to start."""
    session.clear()
    return redirect(url_for("index"))


# ── Entry point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
app.run(host="0.0.0.0", port=5001, debug=False)    
