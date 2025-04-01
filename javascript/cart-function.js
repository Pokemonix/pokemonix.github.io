// cart.js
const cart = {
  items: [],

  // Load cart from localStorage
  load: function () {
    const savedCart = localStorage.getItem("pokemonixCart");
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
    this.updateCartCount();
    return this.items;
  },

  // Save cart to localStorage
  save: function () {
    localStorage.setItem("pokemonixCart", JSON.stringify(this.items));
    this.updateCartCount();
  },

  // Add item to cart
  addItem: function (id, name, price, image, quantity = 1) {
    // Check if item already exists
    const existingItem = this.items.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id,
        name,
        price,
        image,
        quantity,
      });
    }

    this.save();
    this.updateCartCount();
  },

  // Remove item from cart
  removeItem: function (id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.save();
    this.updateCartCount();
  },

  // Update quantity of an item
  updateQuantity: function (id, quantity) {
    const item = this.items.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.save();
      }
    }
  },

  // Calculate total
  calculateTotal: function () {
    return this.items
      .reduce((total, item) => {
        return total + parseFloat(item.price.replace("$", "")) * item.quantity;
      }, 0)
      .toFixed(2);
  },

  // Update cart count display
  updateCartCount: function () {
    const cartCountElements = document.querySelectorAll(".cart-item-count");
    const itemCount = this.items.reduce(
      (count, item) => count + item.quantity,
      0
    );

    cartCountElements.forEach((element) => {
      element.textContent = itemCount > 0 ? itemCount : "";
    });
  },
};

// Initialize cart when page loads
document.addEventListener("DOMContentLoaded", function () {
  cart.load();
});
