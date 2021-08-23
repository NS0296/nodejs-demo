let tblBody = document.getElementById("tbody");

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
        const product = tblBody.children[i];

        //add actions cell
        let cellActions = document.createElement("td");
        cellActions.className = "actions";

        //create delete action button
        let actionButtonDelete = document.createElement("button");
        actionButtonDelete.className = "actionButtons deleteButtons";
        actionButtonDelete.innerText = "Delete";

        actionButtonDelete.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/product/destroy/${product.dataset.productId}`;
            xhr.open("DELETE", reqUrl, true);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    getNthParentOf(actionButtonDelete, 2).remove();
                }
            };

            xhr.send();
        });

        //create edit action button
        let actionButtonEdit = document.createElement("button");
        actionButtonEdit.className = "actionButton editButton";
        actionButtonEdit.innerText = "Edit";

        actionButtonEdit.addEventListener("click", () => {
            const allRowCells = getAllSiblings(actionButtonEdit.parentNode);
            allRowCells.shift();
            cellActions.replaceChild(actionButtonUpdate, actionButtonEdit);
            allRowCells.forEach(cell => {
                const input = document.createElement("input");
                input.value = cell.innerText;
                cell.replaceChild(input, cell.firstChild);
            });
        });

        //create update action button
        let actionButtonUpdate = document.createElement("button");
        actionButtonUpdate.className = "actionButton updateButton";
        actionButtonUpdate.innerText = "Update";

        actionButtonUpdate.addEventListener("click", () => {
            const allRowCells = getAllSiblings(actionButtonUpdate.parentNode);
            allRowCells.shift(); //remove id cell
            cellActions.replaceChild(actionButtonEdit, actionButtonUpdate);
            const newProductData = {
                title: allRowCells[0].firstChild.value,
                categoryName: allRowCells[1].firstChild.value,
                price: allRowCells[2].firstChild.value,
                stock: allRowCells[3].firstChild.value,
            };

            //send new data in ajax call
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/product/update/${product.dataset.productId}`;
            xhr.open("PUT", reqUrl, true);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    if (JSON.parse(xhr.response)[0].affectedRows >= 1) {
                        for (let i = 0; i < allRowCells.length; i++) {
                            const cell = allRowCells[i];
                            const textNode = document.createTextNode(
                                cell.firstChild.value
                            ); //firstchild -> input
                            cell.replaceChild(textNode, cell.firstChild);
                        }
                    }
                }
            };

            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(newProductData));
        });

        cellActions.appendChild(actionButtonDelete);
        cellActions.appendChild(actionButtonEdit);
        product.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
