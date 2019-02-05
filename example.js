let speedTest = require('./index.js');

let uploadOptions = {
    fileName: './mounika.jpg'
};

speedTest.checkUploadSpeed('node-upload-download', uploadOptions, function (data) {
    console.log('uploadData :', data);
});

let options = {
    fileName: 'mounika.jpg',
    destinationFilePath: './test/mounika.jpg'
};

speedTest.checkDownloadSpeed('node-upload-download', options, function (data) {
    console.log('downloadData :', data);
});