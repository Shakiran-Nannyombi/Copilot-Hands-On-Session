# 🚀 Quick Setup Guide - Lets-Eat

## Option 1: Automated Setup (Recommended)

Run the start script from the project root:

```bash
cd lets-Eat
./start.sh
```

This will:
- Set up Python virtual environment (if needed)
- Install all dependencies (if needed)
- Start both backend and frontend servers
- Open the app automatically

## Option 2: Manual Setup

### Backend Setup

```bash
cd lets-Eat/backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python app.py
```

Backend will be available at: **http://localhost:5000**

### Frontend Setup

Open a new terminal:

```bash
cd lets-Eat/frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend will be available at: **http://localhost:3000**

## 🎯 Access the Application

Once both servers are running, open your browser and go to:

**http://localhost:3000**

## 📋 What You Can Do

1. **Create Restaurants** - Click "+ Add" in the sidebar
2. **Add Menu Items** - Select a restaurant and click "+ Add Item"
3. **Edit Items** - Click the edit icon (✏️) on any menu item
4. **Delete Items** - Click the delete icon (🗑️) on any menu item
5. **Organize by Category** - Use categories like Appetizer, Main, Dessert, etc.

## 🛑 Stopping the Servers

- If using `start.sh`: Press **Ctrl+C**
- If manual setup: Press **Ctrl+C** in each terminal window

## 📝 Sample Data

The app comes pre-loaded with:
- 2 sample restaurants (Italian Delight, Sushi Paradise)
- 6 sample menu items

Feel free to modify or delete them!

## 🔧 Troubleshooting

**Port already in use?**
- Backend: Change port in `backend/app.py` (line: `app.run(..., port=5000)`)
- Frontend: Change port in `frontend/vite.config.js` (line: `port: 3000`)

**Dependencies not installing?**
- Backend: Ensure Python 3.8+ is installed
- Frontend: Ensure Node.js v16+ is installed

**CORS errors?**
- The backend already has CORS enabled via `flask-cors`
- If issues persist, check that backend is running on port 5000

## 🎨 Customization

- **Colors**: Edit gradient colors in `frontend/src/App.vue` (search for `#667eea` and `#764ba2`)
- **API URL**: Change proxy settings in `frontend/vite.config.js`
- **Sample Data**: Modify the initial data in `backend/app.py`

Enjoy building your restaurant menus! 🍽️
