document.addEventListener('DOMContentLoaded', async function () {
    const addBedForm = document.getElementById('addBedForm');
    const bedImageInput = document.getElementById('bedImage');
    const imagePreview = document.getElementById('imagePreview');
    const bedCatalog = document.getElementById('bedCatalog');
    let beds = JSON.parse(localStorage.getItem('beds')) || [];

    // Preview image when selected
    bedImageInput.addEventListener('change', function () {
        const file = bedImageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block'; // Show the image preview
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none'; // Hide the image preview if no file is selected
        }
    });

    // Function to render beds in the catalog
    function renderBeds() {
        bedCatalog.innerHTML = ''; // Clear previous content
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

        // Use a static URL for the bed image (you can adjust this logic if necessary)
        const imageUrl = 'path/to/your/image.jpg'; // Replace with your static image URL

        const bed = {
            id: bedId || Date.now().toString(), // Ensure ID is a string
            name: bedName,
            description: bedDescription,
            price: bedPrice,
            image: imageUrl, // Use the static image URL
        };

        // Add or update the bed in localStorage
        if (bedId) {
            // Update existing bed
            beds = beds.map(b => b.id === bed.id ? bed : b);
        } else {
            // Add new bed
            beds.push(bed);
        }
        
        localStorage.setItem('beds', JSON.stringify(beds));
        renderBeds(); // Refresh the displayed beds
        addBedForm.reset(); // Reset form fields
        imagePreview.style.display = 'none'; // Hide the preview
    });

    // Remove Bed
    bedCatalog.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove-bed-btn')) {
            const bedCard = event.target.closest('.col-md-4');
            const bedId = bedCard.getAttribute('data-id');
            beds = beds.filter(b => b.id != bedId); // Remove from array
            localStorage.setItem('beds', JSON.stringify(beds)); // Update localStorage
            renderBeds(); // Re-render items
        }
    });

    // Edit Bed
    bedCatalog.addEventListener('click', function (event) {
        if (event.target.classList.contains('edit-bed-btn')) {
            const bedCard = event.target.closest('.col-md-4');
            const bedId = bedCard.getAttribute('data-id');
            const bedToEdit = beds.find(b => b.id == bedId);

            if (bedToEdit) {
                document.getElementById('bedId').value = bedToEdit.id; // Set ID for editing
                document.getElementById('bedName').value = bedToEdit.name;
                document.getElementById('bedDescription').value = bedToEdit.description;
                document.getElementById('bedPrice').value = bedToEdit.price;

                // Show current image in preview
                imagePreview.src = bedToEdit.image;
                imagePreview.style.display = 'block'; // Show the existing image preview
            }
        }
    });

    // Initial render
    renderBeds();
});
