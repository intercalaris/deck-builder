const $ = el => document.querySelector(el);

// Managing Log out
const logoutButton = $('#close-session');

logoutButton?.addEventListener('click', e => {
    e.preventDefault();
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            console.log(res)
            window.location.href = '/'
        })
});

// Managing Log in
const loginForm = $('#login-form');
const loginSpan = $('#login-form span');

loginForm?.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('#login-email').value;
    const password = $('#login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => {
            if (res.ok) {
                loginSpan.innerText = 'Logging in...'
                loginSpan.style.color = 'green'
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            } else {
                loginSpan.innerText = 'Login error'
                loginSpan.style.color = 'red'
            }
        })
});

// Managing Sign Up
const registerForm = $('#signup-form');
const registerSpan = $('#signup-form span');

registerForm?.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#signup-name').value;
    const email = $('#signup-email').value;
    const password = $('#signup-password').value;
    fetch('/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
        .then(res => {
            console.log(res)
            if (res.ok) {
                registerSpan.innerText = 'User registered.'
                registerSpan.style.color = 'green'
                setTimeout(() => {
                    window.location.href = '/'
                }, 2000)
            } else {
                registerSpan.innerText = 'Register error'
                registerSpan.style.color = 'red'
            }
        })
});
