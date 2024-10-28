document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render items in the cart
    function renderCartItems() {
        cartContainer.innerHTML = ''; // Clear previous content

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach((bed, index) => {
            const cartItem = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${bed.image}" alt="${bed.name}" class="card-img-top img-fluid rounded catalog-card" />
                        <div class="card-body">
                            <h5 class="card-title">${bed.name}</h5>
                            <p class="card-text">${bed.description}</p>
                            <p class="card-text"><strong>Price: $${bed.price !== undefined ? bed.price : 'N/A'}</strong></p>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-danger remove-from-cart-btn" data-index="${index}">Remove from Cart</button>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.insertAdjacentHTML('beforeend', cartItem);
        });
    }

    // Function to remove item from cart
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(); // Re-render items
    }

    renderCartItems(); // Initial render
});
