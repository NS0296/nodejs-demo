let tblBody = document.getElementById("tbody");
let tblHead = document.getElementById("thead");

//add actions column
// let columnActions = document.createElement("th");
// columnActions.innerText = "ACTIONS";
// tblHead.appendChild(columnActions);

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

class ItemData {
    constructor(
        name,
        categoryName,
        manufacture,
        price,
        stockAvailable,
        dateFirstAvailable
    ) {
        this.name = name;
        this.categoryName = categoryName;
        this.manufacture = manufacture;
        this.price = price;
        this.stockAvailable = stockAvailable;
        this.dateFirstAvailable = dateFirstAvailable;
    }
}

const addActionCells = () => {
    for (let i = 0; i < tblBody.children.length; i++) {
        const item = tblBody.children[i];

        //add actions cell
        let cellActions = document.createElement("td");
        cellActions.className = "actions";

        //delete action button
        let actionButtonDelete = document.createElement("button");
        actionButtonDelete.className = "actionButtons deleteButtons";
        actionButtonDelete.innerText = "Delete";
        actionButtonDelete.dataset.itemId = item.dataset.itemId;

        actionButtonDelete.addEventListener("click", () => {
            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/items/delete/${actionButtonDelete.dataset.itemId}`;
            xhr.open("DELETE", reqUrl, true);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    let deletedRow = getNthParentOf(actionButtonDelete, 2);
                    deletedRow.remove();
                }
            };
            xhr.send();
        });

        //edit action button
        let actionButtonEdit = document.createElement("button");
        actionButtonEdit.className = "actionButton editButton";
        actionButtonEdit.innerText = "Edit";
        actionButtonEdit.dataset.itemId = item.dataset.itemId;
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

        //update action button
        let actionButtonUpdate = document.createElement("button");
        actionButtonUpdate.className = "actionButton updateButton";
        actionButtonUpdate.innerText = "Update";
        actionButtonUpdate.dataset.itemId = item.dataset.itemId;

        actionButtonUpdate.addEventListener("click", () => {
            const allRowCells = getAllSiblings(actionButtonUpdate.parentNode);
            allRowCells.shift(); //remove id cell
            cellActions.replaceChild(actionButtonEdit, actionButtonUpdate);
            const newData = new ItemData(
                allRowCells[0].firstChild.value,
                allRowCells[1].firstChild.value,
                allRowCells[2].firstChild.value,
                allRowCells[3].firstChild.value,
                allRowCells[4].firstChild.value,
                "2000-01-01 00:00:00"
                /*allRowCells[5].firstChild.value*/
            );

            for (let i = 0; i < allRowCells.length; i++) {
                const cell = allRowCells[i];
                const textNode = document.createTextNode(cell.firstChild.value); //firstchild -> input
                cell.replaceChild(textNode, cell.firstChild);
            }

            const xhr = new XMLHttpRequest();
            let reqUrl = `http://localhost:3000/api/items/update/${actionButtonUpdate.dataset.itemId}`;
            xhr.open("POST", reqUrl, true);

            xhr.onload = () => {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                }
            };

            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader("Accept", "application/json");
            xhr.send(JSON.stringify(newData));
        });

        cellActions.appendChild(actionButtonDelete);
        cellActions.appendChild(actionButtonEdit);
        item.appendChild(cellActions);
    }
};

document.addEventListener("DOMContentLoaded", addActionCells);
