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
            const allCells = getAllSiblings(actionButtonEdit.parentNode);
            allCells.shift();
            cellActions.replaceChild(actionButtonUpdate, actionButtonEdit);
            allCells.forEach(cell => {
                const input = document.createElement("input");
                const newCell = document.createElement("td");
                input.value = cell.innerText;
                newCell.appendChild(input);
                cell.parentNode.replaceChild(
                    newCell,
                    cell.parentNode.childNodes[allCells.indexOf(cell) + 1]
                );
            });
        });

        //update action button
        let actionButtonUpdate = document.createElement("button");
        actionButtonUpdate.className = "actionButton updateButton";
        actionButtonUpdate.innerText = "Update";
        actionButtonUpdate.dataset.itemId = item.id;

        actionButtonUpdate.addEventListener("click", () => {
            const rowCells = getAllSiblings(actionButtonUpdate.parentNode);
            rowCells.shift(); //remove id cell
            cellActions.replaceChild(actionButtonEdit, actionButtonUpdate);
            const newData = new ItemData(
                rowCells[0].firstChild.value,
                rowCells[1].firstChild.value,
                rowCells[2].firstChild.value,
                rowCells[3].firstChild.value
            );

            for (let i = 0; i < rowCells.length; i++) {
                const cell = rowCells[i];
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
