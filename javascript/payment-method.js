document.addEventListener("DOMContentLoaded", function () {
    const paymentMethods = document.querySelectorAll("input[name='payment-method']");
    const paymentForm = document.querySelector(".payment-form");
    const payButton = document.querySelector(".payment-form-submit-button"); 
    const closeButton = document.querySelector("#close-payment"); 

    function updatePaymentForm(method) {
        let formContent = "";

        if (method === "method-3") { // PayPal
            formContent = `
                <div class="payment-form-group">
                    <input type="email" placeholder=" " class="payment-form-control" id="email">
                    <label for="email" class="payment-form-label payment-form-label-required">Email Address</label>
                </div>
                <div class="payment-form-group">
                    <input type="password" placeholder=" " class="payment-form-control" id="gcash-password">
                    <label for="gcash-password" class="payment-form-label payment-form-label-required">Password</label>
                </div>`;
        } else if (method === "method-4") { // GCash
            formContent = `
                <div class="payment-form-group">
                    <input type="text" placeholder=" " class="payment-form-control" id="full-name">
                    <label for="full-name" class="payment-form-label payment-form-label-required">Full Name</label>
                </div>
                <div class="payment-form-group">
                    <input type="text" placeholder=" " class="payment-form-control" id="gcash-number">
                    <label for="gcash-number" class="payment-form-label payment-form-label-required">GCash Number</label>
                </div>`;
        } else { 
            formContent = `
                <div class="payment-form-group">
                    <input type="email" placeholder=" " class="payment-form-control" id="email">
                    <label for="email" class="payment-form-label payment-form-label-required">Email Address</label>
                </div>
                <div class="payment-form-group">
                    <input type="text" placeholder=" " class="payment-form-control" id="card-number">
                    <label for="card-number" class="payment-form-label payment-form-label-required">Card Number</label>
                </div>
                <div class="payment-form-group-flex">
                    <div class="payment-form-group">
                        <input type="date" placeholder=" " class="payment-form-control" id="expiry-date">
                        <label for="expiry-date" class="payment-form-label payment-form-label-required">Expiry Date</label>
                    </div>
                    <div class="payment-form-group">
                        <input type="text" placeholder=" " class="payment-form-control" id="cvv">
                        <label for="cvv" class="payment-form-label payment-form-label-required">CVV</label>
                    </div>
                </div>`;
        }

        document.querySelectorAll(".payment-form-group, .payment-form-group-flex").forEach(el => el.remove());
        document.querySelector(".button-container").insertAdjacentHTML('beforebegin', formContent);
    }

    paymentMethods.forEach(method => {
        method.addEventListener("change", function () {
            updatePaymentForm(this.id);
        });
    });

    payButton.addEventListener("click", function (event) {
        event.preventDefault(); 

        const inputFields = document.querySelectorAll(".payment-form-control");
        let isEmpty = false;

        inputFields.forEach(input => {
            if (input.value.trim() === "") {
                isEmpty = true;
            }
        });

        if (isEmpty) {
            alert("Please fill in all required fields before proceeding");
        } else {
            alert("Thank you. Enjoy your purchase!");
        }
    });

    closeButton.addEventListener("click", function () {
        document.querySelector(".payment-form").style.display = "none"; 
    });
});
