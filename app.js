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