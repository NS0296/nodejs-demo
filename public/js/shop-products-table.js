let tblBody = document.getElementById("tbody");
let tblHead = document.getElementById("thead");

const addActionCells = () => {
    for (let i = 0; i < tblBody.children.length; i++) {
        const product = tblBody.children[i];

        //add actions cell
        let cellActions = document.createElement("td");
        cellActions.className = "actions";

        //add to cart action button
        let actionButtonAddToCart = document.createElement("button");
        actionButtonAddToCart.className = "actionButtons addToCartButton";
        actionButtonAddToCart.innerText = "Add to Cart";

        actionButtonAddToCart.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/cart/add/${product.dataset.productId}`;
            xhr.open("GET", reqUrl, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send();
        });

        cellActions.appendChild(actionButtonAddToCart);
        product.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
