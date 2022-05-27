const dotenv = require('dotenv');
const crypto = require('crypto');
const promisify = require('util.promisify');
const randomBytes = promisify(crypto.randomBytes);
const aws = require('aws-sdk');

dotenv.config();

const region = 'us-east-1';
const bucketName = 'garager';
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
});

const generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  });

  const uploadURL = await s3.getSignedUrlPromise('putObject', params);
  console.log('uploadURL', uploadURL);
  return uploadURL;
};

module.exports = generateUploadURL;