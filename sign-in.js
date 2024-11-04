document.addEventListener('DOMContentLoaded', function () {
    const formContainer = document.getElementById('form-container');

    // Create Account Section
    const registerCard = document.createElement('div');
    registerCard.className = 'col-md-6 mb-4';
    registerCard.innerHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h2 class="card-title text-center mb-3">Create Account</h2>
                <input type="text" id="register-username" class="form-control mb-3" placeholder="Username">
                <input type="password" id="register-password" class="form-control mb-3" placeholder="Password">
                <button id="register-btn" class="btn btn-primary btn-block">Register</button>
            </div>
        </div>
    `;
    formContainer.appendChild(registerCard);

    // Sign In Section
    const loginCard = document.createElement('div');
    loginCard.className = 'col-md-6 mb-4';
    loginCard.innerHTML = `
        <div class="card shadow">
            <div class="card-body">
                <h2 class="card-title text-center mb-3">Sign In</h2>
                <input type="email" id="login-email" class="form-control mb-3" placeholder="Email">
                <input type="password" id="login-password" class="form-control mb-3" placeholder="Password">
                <button id="login-btn" class="btn btn-primary btn-block">Sign In</button>
            </div>
        </div>
    `;
    formContainer.appendChild(loginCard);

    // Register Button Logic
    document.getElementById('register-btn').addEventListener('click', function () {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        const usernameRegex = /^[a-zA-Z0-9]{1,16}$/;
        if (!usernameRegex.test(username)) {
            alert('Username must be 1-16 characters long and contain only letters and numbers.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must include one uppercase letter, one lowercase letter, one number, and one special character, with a minimum length of 8 characters.');
            return;
        }

        alert('Registration successful!');
        window.location.href = 'index.html';
    });

    // Login Button Logic
    document.getElementById('login-btn').addEventListener('click', function () {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email === 'admin@gmail.com' && password === 'admin000') {
            alert('Welcome, admin! Redirecting to admin panel...');
            window.location.href = '/admin.html';
        } else if (email && password) {
            alert('Login successful!');
        } else {
            alert('Please enter valid email and password.');
        }
    });
});
