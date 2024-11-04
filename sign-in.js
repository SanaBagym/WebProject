document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    container.style.margin = '20px auto';
    container.style.width = '80%';
    container.style.maxWidth = '500px';
    container.style.padding = '20px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '10px';
    container.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    
    const title = document.createElement('h2');
    title.textContent = 'Create Account';
    title.style.textAlign = 'center';
    container.appendChild(title);

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = 'Username';
    usernameInput.style.display = 'block';
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '10px';
    usernameInput.style.marginBottom = '10px';
    usernameInput.style.border = '1px solid #ccc';
    usernameInput.style.borderRadius = '5px';
    container.appendChild(usernameInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.style.display = 'block';
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '10px';
    passwordInput.style.marginBottom = '10px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '5px';
    container.appendChild(passwordInput);

    const registerButton = document.createElement('button');
    registerButton.textContent = 'Register';
    registerButton.style.display = 'block';
    registerButton.style.width = '100%';
    registerButton.style.padding = '10px';
    registerButton.style.backgroundColor = '#324874';
    registerButton.style.color = '#fff';
    registerButton.style.border = 'none';
    registerButton.style.borderRadius = '5px';
    registerButton.style.cursor = 'pointer';
    container.appendChild(registerButton);

    document.body.appendChild(container);

    registerButton.addEventListener('click', function () {
        const username = usernameInput.value;
        const password = passwordInput.value;

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

        alert('Registration successful!');
            window.location.href = "index.html"
    });

    const loginContainer = document.createElement('div');
    loginContainer.style.margin = '20px auto';
    loginContainer.style.width = '80%';
    loginContainer.style.maxWidth = '500px';
    loginContainer.style.padding = '20px';
    loginContainer.style.border = '1px solid #ccc';
    loginContainer.style.borderRadius = '10px';
    loginContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const loginTitle = document.createElement('h2');
    loginTitle.textContent = 'Sign In';
    loginTitle.style.textAlign = 'center';
    loginContainer.appendChild(loginTitle);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Email';
    emailInput.style.display = 'block';
    emailInput.style.width = '100%';
    emailInput.style.padding = '10px';
    emailInput.style.marginBottom = '10px';
    emailInput.style.border = '1px solid #ccc';
    emailInput.style.borderRadius = '5px';
    loginContainer.appendChild(emailInput);

    const loginPasswordInput = document.createElement('input');
    loginPasswordInput.type = 'password';
    loginPasswordInput.placeholder = 'Password';
    loginPasswordInput.style.display = 'block';
    loginPasswordInput.style.width = '100%';
    loginPasswordInput.style.padding = '10px';
    loginPasswordInput.style.marginBottom = '10px';
    loginPasswordInput.style.border = '1px solid #ccc';
    loginPasswordInput.style.borderRadius = '5px';
    loginContainer.appendChild(loginPasswordInput);

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Sign In';
    loginButton.style.display = 'block';
    loginButton.style.width = '100%';
    loginButton.style.padding = '10px';
    loginButton.style.backgroundColor = '#324874';
    loginButton.style.color = '#fff';
    loginButton.style.border = 'none';
    loginButton.style.borderRadius = '5px';
    loginButton.style.cursor = 'pointer';
    loginContainer.appendChild(loginButton);

    document.body.appendChild(loginContainer);

    loginButton.addEventListener('click', function () {
        const email = emailInput.value;
        const password = loginPasswordInput.value;

        if (email === 'admin@gmail.com' && password === 'admin000') {
            alert('Welcome, admin! Redirecting to admin panel...');
            window.location.href = '/admin.html';
        } else {
            alert('Login successful!');
        }
    });
});
