// Sample product data
const featuredProducts = [
    {
        id: 1,
        name: "Son MAC Ruby Woo",
        category: "makeup",
        price: 550000,
        image: "images/products/mac-ruby-woo.jpg",
        description: "Son môi MAC Retro Matte Lipstick Ruby Woo"
    },
    {
        id: 2,
        name: "Nước Hoa Chanel N°5",
        category: "perfume",
        price: 3200000,
        image: "images/products/chanel-n5.jpg",
        description: "Nước hoa Chanel N°5 EDP 50ml"
    },
    {
        id: 3,
        name: "Kem Chống Nắng Anessa",
        category: "skincare",
        price: 420000,
        image: "images/products/anessa.jpg",
        description: "Kem chống nắng Anessa Perfect UV Sunscreen"
    },
    {
        id: 4,
        name: "Túi Đựng Mỹ Phẩm",
        category: "accessories",
        price: 180000,
        image: "images/products/makeup-bag.jpg",
        description: "Túi đựng mỹ phẩm cao cấp"
    }
];

// Format price with Vietnamese currency
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${formatPrice(product.price)}</div>
                <button class="btn add-to-cart" data-product-id="${product.id}">
                    Thêm vào giỏ hàng
                </button>
            </div>
        </div>
    `;
}

// Initialize featured products
function initFeaturedProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = featuredProducts
            .map(product => createProductCard(product))
            .join('');
    }
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add icon based on type
    let icon;
    switch (type) {
        case 'success':
            icon = 'check-circle';
            break;
        case 'error':
            icon = 'exclamation-circle';
            break;
        case 'info':
            icon = 'info-circle';
            break;
        default:
            icon = 'bell';
    }
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    // Add to document
    document.body.appendChild(notification);

    // Force a reflow to trigger animation
    notification.offsetHeight;
    notification.style.opacity = '1';

    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
    }, 2750); // Match with CSS animation timing
}

function addToCart(productId, productName) {
    const product = featuredProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        showNotification(`Sản phẩm "${productName}" đã được thêm vào giỏ hàng`, 'success');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initFeaturedProducts();
    updateCartCount();

    // Add to cart button click handler
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId, featuredProducts.find(p => p.id === productId).name);
        }
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (emailInput.value) {
                showNotification('Cảm ơn bạn đã đăng ký nhận tin!');
                emailInput.value = '';
            }
        });
    }
});

// Add styles for notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--accent);
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        animation: slideIn 0.5s ease-out;
        z-index: 1000;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 