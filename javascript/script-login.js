function login() {
    const ignInput = document.getElementById("text").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    let registeredUsers = JSON.parse(localStorage.getItem("users")) || {}; // Retrieve users

    if (!ignInput || !password) {
        alert("Please enter both your In-Game Name and password!");
        return;
    }

    // Check if user exists (we now store users by IGN)
    let userFound = registeredUsers[ignInput];

    if (userFound && userFound.password === password) {
        alert(`Welcome back, Trainer ${userFound.ign}!`);
        window.location.href = "../pages/homepage.html"; // Redirect to homepage
    } else {
        alert("Invalid In-Game Name or password. Please try again.");
    }
}

// Function to handle third-party login buttons
function displayMessage(provider) {
    alert(`Signing in with ${provider}...`);
    window.location.href = "../pages/homepage.html"; // Redirect to homepage
}