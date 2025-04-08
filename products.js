// Products Database
// In a real application, this would come from a backend server
const productsDatabase = [
    {
        id: 1,
        name: 'BAY-GL-163',
        price: 1600,
        image: 'https://s6.gifyu.com/images/bMgOR.png',
        category: 'hpl-board',
        description: 'first PUR hot- melt adhesive bonded HPL board.',
        inStock: true
    },
    {
        id: 2,
        name: 'ATHENA-GL-5584',
        price: 3500,
        image: 'https://s6.gifyu.com/images/bMgXc.png',
        category: 'hpl-board',
        description: 'HMR MDF Boards',
        inStock: true
    },
    {
        id: 3,
        name: 'Akazie',
        price: 49.99,
        image: 'https://s6.gifyu.com/images/bMgXO.webp',
        category: 'melamine-board',
        description: 'MDF Board',
        inStock: true
    },
    {
        id: 4,
        name: 'AKIJ OAK',
        price: 2999,
        image: 'https://s6.gifyu.com/images/bMgex.png',
        category: 'melamine-board',
        description: 'Particle Board',
        inStock: true
    },
    {
        id: 5,
        name: 'BIANCO MARBLE DARK',
        price: 349.99,
        image: 'https://s6.gifyu.com/images/bMgeI.png',
        category: 'high-glass',
        description: 'Made by special chemically treated on both surfaces of high graded laminated boards to give excellent gloss and glass like finish.',
        inStock: true
    },
    {
        id: 6,
        name: 'ENAMEL MARBLE',
        price: 2800,
        image: 'https://s6.gifyu.com/images/bMgeg.png',
        category: 'high-glass',
        description: 'special chemically treated on both surfaces of high graded laminated boards to give excellent gloss and glass like finish.',
        inStock: false
    },
    {
        id: 7,
        name: 'MOIST TEAK',
        price: 349.99,
        image: 'https://s6.gifyu.com/images/bM4Sn.png',
        category: 'matt-board',
        description: 'Unique Matt board with endless creative possibilities to create unique and unbeatable super matt and transparent finish',
        inStock: true
    },
    {
        id: 8,
        name: 'RED OAK',
        price: 329.99,
        image: 'https://s6.gifyu.com/images/bM4Si.png',
        category: 'matt-board',
        description: 'Made by natural or artificial wood veneer pasted on both sides of plain particle board',
        inStock: true
    },
    {
        id: 9,
        name: 'ANTIC',
        price: 89.99,
        image: 'https://s6.gifyu.com/images/bM4zo.png',
        category: 'embossed-board',
        description: 'Embossed board creates a memorable experience for their customers and many businesses used to highlight key details of the furniture design',
        inStock: true
    },
    {
        id: 10,
        name: 'DALIA',
        price: 199.99,
        image: 'https://s6.gifyu.com/images/bM4Ls.png',
        category: 'embossed-board',
        description: 'Glass whiteboard that resists staining and ghosting. Modern look for any space.',
        inStock: true
    },
    {
        id: 11,
        name: '3D-BLACK',
        price: 4600,
        image: 'https://s6.gifyu.com/images/bM4LT.png',
        category: '3d-decor-board',
        description: '3D Décor boards give an extra dimension to your rooms from wide array of range today with suitable match and budget-friendly prices!',
        inStock: false
    },
    {
        id: 12,
        name: '3D-HAVANA OAK',
        price: 129.99,
        image: 'https://s6.gifyu.com/images/bM4L7.png',
        category: '3d-decor-board',
        description: 'suitable match and budget-friendly prices!',
        inStock: true
    }
];

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.getElementById('products-grid');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    if (productsGrid) {
        // Get URL parameters to check for category filter
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        // Set the filter value if category parameter exists
        if (categoryParam && categoryFilter) {
            categoryFilter.value = categoryParam;
        }
        
        // Load products with initial filters
        loadProducts();
        
        // Add event listeners to filter controls
        if (categoryFilter) {
            categoryFilter.addEventListener('change', loadProducts);
        }
        if (priceFilter) {
            priceFilter.addEventListener('change', loadProducts);
        }
        if (sortFilter) {
            sortFilter.addEventListener('change', loadProducts);
        }
    }
});

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    // Get filter values
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const priceValue = priceFilter ? priceFilter.value : 'all';
    const sortValue = sortFilter ? sortFilter.value : 'default';
    
    // Filter products
    let filteredProducts = [...productsDatabase];
    
    // Apply category filter
    if (categoryValue !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryValue);
    }
    
    // Apply price filter
    if (priceValue !== 'all') {
        if (priceValue === '0-100') {
            filteredProducts = filteredProducts.filter(product => product.price <= 100);
        } else if (priceValue === '100-200') {
            filteredProducts = filteredProducts.filter(product => product.price > 100 && product.price <= 200);
        } else if (priceValue === '200-300') {
            filteredProducts = filteredProducts.filter(product => product.price > 200 && product.price <= 300);
        } else if (priceValue === '300+') {
            filteredProducts = filteredProducts.filter(product => product.price > 300);
        }
    }
    
    // Apply sorting
    if (sortValue === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue === 'name-desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    // Render filtered products
    renderProductsGrid(filteredProducts);
}

function renderProductsGrid(products) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products match your filters. Please try different criteria.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img class="product-image" src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                ${product.inStock ? 
                    `<button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>` : 
                    `<button class="out-of-stock" disabled>Out of Stock</button>`
                }
            </div>
        `;
        
        // Add click event to view product details
        productCard.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart') && !e.target.classList.contains('out-of-stock')) {
                window.location.href = `product-detail.html?id=${product.id}`;
            }
        });
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to the add to cart buttons
    const addToCartButtons = productsGrid.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
}

// Add to cart functionality
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        // Increase quantity if product is already in cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        const product = productsDatabase.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in header
    updateCartCount();
    
    // Show confirmation
    showNotification('Product added to cart!');
}

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Initialize page
updateCartCount();