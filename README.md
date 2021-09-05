# aws-s3-upload-ash
Open Source Module to Upload your Media and files into AWS S3 Bucket directly from Front-end.
<br>
AWSS3UploadAsh - A Javascript Library for AWS S3 File Upload

# Donate
**http://bit.ly/doeismaelnascimento**

## How to use(youtube)
* How to use with React = 
* How to use with Angular = 
# How get

Using NPM

```
npm install aws-s3-upload-ash
```
Using Yarn 

```
yarn add aws-s3-upload-ash
```



# Examples Uploading a file

## ***Uploading to S3 with bucket public***

```js
import AWSS3UploadAsh from 'aws-s3-upload-ash';

const config = {
    bucketName: 'bucketName',
    dirName: 'media', /* optional - when use: e.g BUCKET_ROOT/dirName/fileName.extesion */ 
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

// if you bucket is public, you need of config
const S3CustomClient = new AWSS3UploadAsh(config);

const newFileNameWithExtesion = 'myPdf.pdf';

//file: File - required | e.g input html type file
//contentType: string | required e.g application/pdf
//presignedURL: string | optional 
//newFileName: string | optional e.g myImage.png
//acl: string | optional default public-read
// if you use presignedURL, not need newFileName and acl parameters, can be undefined
S3CustomClient
    .uploadFile(file, "application/pdf", undefined, newFileNameWithExtesion, undefined)
    .then(data => console.log(data))
    .catch(err => console.error(err))

  /**
   * 
   * {
   *   bucket: "bucketName",
   *   key: "media/myPdf.pdf",
   *   location: "https://bucketName.s3.amazonaws.com/media/myPdf.pdf",
   *   status: 204
   * }
   * 
   */
});
```

## ***Uploading to S3 with presignedURL***

```js
import AWSS3UploadAsh from 'aws-s3-upload-ash';

// if you use presignedURL, dont need config on AWSS3UploadAsh constructor
const S3CustomClient = new AWSS3UploadAsh();

//file: File - required | e.g input html type file
//contentType: string | required e.g application/pdf
//presignedURL: string | optional 
//newFileName: string | optional e.g myImage.png
//acl: string | optional default public-read
// if you use presignedURL, not need newFileName and acl parameters, can be null
S3CustomClient
    .uploadFile(file, "application/png", "presignedlURL", undefined, undefined)
    .then(data => console.log(data))
    .catch(err => console.error(err))

   /**
   * Response se you use presignedURL parameter
   * {
   *   Response: {
   *     status: 200,
   *     body: "Upload complete"
   *   }
   * }
   */
});
```

## ***Uploading to S3 with bucket public and without directory***

```js
import AWSS3UploadAsh from 'aws-s3-upload-ash';

const config = {
    bucketName: 'bucketName',
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

// if you bucket is public, you need of config
const S3CustomClient = new AWSS3UploadAsh(config);

const newFileNameWithExtesion = 'myVideo.mp4';

//file: File - required | e.g input html type file
//contentType: string | required e.g application/pdf
//presignedURL: string | optional 
//newFileName: string | optional e.g myImage.png
//acl: string | optional default public-read
// if you use presignedURL, not need newFileName and acl parameters, can be null
S3CustomClient
    .uploadFile(file, "video/mp4", undefined, newFileNameWithExtesion, undefined)
    .then(data => console.log(data))
    .catch(err => console.error(err))

  /**
   * 
   * {
   *   bucket: "bucketName",
   *   key: "myVideo.mp4",
   *   location: "https://bucketName.s3.amazonaws.com/myVideo.mp4",
   *   status: 204
   * }
   * 
   */
});
```

## ***Deleting an existing file into directory in your bucket public***

In this case the file that we want to delete is in the folder 'photos'

```js
import AWSS3UploadAsh from 'aws-s3-upload-ash';


const config = {
    bucketName: 'bucketName',
    dirName: 'media',
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

const S3CustomClient = new AWSS3UploadAsh(config);

const newFileNameWithExtesion = 'fileName.extesion';

S3CustomClient
    .deleteFile(newFileNameWithExtesion)
    .then(response => console.log(response))
    .catch(err => console.error(err))

  /**
   * {
   *   Response: {
   *      ok: true,
   *      status: 204,
   *      message: 'File deleted',
   *      fileName: 'media/fileName.extesion';
   *   }
   * }
   */
});
```

## ***Deleting an existing file without directory in your bucket public***

```js
import AWSS3UploadAsh from 'aws-s3-upload-ash';


const config = {
    bucketName: 'bucketName',
    region: 'us-east-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    s3Url: 'https://bucketName.s3.amazonaws.com/'
}

const S3CustomClient = new AWSS3UploadAsh(config);

const newFileNameWithExtesion = 'fileName.extesion';

S3CustomClient
    .deleteFile(newFileNameWithExtesion)
    .then(response => console.log(response))
    .catch(err => console.error(err))

  /**
   * {
   *   Response: {
   *      ok: true,
   *      status: 204,
   *      message: 'File deleted',
   *      fileName: 'fileName.extesion';
   *   }
   * }
   */
});
```

# Important
1. If you bucket is public use only this parameters: file, contentType, newFileNameWithExtesion see the example above
2. If you bucket is private(with Objects can be public) use presignedURL parameter (recommended)

## ***AWS S3 Links***

- S3 Bucket Policies: https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html
- ACL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html
- Presigned URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html
- Upload Presigned URL: https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html
- Input html: https://www.w3schools.com/tags/tag_input.asp
- S3 Bucket Cors: https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html

## License
**MIT**
