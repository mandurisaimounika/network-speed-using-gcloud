var {
    Storage
} = require('@google-cloud/storage');
var fs = require('fs-extra');
var storage = new Storage();
async function checkUploadSpeed(bucketName, options = {delete: false}, cb) {
    let startTime = new Date().getTime();
    let bucketUploadOptions =  options.destinationFileName ? {
        destination: options.destinationFileName,
        gzip: false,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    } : {
        gzip: false,
        metadata: {
            cacheControl: 'public, max-age=31536000'
        }
    }
    await storage.bucket(bucketName).upload(options.fileName, bucketUploadOptions).then(async () => {
        let endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = 5000000 * 8;
        let uploadSpeedBps = (bitsLoaded / duration).toFixed(2);
        let uploadSpeedKbps = (uploadSpeedBps * 8 * 2 / 1000).toFixed(2);
        let uploadSpeedMbps = (uploadSpeedKbps * 8 * 2 / 100000).toFixed(2);
        let uploadSpeedData = {
            bps: uploadSpeedBps,
            kbps: uploadSpeedKbps,
            mbps: uploadSpeedMbps
        };
        if (options && options.delete) {
          await storage.bucket(bucketName).file(options.imageName).delete();
        }
        cb(uploadSpeedData);
    });

}

async function checkDownloadSpeed(bucketName, options, cb) {
    let startTime = new Date().getTime();
    let bucket = storage.bucket(bucketName);
    let remoteFile = bucket.file(options.fileName);
    await remoteFile.createReadStream()
        .once('response', async (response) => {
            let endTime = new Date().getTime();
            let byteLengthReceived = response.headers["content-length"];
            let extrabyteLengthReceived = Number(byteLengthReceived.slice(1, byteLengthReceived.length));
            byteLengthReceived = Number(byteLengthReceived);
            let duration = (endTime - startTime) / 1000;
            let lengthToCompare = 5000000 + extrabyteLengthReceived;
            if (byteLengthReceived < lengthToCompare) {
                let difference = lengthToCompare - byteLengthReceived;
                byteLengthReceived = byteLengthReceived + difference;
            } else {
                let difference = byteLengthReceived - lengthToCompare;
                byteLengthReceived = difference < byteLengthReceived ? byteLengthReceived - difference : difference - byteLengthReceived;
            }
            let bitsLoaded = byteLengthReceived * 8;
            let downloadSpeedBps = (bitsLoaded / duration);
            let downloadSpeedKbps = (downloadSpeedBps * 8 * 2 / 1000).toFixed(2);
            let downloadSpeedMbps = (downloadSpeedKbps * 8 * 2 / 100000).toFixed(2);
            let downloadSpeedData = {
                bps: downloadSpeedBps,
                kbps: downloadSpeedKbps,
                mbps: downloadSpeedMbps
            };
            cb(downloadSpeedData);
        })
        .on('end', () => {
            console.log('Your image is downloaded completely....!');
        })
        .pipe(fs.createWriteStream(options.destinationFilePath));
}

module.exports = {
    checkUploadSpeed: checkUploadSpeed,
    checkDownloadSpeed: checkDownloadSpeed
}