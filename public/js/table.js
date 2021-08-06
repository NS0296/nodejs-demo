let tbl = document.getElementById("table");
let tblBody = document.getElementById("tbody");

const getNthParentOf = (elem, i) => {
    while (i > 0) {
        elem = elem.parentElement;
        i--;
    }
    return elem;
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
    constructor(username, email, address, phone) {
        this.username = username;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
}

const setupTable = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/admin/users", true);

    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            //creating all cells
            res.forEach(elem => {
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
                cellId.innerText = elem.id;
                cellUsername.innerText = elem.username;
                cellEmail.innerText = elem.email;
                cellPhone.innerText = elem.phone;
                cellAddress.innerText = elem.address;

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
                actionButtonDelete.dataset.userId = elem.id;

                actionButtonDelete.addEventListener("click", () => {
                    const xhr = new XMLHttpRequest();
                    let reqUrl = `http://localhost:3000/admin/delete/${actionButtonDelete.dataset.userId}`;
                    xhr.open("DELETE", reqUrl, true);

                    xhr.onload = () => {
                        if (xhr.status === 200) {
                            let deletedRow = getNthParentOf(actionButtonDelete, 2);
                            deletedRow.remove();
                        }
                    };
                    xhr.send();
                });

                //update action button
                let actionButtonUpdate = document.createElement("button");
                actionButtonUpdate.className = "actionButton updateButton";
                actionButtonUpdate.innerText = "Update";
                actionButtonUpdate.dataset.userId = elem.id;

                actionButtonUpdate.addEventListener("click", () => {
                    let allSiblings = getAllSiblings(row.firstChild);
                    const newData = new UserData(
                        allSiblings[0].innerText,
                        allSiblings[1].innerText,
                        allSiblings[2].innerText,
                        allSiblings[3].innerText
                    );

                    const xhr = new XMLHttpRequest();
                    let reqUrl = `http://localhost:3000/admin/update/${actionButtonUpdate.dataset.userId}`;
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
                cellActions.appendChild(actionButtonUpdate);
                row.appendChild(cellActions);

                tblBody.appendChild(row);
            });
        }
    };
    xhr.send();
};
document.addEventListener("DOMContentLoaded", setupTable);
