from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for demo (replace with database in production)
restaurants = [
    {
        "id": 1,
        "name": "Italian Delight",
        "cuisine": "Italian",
        "description": "Authentic Italian cuisine"
    },
    {
        "id": 2,
        "name": "Sushi Paradise",
        "cuisine": "Japanese",
        "description": "Fresh sushi and Japanese specialties"
    }
]

menus = {
    1: [
        {"id": 1, "name": "Margherita Pizza", "description": "Classic tomato and mozzarella", "price": 12.99, "category": "Main"},
        {"id": 2, "name": "Pasta Carbonara", "description": "Creamy pasta with bacon", "price": 14.99, "category": "Main"},
        {"id": 3, "name": "Tiramisu", "description": "Classic Italian dessert", "price": 6.99, "category": "Dessert"}
    ],
    2: [
        {"id": 4, "name": "Salmon Nigiri", "description": "Fresh salmon on rice", "price": 8.99, "category": "Sushi"},
        {"id": 5, "name": "Dragon Roll", "description": "Eel and avocado roll", "price": 15.99, "category": "Sushi"},
        {"id": 6, "name": "Miso Soup", "description": "Traditional Japanese soup", "price": 4.99, "category": "Appetizer"}
    ]
}

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "timestamp": datetime.now().isoformat()})

@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    return jsonify(restaurants)

@app.route('/api/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = next((r for r in restaurants if r['id'] == restaurant_id), None)
    if restaurant:
        return jsonify(restaurant)
    return jsonify({"error": "Restaurant not found"}), 404

@app.route('/api/restaurants', methods=['POST'])
def create_restaurant():
    data = request.json
    new_restaurant = {
        "id": len(restaurants) + 1,
        "name": data.get('name'),
        "cuisine": data.get('cuisine'),
        "description": data.get('description')
    }
    restaurants.append(new_restaurant)
    menus[new_restaurant['id']] = []
    return jsonify(new_restaurant), 201

@app.route('/api/restaurants/<int:restaurant_id>/menu', methods=['GET'])
def get_menu(restaurant_id):
    if restaurant_id not in menus:
        return jsonify({"error": "Restaurant not found"}), 404
    return jsonify(menus[restaurant_id])

@app.route('/api/restaurants/<int:restaurant_id>/menu', methods=['POST'])
def add_menu_item(restaurant_id):
    if restaurant_id not in menus:
        return jsonify({"error": "Restaurant not found"}), 404
    
    data = request.json
    new_item = {
        "id": max([item['id'] for menu_items in menus.values() for item in menu_items], default=0) + 1,
        "name": data.get('name'),
        "description": data.get('description'),
        "price": data.get('price'),
        "category": data.get('category')
    }
    menus[restaurant_id].append(new_item)
    return jsonify(new_item), 201

@app.route('/api/restaurants/<int:restaurant_id>/menu/<int:item_id>', methods=['PUT'])
def update_menu_item(restaurant_id, item_id):
    if restaurant_id not in menus:
        return jsonify({"error": "Restaurant not found"}), 404
    
    menu = menus[restaurant_id]
    item = next((i for i in menu if i['id'] == item_id), None)
    
    if not item:
        return jsonify({"error": "Menu item not found"}), 404
    
    data = request.json
    item.update({
        "name": data.get('name', item['name']),
        "description": data.get('description', item['description']),
        "price": data.get('price', item['price']),
        "category": data.get('category', item['category'])
    })
    return jsonify(item)

@app.route('/api/restaurants/<int:restaurant_id>/menu/<int:item_id>', methods=['DELETE'])
def delete_menu_item(restaurant_id, item_id):
    if restaurant_id not in menus:
        return jsonify({"error": "Restaurant not found"}), 404
    
    menu = menus[restaurant_id]
    item = next((i for i in menu if i['id'] == item_id), None)
    
    if not item:
        return jsonify({"error": "Menu item not found"}), 404
    
    menu.remove(item)
    return jsonify({"message": "Menu item deleted successfully"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
