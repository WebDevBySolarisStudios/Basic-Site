document.addEventListener('DOMContentLoaded', () => {
  // Track the currently selected tier
  let selectedTier = null;

  // Add event listeners to all "Select" buttons
  document.querySelectorAll('.pc-tier .btn-primary').forEach((button) => {
    button.addEventListener('click', (event) => {
      // Prevent default behavior (if any)
      event.preventDefault();

      // Reset the previously selected tier
      if (selectedTier) {
        selectedTier.classList.remove('selected');
      }

      // Set the clicked tier as selected
      const tierCard = button.closest('.pc-tier');
      tierCard.classList.add('selected');
      selectedTier = tierCard;
    });
  });

  // Checkout Button
  const checkoutButton = document.querySelector('.checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (!selectedTier) {
        alert('Please select a tier before proceeding to checkout.');
        return;
      }

      // Get the selected tier's details
      const tierTitle = selectedTier.querySelector('h4').innerText;
      const tierDetails = Array.from(selectedTier.querySelectorAll('ul li')).map(li => li.innerText).join('\n');
      const tierPerformance = Array.from(selectedTier.querySelectorAll('.performance li')).map(li => li.innerText).join('\n');
      const tierPrice = tierTitle.split(' - ')[1]; // Extract price from title

      // Store the selected tier's details in localStorage
      localStorage.setItem('selectedTier', JSON.stringify({
        title: tierTitle,
        details: tierDetails,
        performance: tierPerformance,
        price: tierPrice,
      }));

      // Redirect to checkout.html
      window.location.href = 'checkout.html';
    });
  }

  // Build Your PC Button (unchanged)
  const buildButton = document.getElementById('build-button');
  if (buildButton) {
    buildButton.addEventListener('click', () => {
      const cpu = document.getElementById('cpu').value;
      const cpuCooler = document.getElementById('cpu-cooler').value;
      const ram = document.getElementById('ram').value;
      const gpu = document.getElementById('gpu').value;
      const motherboard = document.getElementById('motherboard').value;
      const storage = document.getElementById('storage').value;
      const psu = document.getElementById('psu').value;
      const pcCase = document.getElementById('case').value;
      const os = document.getElementById('os').value;

      alert(`Your Custom PC Configuration:\n
        CPU: ${cpu}\n
        CPU Cooler: ${cpuCooler}\n
        RAM: ${ram}\n
        Graphics Card: ${gpu}\n
        Motherboard: ${motherboard}\n
        Storage: ${storage}\n
        Power Supply: ${psu}\n
        Case: ${pcCase}\n
        Operating System: ${os}
      `);
    });
  }
});