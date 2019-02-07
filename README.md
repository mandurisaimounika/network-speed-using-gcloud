# network-speed-using-gcloud

Calculates your internet upload and download speed using your google cloud storage.

## What are important requirements for this ?
- You should have a google cloud storage with atleast one bucket
- You should give google authentication credentials from your cmd / terminal to access your bucket

## How to give google authentication credentials ?
- You should go to the "API & Services" in your google cloud platform menu
- Then select credentials -> Create credential -> Service Account Key
- Then select New Service Account -> service account name
- Select JSON format and Create
- Download the .json file in your system
- Later in terminal where you are executing this function git 
"export GOOGLE_APPLICATION_CREDENTIALS='YOUR_DOWNLOADED_JSON_PATH'"

## Installation
```bash
$ npm install network-speed-using-gcloud
```

## Getting Started
```js
let speedTest = require('network-speed-using-gcloud');

let uploadOptions = {
    fileName: 'IMAGE_PATH_TO_UPLOAD', //image should be in MB.
    delete: false ,
    destinationFileName: '/FOLDER_NAME_IN_BUCKET/IMAGE_NAME_IN_BUCKET_TO_UPLOAD' //if you want to upload to some specific folder inside the bucket
};

speedTest.checkUploadSpeed('YOUR_BUCKET_NAME', uploadOptions, function (data) {
    console.log('uploadData :', data);
});

let options = {
    fileName: 'IMAGE_NAME_IN_BUCKET_TO_DOWNLOAD' or '/FOLDER_NAME_IN_BUCKET/IMAGE_NAME_IN_BUCKET_TO_DOWNLOAD, //image should be in MB.
    destinationFilePath: 'DESTINATION_PATH_TO_DOWNLOAD'
};

speedTest.checkDownloadSpeed('YOUR_BUCKET_NAME', options, function (data) {
    console.log('downloadData :', data);
});
```

## Methods 

### checkUploadSpeed(bucketName, options, cb)
- bucketName (required)
- options: {
    fileName: (required),
    imageName: (optional), // the name of image uploaded in bucket
    delete: (optional) (default: false), // if you want to delete the image from the bucket you uploaded
    destinationFileName: (optional) // if you want to upload in a specific folder of the bucket
    }
- cb (required)

### checkDownloadSpeed(bucketName, options, cb)
- bucketName (required)
- options: {
    fileName: (required) // image name from the bucket to get downloaded 
    destinationFilePath: (required) // file path where the image should be downloaded
    }
- cb (required)    
