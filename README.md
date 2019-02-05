# Upload-download-speed-using-gcloud

Calculates your internet upload and download speed using your google cloud storage.

# What's are important requirements for this ?
- You should have a google cloud storage with atleast one bucket
- You should give google authentication credentials from your cmd / terminal to access your bucket

# How to give google authentication credentials ?
- You should go to the "API & Services" in your google cloud platform menu
- Then select credentials -> Create credential -> Service Account Key
- Then select New Service Account -> service account name
- Select JSON format and Create
- Download the .json file in your system
- Later in terminal where you are executing this function git "exportGOOGLE_APPLICATION_CREDENTIALS='YOUR_DOWNLOADED_JSON_PATH'"

## Installation
```
$ npm install upload-download-speed-using-gcloud
```

## Getting Started
```
let speedTest = require('upload-download-speed-using-gcloud');

let uploadOptions = {
    fileName: 'IMAGE_PATH_TO_UPLOAD'
    delete: false 
};

speedTest.checkUploadSpeed('YOUR_BUCKET_NAME', uploadOptions, function (data) {
    console.log('uploadData :', data);
});

let options = {
    fileName: 'IMAGE_NAME_IN_BUCKET_TO_DOWNLOAD',
    destinationFilePath: 'DESTINATION_PATH_TO_DOWNLOAD'
};

speedTest.checkDownloadSpeed('YOUR_BUCKET_NAME', options, function (data) {
    console.log('downloadData :', data);
});
```

# Methods 

checkUploadSpeed(bucketName, options, cb)
- buketName (required)
- options: {
    fileName: (required),
    imageName: (optional) // the name of image uploaded in bucket
    delete: (optional) (default: false) // if you want to delete the image from the bucket you uploaded
    }
- cb (required)

checkDownloadSpeed(bucketName, options, cb)
- bucketName (required)
- options: {
    fileName: (required) // image name from the bucket to get downloaded 
    destinationFilePath: (required) // file path where the image should be downloaded
    }
- cb (required)    
