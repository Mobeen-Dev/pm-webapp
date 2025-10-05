# 📚 PM WebApp - Project Management Knowledge Hub

> A comprehensive full-stack web application for project management professionals, featuring an extensive knowledge base with PMBOK, Agile methodologies, and leadership resources.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-purple.svg)](https://vitejs.dev/)

---

## 🌟 Features

- **📖 Interactive Knowledge Base** - Browse PMBOK, Agile Practices, and Leadership resources
- **🔍 Advanced Search** - Find relevant books, methodologies, and guides instantly
- **📱 Responsive Design** - Seamless experience across all devices
- **⚡ Blazing Fast** - Built with modern technologies for optimal performance
- **🎨 Beautiful UI/UX** - Clean, intuitive interface with smooth animations

---

## 📁 Project Structure

```
pm-webapp/
│
├── Backend/                 # Python backend server
│   ├── server.py           # Main server entry point
│   ├── .env                # Environment configuration (create this)
│   ├── requirements.txt    # Python dependencies
│   └── ...
│
│ # React frontend application
│
├── src/               # Source files
├── public/            # Static assets
├── package.json       # Node.js dependencies
├── vite.config.js     # Vite configuration
├── ...
│
└── README.md              # You are here!
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 14+** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download Git](https://git-scm.com/)

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mobeen-Dev/pm-webapp.git
cd pm-webapp
```

---

## 🐍 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd Backend
```

### Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# macOS/Linux:
source venv/bin/activate
```

> 💡 **Tip:** You'll see `(venv)` in your terminal when the virtual environment is active.

### Step 3: Configure Environment Variables

Create a `.env` file in the `Backend` directory:

```bash
touch .env  # macOS/Linux
# or create manually on Windows
```

Add the following configuration:

```env
PORT=5000
DEBUG=True
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the Backend Server

```bash
python server.py
```

✅ Backend should now be running at `http://localhost:5000`

---

## 🌐 Frontend Setup

**Open a new terminal window** and navigate to the project root.

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment (Optional)

Create a `.env` file in the root directory if you need custom configuration:

```env
VITE_API_URL=http://localhost:5000
```

### Step 3: Start Development Server

```bash
npm run dev
```

✅ Frontend should now be running at `http://localhost:5173`

---

## 🌍 Access the Application

Once both servers are running:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [http://localhost:5173](http://localhost:5173) | React application |
| **Backend API** | [http://localhost:5000](http://localhost:5000) | Python server |

---

## 🛠️ Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
python server.py     # Start the server
```

---

## 📦 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Router** - Client-side routing

### Backend
- **Python 3.8+** - Backend language
- **Flask/FastAPI** - Web framework (specify your choice)
- **SQLAlchemy** - Database ORM (if applicable)

---

## 🔧 Configuration < Contributers Only >

### CORS Setup

The backend needs CORS enabled to communicate with the frontend. Ensure your backend includes:

```python
# Example for Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
```

### Port Configuration

If ports `5000` or `5173` are already in use:

**Backend:** Change `PORT` in `Backend/.env`

**Frontend:** Modify `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000  // Your preferred port
  }
})
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** `Module not found` errors in Python
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**Issue:** Frontend can't connect to backend
- Check if backend is running on the correct port
- Verify CORS is enabled in the backend
- Ensure `VITE_API_URL` points to the correct backend URL

**Issue:** Port already in use
```bash
# Kill process on port 5000 (example)
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Mobeen Dev**

- GitHub: [@Mobeen-Dev](https://github.com/Mobeen-Dev)
- Project Link: [https://github.com/Mobeen-Dev/pm-webapp](https://github.com/Mobeen-Dev/pm-webapp)

---

## 🙏 Acknowledgments

- PMBOK Guide for project management standards
- Agile community for methodology resources
- All contributors who help improve this project

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/Mobeen-Dev/pm-webapp/issues)
3. Create a new issue with detailed information

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Mobeen Dev](https://github.com/Mobeen-Dev)

</div>