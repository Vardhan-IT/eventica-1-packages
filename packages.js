document.addEventListener('DOMContentLoaded', function() {
    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.nav-cart-count').textContent = cartCount;

    // Package data
    const packages = {
        wedding: {
            title: 'Wedding Package',
            price: 5000,
            image: '../images/event-planner-icon.png'
        },
        birthday: {
            title: 'Birthday Package',
            price: 1500,
            image: '../images/event-planner-icon.png'
        },
        corporate: {
            title: 'Corporate Package',
            price: 3000,
            image: '../images/event-planner-icon.png'
        },
        festival: {
            title: 'Festival Package',
            price: 10000,
            image: '../images/event-planner-icon.png'
        },
        party: {
            title: 'Party Package',
            price: 2000,
            image: '../images/event-planner-icon.png'
        }
    };

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const packageCards = document.querySelectorAll('.package-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            packageCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            const packageData = packages[packageType];

            // Create cart item
            const cartItem = {
                id: packageType,
                title: packageData.title,
                price: packageData.price,
                image: packageData.image,
                quantity: 1
            };

            // Add to cart
            addToCart(cartItem);
        });
    });

    function addToCart(item) {
        // Get existing cart
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if item already exists in cart
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(item);
        }

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update cart count
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        document.querySelector('.nav-cart-count').textContent = cartCount;

        // Show notification
        showNotification('Item added to cart!');
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#ff6b6b';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '1000';

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add animation to package cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    packageCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}); 