document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartIcon = document.querySelector('.cart-icon');
  const cartCount = document.querySelector('.cart-count');
  const cartDropdown = document.querySelector('.cart-dropdown');
  const cartItems = document.querySelector('.cart-items');
  const checkoutBtn = document.querySelector('.checkout-btn');

  // Add to Cart Functionality
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.getAttribute('data-name');
      const itemPrice = parseFloat(button.getAttribute('data-price'));

      const existingItem = cart.find((item) => item.name === itemName);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name: itemName, price: itemPrice, quantity: 1 });
      }

      updateCart();
    });
  });

  // Update Cart Function
  function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItems.innerHTML = '';

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name}</span>
        <div class="quantity-controls">
          <button class="quantity-btn minus" data-name="${item.name}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" data-name="${item.name}">+</button>
        </div>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button class="remove-item" data-name="${item.name}">Remove</button>
      `;
      cartItems.appendChild(li);
    });

    // Add Quantity Controls Functionality
    document.querySelectorAll('.quantity-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const item = cart.find((item) => item.name === itemName);

        if (button.classList.contains('plus')) {
          item.quantity += 1;
        } else if (button.classList.contains('minus')) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // Remove item if quantity is 0
            const itemIndex = cart.findIndex((item) => item.name === itemName);
            cart.splice(itemIndex, 1);
          }
        }

        updateCart();
      });
    });

    // Add Remove Item Functionality
    document.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemIndex = cart.findIndex((item) => item.name === itemName);
        if (itemIndex !== -1) {
          cart.splice(itemIndex, 1);
          updateCart();
        }
      });
    });
  }

  // Checkout Button
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Add items to proceed to checkout.');
    } else {
      window.location.href = 'finalcheckout.html'; // Redirect to final checkout page
    }
  });

  updateCart();
});