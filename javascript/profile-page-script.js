document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector(".btn-edit");
    const popup = document.getElementById("edit-profile-popup");
    const closeBtn = document.querySelector(".close-btn");
    const saveBtn = document.getElementById("save-profile");
    const cancelBtn = document.getElementById("cancel-profile");

    // Form fields
    const nameInput = document.getElementById("edit-name");
    const ignInput = document.getElementById("edit-ign");
    const emailInput = document.getElementById("edit-email"); 

    // Profile display elements
    const fullNameElement = document.querySelector(".info-value.full-name");
    const ignElement = document.querySelector(".info-value.ign");
    const userIdElement = document.querySelector(".info-value.user-id");
    const emailElement = document.querySelector(".info-value.email"); 

    // Profile header elements
    const titleNameElement = document.getElementById("title-name");
    const titleUsernameElement = document.querySelector(".title-username");

    // Retrieve logged-in user
    let loggedInIGN = localStorage.getItem("loggedInUser");
    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (!loggedInIGN || !users[loggedInIGN]) {
        alert("User not found. Please log in.");
        window.location.href = "../index.html";
        return;
    }

    let userData = users[loggedInIGN];

    function loadProfile() {
        fullNameElement.textContent = userData.fullName || "N/A";
        ignElement.textContent = userData.ign || "N/A";
        userIdElement.textContent = userData.playerId || "N/A"; 
        emailElement.textContent = userData.email || "N/A"; 

        titleNameElement.textContent = userData.fullName || "User Pikachu"; 
        titleUsernameElement.textContent = userData.ign || "Username"; 
    }    

    loadProfile();

    function openPopup() {
        nameInput.value = userData.fullName || "";
        ignInput.value = userData.ign || "";
        emailInput.value = userData.email || ""; 
        popup.style.display = "flex";
    }

    function closePopup() {
        popup.style.display = "none";
    }

    editButton.addEventListener("click", openPopup);
    closeBtn.addEventListener("click", closePopup);
    cancelBtn.addEventListener("click", closePopup);

    // Save changes
    saveBtn.addEventListener("click", function () {
        const newName = nameInput.value.trim();
        const newIGN = ignInput.value.trim();
        const newEmail = emailInput.value.trim();

        if (newName === "" || newIGN === "" || newEmail === "") {
            alert("Name, IGN, and Email cannot be empty.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(newEmail)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (newIGN !== loggedInIGN && users[newIGN]) {
            alert("This IGN is already taken. Please choose another.");
            return;
        }

        let oldPlayerId = userData.playerId || "N/A";
        let oldPassword = userData.password;

        if (newIGN !== loggedInIGN) {
            delete users[loggedInIGN];
        }

        users[newIGN] = {
            fullName: newName,
            ign: newIGN,
            playerId: oldPlayerId,
            email: newEmail, 
            password: oldPassword,
        };

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", newIGN);

        titleNameElement.textContent = newName;
        titleUsernameElement.textContent = newIGN;

        alert("Profile updated successfully!"); 
        location.reload(); 
    });
});