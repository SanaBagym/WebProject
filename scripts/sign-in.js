document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('signupContainer');

    container.innerHTML = `
        <h2 class="text-center mb-4">Create Account</h2>
        <form id="signUpForm">
            <div class="mb-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" placeholder="First Name" required>
            </div>
            <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" placeholder="Last Name" required>
            </div>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" placeholder="Username" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" required>
            </div>
            <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm Password" required>
            </div>
            <button type="button" class="btn btn-primary w-100" id="registerButton">Register</button>
        </form>
        <p class="text-center mt-3">
            Already have an account? <a href="log-in.html">Log in here</a>
        </p>
    `;

    document.getElementById('registerButton').addEventListener('click', function () {
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        const usernameRegex = /^[a-zA-Z0-9]{1,16}$/;
        if (!usernameRegex.test(username)) {
            alert('Username must be 1-16 characters long and contain only letters and numbers.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        alert('Registration successful!');
        window.location.href = 'log-in.html';
    });
});

