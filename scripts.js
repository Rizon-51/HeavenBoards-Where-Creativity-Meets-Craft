// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products
    loadFeaturedProducts();
    
    // Load testimonials
    loadTestimonials();
    
// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
}

// Feedback form submission
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
}

    // Check authentication status
    checkAuthStatus();
    
    // Add event listeners for login/logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
    
    // Initialize cart count
    updateCartCount();
});

// Featured Products Data - In production, this would come from a database
const products = [
    {
        id: 1,
        name: "ATHENA-GL-5584",
        price: 3500,
        image: "https://s6.gifyu.com/images/bMgXc.png",
        category: "hpl-board",
        rating: 4.5,
        description: "HMR MDF Boards"
    },
    {
        id: 2,
        name: "3D-BLACK",
        price: 4600,
        image: "https://s6.gifyu.com/images/bM4LT.png",
        category: "3d-decor-boards",
        rating: 5,
        description: "3D Décor boards give an extra dimension to your rooms from wide array of range today with suitable match and budget-friendly prices!"
    },
    {
        id: 3,
        name: "AKIJ OAK",
        price: 2600,
        image: "https://s6.gifyu.com/images/bMgex.png",
        category: "melamine-board",
        rating: 4.8,
        description: "Particle Board"
    },
    {
        id: 4,
        name: "ENAMEL MARBLE",
        price: 2800,
        image: "https://s6.gifyu.com/images/bMgeg.png",
        category: "high-glass",
        rating: 4.7,
        description: "special chemically treated on both surfaces of high graded laminated boards to give excellent gloss and glass like finish."
    }
];

// Testimonial Data - In production, this would come from a database
const testimonials = [
    {
        id: 1,
        text: "HeavenBoards has the best selection of longboards I've found anywhere. The quality is exceptional and customer service is top-notch!",
        author: "Md Rifat Hossain",
        role: "Professional Businessman",
        avatar: "1.1.jpg"
    },
    {
        id: 2,
        text: "I've been buying my surfboards from HeavenBoards for years. Their products are durable and perform amazingly well in the water.",
        author: "Sarah Thompson",
        role: "Interior Designer",
        avatar: "2.2.jpg"
    },
    {
        id: 3,
        text: "As a snowboarding coach, I recommend HeavenBoards to all my students. The boards are perfect for beginners and pros alike.",
        author: "David Wilson",
        role: "Craftmanship Business",
        avatar: "3.3.jpg"
    }
];

// Load featured products into the DOM
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products-container');
    if (!container) return;
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create rating stars
    const stars = createRatingStars(product.rating);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <div class="product-rating">${stars}</div>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to Add to Cart button
    card.querySelector('.add-to-cart').addEventListener('click', function() {
        addToCart(product.id);
    });
    
    return card;
}

// Create rating stars based on rating value
function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Load testimonials into the DOM
function loadTestimonials() {
    const container = document.getElementById('testimonial-container');
    if (!container) return;
    
    testimonials.forEach(testimonial => {
        const testimonialCard = createTestimonialCard(testimonial);
        container.appendChild(testimonialCard);
    });
}

// Create a testimonial card element
function createTestimonialCard(testimonial) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    
    card.innerHTML = `
        <p class="testimonial-text">${testimonial.text}</p>
        <div class="testimonial-author">
            <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar">
            <div class="author-info">
                <h4>${testimonial.author}</h4>
                <p>${testimonial.role}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Handle newsletter form submission
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('newsletter-email');
    const messageElement = document.getElementById('newsletter-message');
    
    if (!emailInput || !messageElement) return;
    
    const email = emailInput.value.trim();
    
    if (!isValidEmail(email)) {
        messageElement.textContent = 'Please enter a valid email address.';
        messageElement.style.color = 'var(--error-color)';
        return;
    }
    
    // In a real application, this would be an AJAX call to a server endpoint
    // For demonstration, we'll just simulate success
    
    messageElement.textContent = 'Thank you for subscribing to our newsletter!';
    messageElement.style.color = 'var(--success-color)';
    emailInput.value = '';
    
    // In production, you would send this to your backend:
    // const formData = new FormData();
    // formData.append('email', email);
    // fetch('subscribe.php', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     messageElement.textContent = data.message;
    //     messageElement.style.color = data.success ? 'var(--success-color)' : 'var(--error-color)';
    //     if (data.success) emailInput.value = '';
    // })
    // .catch(error => {
    //     messageElement.textContent = 'An error occurred. Please try again later.';
    //     messageElement.style.color = 'var(--error-color)';
    // });
}

// Validate email format
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Add a product to the cart
function addToCart(productId) {
    // Get current cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        // Increment quantity if product already exists
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        const product = products.find(p => p.id === productId);
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
    
    // Update cart count in UI
    updateCartCount();
    
    // Show notification
    showNotification(`${products.find(p => p.id === productId).name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElement.textContent = totalItems;
}

// Show notification
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--success-color)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.transition = 'opacity 0.3s ease';
        document.body.appendChild(notification);
    }
    
    // Set message and show notification
    notification.textContent = message;
    notification.style.opacity = '1';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
    }, 3000);
}

// Check