<template>
  <div class="app">
    <header class="header">
      <h1>🍽️ Lets-Eat</h1>
      <p>Restaurant Menu Designer</p>
    </header>

    <main class="container">
      <div class="sidebar">
        <div class="section-header">
          <h2>Restaurants</h2>
          <button @click="showAddRestaurant = true" class="btn-primary">+ Add</button>
        </div>
        
        <div class="restaurant-list">
          <div 
            v-for="restaurant in restaurants" 
            :key="restaurant.id"
            @click="selectRestaurant(restaurant)"
            :class="['restaurant-card', { active: selectedRestaurant?.id === restaurant.id }]"
          >
            <h3>{{ restaurant.name }}</h3>
            <p>{{ restaurant.cuisine }}</p>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div v-if="selectedRestaurant">
          <div class="section-header">
            <div>
              <h2>{{ selectedRestaurant.name }} Menu</h2>
              <p class="subtitle">{{ selectedRestaurant.description }}</p>
            </div>
            <button @click="showAddItem = true" class="btn-primary">+ Add Item</button>
          </div>

          <div v-if="menuItems.length === 0" class="empty-state">
            <p>No menu items yet. Click "Add Item" to create your first dish!</p>
          </div>

          <div class="menu-grid">
            <div v-for="item in menuItems" :key="item.id" class="menu-item">
              <div class="item-content">
                <div class="item-header">
                  <span class="category-badge">{{ item.category }}</span>
                  <div class="item-actions">
                    <button @click="editItem(item)" class="btn-icon">✏️</button>
                    <button @click="deleteItem(item)" class="btn-icon">🗑️</button>
                  </div>
                </div>
                <h3>{{ item.name }}</h3>
                <p class="item-description">{{ item.description }}</p>
                <p class="item-price">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <h2>Welcome to Lets-Eat! 👋</h2>
          <p>Select a restaurant from the sidebar or create a new one to start designing menus.</p>
        </div>
      </div>
    </main>

    <!-- Add Restaurant Modal -->
    <div v-if="showAddRestaurant" class="modal" @click.self="showAddRestaurant = false">
      <div class="modal-content">
        <h2>Add New Restaurant</h2>
        <form @submit.prevent="addRestaurant">
          <input v-model="newRestaurant.name" placeholder="Restaurant Name" required />
          <input v-model="newRestaurant.cuisine" placeholder="Cuisine Type" required />
          <textarea v-model="newRestaurant.description" placeholder="Description" rows="3"></textarea>
          <div class="modal-actions">
            <button type="button" @click="showAddRestaurant = false" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">Add Restaurant</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Add/Edit Menu Item Modal -->
    <div v-if="showAddItem" class="modal" @click.self="closeItemModal">
      <div class="modal-content">
        <h2>{{ editingItem ? 'Edit' : 'Add' }} Menu Item</h2>
        <form @submit.prevent="saveMenuItem">
          <input v-model="currentItem.name" placeholder="Item Name" required />
          <textarea v-model="currentItem.description" placeholder="Description" rows="2" required></textarea>
          <input v-model.number="currentItem.price" type="number" step="0.01" placeholder="Price" required />
          <select v-model="currentItem.category" required>
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main">Main</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
            <option value="Sushi">Sushi</option>
          </select>
          <div class="modal-actions">
            <button type="button" @click="closeItemModal" class="btn-secondary">Cancel</button>
            <button type="submit" class="btn-primary">{{ editingItem ? 'Update' : 'Add' }} Item</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data() {
    return {
      restaurants: [],
      selectedRestaurant: null,
      menuItems: [],
      showAddRestaurant: false,
      showAddItem: false,
      editingItem: null,
      newRestaurant: {
        name: '',
        cuisine: '',
        description: ''
      },
      currentItem: {
        name: '',
        description: '',
        price: 0,
        category: ''
      }
    }
  },
  async mounted() {
    await this.loadRestaurants()
  },
  methods: {
    async loadRestaurants() {
      try {
        const response = await axios.get('/api/restaurants')
        this.restaurants = response.data
      } catch (error) {
        console.error('Error loading restaurants:', error)
        alert('Failed to load restaurants')
      }
    },
    async selectRestaurant(restaurant) {
      this.selectedRestaurant = restaurant
      await this.loadMenu(restaurant.id)
    },
    async loadMenu(restaurantId) {
      try {
        const response = await axios.get(`/api/restaurants/${restaurantId}/menu`)
        this.menuItems = response.data
      } catch (error) {
        console.error('Error loading menu:', error)
        this.menuItems = []
      }
    },
    async addRestaurant() {
      try {
        const response = await axios.post('/api/restaurants', this.newRestaurant)
        this.restaurants.push(response.data)
        this.showAddRestaurant = false
        this.newRestaurant = { name: '', cuisine: '', description: '' }
        this.selectRestaurant(response.data)
      } catch (error) {
        console.error('Error adding restaurant:', error)
        alert('Failed to add restaurant')
      }
    },
    editItem(item) {
      this.editingItem = item
      this.currentItem = { ...item }
      this.showAddItem = true
    },
    async saveMenuItem() {
      try {
        if (this.editingItem) {
          await axios.put(
            `/api/restaurants/${this.selectedRestaurant.id}/menu/${this.editingItem.id}`,
            this.currentItem
          )
        } else {
          await axios.post(
            `/api/restaurants/${this.selectedRestaurant.id}/menu`,
            this.currentItem
          )
        }
        await this.loadMenu(this.selectedRestaurant.id)
        this.closeItemModal()
      } catch (error) {
        console.error('Error saving menu item:', error)
        alert('Failed to save menu item')
      }
    },
    async deleteItem(item) {
      if (!confirm(`Delete "${item.name}"?`)) return
      
      try {
        await axios.delete(`/api/restaurants/${this.selectedRestaurant.id}/menu/${item.id}`)
        await this.loadMenu(this.selectedRestaurant.id)
      } catch (error) {
        console.error('Error deleting item:', error)
        alert('Failed to delete item')
      }
    },
    closeItemModal() {
      this.showAddItem = false
      this.editingItem = null
      this.currentItem = { name: '', description: '', price: 0, category: '' }
    }
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  color: #333;
}

.header {
  background: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #667eea;
}

.header p {
  color: #666;
  font-size: 1.1rem;
}

.container {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.sidebar {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.main-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  min-height: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  color: #333;
  font-size: 1.5rem;
}

.subtitle {
  color: #666;
  margin-top: 0.25rem;
}

.restaurant-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.restaurant-card {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
}

.restaurant-card:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102,126,234,0.2);
}

.restaurant-card.active {
  border-color: #667eea;
  background: linear-gradient(135deg, #667eea15, #764ba215);
}

.restaurant-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #333;
}

.restaurant-card p {
  color: #666;
  font-size: 0.9rem;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.menu-item {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border-color: #667eea;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.category-badge {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.menu-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.item-description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.item-price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-state h2 {
  color: #333;
  margin-bottom: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-primary:hover {
  transform: scale(1.05);
}

.btn-secondary {
  background: #e0e0e0;
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #d0d0d0;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.2);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 400px;
  max-width: 500px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.modal-content h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s;
}

.modal-content input:focus,
.modal-content textarea:focus,
.modal-content select:focus {
  outline: none;
  border-color: #667eea;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.modal-actions button {
  flex: 1;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    min-width: auto;
    margin: 1rem;
  }
}
</style>
