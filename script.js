let products = [];
let cart = [];
let cartCount = 0;
// Fetch products from products.json
fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data.products;
        displayProducts(products);
    });
// Function to display products
function displayProducts(filteredProducts) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <h4 class="kilogram">${product.kilogram}kg</h4>
            <label for="quantity-${product.id}">Quantity:</label>
            <input type="number" id="quantity-${product.id}" min="1" value="1">
            <button onclick="addToCart(${product.id})" class="button-55">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}


// Function to filter products by category
function filterCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Function to fetch products from product.json
async function loadProducts() {
    try {
        const response = await fetch('product.json'); // Replace with correct path if necessary
        if (!response.ok) {
            throw new Error("Failed to load products.");
        }
        products = await response.json(); // Parse JSON
        displayProducts(products); // Display all products initially
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Function to handle search by name or category
function searchProducts() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`).value;
    const quantity = parseInt(quantityInput, 10);
    const existingProductIndex = cart.findIndex(p => p.id === productId);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity; // Update quantity if already in cart
    } else {
        const productInCart = { ...product, quantity };
        cart.push(productInCart); // Add new product to cart
    }
    cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Update total quantity in the cart
    document.getElementById('cart-button').innerText = `Cart (${cartCount})`; // Update the cart button
}
// Function to store cart in localStorage and navigate to the cart page
function viewCart() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Store the cart in localStorage
    window.location.href = 'cart.html'; // Redirect to cart page
}