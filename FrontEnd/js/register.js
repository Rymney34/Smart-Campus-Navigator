document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const loadingScreen = document.getElementById('loadingScreen');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        showLoading();

        // Collect form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };  
        
        if (!validateName(formData.firstName)) {
            alert("First name should only contain letters.");
            hideLoading();
            return;
        }

        if (!validateName(formData.surname)) {
            alert("Surname should only contain letters.");
            hideLoading();
            return;
        }

        if (!validatePassword(formData.password)) {
            alert("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
            hideLoading();
            return;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            hideLoading();
            return;
        }

        console.log(formData); // Add this line to check what data is being sent

        // Send data to the backend using Fetch API
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('User registered successfully!');
            window.location.href = 'login.html'; // Redirect after successful registration
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error registering user');
        }).finally(() => {
            hideLoading(); // Hide loading screen after request completes
        });
    });

    function validateName(name) {
        const nameRegex = /^[A-Za-z]+$/;
        return nameRegex.test(name);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }

    function showLoading() {
        loadingScreen.style.display = 'flex';
    }

    function hideLoading() {
        loadingScreen.style.display = 'none';
    }
});
