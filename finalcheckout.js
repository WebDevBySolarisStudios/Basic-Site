document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.querySelector('.cart-items');
  const subtotalElement = document.getElementById('subtotal');
  const gstElement = document.getElementById('gst');
  const totalElement = document.getElementById('total');
  const paymentForm = document.getElementById('payment-form');
  const placeOrderBtn = document.querySelector('.checkout-btn');

  // Display Cart Items
  function displayCartItems() {
    cartItems.innerHTML = '';
    let subtotal = 0;

    if (cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      subtotalElement.textContent = '$0.00';
      gstElement.textContent = '$0.00';
      totalElement.textContent = '$0.00';
      placeOrderBtn.disabled = true; // Disable the "Place Order" button
      return;
    }

    cart.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name} (${item.quantity})</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      `;
      cartItems.appendChild(li);
      subtotal += item.price * item.quantity;
    });

    const gst = subtotal * 0.008;
    const total = subtotal + gst;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    gstElement.textContent = `$${gst.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
    placeOrderBtn.disabled = false; // Enable the "Place Order" button
  }

  // Handle Form Submission
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem('cart'); // Clear the cart
    window.location.href = 'confirmation.html'; // Redirect to confirmation page
  });

  displayCartItems();
});