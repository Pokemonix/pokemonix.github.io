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

    function createPasswordToggle(inputId, toggleId) {
        const inputField = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        toggleIcon.addEventListener("click", function () {
            if (inputField.type === "password") {
                inputField.type = "text";
                toggleIcon.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                inputField.type = "password";
                toggleIcon.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }
    createPasswordToggle("password", "togglePassword");
    createPasswordToggle("confirm-password", "toggleConfirmPassword");

    // IGN Availability Check (Simulation using JSON)
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

    function updateButtonSpacing() {
        const button = document.querySelector("button");
        const errorMessages = document.querySelectorAll(".error-message");

        if (errorMessages.length > 0) {
            button.classList.add("error-spacing");
        } else {
            button.classList.remove("error-spacing");
        }
    }

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
    
        updateButtonSpacing();
    
        if (isValid) {
            let registeredUsers = JSON.parse(localStorage.getItem("users")) || {};
            const ignLower = ignInput.value.trim().toLowerCase();
    
            if (registeredUsers[ignLower]) {
                alert("IGN already registered. Please use a different IGN.");
                return;
            }
    
            const playerId = playerIdInput.value.trim(); 
    
            registeredUsers[ignLower] = {
                email: emailInput.value,
                password: passwordInput.value,
                playerId: playerIdInput.value,
                ign: ignInput.value.trim(),
            };
    
            localStorage.setItem("users", JSON.stringify(registeredUsers));
    
            alert("Registration successful! You can now log in.");
            window.location.href = "../index.html";
        }
    };    
});