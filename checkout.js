document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the selected tier's details from localStorage
  const selectedTier = JSON.parse(localStorage.getItem('selectedTier'));

  if (selectedTier) {
    document.getElementById('selected-tier-title').innerText = selectedTier.title;
    document.getElementById('selected-tier-details').innerText = selectedTier.details;
    document.getElementById('selected-tier-performance').innerText = selectedTier.performance;
    document.getElementById('selected-tier-price').innerText = `Total: ${selectedTier.price}`;
  } else {
    alert('No tier selected. Redirecting to order page.');
    window.location.href = 'order.html';
  }

  // Restrict Card Number, Expiry Date, and CVV to only numbers
  document.getElementById('card-number').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
  });

  document.getElementById('expiry-date').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
  });

  document.getElementById('cvv').addEventListener('input', function (e) {
    this.value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
  });

  // Restrict Cardholder Name to only letters
  document.getElementById('name').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
  });

  // Redirect to paysuccess.html on form submission
  document.querySelector('.payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = 'paysuccess.html'; // Redirect to success page
  });
});
