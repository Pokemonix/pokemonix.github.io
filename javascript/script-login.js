function login() {
    const ignInput = document.getElementById("text").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    let registeredUsers = JSON.parse(localStorage.getItem("users")) || {}; // Retrieve users

    if (!ignInput || !password) {
        alert("Please enter both your In-Game Name and password!");
        return;
    }

    let userFound = registeredUsers[ignInput];

    if (userFound && userFound.password === password) {
        alert(`Welcome back, Trainer ${userFound.ign}!`);
        window.location.href = "../pages/homepage.html"; // Redirect to homepage
    } else {
        alert("Invalid In-Game Name or password. Please try again.");
    }
}