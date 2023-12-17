var ExcelPopulate = {
    getDataofExcel: async function () {
        var result = [];
        try {
            var input = document.getElementById('fileInput');
            var file = input.files[0];
console.log(file);  
            if (file) {
                var arrayBuffer = await file.arrayBuffer();
                var data = new Uint8Array(arrayBuffer);
                var workbook = XLSX.read(data, { type: 'array' });
                console.log(workbook);
            } else {
                console.error('No file selected.');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        return result;
    }
    
};
