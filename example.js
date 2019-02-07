let speedTest = require('./index.js');

let uploadOptions = {
    fileName: './Image.jpg',
    destinationFileName: '/folderName/ImageName.jpg'
};

speedTest.checkUploadSpeed('node-upload-download', uploadOptions, function (data) {
    console.log('uploadData :', data);
});

let options = {
    fileName: '/folderName/ImageName.jpg',
    destinationFilePath: './ImageName.jpg'
};

speedTest.checkDownloadSpeed('node-upload-download', options, function (data) {
    console.log('downloadData :', data);
});