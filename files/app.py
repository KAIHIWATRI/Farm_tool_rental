import os
import uuid
from datetime import datetime
from functools import wraps

from flask import (Flask, render_template, request, redirect, url_for,
                   session, flash, send_from_directory)
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import sqlite3

app = Flask(__name__)
app.secret_key = "farm_rental_secret_2024"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "farm_rental.db")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "webp"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


# ──────────────────────────────────────────────
# DATABASE
# ──────────────────────────────────────────────

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT    NOT NULL UNIQUE,
            email    TEXT    NOT NULL UNIQUE,
            password TEXT    NOT NULL,
            role     TEXT    NOT NULL DEFAULT 'user',
            created  TEXT    NOT NULL
        )
    """)

    c.execute("""
        CREATE TABLE IF NOT EXISTS tools (
            id             INTEGER PRIMARY KEY AUTOINCREMENT,
            name           TEXT    NOT NULL,
            name_ta        TEXT,
            description    TEXT,
            description_ta TEXT,
            price          REAL    NOT NULL DEFAULT 0,
            quantity       INTEGER NOT NULL DEFAULT 0,
            image          TEXT,
            enabled        INTEGER NOT NULL DEFAULT 1,
            created        TEXT    NOT NULL
        )
    """)
    # Migrate existing DB – add Tamil columns if missing
    existing_cols = [row[1] for row in c.execute("PRAGMA table_info(tools)").fetchall()]
    if "name_ta" not in existing_cols:
        c.execute("ALTER TABLE tools ADD COLUMN name_ta TEXT")
    if "description_ta" not in existing_cols:
        c.execute("ALTER TABLE tools ADD COLUMN description_ta TEXT")

    c.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id    INTEGER NOT NULL,
            tool_id    INTEGER NOT NULL,
            phone      TEXT    NOT NULL,
            address    TEXT    NOT NULL,
            book_date  TEXT    NOT NULL,
            book_time  TEXT    NOT NULL,
            status     TEXT    NOT NULL DEFAULT 'pending',
            created    TEXT    NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(tool_id) REFERENCES tools(id)
        )
    """)

    # Default admin
    admin_exists = c.execute(
        "SELECT id FROM users WHERE role='admin' LIMIT 1"
    ).fetchone()
    if not admin_exists:
        c.execute(
            "INSERT INTO users (username,email,password,role,created) VALUES (?,?,?,?,?)",
            ("admin", "admin@farm.com",
             generate_password_hash("admin123"),
             "admin", datetime.now().isoformat())
        )

    conn.commit()
    conn.close()


# ──────────────────────────────────────────────
# HELPERS
# ──────────────────────────────────────────────

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if "user_id" not in session:
            flash("Please log in first.", "warning")
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated


def admin_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get("role") != "admin":
            flash("Admin access required.", "danger")
            return redirect(url_for("dashboard"))
        return f(*args, **kwargs)
    return decorated


# ──────────────────────────────────────────────
# AUTH
# ──────────────────────────────────────────────

@app.route("/")
def index():
    if "user_id" in session:
        return redirect(url_for("dashboard"))
    return redirect(url_for("login"))


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        email    = request.form.get("email", "").strip()
        password = request.form.get("password", "")

        if not username or not email or not password:
            flash("All fields are required.", "danger")
            return render_template("register.html")

        conn = get_db()
        existing = conn.execute(
            "SELECT id FROM users WHERE username=? OR email=?", (username, email)
        ).fetchone()
        if existing:
            conn.close()
            flash("Username or email already taken.", "danger")
            return render_template("register.html")

        conn.execute(
            "INSERT INTO users (username,email,password,role,created) VALUES (?,?,?,?,?)",
            (username, email, generate_password_hash(password),
             "user", datetime.now().isoformat())
        )
        conn.commit()
        conn.close()
        flash("Registration successful! Please log in.", "success")
        return redirect(url_for("login"))

    return render_template("register.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username", "").strip()
        password = request.form.get("password", "")

        conn = get_db()
        user = conn.execute(
            "SELECT * FROM users WHERE username=?", (username,)
        ).fetchone()
        conn.close()

        if user and check_password_hash(user["password"], password):
            session["user_id"] = user["id"]
            session["username"] = user["username"]
            session["role"] = user["role"]
            flash(f"Welcome back, {user['username']}!", "success")
            return redirect(url_for("dashboard"))

        flash("Invalid username or password.", "danger")

    return render_template("login.html")


@app.route("/logout", methods=["GET", "POST"])
def logout():
    session.clear()
    flash("You have been logged out.", "info")
    return redirect(url_for("login"))


# ──────────────────────────────────────────────
# DASHBOARD
# ──────────────────────────────────────────────

@app.route("/dashboard")
@login_required
def dashboard():
    conn = get_db()

    if session["role"] == "admin":
        tools    = conn.execute("SELECT * FROM tools ORDER BY created DESC").fetchall()
        bookings = conn.execute("""
            SELECT b.*, u.username, t.name as tool_name, t.name_ta as tool_name_ta
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            JOIN tools  t ON b.tool_id  = t.id
            ORDER BY b.created DESC
        """).fetchall()
        stats = {
            "total_tools":    conn.execute("SELECT COUNT(*) FROM tools").fetchone()[0],
            "total_bookings": conn.execute("SELECT COUNT(*) FROM bookings").fetchone()[0],
            "pending":        conn.execute("SELECT COUNT(*) FROM bookings WHERE status='pending'").fetchone()[0],
            "total_users":    conn.execute("SELECT COUNT(*) FROM users WHERE role='user'").fetchone()[0],
        }
        conn.close()
        return render_template("admin_dashboard.html",
                               tools=tools, bookings=bookings, stats=stats)

    # Regular user
    tools = conn.execute(
        "SELECT * FROM tools WHERE enabled=1 ORDER BY created DESC"
    ).fetchall()
    conn.close()
    return render_template("dashboard.html", tools=tools)


# ──────────────────────────────────────────────
# TOOL MANAGEMENT (admin)
# ──────────────────────────────────────────────

@app.route("/admin/tool/add", methods=["GET", "POST"])
@login_required
@admin_required
def add_tool():
    if request.method == "POST":
        name        = request.form.get("name", "").strip()
        description = request.form.get("description", "").strip()
        price       = request.form.get("price", 0)
        quantity    = request.form.get("quantity", 0)
        image_name  = None

        if not name:
            flash("Tool name is required.", "danger")
            return render_template("edit_tool.html", tool=None)

        file = request.files.get("image")
        if file and file.filename and allowed_file(file.filename):
            ext        = file.filename.rsplit(".", 1)[1].lower()
            image_name = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], image_name))

        conn = get_db()
        name_ta        = request.form.get("name_ta", "").strip()
        description_ta = request.form.get("description_ta", "").strip()
        conn.execute(
            "INSERT INTO tools (name,name_ta,description,description_ta,price,quantity,image,enabled,created) VALUES (?,?,?,?,?,?,?,1,?)",
            (name, name_ta or None, description, description_ta or None,
             float(price), int(quantity), image_name, datetime.now().isoformat())
        )
        conn.commit()
        conn.close()
        flash("Tool added successfully.", "success")
        return redirect(url_for("dashboard"))

    return render_template("edit_tool.html", tool=None)


@app.route("/admin/tool/edit/<int:tool_id>", methods=["GET", "POST"])
@login_required
@admin_required
def edit_tool(tool_id):
    conn = get_db()
    tool = conn.execute("SELECT * FROM tools WHERE id=?", (tool_id,)).fetchone()
    if not tool:
        conn.close()
        flash("Tool not found.", "danger")
        return redirect(url_for("dashboard"))

    if request.method == "POST":
        name        = request.form.get("name", "").strip()
        description = request.form.get("description", "").strip()
        price       = request.form.get("price", 0)
        quantity    = request.form.get("quantity", 0)
        image_name  = tool["image"]

        file = request.files.get("image")
        if file and file.filename and allowed_file(file.filename):
            # Remove old image
            if image_name:
                old_path = os.path.join(app.config["UPLOAD_FOLDER"], image_name)
                if os.path.exists(old_path):
                    os.remove(old_path)
            ext        = file.filename.rsplit(".", 1)[1].lower()
            image_name = f"{uuid.uuid4().hex}.{ext}"
            file.save(os.path.join(app.config["UPLOAD_FOLDER"], image_name))

        name_ta        = request.form.get("name_ta", "").strip()
        description_ta = request.form.get("description_ta", "").strip()
        conn.execute(
            "UPDATE tools SET name=?,name_ta=?,description=?,description_ta=?,price=?,quantity=?,image=? WHERE id=?",
            (name, name_ta or None, description, description_ta or None,
             float(price), int(quantity), image_name, tool_id)
        )
        conn.commit()
        conn.close()
        flash("Tool updated successfully.", "success")
        return redirect(url_for("dashboard"))

    conn.close()
    return render_template("edit_tool.html", tool=tool)


@app.route("/admin/tool/delete/<int:tool_id>", methods=["POST"])
@login_required
@admin_required
def delete_tool(tool_id):
    conn = get_db()
    tool = conn.execute("SELECT * FROM tools WHERE id=?", (tool_id,)).fetchone()
    if tool:
        if tool["image"]:
            img_path = os.path.join(app.config["UPLOAD_FOLDER"], tool["image"])
            if os.path.exists(img_path):
                os.remove(img_path)
        conn.execute("DELETE FROM tools WHERE id=?", (tool_id,))
        conn.commit()
    conn.close()
    flash("Tool deleted.", "info")
    return redirect(url_for("dashboard"))


@app.route("/admin/tool/toggle/<int:tool_id>", methods=["POST"])
@login_required
@admin_required
def toggle_tool(tool_id):
    conn = get_db()
    tool = conn.execute("SELECT * FROM tools WHERE id=?", (tool_id,)).fetchone()
    if tool:
        conn.execute(
            "UPDATE tools SET enabled=? WHERE id=?",
            (0 if tool["enabled"] else 1, tool_id)
        )
        conn.commit()
    conn.close()
    return redirect(url_for("dashboard"))


# ──────────────────────────────────────────────
# BOOKINGS
# ──────────────────────────────────────────────

@app.route("/book/<int:tool_id>", methods=["GET", "POST"])
@login_required
def book_tool(tool_id):
    conn = get_db()
    tool = conn.execute(
        "SELECT * FROM tools WHERE id=? AND enabled=1", (tool_id,)
    ).fetchone()
    if not tool:
        conn.close()
        flash("Tool not available.", "danger")
        return redirect(url_for("dashboard"))

    if request.method == "POST":
        phone   = request.form.get("phone", "").strip()
        address = request.form.get("address", "").strip()
        date    = request.form.get("book_date", "").strip()
        time    = request.form.get("book_time", "").strip()

        if not all([phone, address, date, time]):
            flash("All fields are required.", "danger")
            return render_template("booking.html", tool=tool)

        # FIFO: if quantity > 0 → pending (admin will approve → reduce qty)
        # if quantity = 0 → queued
        status = "pending" if tool["quantity"] > 0 else "queued"

        conn.execute(
            "INSERT INTO bookings (user_id,tool_id,phone,address,book_date,book_time,status,created) VALUES (?,?,?,?,?,?,?,?)",
            (session["user_id"], tool_id, phone, address, date, time,
             status, datetime.now().isoformat())
        )
        conn.commit()
        conn.close()

        if status == "queued":
            flash("Tool is currently unavailable. You've been added to the queue!", "warning")
        else:
            flash("Booking request submitted! Awaiting admin approval.", "success")
        return redirect(url_for("history"))

    conn.close()
    return render_template("booking.html", tool=tool)


@app.route("/history")
@login_required
def history():
    conn = get_db()
    bookings = conn.execute("""
        SELECT b.*, t.name as tool_name, t.name_ta as tool_name_ta,
               t.image as tool_image, t.price as tool_price
        FROM bookings b
        JOIN tools t ON b.tool_id = t.id
        WHERE b.user_id = ?
        ORDER BY b.created DESC
    """, (session["user_id"],)).fetchall()
    conn.close()
    return render_template("history.html", bookings=bookings)


@app.route("/admin/booking/approve/<int:booking_id>", methods=["POST"])
@login_required
@admin_required
def approve_booking(booking_id):
    conn = get_db()
    booking = conn.execute(
        "SELECT * FROM bookings WHERE id=?", (booking_id,)
    ).fetchone()

    if booking and booking["status"] in ("pending", "queued"):
        tool = conn.execute(
            "SELECT * FROM tools WHERE id=?", (booking["tool_id"],)
        ).fetchone()

        if tool and tool["quantity"] > 0:
            conn.execute(
                "UPDATE tools SET quantity = quantity - 1 WHERE id=?",
                (booking["tool_id"],)
            )
            conn.execute(
                "UPDATE bookings SET status='approved' WHERE id=?", (booking_id,)
            )
            conn.commit()
            flash("Booking approved and quantity reduced.", "success")
        else:
            # Mark as queued if no stock
            conn.execute(
                "UPDATE bookings SET status='queued' WHERE id=?", (booking_id,)
            )
            conn.commit()
            flash("No stock available. Booking marked as queued.", "warning")

    conn.close()
    return redirect(url_for("dashboard"))


@app.route("/admin/booking/reject/<int:booking_id>", methods=["POST"])
@login_required
@admin_required
def reject_booking(booking_id):
    conn = get_db()
    conn.execute(
        "UPDATE bookings SET status='rejected' WHERE id=?", (booking_id,)
    )
    conn.commit()
    conn.close()
    flash("Booking rejected.", "info")
    return redirect(url_for("dashboard"))


# ──────────────────────────────────────────────
# STATIC FILES
# ──────────────────────────────────────────────

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# ──────────────────────────────────────────────
# MAIN
# ──────────────────────────────────────────────

import os

if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 10000)))
