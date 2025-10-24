const s3 =require('../config/S3')
module.exports = {

    async upload(key, file) {
        try {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype
            };

            return await s3.upload(params).promise();
        } catch (err) {
            
            throw err
        }
    }

}