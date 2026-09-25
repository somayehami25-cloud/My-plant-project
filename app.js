const productGrid = document.getElementById('product-grid');

function renderProducts(productsToRender) {

productGrid.innerHTML ='';

productsToRender.forEach(product => {
    const cardHTML = `
    <div class = "card">
        <div class = "card-image-panel">${product.emoji}</div>
        <h3 class = "card-name">${product.name}</h3>
        <div class = "card-rating">⭐ ${product.rating}</div>
        <div class = "card-price">$${product.price}</div>
        <button class = "add-to-cart-btn">Add to cart</button>
    </div>
    `;
    productGrid.innerHTML += cardHTML;
});

}renderProducts(products);

const menuButtons = document.querySelectorAll('.menu-pill');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        menuButtons.forEach(btn => btn.classList.remove( 'active'));
         button.classList.add('active');

         const category = button.getAttribute('data-category');

         if (category === 'all') {
            renderProducts(products);
         }else{
            const filtered = products.filter(product => product.category === category);
            renderProducts(filtered);
         }
    });
})

const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input' , (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
})

const sortDropdown = document.getElementById('sort-dropdown');

sortDropdown.addEventListener('change', (e) => {
    const sortValue = e.target.value;
    let sortedProducts = [...products]; 

    if (sortValue === 'price-low') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'price-high') {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'rating') {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    
    renderProducts(sortedProducts); 
});

let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartBody = document.getElementById('cart-body');
const cartFooter = document.getElementById('cart-footer');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

function openCart() {
    cartModal.classList.remove('hidden');
    renderCart();
}

function closeCart() {
    cartModal.classList.add('hidden');
}

function renderCart() {
    cartBody.innerHTML = '';

    if (cart.length === 0) {
    
        cartFooter.style.display = 'none';
        cartBody.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🌱</div>
                <p>Nothing here yet.<br>Go pick a plant!</p>
                <button class="browse-btn" onclick="closeCart()">Browse plants</button>
            </div>
       ` ;
    } else {
    
        cartFooter.style.display = 'block';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            cartBody.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <span>${item.emoji}</span>
                        <span>${item.name}</span>
                    </div>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
           ` ;
        });

        cartTotalPrice.textContent = `$${total}`;
    }

    cartCount.textContent =  `🛒 Cart (${cart.length})`;
}

productGrid.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('add-to-cart-btn')) {
        
        const cardName = e.target.parentElement.querySelector('.card-name').textContent.trim();
        
        const product = products.find(p => p.name === cardName);
        
        if (product) {
            cart.push(product);
            openCart();
        }
    }
});

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
cartCount.addEventListener('click', openCart);
clearCartBtn.addEventListener('click' , () => {
    cart = [];
    renderCart();
});