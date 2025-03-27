// loader
window.addEventListener("load", () => {
    const webloader = document.querySelector(".web-loader");
    webloader.classList.add("web-loader--hidden");
    webloader.addEventListener("transitionend", () => {
        document.body.removeChild(webloader)
    })
});

// navbar
const toggleButton = document.getElementById("toggle-button");
const sidebar = document.getElementById("sidebar");

const openIcon = toggleButton.querySelector(".bxs-right-arrow");
const closeIcon = toggleButton.querySelector(".bxs-left-arrow");

closeIcon.style.display = "none";

toggleButton.addEventListener("click", () => {
  sidebar.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    openIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    openIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
});


function navigateTo(url) {
    window.location.href = url;
  }