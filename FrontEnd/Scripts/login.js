const icon = document.querySelectorAll('.togglePassword');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    const toggleIcon = document.querySelector('.togglePassword');
    const passwordField = document.getElementById('password');

    toggleIcon.addEventListener('click', () =>  {
        const isPasswordVisible = passwordField.type === 'text';

        // hide and show passwords 
        if (isPasswordVisible) {
            passwordField.type = 'password'; 
        } else {
            passwordField.type = 'text'; 
        }
        
        toggleIcon.classList.toggle('fa-eye');
        toggleIcon.classList.toggle('fa-eye-slash');
    });


    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,

           
        };


        // Send login request to the backend
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful') {
                alert('Login successful');
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = '/Views/index.html'; // Redirect to index.html (Map View)
            } else {
                alert('Error logging in');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error logging in');
        });
    });
});
