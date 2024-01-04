const api = "http://192.168.0.11:8020/";
//const api = "https://localhost:5050/";
const DDlApiLive ="http://192.168.0.11:8080";
//const DDlApiLive ="http://localhost:55800/";
var ExcelPopulate = {
    getDataofExcel: async function () {
        try {
            var input = document.getElementById('fileInput');
            var file = input.files[0];

            if (file) {
                var arrayBuffer = await file.arrayBuffer();
                var data = new Uint8Array(arrayBuffer);
                var workbook = XLSX.read(data, { type: 'array' });
                var targetSheetIndex = 1;
                var targetSheet = workbook.Sheets[workbook.SheetNames[targetSheetIndex]];
                let list = [];
                if (targetSheet) {
                    var rows = XLSX.utils.sheet_to_json(targetSheet, { header: 1 });
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = 0; j < rows[i].length; j++) {
                            if (rows[i][j] >= 1 && j == 0) {
                                list.push(rows[i]);
                            }
                        }
                    }
                    console.log(list);
                    var table = document.getElementById('table');
                    var rowCount = table.rows.length;
                    for (var i = 1; i < rowCount; i++) {
                        table.deleteRow(1);
                    }
                    var headerRow = table.insertRow(0);
                    for (var i = 0; i < list.length; i++) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < list[i].length; j++) {
                            if (j !== 8 && j !== 9) {
                                var l = j;
                                var cell = row.insertCell(j >= 9 ? j - 2 : j);
                                if (j > 4 && j != 7 && j != 13) {
                                    cell.textContent = parseFloat(list[i][l]).toFixed(2);
                                } else {
                                    if (j == 7 || j == 13) {
                                        cell.textContent = Math.abs(list[i][j]) % 1 === 0.5 ? Math.floor(list[i][j]) : Math.round(list[i][j]);
                                    } else {
                                        cell.textContent = list[i][l];
                                    }
                                    if (j == 13) {
                                        var cell = row.insertCell(12);
                                        var btnStr = '<button  id="btnEdit" type="button" onclick="EditRow()">Edit</button><button type="button"id="btnDelete" onclick="DeleteRow()">Delete</button>';
                                        cell.innerHTML = btnStr;
                                       
                                    }
                                }
                            }

                        }
                    }
                    //Do not delete this code
                    //var inputBox = document.getElementById('inputBox');
                    //if (inputBox) {
                    //    inputBox.value = cellValue;
                    //}
                    //var targetCell = 'N4';
                    //cellValue = new Date().toLocaleString();
                    //var inputBox = document.getElementById('inputDate');
                    //if (inputBox) {
                    //    inputBox.value = cellValue;
                    //}
                   
                //    targetCell = 'C6';
                //    document.getElementById('styleName').value = targetSheet[targetCell]?.v;

                //    targetCell = 'C4';
                //    document.getElementById('buyerName').value = targetSheet[targetCell]?.v;
                //} else {
                   // console.error('Sheet not found:', targetSheetIndex);
                }
             }
                else {
                console.error('No file selected.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },
    populateRow: function (rowData) {
        document.getElementById('txtOpenNo').value = rowData[0];
        document.getElementById('txtSection').value = rowData[1];
        document.getElementById('txtProcessCode').value = rowData[2];
        document.getElementById('txtProcessName').value = rowData[3];
        document.getElementById('txtMachineName').value = rowData[4];
        document.getElementById('txtTmu').value = rowData[5];
        document.getElementById('txtSmv').value = rowData[6];
        document.getElementById('txtHrtarget').value = rowData[7];
        document.getElementById('txtbalancingTarget').value = rowData[8];
        document.getElementById('txtTml').value = rowData[9];
        document.getElementById('txtAml').value = rowData[10];
        console.log( rowData);
        document.getElementById('txtdailyTarget').value = rowData[11];
    },
    deleteRow: function (row) {
        if (confirm("Are you sure you want to delete this row?")) {
            row.parentNode.removeChild(row);
        }
    },
    updateOrAddRow: function () {
        var table = document.getElementById('table');
        var rowData = [];

        for (var i = 0; i < 12; i++) {
             
            var inputId = 'txt' + ['OpenNo', 'Section', 'ProcessCode', 'ProcessName', 'MachineName', 'Tmu', 'Smv', 'Hrtarget', 'balancingTarget', 'Tml', 'Aml', 'dailyTarget'][i];
            rowData.push(document.getElementById(inputId).value);
        }

        var existingRow = null;

        for (var i = 1; i < table.rows.length; i++) {
            if (table.rows[i].cells[0].textContent === rowData[0]) {
                existingRow = table.rows[i];
                break;
            }
        }

        if (existingRow) {
            alert("Are You Sure Want To Replace This Row " );
            for (var j = 0; j < rowData.length; j++) {
                
                existingRow.cells[j].textContent = rowData[j];
            }
        } else {
            var newRow = table.insertRow(-1);

            for (var k = 0; k < rowData.length; k++) {
                var cell = newRow.insertCell(k);
                cell.textContent = rowData[k];
            }

            var editCell = newRow.insertCell(rowData.length);
            var deleteCell = newRow.insertCell(rowData.length + 1);

            var editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = function () {
                ExcelPopulate.editRow(newRow);
            };

            var deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = function () {
                ExcelPopulate.deleteRow(newRow);
            };

            editCell.appendChild(editBtn);
            deleteCell.appendChild(deleteBtn);
        }      
        for (var i = 0; i < 12; i++) {
            var inputId = 'txt' + ['OpenNo', 'Section', 'ProcessCode', 'ProcessName', 'MachineName', 'Tmu', 'Smv', 'Hrtarget', 'balancingTarget', 'Tml', 'Aml', 'dailyTarget'][i];
            document.getElementById(inputId).value = '';
        }
    },

    editRow: function (row) {
        var cells = row.getElementsByTagName('td');
        var rowData = [];
         

        for (var i = 0; i < cells.length - 1; i++) {
            rowData.push(cells[i].textContent);
        }
        ExcelPopulate.populateRow(rowData);        
        row.parentNode.removeChild(row);
    }
};

function EditRow() {
    var selectedRow = event.target.parentNode.parentNode;
    ExcelPopulate.editRow(selectedRow);
}

function GetBuyersDDl() {
    const buyerDropdown = document.getElementById("buyerName");

    // Make a request to the API
    fetch(DDlApiLive+`/Buyer/GetAllBuyers`)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.Buyer_id;
                option.text = buyer.Buyer_name;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
  
}

document.addEventListener("DOMContentLoaded", function () {
    GetBuyersDDl();
});

function DeleteRow() {
    var selectedRow = event.target.parentNode.parentNode;
    ExcelPopulate.deleteRow(selectedRow);
}



function SaveData() {
    
    var BuyerNameSelect = document.getElementById("buyerName");
    var StyleNameSelect = document.getElementById("styleName");
    

    const buyerName = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].text;
    const buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
    const styleName = StyleNameSelect.options[StyleNameSelect.selectedIndex].text;
    const styleId = StyleNameSelect.options[StyleNameSelect.selectedIndex].value;
    const itemId = 0;
    const ItemName = "";
    const InputDate = new Date();
    const Ietarget = 0;
    const BalancingTarget = 0;
    const LineId = 0;
    const IsActive = true;
    const CreatedBy = 0;
    const CreatedDateTime = new Date();
    const ExpectedEfficency = document.getElementById("txtExpectedEffciency").value;
    const UnitId = document.getElementById("unitId").innerText.trim() ;
    const BulletinName = "";//document.getElementById("BulletinName").value;

    const dataSave = {
        "BuyerId": buyerId,
        "BuyerName": buyerName,
        "StyleId": styleId,
        "StyleName": styleName,
        "ItemId": itemId,
        "ItemName": ItemName,
        "InputDate": InputDate,
        "Ietarget": Ietarget,
        "BalancingTarget": BalancingTarget,
        "LineId": LineId,
        "IsActive": IsActive,
        "CreatedBy": CreatedBy,
        "CreatedDateTime": CreatedDateTime,
        "ExpectedEfficency": ExpectedEfficency,
        "UnitId": UnitId,
        "BulletinName": BulletinName,
        "BulletinRows": [],
        "LerningCurves": [],
    };

    var oTable = document.getElementById('table');

    
    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 2; i < rowLength; i++) {

        
        var oCells = oTable.rows.item(i).cells;

       
        var cellLength = oCells.length;

        const bulletinRow = {

            "OpenNo": oCells.item(0).innerHTML,
            "Section": oCells.item(1).innerHTML,
            "ProcessCode": oCells.item(2).innerHTML,
            "ProcessName": oCells.item(3).innerHTML,
           
            "MachineName": oCells.item(4).innerHTML,
            "Tmu": oCells.item(5).innerHTML,
            "Smv": oCells.item(6).innerHTML,
            "TargetHr100Percentage": oCells.item(7).innerHTML,
            "BlnTargetHr": oCells.item(8).innerHTML,
            "Tml": oCells.item(9).innerHTML,
            "Aml": oCells.item(10).innerHTML,
            "TargetDay": oCells.item(11).innerHTML,
        };
        console.log(bulletinRow);
        dataSave.BulletinRows.push(bulletinRow);
        for (var j = 0; j < cellLength; j++) {
           

            var cellVal = oCells.item(j).innerHTML;
            console.log(cellVal);
        }
    }
   

    

    
    var oTable = document.getElementById("learningCurveTable");
    var rowLengthLEr = oTable.rows.length;
    for (i = 1; i < rowLengthLEr; i++) {


        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        const learningCurve = {
            "Day": oCells.item(0).innerHTML,
            "Efficiency": oCells.item(1).innerHTML,
            "Target": oCells.item(2).innerHTML,
        };
        dataSave.LerningCurves.push(learningCurve);
    }
     

    console.log(JSON.stringify(dataSave));
    const apiUrl = api+'api/ProductionEmpEfficiency/CreateUpdateBulletin';

    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(dataSave), // Convert dataSave to JSON string
    })
        .then(response => response.json())
        .then(result => {
            
            console.log('API Response:', result);
            if (result.Success == false) {
                alert(result.Message);
            }
            else { 
                alert("Data Saved Successfully");
                location.reload();
            }
          
        })
        .catch(error => {
            alert("Data Saved Failed");)
            console.error('Error:', error);
        });
}
function GetStyleDDl() {
    const buyerDropdown = document.getElementById("styleName");
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value

     

    // Make a request to the API
    fetch(DDlApiLive+`/EmpEffs/GetStylesByBuyerId?nBuyerId=${buyerId}`)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.Id;
                option.text = buyer.StyleNo;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}

function CheackProcessApi(ProcessCode) {

    const apiUrl = api + `api/ProductionEmpEfficiency/cheackProcessCode?Code=${ProcessCode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            data.forEach(buyer => {

                console.log('API Response:', result);
                if (result.Success == false) {
                    return 0;
                }
                else {
                    return 1;
                   
                }
            });
        })
        .catch(error => console.error("Error fetching data:", error));

}
function CheackProcessColor() {

    var oTable = document.getElementById('table');


    var rowLength = oTable.rows.length;

    //loops through rows    
    for (i = 2; i < rowLength; i++) {


        var oCells = oTable.rows.item(i).cells;


        var cellLength = oCells.length; 

        var ProcessCode = oCells.item(2).innerHTML;
        var rr = CheackProcessApi(ProcessCode);
    }

}


