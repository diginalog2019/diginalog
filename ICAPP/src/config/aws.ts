import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: "key",
    secretAccessKey: "key"
});

export const s3 = new AWS.S3();