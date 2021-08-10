let tblBody = document.getElementById("tbody");
let tblHead = document.getElementById("thead");
let userId = document.getElementById("user-id").value; //current logged in user id

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
            let reqUrl = `http://localhost:3000/api/carts/add/${userId}/${actionButtonAddToCart.dataset.itemId}`;
            xhr.open("GET", reqUrl, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            };
            xhr.send();
        });

        cellActions.appendChild(actionButtonAddToCart);
        item.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
