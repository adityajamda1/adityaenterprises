function toggleForm(form) {
    if (form === 'login') {
        document.getElementById('register-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } else {
        document.getElementById('register-container').style.display = 'block';
        document.getElementById('login-container').style.display = 'none';
    }
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    if (username && password) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        alert('Registration successful! Please login.');
        toggleForm('login');
    } else {
        alert('Please fill in both fields.');
    }
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        window.location.href = 'main.html';
    } else {
        alert('Invalid username or password.');
    }
}