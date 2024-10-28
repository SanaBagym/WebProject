document.addEventListener('DOMContentLoaded', async function () {
    const bedsContainer = document.getElementById('bedCatalog');
    let localBeds = JSON.parse(localStorage.getItem('beds')) || [];

    // Function to load beds data from the database (beds.json file)
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
            return []; // Return an empty array in case of an error
        }
    }

    // Function to merge localStorage data with database data
    function mergeBedData(localBeds, databaseBeds) {
        const mergedBeds = [...localBeds];
        const localBedIds = new Set(localBeds.map(bed => bed.id));

        // Add beds from the database that are not in local storage
        databaseBeds.forEach(bed => {
            if (!localBedIds.has(bed.id)) {
                mergedBeds.push(bed);
            }
        });

        return mergedBeds;
    }

    // Function to render beds in the catalog
    function renderBeds(beds) {
        bedsContainer.innerHTML = ''; // Clear any existing content
        beds.forEach(bed => renderBedCard(bed));
    }

    // Function to render a single bed card
    function renderBedCard(bed) {
        const bedCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${bed.image}" alt="${bed.name}" class="card-img-top img-fluid rounded" />
                    <div class="card-body">
                        <h5 class="card-title">${bed.name}</h5>
                        <p class="card-text">${bed.description}</p>
                    </div>
                </div>
            </div>
        `;
        bedsContainer.insertAdjacentHTML('beforeend', bedCard);
    }
    
    const databaseBeds = await loadBedsFromDatabase();
    const mergedBeds = mergeBedData(localBeds, databaseBeds);
    
    // Update localStorage with merged beds
    localStorage.setItem('beds', JSON.stringify(mergedBeds));
    
    // Render the merged list of beds
    renderBeds(mergedBeds);
});
