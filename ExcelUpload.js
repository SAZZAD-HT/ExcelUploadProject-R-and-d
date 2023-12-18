var ExcelPopulate = {
    getDataofExcel: async function () {
        try {
            var input = document.getElementById('fileInput');
            var file = input.files[0];

            if (file) {
                var arrayBuffer = await file.arrayBuffer();
                var data = new Uint8Array(arrayBuffer);
                var workbook = XLSX.read(data, { type: 'array' });

                // Assume you want to fetch data from the first sheet (index 0)
                var targetSheetIndex = 1;
                var targetSheet = workbook.Sheets[workbook.SheetNames[targetSheetIndex]];

                if (targetSheet) {
                    var rows = XLSX.utils.sheet_to_json(targetSheet, { header: 1 });

                    // You can access the data by index (rows) and column (header)
                    for (var i = 0; i < rows.length; i++) {
                        for (var j = 0; j < rows[i].length; j++) {
                           //console.log(`Row: ${i}, Column: ${j}, Value: ${rows[i][j]}`);
                        }
                    }

                    var targetCellIndex = XLSX.utils.encode_cell({ r: 3, c: 0 });
                    var cellValueindex = targetSheet[targetCellIndex]?.v;
                    //console.log(cellValueindex);
                    debugger;
                    var targetCell = 'A2';
                    var cellValue = targetSheet[targetCell]?.v;
                   // console.log(cellValue);
                    var inputBox = document.getElementById('inputBox');
                    if (inputBox) {
                        inputBox.value = cellValue;
                    }    
                        //InputDate 
                        var targetCell = 'N4';     
                        cellValue = new Date().toLocaleString();   
                        var inputBox = document.getElementById('inputDate');
                        if (inputBox) {
                            inputBox.value = cellValue;
                        }           
                            
                        //StyleName
                        targetCell = 'C6';
                        document.getElementById('styleName').value = targetSheet[targetCell]?.v;

                        //Buyer Name
                        targetCell = 'C4';
                        document.getElementById('buyerName').value = targetSheet[targetCell]?.v;


                    console.log(rows);
                    let html = XLSX.utils.sheet_to_html(targetSheet);
                    document.getElementById('table').innerHTML += `
                        <h3>Data from Sheet ${targetSheetIndex}</h3>${html}
                    `;
                } else {
                    console.error('Sheet not found:', targetSheetIndex);
                }
            } else {
                console.error('No file selected.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
};
