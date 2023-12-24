function GetLineNameDdl() {

    const buyerDropdown = document.getElementById("silLineName");

    // Make a request to the API
    var api = "https://localhost:5050/";
     const unitId = document.getElementById("unitId").innerText.trim(); // Use innerText to get the text content without extra whitespace
   
    fetch(api + `api/ProductionEmpEfficiency/allLine?unitId=${16}`)//Replace Unit Id
        .then(response => response.json())
        .then(data => {
            

            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.section_code;
                option.text = buyer.section_name;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

}

let Niformation = {
    "LineId": null,
    "BuyerId": null,
    "StyleId": null,
    "Date": null,
    "Process": []
};

let selectedProcessID = null;
function GetEmployeeByLineWW() {
    const table = document.getElementById("table");
    const api = "https://localhost:5050/";
    const unitId = document.getElementById("unitId").innerText.trim();
    const lineDropdown = document.getElementById("silLineName");
    const lineID = lineDropdown.options[lineDropdown.selectedIndex].value;
    
    fetch(api + `api/ProductionEmpEfficiency/LineWiseemployee?unitId=${16}&lineID=${lineID}`)//change it
        .then(response => response.json())
        .then(data => {           
            data.forEach((employee, index) => {
                
           
                const tr = table.insertRow(); 
                tr.insertCell().textContent = index;             
                tr.insertCell().textContent = employee.emp_id + "=>" + employee.emp_name + ` [ ${employee.designation_name} ]`;
               
               

                const processDropdown = `<select id="silProcess${index}" name="Process Name" class="processDDl" onchange="AddToRow(${index})" style="width:70%;height:26px;">
                                             <option value="0">Select Process Name</option>
                                          </select> `;
                //const kendobutton = `<select id="multiselecti${index}" class="kendo"  style="width:100%;height:26px; "></select>`;

                const addButton = `<br/><button id="btnAdd${index}" onclick="AddToRow(${index})" class="btn btn-primary" style="float:left;margin-right:6px;">ADD</button>`;
                    
                tr.insertCell().innerHTML = processDropdown ;// kendobutton;

                const processAdded = `<select id="addedProcess${index}" name=" Added Process"  style="width:70%;height:26px;">
                                             <option value="0">Select Process Name</option>
                                          </select> `;


                const DeleteButton = `<br/><button id="btnDelete${index}" onclick="DeleteFromProcess(${index})" class="btn btn-primary" style="float:left;margin-right:6px;">Delete</button>`;
                tr.insertCell().innerHTML = processAdded + DeleteButton; 
                tr.insertCell().innerHTML = 0; 
                
               
            });
            
          
        })
        .catch(error => console.error("Error fetching data:", error));
  
}

//async function GetProcess() {
    
//    document.getElementById('loadingSpinner').style.display = 'block';

//    var BuyerNameSelect = document.getElementById("buyerName");
//    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;

//    const styleDropdown = document.getElementById("styleName");
//    var styleId = styleDropdown.options[styleDropdown.selectedIndex].value;
//    var StyleName = styleDropdown.options[styleDropdown.selectedIndex].text;
//    console.log(buyerId, styleId);
//    var api = 'https://localhost:5050/';

//    // Initialize the dataSource outside the loop
//    var dataSource = new kendo.data.DataSource({
//        data: [],
//        sort: { field: "Id", dir: "asc" }
//    });

//    try {
//        const response = await fetch(api + `api/ProductionEmpEfficiency/LineWiseProcess?buyerId=${buyerId}&styleId=${styleId}`);
//        const data = await response.json();

//        console.log("API Response:", data);

//        data.forEach(process => {
//            dataSource.add({ Id: process.AutoId, ProcessName: process.ProcessName });
//        });

        
//        $(".kendo").kendoMultiSelect({
//            dataTextField: "ProcessName",
//            dataValueField: "Id",
//            dataSource: dataSource,
//            filter: "contains",
//            placeholder: "Please select Process",
//            downArrow: true,
//            change: function (e) {
                
//                var selectedValues = this.value();
//                console.log("Selected Values:", selectedValues);
//            }
//        });

//    } catch (error) {
//        console.error("Error fetching data:", error);
//    } finally {
       
//        document.getElementById('loadingSpinner').style.display = 'none';
//    }
//}

async function SaveProcessID(value) {
    
    // 5 is the index of "Added Process Name" column
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
    var lineNameSelect = document.getElementById("silLineName");
    var lineID = lineNameSelect.options[lineNameSelect.selectedIndex].value;
    var styleNameSelect = document.getElementById("styleName");
    var styleId = styleNameSelect.options[styleNameSelect.selectedIndex].value;
    var date = document.getElementById("date").value;
    var targeti = 0;
    Niformation.LineId = lineID;
    Niformation.BuyerId = buyerId;
    Niformation.StyleId = styleId;
    Niformation.Date = date;
    var data = 0;
    //var existingProcess = Niformation.Process.find(process => process.ProcessId === selectedProcessID);
    debugger;
    for (var i = 0; i < Niformation.Process.length; i++) {
        console.log(Niformation.Process[i].ProcessId,value.ProcessId);
        if ((Niformation.Process[i].ProcessId === value.ProcessId) && (Niformation.Process[i].EmployeeId === value.EmployeeId)) { alert("This process is already selected!"); }
        targeti = value.TargetHr100Percentage;

        console.log(Niformation.Process[i].Index, value.Index);

        if ((Niformation.Process[i].Index == value.Index) && (Niformation.Process[i].EmployeeId === value.EmployeeId) ) {

            debugger; console.log(value.TargetHr100, <Process[i].TargetHr100Percentage);
            if (value.TargetHr100 <Process[i].TargetHr100Percentage ) {

                targeti = value.TargetHr100Percentage;

                Niformation.Process[i].TargetHr100Percentage = targeti;

                data = value.Index;
            }
        }

    }


    Niformation.Process.push(value);

    const target = document.getElementById("table").rows[data + 1].cells[4];
    target.innerHTML = `<h5>${targeti}</h5>`;

    console.log(Niformation);
}
function userid(inputString) {
    const delimiter = "=>";
    const delimiterIndex = inputString.indexOf(delimiter);

    if (delimiterIndex !== -1) {
        const result = inputString.substring(0, delimiterIndex).trim();

        return result;
    } else {
        return 0;
    }
}
function AddToRow(index) {

    const processDropdown = document.getElementById(`silProcess${index}`);    
    const Employee = document.getElementById("table").rows[index + 1].cells[1];    
    let selectedProcessID = processDropdown.options[processDropdown.selectedIndex].value;
    var targetHr100Percentage = processDropdown.options[processDropdown.selectedIndex].dataset.target;  
    var submited = {
        "ProcessId": selectedProcessID,
        "ProcessName": processDropdown.options[processDropdown.selectedIndex].text,
        "EmployeeId": userid(Employee.textContent),
        "EmployeeName": Employee.textContent,
        "TargetHr100Percentage": targetHr100Percentage,
        "Index": index
    };
    if (selectedProcessID !== "" && selectedProcessID !== null) {
        SaveProcessID(submited);
        AddedOptionDDl(submited);
    }
     const selectedProcess = targetHr100Percentage;
   // target.innerHTML = `<h5>${existing}<br/>${selectedProcessID}--${selectedProcess}<br/></h5>`;
}
function DeleteFromProcess(index)
{
    var BuyerNameSelect = document.getElementById(`addedProcess${index}`);
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
  
    console.log(Niformation);
    for (i = 0; i < Niformation.Process.length; i++) {

        if (Niformation.Process[i].ProcessId == buyerId) {
            Niformation.Process.splice(i, 1);
            //here macthing option will be deleted 
            
           //    addedProcessDropdown.remove(addedProcessDropdown.selectedIndex);

            for (var j = 0; i < BuyerNameSelect.length; j++) {
                console.log(buyerId);
                if (BuyerNameSelect.options[j].value == buyerId)
                    BuyerNameSelect.remove(j);
            }
            console.log(Niformation);
            break;
        }
    }
}
function AddedOptionDDl(submited) {
 
  
    const processadded = document.getElementById(`addedProcess${submited.Index}`);
    const option = document.createElement("option");
    option.value = submited.ProcessId;
    option.text = submited.ProcessName;

    processadded.appendChild(option);
}
document.addEventListener("DOMContentLoaded", function () {
    GetLineNameDdl();
    GetBuyersDDl();
});
function GetStyleDDl() {
    const buyerDropdown = document.getElementById("styleName");
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;
    
    buyerDropdown.innerHTML = '<option value="0">Select Style Name</option>';
   
    fetch(`http://localhost:55800/EmpEffs/GetStylesByBuyerId?nBuyerId=${buyerId}`)
        .then(response => response.json())
        .then(data => {
         

            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.Id;
                option.text = buyer.StyleNo;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
}
function GetBuyersDDl() {
    const buyerDropdown = document.getElementById("buyerName");
    buyerDropdown.innerHTML = '<option value="0">Select Style Name</option>';
    fetch("http://localhost:55800/Buyer/GetAllBuyers")
        .then(response => response.json())
        .then(data => {           
            data.forEach(buyer => {
                const option = document.createElement("option");
                option.value = buyer.Buyer_id;
                option.text = buyer.Buyer_name;

                buyerDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

}
async function GetProcesshTMLddL() {
    var BuyerNameSelect = document.getElementById("buyerName");
    var buyerId = BuyerNameSelect.options[BuyerNameSelect.selectedIndex].value;

    const styleDropdown = document.getElementById("styleName");
    var styleId = styleDropdown.options[styleDropdown.selectedIndex].value;
    var StyleName = styleDropdown.options[styleDropdown.selectedIndex].text;
    var api = 'https://localhost:5050/';

    try {
        const response = await fetch(api + `api/ProductionEmpEfficiency/LineWiseProcess?buyerId=${buyerId}&styleId=${styleId}`);
        const data = await response.json();        
        const processDropDowns = document.querySelectorAll(".processDDl");      
        processDropDowns.forEach((processDropdown) => {
           
            data.forEach((buyer) => {
                const option = document.createElement("option");
                option.value = buyer.AutoId;
                option.dataset.target = buyer.TargetHr100Percentage;
                option.text = buyer.ProcessName;
               
                processDropdown.appendChild(option);
            });
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function SubmitData()
{

    const apiUrl = 'https://localhost:5050/api/ProductionEmpEfficiency/lineWiseBulletinAssign';


    debugger;
    const convertedData = convertDataForApi(Niformation);
 
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(convertedData), 
    })
        .then(response => response.json())
        .then(result => {

            console.log('API Response:', result);

        })
        .catch(error => {

            console.error('Error:', error);
        });

}
function convertDataForApi(originalData) {
    const convertedData = {
        LineId: parseInt(originalData.LineId),
        BuyerId: parseInt(originalData.BuyerId),
        StyleId: parseInt(originalData.StyleId),
        Date: originalData.Date,
        Process: []
    };

    originalData.Process.forEach((process) => {
        const convertedProcess = {
            ProcessId: parseInt(process.ProcessId),
            ProcessName: process.ProcessName,
            EmployeeId: process.EmployeeId,
            TargetHr100Percentage: parseInt(process.TargetHr100Percentage),
            Index: parseInt(process.Index)
        };
        convertedData.Process.push(convertedProcess);
    });

    return convertedData;
}
