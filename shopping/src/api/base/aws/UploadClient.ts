import { Upload } from '@aws-sdk/lib-storage';
import { ObjectCannedACL } from '@aws-sdk/client-s3';
import s3Client from './S3Client';

interface UploadOptions {
  Key: string;
  ACL: ObjectCannedACL;
  Bucket: string;
  file: Express.Multer.File;
}
class UploadClient extends Upload {
  constructor(options: UploadOptions) {
    const {
      file, Bucket, Key, ACL,
    } = options;
    super({
      client: s3Client,
      params: {
        Bucket,
        Key,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL,
      },
    });
  }
}

export default UploadClient;
