const form = document.getElementById("main-form");
const userId = document.getElementById("user-id").value;

form.addEventListener("submit", e => {
    e.preventDefault(); //prevent redirect
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:3000/api/order/create/${userId}`);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(JSON.parse(xhr.responseText));
        }
    };

    const data = {
        paymentMethod: formData.get("payment_method"),
        shippingAddress: formData.get("shipping_address"),
    };

    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(data));
});
