document.addEventListener("DOMContentLoaded", function () {
    const checkoutButton = document.querySelector(".checkout-btn"); 
    const paymentSection = document.querySelector(".payment-section");

    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            paymentSection.style.display = "block";
            window.scrollTo({ top: paymentSection.offsetTop, behavior: "smooth" }); 
        });
    }
});
