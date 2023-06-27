import multiparty from 'multiparty'
import { DeleteObjectCommand, S3Client} from '@aws-sdk/client-s3'
import fs from 'fs';
import mime from 'mime-types';
const bucketName = 'campupp';       

export default async function handle(req,res) {
    let {filename} = req.body;
    console.log(filename);
    const client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });
    filename = filename.match(/\/([^/]+)$/)[1];
    console.log(filename)
    const input = { // DeleteObjectRequest
        Bucket: bucketName, // required
        Key: filename, // required
      };
      const command = new DeleteObjectCommand(input);
      const response = await client.send(command);
  }
  