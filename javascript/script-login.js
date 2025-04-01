document.addEventListener("DOMContentLoaded", function () {
    if (!sessionStorage.getItem("alertShown")) {
        alert("Please register first or sign in using the other options.");
        sessionStorage.setItem("alertShown", "true");
    }
});

function login() {
    const ignInput = document.getElementById("text").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    let registeredUsers = JSON.parse(localStorage.getItem("users")) || {};

    if (!ignInput || !password) {
        alert("Please enter both your In-Game Name and password!");
        return;
    }

    let userFound = registeredUsers[ignInput];

    if (userFound && userFound.password === password) {
        localStorage.setItem("loggedInUser", ignInput);
        alert(`Welcome back, Trainer ${userFound.ign}!`);
        window.location.href = "../pages/homepage.html";
    } else {
        alert("Invalid In-Game Name or password. Please try again.");
    }
}

// Handle third-party login
function displayMessage(provider) {
    const providerIGN = `${provider}-ign`.toLowerCase();
    let registeredUsers = JSON.parse(localStorage.getItem("users")) || {};

    if (!registeredUsers[providerIGN]) {
        function generateUserNumber() {
            return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("").replace(/(\d{4})/g, "$1 ").trim();
        }

        registeredUsers[providerIGN] = {
            ign: providerIGN,
            playerId: generateUserNumber(),
            fullName: `${provider} User`,
            email: "",
            password: "",
        };

        localStorage.setItem("users", JSON.stringify(registeredUsers));
    }

    localStorage.setItem("loggedInUser", providerIGN);
    alert(`Signing in with ${provider}...`);
    window.location.href = "../pages/homepage.html";
}