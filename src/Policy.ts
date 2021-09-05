import { dateISOString, dateYMD, xAmzDate } from "./Date";
import { IConfig, Policy as PolicyType } from "./types";

export default class Policy {
  public static getPolicy(config: IConfig, acl?: string): string {
    let aclFinal: string = acl === undefined || acl === "" ? "public-read" : acl
    const policy = (): PolicyType => {
      return {
        expiration: dateISOString,
        conditions: [
          { acl: aclFinal },
          { bucket: config.bucketName },
          ["starts-with", "$key", `${config.dirName ? config.dirName + "/" : ""}`],
          ["starts-with", "$Content-Type", ""],
          ["starts-with", "$x-amz-meta-tag", ""],
          { "x-amz-algorithm": "AWS4-HMAC-SHA256" },
          {
            "x-amz-credential": `${config.accessKeyId}/${dateYMD}/${config.region
              }/s3/aws4_request`
          },
          { "x-amz-date": xAmzDate },
          { "x-amz-meta-uuid": "14365123651274" },
          { "x-amz-server-side-encryption": "AES256" }
        ]
      };
    };
    //Returns a base64 policy;
    let newVersionResponse = btoa(JSON.stringify(policy())).replace(/\n|\r/, "");
    return newVersionResponse
  };
};