# Lets-Eat - Restaurant Menu Designer

A full-stack application for restaurants to design and manage their digital menus. Built with Vue 3 and Python Flask.

![Restaurant Menu App](https://img.shields.io/badge/Vue-3-brightgreen) ![Python](https://img.shields.io/badge/Python-3.x-blue) ![Flask](https://img.shields.io/badge/Flask-3.0-lightgrey)

## Features

- **Multi-Restaurant Support** - Manage menus for multiple restaurants
- **Beautiful UI** - Modern, gradient-based design with smooth animations
- **CRUD Operations** - Create, Read, Update, Delete restaurants and menu items
- **Category Organization** - Organize menu items by category (Appetizer, Main, Dessert, etc.)
- **Real-time Updates** - Instant feedback on all operations
- **Responsive Design** - Works perfectly on desktop and mobile devices

## Project Structure

```bash
lets-Eat/
├── backend/           # Python Flask API
│   ├── app.py        # Main Flask application
│   ├── requirements.txt
│   └── README.md
├── frontend/         # Vue 3 Application
│   ├── src/
│   │   ├── App.vue   # Main component
│   │   └── main.js   # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
└── README.md         # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

1. Create virtual environment:

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

1. Install dependencies:

```bash
pip install -r requirements.txt
```

1. Run the Flask server:

```bash
python app.py
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

1. Install dependencies:

```bash
npm install
```

1. Run the development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## Usage

1. **Start Both Servers** - Make sure both backend (port 5000) and frontend (port 3000) are running

2. **Add a Restaurant** - Click "+ Add" in the sidebar to create a new restaurant

3. **Design Menu** - Select a restaurant and click "+ Add Item" to add menu items with:
   - Name
   - Description
   - Price
   - Category

4. **Edit/Delete** - Use the edit (✏️) and delete (🗑️) buttons on each menu item

## API Endpoints

### Restaurants

- `GET /api/restaurants` - List all restaurants
- `POST /api/restaurants` - Create restaurant
- `GET /api/restaurants/:id` - Get restaurant details

### Menu Items

- `GET /api/restaurants/:id/menu` - Get restaurant menu
- `POST /api/restaurants/:id/menu` - Add menu item
- `PUT /api/restaurants/:id/menu/:itemId` - Update menu item
- `DELETE /api/restaurants/:id/menu/:itemId` - Delete menu item

## UI Features

- **Gradient Header** - Eye-catching purple gradient design
- **Interactive Cards** - Hover effects and smooth transitions
- **Modal Forms** - Clean forms for adding/editing data
- **Category Badges** - Color-coded badges for menu categories
- **Responsive Grid** - Auto-adjusting layout for all screen sizes

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication
- [ ] Image uploads for menu items
- [ ] Menu templates
- [ ] Export menu as PDF
- [ ] Multi-language support
- [ ] Online ordering integration

## License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Vue 3 and Flask
