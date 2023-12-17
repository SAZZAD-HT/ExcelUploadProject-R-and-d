var ExcelPopulate = {
    getDataofExcel: async function () {
        var result = [];
        try {
            var input = document.getElementById('fileInput');
            var file = input.files[0];

            if (file) {
                var arrayBuffer = await file.arrayBuffer();
                var data = new Uint8Array(arrayBuffer);
                var workbook = XLSX.read(data, { type: 'array' });

                // Specify the sheet name you want to process
                var targetSheetName = 'Bln_fil';

                if (workbook.Sheets[targetSheetName]) {
                    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[targetSheetName], { header: 1 });
                    if (roa.length) result.push(roa);

                    let html = XLSX.utils.sheet_to_html(workbook.Sheets[targetSheetName]);
                    // Assuming you have a div with id "table" in your HTML
                    document.getElementById('table').innerHTML += `
                        <h3>${targetSheetName}</h3>${html}
                    `;
                } else {
                    console.error('Sheet not found:', targetSheetName);
                }
            } else {
                console.error('No file selected.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        return result;
    }
};
