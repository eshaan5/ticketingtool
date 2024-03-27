var S3 = require('aws-sdk').S3;

function s3Upload (files) {
    var s3 = new S3();

    var params = files.map(function (file) {
        var fileName = file.originalname ? file.originalname : file.filename;
        var body = file.buffer ? file.buffer : file.content;
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: 'ticketAttachments/' + fileName, // File name you want to save as in S3
            Body: body,
        };
    });

    var uploads = params.map(function (param) {
        return s3.upload(param).promise();
    });

    return Promise.all(uploads);
}

module.exports = {
    s3Upload: s3Upload
};