const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3=require('../config/S3')

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = upload;


