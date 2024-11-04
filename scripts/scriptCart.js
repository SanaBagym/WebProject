document.addEventListener('DOMContentLoaded', function () {
    const cartContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartCount.textContent = 0;
            cartTotal.textContent = '$0.00';
            return;
        }

        cart.forEach((bed, index) => {
            totalPrice += bed.price || 0;

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

        cartCount.textContent = cart.length;
        cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-from-cart-btn')) {
            const index = event.target.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems();
        }
    });

    renderCartItems();
});
