const fs = require("fs");
const multer = require("multer");
const AWS = require('aws-sdk');
const path = require("path");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteBucketCommand,
} = require("@aws-sdk/client-s3");
const {
  s3AccessKey,
  s3AccessKeyId,
  bucketName,
  region,
} = require("../utility/config");

const { getBucketFileUrl } = require("../helper/common")

const allowedFormats = [".jpg", ".jpeg", ".png", ".PNG", ".gif", ".GIF"];

const s3Configuration = {
  credentials: {
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3AccessKey,
  },
  region: region,
};


/**
 * 
  @param {} originalname 
 * @returns 
 */

const getContentType = (originalname) => {
  if (originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|webp|WEBP|gif|GIF)$/)) {
    return "image/jpeg";
  } else if (originalname.match(/\.(pdf|PDF)$/)) {
    return "application/pdf";
  } else if (originalname.match(/\.(doc|DOC|docx|DOCX)$/)) {
    return "application/msword";
  }
  throw new Error("Invalid Format");
};

const generatePreSignedUrl = async (dto) => {
  s3Configuration.ContentType = dto.contentType;
  const keyName = String(new Date().getTime() + dto.key);
  const s3 = new S3Client(s3Configuration);
  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({ Bucket: bucketName, Key: keyName }),
    { expiresIn: 10 * 60 }
  );
  return { preSignedUrl: url, fileName: "https://ni-hao-storage.s3.us-east-2.amazonaws.com/" + keyName };

};

const uploadImageOnS3 = async (file) => {
  const keyName = String(new Date().getTime() + file.fileName);
  const s3 = new AWS.S3({
    secretAccessKey: s3AccessKey,
    accessKeyId: s3AccessKeyId,
    region: region,
  });

  let params = {
    Bucket: bucketName,
    Key: keyName,
    Body: file,
    ACL: 'public-read'
  }
  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err
    console.log(`File uploaded successfully at ${data}`)
  });
  return { imageUrl: getBucketFileUrl(keyName) };
};

module.exports = {
  generatePreSignedUrl,
  uploadImageOnS3
};