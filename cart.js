let cart = [];

// Function to update the cart display (icon and count)
function updateCartDisplay() {
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }
}

// Function to update the hoverable cart popup
function updateCartPopup() {
  const cartPopup = document.querySelector('.cart-popup');
  if (cartPopup) {
    cartPopup.innerHTML = '';
    if (cart.length === 0) {
      cartPopup.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-popup-item');
        itemElement.innerHTML = `
          <p>${item.name} - $${item.price.toFixed(2)}</p>
          <div class="quantity-controls">
            <button onclick="decreaseQuantity('${item.id}')">-</button>
            <span>${item.quantity || 1}</span>
            <button onclick="increaseQuantity('${item.id}')">+</button>
          </div>
          <button onclick="removeFromCart('${item.id}')">🗑️</button>
        `;
        cartPopup.appendChild(itemElement);
      });
    }
  }
}

// Function to add a product to the cart
function addToCart(productId, productName, productPrice) {
  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }
  saveCart(); // Save the cart to localStorage
  updateCartDisplay();
  updateCartPopup();
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = (item.quantity || 1) + 1;
    saveCart(); // Save the cart to localStorage
    updateCartDisplay();
    updateCartPopup();
    if (window.location.pathname.includes('accessoriescheckout.html')) {
      displayCartItems();
    }
  }
}

// Function to decrease the quantity of a product in the cart
function decreaseQuantity(productId) {
  const item = cart.find((item) => item.id === productId);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    saveCart(); // Save the cart to localStorage
    updateCartDisplay();
    updateCartPopup();
    if (window.location.pathname.includes('accessoriescheckout.html')) {
      displayCartItems();
    }
  }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  saveCart(); // Save the cart to localStorage
  updateCartDisplay();
  updateCartPopup();
  if (window.location.pathname.includes('accessoriescheckout.html')) {
    displayCartItems();
  }
}

// Function to save the cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to load the cart from localStorage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartDisplay();
    updateCartPopup();
    if (window.location.pathname.includes('accessoriescheckout.html')) {
      displayCartItems();
    }
  }
}

// Function to clear the cart from localStorage
function clearCart() {
  localStorage.removeItem('cart');
  cart = [];
  updateCartDisplay();
  updateCartPopup();
}

// Function to show a warning when the user tries to close the tab
function setupTabCloseWarning() {
  let isInternalNavigation = false;

  // Detect internal navigation (e.g., clicking links within the website)
  document.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.closest('a')) {
      isInternalNavigation = true;
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (cart.length > 0 && !isInternalNavigation) { // Only show the warning if the cart is not empty and it's not internal navigation
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome
      return 'Are you sure you want to leave? Your cart items will not be saved.'; // Message for some browsers
    }
  });

  // Clear the cart when the browser is closed
  window.addEventListener('pagehide', () => {
    if (cart.length > 0 && !isInternalNavigation) {
      clearCart(); // Clear the cart when the browser is closed
    }
  });
}

window.addEventListener('load', () => {
  loadCart(); // Load the cart from localStorage
  setupTabCloseWarning(); // Tab close warning
});

// Added listeners for events that happen "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productPrice = parseFloat(button.getAttribute('data-product-price'));
    addToCart(productId, productName, productPrice);
  });
});