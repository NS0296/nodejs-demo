let tblBody = document.getElementById("tbody");
let tblHead = document.getElementById("thead");

const getNthParentOf = (node, i) => {
    while (i > 0) {
        node = node.parentElement;
        i--;
    }
    return node;
};

let getAllSiblings = e => {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

const addActionCells = () => {
    for (let i = 0; i < tblBody.children.length; i++) {
        const item = tblBody.children[i];

        //add actions cell
        let cellActions = document.createElement("td");
        cellActions.className = "actions";

        //add to cart action button
        let actionButtonAddToCart = document.createElement("button");
        actionButtonAddToCart.className = "actionButtons addToCartButton";
        actionButtonAddToCart.innerText = "Add to Cart";
        actionButtonAddToCart.dataset.itemId = item.dataset.itemId;

        actionButtonAddToCart.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/shop/cart/add/${actionButtonAddToCart.dataset.itemId}`;
            xhr.open("POST", reqUrl, true);
            xhr.onload = () => {
                console.log("Add to Cart clicked");
            };
            xhr.send();
        });

        cellActions.appendChild(actionButtonAddToCart);
        item.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
