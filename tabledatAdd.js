let currentId = 1; // Variable to keep track of the current ID

function addOrUpdateRow() {
    const nameInput = document.getElementById('nameInput').value;

    if (nameInput.trim() === '') {
        alert('Please enter a name.');
        return;
    }

    const table = document.getElementById('dataTable');
    const tbody = table.getElementsByTagName('tbody')[0];

    // Check if the name already exists in the table
    const existingRow = findRowByName(nameInput);

    if (existingRow) {
        // If the name exists, update the existing row
        const id = existingRow.cells[0].textContent;
        updateRow(existingRow, id, nameInput);
    } else {
        // If the name doesn't exist, add a new row
        addRow(tbody, currentId, nameInput);
        currentId++; // Increment the ID for the next entry
    }

    // Clear the input field
    document.getElementById('nameInput').value = '';
}


function addRow(tbody, id, name) {
    const newRow = tbody.insertRow();
    const cellId = newRow.insertCell(0);
    const cellName = newRow.insertCell(1);
    const cellAction = newRow.insertCell(2);

    cellId.textContent = id;
    cellName.textContent = name;

    // Add Edit and Delete buttons
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function () {
        editRow(newRow);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        deleteRow(newRow);
    };

    cellAction.appendChild(editButton);
    cellAction.appendChild(deleteButton);
}


function updateRow(row, id, name) {
    row.cells[0].textContent = id;
    row.cells[1].textContent = name;
}

function editRow(row) {
    const id = row.cells[0].textContent;
    const name = row.cells[1].textContent;

    // Populate the input field with the existing data
    document.getElementById('nameInput').value = name;

    // Remove the existing row
    row.parentNode.removeChild(row);
}


function deleteRow(row) {
    row.parentNode.removeChild(row);
}



function findRowByName(name) {
    const table = document.getElementById('dataTable');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const rowName = rows[i].cells[1].textContent;

        if (rowName === name) {
            return rows[i];
        }
    }

    return null;
}
