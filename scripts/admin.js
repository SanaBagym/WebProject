
let users = [
    { username: "admin", firstName: "John", lastName: "Doe", email: "admin@example.com", phone: "1234567890", password: "admin123" },
    { username: "user1", firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: "0987654321", password: "user123" }
];


function renderTable() {
    const table = document.createElement("table");
    table.classList.add("user-table");
    
    const headerRow = table.insertRow();
    ["Username", "First Name", "Last Name", "Email", "Phone", "Actions"].forEach(header => {
        const cell = document.createElement("th");
        cell.textContent = header;
        headerRow.appendChild(cell);
    });

    users.forEach((user, index) => {
        const row = table.insertRow();
        Object.values(user).forEach(value => {
            const cell = row.insertCell();
            cell.textContent = value;
        });

        const actionsCell = row.insertCell();
        
        const editButton = document.createElement("button");
        editButton.textContent = "✏️ Edit";
        editButton.onclick = () => editUser(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌ Delete";
        deleteButton.onclick = () => deleteUser(index);
        actionsCell.appendChild(deleteButton);
    });

    document.body.innerHTML = "";
    document.body.appendChild(table);
}

function editUser(index) {
    const user = users[index];
    const username = prompt("Enter new username", user.username);
    const firstName = prompt("Enter new first name", user.firstName);
    const lastName = prompt("Enter new last name", user.lastName);
    const email = prompt("Enter new email", user.email);
    const phone = prompt("Enter new phone number", user.phone);
    const password = prompt("Enter new password", user.password);

    users[index] = { username, firstName, lastName, email, phone, password };
    renderTable(); 
}


function deleteUser(index) {
    if (confirm("Are you sure you want to delete this user?")) {
        users.splice(index, 1);
        renderTable(); 
    }
}

renderTable();
