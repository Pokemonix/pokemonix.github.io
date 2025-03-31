document.addEventListener("DOMContentLoaded", function () {
    const usernameElement = document.getElementById("username");

    let loggedInIGN = localStorage.getItem("loggedInUser");
    let users = JSON.parse(localStorage.getItem("users")) || {};

    console.log("Logged-in user:", loggedInIGN);
    console.log("Users data:", users);

    if (!loggedInIGN || !users[loggedInIGN]) {
        alert("User not found. Please log in.");
        window.location.href = "../index.html";
        return;
    }

    let userData = users[loggedInIGN];

    usernameElement.textContent = userData.ign || "Username";

    window.addEventListener("storage", function (event) {
        if (event.key === "users") {
            let updatedUsers = JSON.parse(localStorage.getItem("users")) || {};
            if (updatedUsers[loggedInIGN]) {
                usernameElement.textContent = updatedUsers[loggedInIGN].ign || "Username";
            }
        }
    });
});