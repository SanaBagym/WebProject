document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('loginContainer');
    container.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'mt-5');

    const form = document.createElement('div');
    form.classList.add('card', 'p-4', 'shadow', 'w-50', 'bg-light');

    const title = document.createElement('h2');
    title.textContent = 'Log In';
    title.classList.add('text-center', 'mb-4', 'text-primary');
    form.appendChild(title);

    const emailGroup = document.createElement('div');
    emailGroup.classList.add('mb-3');
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email';
    emailLabel.classList.add('form-label');
    emailGroup.appendChild(emailLabel);
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.classList.add('form-control');
    emailGroup.appendChild(emailInput);
    form.appendChild(emailGroup);

    const passwordGroup = document.createElement('div');
    passwordGroup.classList.add('mb-3');
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    passwordLabel.classList.add('form-label');
    passwordGroup.appendChild(passwordLabel);
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.classList.add('form-control');
    passwordGroup.appendChild(passwordInput);
    form.appendChild(passwordGroup);

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Log In';
    loginButton.classList.add('btn', 'btn-primary', 'w-100', 'mt-3');
    form.appendChild(loginButton);

    container.appendChild(form);

    loginButton.addEventListener('click', function () {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === 'admin@gmail.com' && password === 'admin000') {
            alert('Welcome, admin! Redirecting to admin panel...');
            window.location.href = '/admin.html';
        } else {
            alert('Login successful!');
        }
    });
});
