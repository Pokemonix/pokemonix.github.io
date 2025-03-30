document.addEventListener("DOMContentLoaded", function () {
    const playerIdInput = document.getElementById("player-id");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const ignInput = document.getElementById("ign");

    function generatePlayerID() {
        const randomID = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10)).join("");
        playerIdInput.value = `${randomID.slice(0, 4)} ${randomID.slice(4, 8)} ${randomID.slice(8, 12)}`;
    }
    generatePlayerID();

    function showError(input, message) {
        let errorMessage = input.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("div");
            errorMessage.classList.add("error-message");
            input.parentNode.insertBefore(errorMessage, input.nextSibling);
        }
        input.classList.add("error");
        errorMessage.textContent = message;
    }

    function clearError(input) {
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.remove();
        }
        input.classList.remove("error");
    }

    const existingIGNs = ["PokeMaster", "AshKetchum", "PikaFan"];
    ignInput.addEventListener("input", function () {
        let availabilityMessage = document.getElementById("ign-availability");
        if (!availabilityMessage) {
            availabilityMessage = document.createElement("div");
            availabilityMessage.id = "ign-availability";
            ignInput.parentNode.insertBefore(availabilityMessage, ignInput.nextSibling);
        }

        if (existingIGNs.includes(ignInput.value.trim())) {
            availabilityMessage.textContent = "IGN not available. Please choose another.";
            availabilityMessage.style.color = "red";
        } else {
            availabilityMessage.textContent = "IGN available!";
            availabilityMessage.style.color = "green";
        }
    });

    window.register = function () {
        let isValid = true;

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (passwordInput.value.length < 8) {
            showError(passwordInput, "Password must be at least 8 characters.");
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, "Passwords don't match.");
            isValid = false;
        } else {
            clearError(confirmPasswordInput);
        }

        if (!ignInput.value.trim()) {
            showError(ignInput, "In-Game Name is required.");
            isValid = false;
        } else {
            clearError(ignInput);
        }

        if (isValid) {
            let registeredUsers = JSON.parse(localStorage.getItem("users")) || {};

            const ignKey = ignInput.value.trim().toLowerCase(); // Store by IGN (lowercased)

            if (registeredUsers[ignKey]) {
                alert("This IGN is already registered. Try logging in.");
                return;
            }

            registeredUsers[ignKey] = {
                email: emailInput.value.toLowerCase(), // Store email too
                password: passwordInput.value,
                ign: ignInput.value.trim(),
                playerId: playerIdInput.value
            };

            localStorage.setItem("users", JSON.stringify(registeredUsers));
            alert(`Registration successful! Welcome, Trainer ${ignInput.value.trim()}!`);
            window.location.href = "../index.html"; // Redirect to login page
        }
    };
});