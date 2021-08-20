let tblBody = document.getElementById("tbody");
let userId = document.getElementById("user-id").value;

const getNthParentOf = (node, i) => {
    while (i > 0) {
        node = node.parentElement;
        i--;
    }
    return node;
};

const addActionCells = () => {
    //first row is for create
    for (let i = 0; i < tblBody.children.length; i++) {
        const item = tblBody.children[i];

        //add actions cell
        let cellActions = document.createElement("td");
        cellActions.className = "actions";

        //delete action button
        let actionButtonDelete = document.createElement("button");
        actionButtonDelete.className = "actionButtons deleteButtons";
        actionButtonDelete.innerText = "Delete";

        actionButtonDelete.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/carts/delete/${userId}/${item.dataset.productId}`;
            xhr.open("DELETE", reqUrl, true);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    let deletedRow = getNthParentOf(actionButtonDelete, 2);
                    deletedRow.remove();
                }
            };
            xhr.send();
        });

        cellActions.appendChild(actionButtonDelete);
        item.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
