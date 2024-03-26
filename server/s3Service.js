var S3 = require('aws-sdk').S3;

function s3Upload (files) {
    var s3 = new S3();

    var params = files.map(function (file) {
        return {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: 'ticketAttachments/' + file.originalname || 'ticketAttachments/' + file.filename, // File name you want to save as in S3
            Body: file.buffer || file.content
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