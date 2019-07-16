import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: "AKIA33WA7EOSYZI33EXM",
    secretAccessKey: "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"
});

export const s3 = new AWS.S3();