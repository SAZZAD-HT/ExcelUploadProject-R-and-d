// ... (your existing code)

// Add the "Action" column header
headerRow.insertCell(list[0].length).textContent = "Action";

for (var i = 0; i < list.length; i++) {
    var row = table.insertRow(-1);

    for (var j = 0; j < list[i].length; j++) {
        var l = j;
        var cell = row.insertCell(j >= 9 ? j - 2 : j);

        if (j !== 7 && j !== 8) {
            if (j > 3 && j != 6 && j != 12) {
                cell.textContent = parseFloat(list[i][l]).toFixed(2);
            } else {
                if (j == 6 || j == 12) {
                    cell.textContent = Math.abs(list[i][j]) % 1 === 0.5 ? Math.floor(list[i][j]) : Math.round(list[i][j]);
                } else {
                    cell.textContent = list[i][l];
                }
            }
        }

        // Add a button in the "Action" column for the last column
        if (j === list[i].length - 1) {
            var button = document.createElement('button');
            button.textContent = 'Edit'; // Change this text as needed
            button.classList.add('action-button');
            cell.appendChild(button);
        }
    }
}
21`wel
`
// ... (your existing code)
