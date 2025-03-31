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
        window.location.href = "../pages/homepage.html"; // Redirect to homepage
    } else {
        alert("Invalid In-Game Name or password. Please try again.");
    }
}

// Handle third-party login
function displayMessage(provider) {
    const providerIGN = `${provider}-ign`.toLowerCase();

    let registeredUsers = JSON.parse(localStorage.getItem("users")) || {};

    if (!registeredUsers[providerIGN]) {
        // Generate a new user number
        function generateUserNumber() {
            const randomID = Array.from({ length: 12 }, () =>
                Math.floor(Math.random() * 10)
            ).join("");
            return `${randomID.slice(0, 4)} ${randomID.slice(4, 8)} ${randomID.slice(8, 12)}`;
        }

        registeredUsers[providerIGN] = {
            ign: providerIGN,
            userId: generateUserNumber(),
            fullName: `${provider} User`, // Default name
            password: "", // No password needed for provider login
        };

        localStorage.setItem("users", JSON.stringify(registeredUsers));
    }

    localStorage.setItem("loggedInUser", providerIGN);
    alert(`Signing in with ${provider}...`);
    window.location.href = "../pages/homepage.html"; // Redirect to homepage
}