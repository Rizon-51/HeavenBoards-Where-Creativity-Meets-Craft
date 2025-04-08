document.addEventListener("DOMContentLoaded", function() {
    // Handle login form submission
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const email = document.getElementById("login-email").value.trim();
            const password = document.getElementById("login-password").value.trim();

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                alert("Login successful!");
                window.location.href = "index.html"; // Redirect to homepage
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // Handle registration form submission
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const password = document.getElementById("register-password").value.trim();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            if (users.some(user => user.email === email)) {
                alert("Email already registered.");
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration successful! You can now log in.");
            window.location.href = "login.html";
        });
    }
});
