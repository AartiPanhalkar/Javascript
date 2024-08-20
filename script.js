document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    const session = localStorage.getItem('session');
    if (session && document.getElementById('welcomeMessage')) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === session);
        if (user) {
            document.getElementById('welcomeMessage').innerText =`Welcome To Dashboard,${user.firstName}`
        } else {
            location.href ='index.html';
        }
    }
});

function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const password = document.getElementById('password').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    if (!validateEmail(email) || !validateName(firstName) || !validateName(lastName) || !validatePassword(password) || !validatePhoneNumber(phoneNumber)) {
        alert('Please fill in the form correctly.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('Email already exists.');
        return;
    }

    const newUser = { email, firstName, lastName, password, phoneNumber };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('session', email);
    location.href = 'dashboard.html';
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem('session', email);
        location.href = 'dashboard.html';
    } else {
        document.getElementById('loginError').innerText = 'Invalid email or password.';
    }
}

function logoutUser() {
    localStorage.removeItem('session');
    location.href = 'index.html';
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateName(name) {
    const re = /^[A-Za-z]{2,}$/;
    return re.test(name);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validatePhoneNumber(phoneNumber) {
    const re = /^\d{10}$/;
    return re.test(phoneNumber);
}