document.addEventListener('DOMContentLoaded', async function () {
    const bedsContainer = document.getElementById('bedCatalog');
    let localBeds = JSON.parse(localStorage.getItem('beds')) || [];

    async function loadBedsFromDatabase() {
        try {
            const response = await fetch('database/beds.json');
            if (!response.ok) {
                throw new Error('Failed to load bed data.');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            bedsContainer.innerHTML = '<p>Failed to load bed data from the database.</p>';
            return [];
        }
    }

    function mergeBedData(localBeds, databaseBeds) {
        const mergedBeds = [...localBeds];
        const localBedIds = new Set(localBeds.map(bed => bed.id));
        databaseBeds.forEach(bed => {
            if (!localBedIds.has(bed.id)) {
                mergedBeds.push(bed);
            }
        });
        return mergedBeds;
    }

    function renderBeds(beds) {
        bedsContainer.innerHTML = ''; 
        beds.forEach(bed => renderBedCard(bed));
    }

    function renderBedCard(bed) {
        const bedCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${bed.image}" alt="${bed.name}" class="card-img-top img-fluid rounded catalog-card" />
                    <div class="card-body">
                        <h5 class="card-title">${bed.name}</h5>
                        <p class="card-text">${bed.description}</p>
                        <p class="card-text"><strong>Price: $${bed.price !== undefined ? bed.price : 'N/A'}</strong></p>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-dark add-to-cart-btn" data-id="${bed.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        bedsContainer.insertAdjacentHTML('beforeend', bedCard);
    }

    const databaseBeds = await loadBedsFromDatabase();
    const mergedBeds = mergeBedData(localBeds, databaseBeds);
    localStorage.setItem('beds', JSON.stringify(mergedBeds));
    renderBeds(mergedBeds);
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        const bedId = event.target.getAttribute('data-id');
        addToCart(bedId);
    }
});

function addToCart(bedId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const beds = JSON.parse(localStorage.getItem('beds'));
    const bed = beds.find(b => b.id === parseInt(bedId));
    if (bed) {
        cart.push(bed);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${bed.name} has been added to your cart!`);
    } else {
        console.error(`Bed with ID ${bedId} not found in localStorage.`);
    }
}

