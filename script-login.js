function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password!");
    } else {
        alert(`Welcome back, Trainer! Logging in with ${email}`);
    }
}

function displayMessage(method) {
    alert(`You chose to sign in with ${method}!`);
}

function attemptCatch() {
    alert("You tried to catch a Pokémon! Keep training!");
}