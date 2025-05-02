📄 README.md

# NCALayer Django Project

This Django-based project integrates with Kazakhstan's **NCALayer** to enable electronic digital signature (EDS) login and secure document workflows.

---

## 🚀 Features

- ЭЦП (EDS) login via NCALayer
- Role-based user access (Admin, User, Compliance)
- Document upload, comment, and approval workflows
- GOST-compliant digital signature
- Admin panel access for user and document management

---

## 🛠️ Getting Started

### 🔁 Clone and Run Locally

```bash
git clone https://github.com/madeenaa/ncalayer.git
cd ncalayer
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Then open: http://127.0.0.1:8000/

To access the admin panel:
http://127.0.0.1:8000/admin/

⸻

## 🧩 Project Structure

ncalayer/
├── manage.py
├── project/        # Django settings, URLs, WSGI/ASGI
├── app/            # App logic
├── documents/      # Document upload and approval logic
├── ncalogin/       # EDS-based login via NCALayer
├── users/          # Custom user models and roles
├── templates/      # HTML templates
├── static/         # JS, CSS, etc.
├── media/          # Uploaded files
└── venv/           # Virtual environment (excluded in .gitignore)



⸻

## ⚙️ Requirements
	•	Python 3.10+
	•	Django 5.1
	•	NCALayer (running at wss://127.0.0.1:13579/)

⸻

## 📄 License

MIT License — feel free to use, modify, and distribute.