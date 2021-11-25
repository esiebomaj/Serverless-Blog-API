import * as AWS from "aws-sdk";
import * as AWSXRay from "aws-xray-sdk";

const XAWS = AWSXRay.captureAWS(AWS);

const s3 = new XAWS.S3({ signatureVersion: "v4" });
const bucketName = process.env.ATTACHMENT_S3_BUCKET;

export const getSignedUrl = async (postId) => {
  return await s3.getSignedUrl("putObject", {
    Bucket: bucketName,
    Key: postId,
    Expires: 300,
  });
};

export const getAttachmentUrl = (postId): string => {
  return `https://${bucketName}.s3.amazonaws.com/${postId}`;
};
