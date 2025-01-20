// Function to retrieve and display cart data
function displayCartProducts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve the cart from localStorage
    const cartDisplay = document.getElementById('cart-display');
    cartDisplay.innerHTML = ''; // Clear previous cart items

    if (cart.length === 0) {
        cartDisplay.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${product.name} - ${product.kilogram}kg - Quantity: ${product.quantity}</p>
        `;
        cartDisplay.appendChild(cartItem);
    });
}

// Call the displayCartProducts function when the page loads
displayCartProducts();

// Function to send cart items via WhatsApp
function sendWhatsApp() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    let message = 'Aditya Enterprises\n\n';
    cart.forEach(product => {
        message += `${product.name} - ${product.kilogram}kg - Quantity: ${product.quantity}\n`;
    });

    // The WhatsApp phone number of the recipient (replace with actual phone number in international format)
    const phoneNumber = '917058100493'; // Use country code, e.g., 911234567890 for India

    // WhatsApp API URL with phone number and message
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, '_blank');
}
