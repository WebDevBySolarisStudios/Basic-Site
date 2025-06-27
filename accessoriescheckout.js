const cartItemsContainer = document.querySelector('.cart-items');
const subtotalElement = document.querySelector('.subtotal');
const gstElement = document.querySelector('.gst');
const totalElement = document.querySelector('.total');

// Function to display cart items on the checkout page
function displayCartItems() {
  cartItemsContainer.innerHTML = '';
  let subtotal = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item) => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('cart-item');
      itemElement.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity('${item.id}')">-</button>
          <span>${item.quantity || 1}</span>
          <button onclick="increaseQuantity('${item.id}')">+</button>
        </div>
        <button onclick="removeFromCart('${item.id}')">🗑️</button>
      `;
      cartItemsContainer.appendChild(itemElement);
      subtotal += item.price * (item.quantity || 1);
    });
  }

  const gst = subtotal * 0.008;
  const total = subtotal + gst;

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  gstElement.textContent = `$${gst.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Function to handle the "Place Order" button click
document.querySelector('.payment-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items before placing an order.');
  } else {
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartDisplay();
    updateCartPopup();
  }
});

// Load cart items when the checkout page loads
window.addEventListener('load', () => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    displayCartItems();
  }
});