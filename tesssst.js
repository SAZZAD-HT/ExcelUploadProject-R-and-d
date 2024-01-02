const api = "http://192.168.0.11:8020/";
//const api = "https://localhost:5050/";
function GetStyleDDl() {
    const buyerDropdown = document.getElementById("styleName");
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;

    buyerDropdown.innerHTML = '<option value="0">Select Style Name</option>';
    var date = document.getElementById("date").value;
   

    const unitId = document.getElementById("unitId").innerText.trim(); 
   
    fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=${buyerId}&styleId=0&lineId=0&UnitId=${unitId}&PartName=MappedStyleName&date=${date}`)
    //fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=${buyerId}&styleId=0&lineId=0&UnitId=${62}&PartName=MappedStyleName&date=${date}`)//Replace Unit Id
        .then(response => response.json())
        .then(data => {


            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.StyleId;
                option.text = buyer.StyleName;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}
function GetLineNameDdl() {

    const buyerDropdown = document.getElementById("silLineName");
    var date = document.getElementById("date").value;
    buyerDropdown.innerHTML = '<option value="0">Select Style Name</option>';

    const unitId = document.getElementById("unitId").innerText.trim(); // Use innerText to get the text content without extra whitespace
  
    fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=0&styleId=0&lineId=0&UnitId=${unitId}&PartName=MappedLineName&date=${date}`)
    //fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=0&styleId=0&lineId=0&UnitId=${62}&PartName=MappedLineName&date=${date}`)//Replace Unit Id
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data);

            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.LineId;
                option.text = buyer.LineName;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

}
function GetBuyersDDl() {
    const buyerDropdown = document.getElementById("buyerName");
    buyerDropdown.innerHTML = '<option value="0">Select Style Name</option>';
    var date = document.getElementById("date").value;
    const unitId = document.getElementById("unitId").innerText.trim(); // Use innerText to get the text content without extra whitespace
    
    fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=0&styleId=0&lineId=0&UnitId=${unitId}&PartName=MappedBuyerName&date=${date}`)
    //fetch(api + `api/ProductionEmpEfficiency/ddl?buyerId=0&styleId=0&lineId=0&UnitId=${62}&PartName=MappedBuyerName&date=${date}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.BuyerId;
                option.text = buyer.BuyerName;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

}
let globalData = [];

function GetEmployeeByProcess() {
    
    const table = document.getElementById("table");
   
    var rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    var inputDate = document.getElementById("date").value;
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
    const unitId = document.getElementById("unitId").innerText.trim();
    const lineDropdown = document.getElementById("silLineName");
    const lineID = lineDropdown.options[lineDropdown.selectedIndex].value;
    const StyleDropdown = document.getElementById("styleName");
    const styleID = StyleDropdown.options[StyleDropdown.selectedIndex].value;

    //console.log(`api/ProductionEmpEfficiency/MappedProcessesLineWise?buyerId=${buyerId}&styleId=${styleID}&lineId=${lineID}&date=${inputDate}&unitId=62`);
    fetch(api + `api/ProductionEmpEfficiency/MappedProcessesLineWise?buyerId=${buyerId}&styleId=${styleID}&lineId=${lineID}&date=${inputDate}&unitId=${unitId}`)//change it
        .then(response => response.json())
        .then(data => {
            if (data != null) {
                
                globalData = data;
            }
            
            let h1 = 0, h2 = 0, h3 = 0, h4 = 0, h5 = 0, h6 = 0, h7 = 0, h8 = 0, h9 = 0, h10 = 0; h11 = 0; h12 = 0; h13 = 0; h14 = 0;
            let EffDtID1 = 0, EffDtID2 = 0, EffDtID3 = 0, EffDtID4 = 0, EffDtID5 = 0, EffDtID6 = 0, EffDtID7 = 0, EffDtID8 = 0, EffDtID9 = 0, EffDtID10 = 0; EffDtID11 = 0; EffDtID12 = 0; EffDtID13 = 0; EffDtID14 = 0;
            globalData.forEach((employee, index) => {

                console.log(employee);
                const tr = table.insertRow();
                tr.insertCell().textContent = index;
                tr.insertCell().textContent = employee.EmployeeName;
                tr.insertCell().textContent = employee.MachineName;
                tr.insertCell().textContent = employee.ProcessId + "=>" + employee.ProcessName;
                tr.insertCell().textContent = employee.TargetHr100Percentage;
                if (employee.HourlyData != null) {
                    try {
                        employee.HourlyData.forEach((h) => {
                            
                            h1 = h.HourNo == 1 ? h.ProdQty : h1;
                            h2 = h.HourNo == 2 ? h.ProdQty : h2;
                            h3 = h.HourNo == 3 ? h.ProdQty : h3;
                            h4 = h.HourNo == 4 ? h.ProdQty : h4;
                            h5 = h.HourNo == 5 ? h.ProdQty : h5;
                            h6 = h.HourNo == 6 ? h.ProdQty : h6;
                            h7 = h.HourNo == 7 ? h.ProdQty : h7;
                            h8 = h.HourNo == 8 ? h.ProdQty : h8;
                            h9 = h.HourNo == 9 ? h.ProdQty : h9;
                            h10 = h.HourNo == 10 ? h.ProdQty : h10;
                            h11 = h.HourNo == 11 ? h.ProdQty : h11;
                            h12 = h.HourNo == 12 ? h.ProdQty : h12;
                            h13 = h.HourNo == 13 ? h.ProdQty : h13;
                            h14 = h.HourNo == 14 ? h.ProdQty : h14;


                            EffDtID1 = h.HourNo == 1 ? h.EmpEffDetailId : EffDtID1;
                            EffDtID2 = h.HourNo == 2 ? h.EmpEffDetailId : EffDtID2;
                            EffDtID3 = h.HourNo == 3 ? h.EmpEffDetailId : EffDtID3;
                            EffDtID4 = h.HourNo == 4 ? h.EmpEffDetailId : EffDtID4;
                            EffDtID5 = h.HourNo == 5 ? h.EmpEffDetailId : EffDtID5;
                            EffDtID6 = h.HourNo == 6 ? h.EmpEffDetailId : EffDtID6;
                            EffDtID7 = h.HourNo == 7 ? h.EmpEffDetailId : EffDtID7;
                            EffDtID8 = h.HourNo == 8 ? h.EmpEffDetailId : EffDtID8;
                            EffDtID9 = h.HourNo == 9 ? h.EmpEffDetailId : EffDtID9;
                            EffDtID10 = h.HourNo == 10 ? h.EmpEffDetailId : EffDtID10;
                            EffDtID11 = h.HourNo == 11 ? h.EmpEffDetailId : EffDtID11;
                            EffDtID12 = h.HourNo == 12 ? h.EmpEffDetailId : EffDtID12;
                            EffDtID13 = h.HourNo == 13 ? h.EmpEffDetailId : EffDtID13;
                            EffDtID14 = h.HourNo == 14 ? h.EmpEffDetailId : EffDtID14;

                        });
                    } catch (e) { console.log(e); }
                }
                else { h1 = 0, h2 = 0, h3 = 0, h4 = 0, h5 = 0, h6 = 0, h7 = 0, h8 = 0, h9 = 0, h10 = 0; h11 = 0; h12 = 0; h13 = 0; h14 = 0; EffDtID1 = 0, EffDtID2 = 0, EffDtID3 = 0, EffDtID4 = 0, EffDtID5 = 0, EffDtID6 = 0, EffDtID7 = 0, EffDtID8 = 0, EffDtID9 = 0, EffDtID10 = 0; EffDtID11 = 0; EffDtID12 = 0; EffDtID13 = 0; EffDtID14 = 0; }
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${5}" name="${EffDtID1}"   onchange="saveData(${index},${5},${EffDtID1})" value="${h1}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${6}" name="${EffDtID2}"   onchange="saveData(${index},${6},${EffDtID2})" value="${h2}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${7}" name="${EffDtID3}"   onchange="saveData(${index},${7},${EffDtID3})" value="${h3}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${8}" name="${EffDtID4}"   onchange="saveData(${index},${8},${EffDtID4})" value="${h4}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${9}" name="${EffDtID5}"   onchange="saveData(${index},${9},${EffDtID5})" value="${h5}" class="form-control hour-prod" style="text-align: right;width: 48px;"/>`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${10}" name="${EffDtID6}"   onchange="saveData(${index},${10},${EffDtID6})" value="${h6}" class="form-control hour-prod" style="text-align: right;width: 48px;"/>`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${11}" name="${EffDtID7}"  onchange="saveData(${index},${11},${EffDtID7})" value="${h7}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${12}" name="${EffDtID8}"  onchange="saveData(${index},${12},${EffDtID8})" value="${h8}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${13}" name="${EffDtID9}"  onchange="saveData(${index},${13},${EffDtID9})" value="${h9}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${14}" name="${EffDtID10}" onchange="saveData(${index},${14},${EffDtID10})" value="${h10}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${15}" name="${EffDtID11}" onchange="saveData(${index},${15},${EffDtID11})" value="${h11}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${16}" name="${EffDtID12}" onchange="saveData(${index},${16},${EffDtID12})" value="${h12}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${17}" name="${EffDtID13}" onchange="saveData(${index},${17},${EffDtID13})" value="${h13}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
                tr.insertCell().innerHTML = ` <input for="${employee.TargetHr100Percentage}" type="text" id="hour${index}${18}" name="${EffDtID14}" onchange="saveData(${index},${18},${EffDtID14})" value="${h14}" class="form-control hour-prod" style="text-align: right;width: 48px;" />`;
              
                //var totalAchievement = 0;   
                //for (let i = 5; i <= 22; i++) {
                //    let inputValue = parseFloat(document.getElementById(`hour${index}${i}`).value);
                //    if (!isNaN(inputValue)) {
                //        totalAchievement += inputValue;
                //        totalHours++;
                //    }
              
                //    tr.insertCell().innerHTML = totalAchievement ;
                //    tr.insertCell().innerHTML = totalAchievement / employee.TargetHr100Percentage;

                const empNoCelle = tr.insertCell();
                empNoCelle.innerHTML = ` <input type="Text" id="Remarks${index}${15}" name="Date" placeholder="Remarks" onchange="saveData(${index},${14})"  class="form-control" style="text-align: right;width:100px%;" />`;
                empNoCelle.style.display = 'none';

                //const empNoCell = tr.insertCell();
                //empNoCell.innerHTML = employee.EmpEffId == null ? 0 : employee.EmpEffId;
                //empNoCell.style.display = 'none';
                
            });
            colorChangerOfProdInput();

            if (data) {
                if (nextInputIndex !="" )
                {
                    debugger;   
                    nextElement = document.getElementById(`${nextInputIndex}`);
                    nextElement.focus();
                    console.log("Data1 : ", nextInputIndex);
                }
             
            }
            
        })
        .catch((error) =>
        {
            console.log(error);
            alert("Error fetching data:", error)
        });

  
}
function clearInput(row, col, EffDtID) {
    var inputElement = document.getElementById(`hour${row}${col}`);
    if (inputElement) {
        inputElement.value = ""; // Set the value to an empty string
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // GetLineNameDdl();
    // GetBuyersDDl();
});

function addRow() {
    const table = document.getElementById("table");
    const headerRow = table.rows[0];    
    let remarkCellIndex = headerRow.cells.length-1;          
    const newHeaderCell = document.createElement("th");
    newHeaderCell.textContent = `Hour ${table.rows[0].cells.length - 4}`;
    headerRow.insertBefore(newHeaderCell, headerRow.cells[remarkCellIndex]); 
    for (let i = 1; i < table.rows.length ; i++) {
          const newCell = table.rows[i].insertCell(remarkCellIndex); 
          newCell.innerHTML = `<input type="text" id="hour${i},${table.rows[0].cells.length - 4}" name="Date"  onchange="saveData(${i},${table.rows[0].cells.length - 4})" value="0" class="form-control" style="text-align: right;width: 48px;" />`;
     }    
}

//function makeEditable(cell) {
//    var value = cell.innerText;
//    cell.innerHTML = '<input type="text" value="' + value + '" onblur="makeNonEditable(this)">';
//    var input = cell.querySelector('input');
//    input.focus();
//    input.select();
//}

//function makeNonEditable(input) {
//    var cell = input.parentElement;
//    var newValue = input.value;
//    cell.innerText = newValue;
//}
var Udata = {
    "EmpEffId": 0,
    "EmpEffNo": "",
    "EffDate": "",
    "UnitId": 0,
    "EmpId": 0,
    "BuyerId": 0,
    "StyleId": 0,
    "LineId": 0,
    "MachineId": 0,
    "ProcessId": 0,
    "GradeId": 0,
    "Remark": "",
    "EntryDate": "",
    "UserId": 0,
    "HrmEmpId": 0,
    "detail": []
};
let timer = 0;
let nextInputIndex = "";
async function saveData(row, col, EffDtID) {
    colorChangerOfProdInput();
    row = parseFloat(row) + 1;
    var table = document.getElementById("table");
    var value = table.rows[row].cells[col].textContent;
    const unitIds = document.getElementById("unitId").innerText.trim();
    const USERID = 0;    // document.getElementById("LoggedUserId").innerText.trim();
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
    var StyleDropdown = document.getElementById("styleName");
    var styleID = StyleDropdown.options[StyleDropdown.selectedIndex].value;
    var LineDropdown = document.getElementById("silLineName");
    var lineID = LineDropdown.options[LineDropdown.selectedIndex].value;
    var target = parseInt(table.rows[row].cells[4].textContent);
    var ProcessId = StringFormat(table.rows[row].cells[3].textContent);
    var empId = StringFormat(table.rows[row].cells[1].textContent);
    
    let length = table.rows[row].cells.length;
    var empEffId = document.getElementById("table").rows[row].cells[length - 1]?.innerHTML || 0;
    Udata.EmpEffId = parseInt(empEffId) == null ? 0 : parseInt(empEffId);
    Udata.EmpEffNo = "";
    Udata.EffDate = document.getElementById("date").value;
    Udata.UnitId = unitIds;
    Udata.EmpId = parseFloat(empId);
    Udata.BuyerId = buyerId;
    Udata.StyleId = styleID;
    Udata.LineId = lineID;
    Udata.MachineId = 0;
    Udata.ProcessId = parseInt(ProcessId);
    Udata.GradeId = 0;
    Udata.Remark = "";
    Udata.EntryDate = new Date();
    Udata.UserId =0;
    Udata.HrmEmpId = 0;

    var tables = document.getElementById("table");

    for (let i = 5; i < tables.rows[row].cells.length - 2; i++) {
        rows = row - 1;
       
        var Production = document.getElementById("hour" + rows + i).value;
        var EmpeffId = document.getElementById("hour" + rows + i).name;
        j = i + 1;
        nextInputIndex= "hour" + rows +j;
        console.log(nextInputIndex);
        var hr = 0;
        hr = i == 5 ? hr = 1 : hr;
        hr = i == 6 ? hr = 2 : hr;
        hr = i == 7 ? hr = 3 : hr;
        hr = i == 8 ? hr = 4 : hr;
        hr = i == 9 ? hr = 5 : hr;
        hr = i == 10 ? hr = 6 : hr;
        hr = i == 11 ? hr = 7 : hr;
        hr = i == 12 ? hr = 8 : hr;
        hr = i == 13 ? hr = 9 : hr;
        hr = i == 14 ? hr = 10 : hr;
        hr = i == 15 ? hr = 11 : hr;
        hr = i == 16 ? hr = 12 : hr;
        hr = i == 17 ? hr = 13 : hr;
        hr = i == 18 ? hr = 14 : hr;
        
        var existingEntry = Udata.detail.find(entry => entry.cell === i);

        if (existingEntry) {
           
            existingEntry.HourNo = hr;
            existingEntry.TrgQty = target;
            existingEntry.ProdQty = Production;
            existingEntry.Reason = "";
            
        } else {
          
            let pProduction = parseInt(Production);



            if (pProduction < 0) {
                let validationtxt = document.querySelector("#validationMsgTxt");
                validationtxt.innerHTML = "Negative Value are not allowed!";
                validationtxt.style.color = "red";
                validationtxt.style.fontSize = "18px";
                alert("Negative Value are not allowed!");
                setTimeout(() => {
                    validationtxt.innerHTML = "";
                }, 2000)
            }
            else {
                if (parseFloat(hr) != 0 || (EmpeffId == null ? 0 : parseFloat(EmpeffId)) > 0) {
                        var Efficiency = {
                            "EmpEffDetailId": EmpeffId == null ? 0 : parseFloat(EmpeffId),
                            "EmpEffId": 0,
                            "HourNo": parseFloat(hr),
                            "TrgQty": target,
                            "ProdQty": Production,
                            "ChkQty": 0,
                            "DefQty": 0,
                            "Reason": "",
                            "cell": i
                        };
                    Udata.detail.push(Efficiency);
                }
            }
        }
    }
    //if (timer == 0) { 
    //    timer = 1;
    //setTimeout(() => {
    //    SubmitApi();
        
    //}
    //   , 10000)
    //}
    SubmitApi();
}
function isValidPositiveNumber(value) {
    const numberValue = Number(value);

    if (isNaN(numberValue) || numberValue <= 0) {
       
        return false; 
    }

    return true; 
}

function StringFormat(inputString) {
    const delimiter = "=>";
    const delimiterIndex = inputString.indexOf(delimiter);

    if (delimiterIndex !== -1) {
        const result = inputString.substring(0, delimiterIndex).trim();

        return result;
    } else {
        return 0;
    }
}
function SubmitApi()
{
    const apiUrl = api+'/api/ProductionEmpEfficiency/SaveEffiicency';


    
    const convertedData = convertDataForApi(Udata);

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(convertedData),
    })
        .then(response => response.json())
        .then(result => {

                //alert("Data Saved Successfully");
            //location.reload();
            globalData = [];
              Udata = {
                "EmpEffId": 0,
                "EmpEffNo": "",
                "EffDate": "",
                "UnitId": 0,
                "EmpId": 0,
                "BuyerId": 0,
                "StyleId": 0,
                "LineId": 0,
                "MachineId": 0,
                "ProcessId": 0,
                "GradeId": 0,
                "Remark": "",
                "EntryDate": "",
                "UserId": 0,
                "HrmEmpId": 0,
                "detail": []
            };  timer = 0;
            GetEmployeeByProcess(); debugger;
            //nextElement = document.querySelector(`#${nextInputIndex}`);
            //nextElement.focus();
            //console.log("Data2 : ", nextInputIndex);
        })
        .catch(error => {

            
            timer = 0;
            alert('Error In Saved Data  ', error);
        });
}

function convertDataForApi(originalData) {
    const convertedData = {
        EmpEffId: originalData.EmpEffId,
        EmpEffNo: originalData.EmpEffNo,
        EffDate: originalData.EffDate,
        UnitId: originalData.UnitId,
        EmpId: originalData.EmpId,
        BuyerId: originalData.BuyerId,
        StyleId: originalData.StyleId,
        LineId: originalData.LineId,
        MachineId: originalData.MachineId,
        ProcessId: originalData.ProcessId,
        GradeId: originalData.GradeId,
        Remark: originalData.Remark,
        EntryDate: originalData.EntryDate,
        UserId: originalData.UserId,
        HrmEmpId: originalData.HrmEmpId,
        detail: []
    };

    originalData.detail.forEach((efficiency) => {
        const convertedEfficiency = {
            EmpEffDetailId: efficiency.EmpEffDetailId,
            EmpEffId: efficiency.EmpEffId,
            HourNo: efficiency.HourNo,
            TrgQty: efficiency.TrgQty,
            ProdQty: efficiency.ProdQty,
            ChkQty: efficiency.ChkQty,
            DefQty: efficiency.DefQty,
            Reason: efficiency.Reason
        };
        convertedData.detail.push(convertedEfficiency);
    });

    return convertedData;
}


const colorChangerOfProdInput = () => {
    const inputs = document.querySelectorAll(".hour-prod");
    for (let i = 0; i < inputs.length; i++) {
        const target = inputs[i].getAttribute("for");
        const prod = inputs[i].value;

        const percentage = (target * prod) / 100;
        if (percentage <= 79 && percentage >= 70) {
            if (inputs[i].style.backgroundColor != "yellow") {
                inputs[i].style.backgroundColor = "yellow";
            }
        } else if (percentage < 60) {
            if (inputs[i].style.backgroundColor != "red") {
                inputs[i].style.backgroundColor = "red";
            }
        } else if (percentage >= 80) {
            if (inputs[i].style.backgroundColor != "yellow")
            {
                inputs[i].style.backgroundColor = "white";
            }
            
        }
    }
}

