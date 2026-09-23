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