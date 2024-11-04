document.addEventListener('DOMContentLoaded', function () {
    const addBedForm = document.getElementById('addBedForm');
    const bedImageInput = document.getElementById('bedImage');
    const imagePreview = document.getElementById('imagePreview');
    const bedCatalog = document.getElementById('bedCatalog');
    let beds = JSON.parse(localStorage.getItem('beds')) || [];

    // Preview image when URL is entered
    bedImageInput.addEventListener('input', function () {
        const imageUrl = bedImageInput.value;
        if (imageUrl) {
            imagePreview.src = imageUrl;
            imagePreview.style.display = 'block';
        } else {
            imagePreview.style.display = 'none';
        }
    });

    // Function to render beds in the catalog
    function renderBeds() {
        bedCatalog.innerHTML = '';
        beds.forEach(bed => {
            const bedCard = `
                <div class="col-md-4 mb-4" data-id="${bed.id}">
                    <div class="card h-100">
                        <img src="${bed.image}" alt="${bed.name}" class="card-img-top img-fluid rounded catalog-card" />
                        <div class="card-body">
                            <h5 class="card-title">${bed.name}</h5>
                            <p class="card-text">${bed.description}</p>
                            <p class="card-text"><strong>Price: $${bed.price}</strong></p>
                        </div>
                        <div class="card-footer text-center">
                            <button class="btn btn-warning edit-bed-btn">Edit</button>
                            <button class="btn btn-danger remove-bed-btn">Remove</button>
                        </div>
                    </div>
                </div>
            `;
            bedCatalog.insertAdjacentHTML('beforeend', bedCard);
        });
    }

    // Add/Edit Bed
    addBedForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const bedId = document.getElementById('bedId').value;
        const bedName = document.getElementById('bedName').value;
        const bedDescription = document.getElementById('bedDescription').value;
        const bedPrice = document.getElementById('bedPrice').value;
        const bedImage = bedImageInput.value; // Dynamic URL from input

        const bed = {
            id: bedId || Date.now().toString(),
            name: bedName,
            description: bedDescription,
            price: bedPrice,
            image: bedImage,
        };

        if (bedId) {
            beds = beds.map(b => b.id === bed.id ? bed : b);
        } else {
            beds.push(bed);
        }

        localStorage.setItem('beds', JSON.stringify(beds));
        renderBeds();
        addBedForm.reset();
        imagePreview.style.display = 'none'; // Hide the preview
    });

    // Remove Bed
    bedCatalog.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-bed-btn')) {
            const bedCard = event.target.closest('.col-md-4');
            const bedId = bedCard.getAttribute('data-id');
            beds = beds.filter(b => b.id != bedId);
            localStorage.setItem('beds', JSON.stringify(beds));
            renderBeds();
        }
    });

    // Edit Bed
    bedCatalog.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-bed-btn')) {
            const bedCard = event.target.closest('.col-md-4');
            const bedId = bedCard.getAttribute('data-id');
            const bedToEdit = beds.find(b => b.id == bedId);

            if (bedToEdit) {
                document.getElementById('bedId').value = bedToEdit.id;
                document.getElementById('bedName').value = bedToEdit.name;
                document.getElementById('bedDescription').value = bedToEdit.description;
                document.getElementById('bedPrice').value = bedToEdit.price;
                bedImageInput.value = bedToEdit.image;

                // Show current image in preview
                imagePreview.src = bedToEdit.image;
                imagePreview.style.display = 'block';
            }
        }
    });

    renderBeds(); // Initial render
});
