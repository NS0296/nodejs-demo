let tbl = document.getElementById("table");
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

class UserData {
    constructor(username, email, phone, address) {
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.address = address;
    }
}

const setupTable = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/users", true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            //creating all cells
            res.forEach(user => {
                let row = document.createElement("tr");

                //creates a cell per column property
                let cellId = document.createElement("td");
                let cellUsername = document.createElement("td");
                let cellEmail = document.createElement("td");
                let cellPhone = document.createElement("td");
                let cellAddress = document.createElement("td");

                //add classes to all cells by column
                cellId.className = "id userData";
                cellUsername.className = "userData username";
                cellEmail.className = "userData email";
                cellPhone.className = "userData phone";
                cellAddress.className = "userData address";

                //add text to each cell
                cellId.innerText = user.id;
                cellUsername.innerText = user.username;
                cellEmail.innerText = user.email;
                cellPhone.innerText = user.phone;
                cellAddress.innerText = user.address;

                row.appendChild(cellId);
                row.appendChild(cellUsername);
                row.appendChild(cellEmail);
                row.appendChild(cellPhone);
                row.appendChild(cellAddress);

                //add actions cell
                let cellActions = document.createElement("td");
                cellActions.className = "actions";

                //delete action button
                let actionButtonDelete = document.createElement("button");
                actionButtonDelete.className = "actionButtons deleteButtons";
                actionButtonDelete.innerText = "Delete";
                actionButtonDelete.dataset.userId = user.id;

                actionButtonDelete.addEventListener("click", () => {
                    const xhr = new XMLHttpRequest();
                    let reqUrl = `http://localhost:3000/api/delete/${actionButtonDelete.dataset.userId}`;
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
                actionButtonEdit.dataset.userId = user.id;
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
                actionButtonUpdate.dataset.userId = user.id;

                actionButtonUpdate.addEventListener("click", () => {
                    const rowCells = getAllSiblings(actionButtonUpdate.parentNode);
                    rowCells.shift(); //remove id cell
                    cellActions.replaceChild(actionButtonEdit, actionButtonUpdate);
                    const newData = new UserData(
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
                    let reqUrl = `http://localhost:3000/api/update/${actionButtonUpdate.dataset.userId}`;
                    xhr.open("POST", reqUrl, true);

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            console.log(xhr.response);
                        }
                    };

                    xhr.setRequestHeader(
                        "Content-Type",
                        "application/json;charset=UTF-8"
                    );
                    xhr.setRequestHeader("Accept", "application/json");
                    xhr.send(JSON.stringify(newData));
                });

                cellActions.appendChild(actionButtonDelete);
                cellActions.appendChild(actionButtonEdit);
                row.appendChild(cellActions);

                tblBody.appendChild(row);
            });
        }
    };
    xhr.send();
};
document.addEventListener("DOMContentLoaded", setupTable);
