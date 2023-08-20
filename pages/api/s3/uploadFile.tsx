import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient, CreateIdentityPoolCommand } from "@aws-sdk/client-cognito-identity";

const s3Client = new S3Client({

});


const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;

    const command = new PutObjectCommand({
      Bucket: /*process.env.BUCKET_NAME*/'floreria-web-bucket',
      Key: name,
    });

    //const url = await getSignedUrl(s3Client, command, { expiresIn: 600 });
    await s3Client.send(command);
    res.status(200).json({ message: 'aa' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export default uploadFile;

/*export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};*/

/*import { NextApiRequest, NextApiResponse } from "next";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { CognitoIdentityClient, GetIdCommand } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const cognitoidentity = new CognitoIdentityClient({
  credentials : fromCognitoIdentityPool({
      client : new CognitoIdentityClient(),
      identityPoolId : 'sa-east-1:430d4c41-2e55-45e7-982c-5e10f5622265',
      logins: {
        ['sa-east-1_Kfe5aDv6g'] : '6iuond51u9063sq5c44b4vp2ra'
      }
   }),
});

//const credentials = await cognitoidentity.config.credentials();

const s3 = new S3Client({
  region: "sa-east-1",
  endpoint: "https://floreria-web-bucket.s3.sa-east-1.amazonaws.com/"
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    //const url = await s3.getSignedUrlPromise("putObject", fileParams);
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, "putObject", { expiresIn: 3600 });

    res.status(200).json({ url });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb", // Set desired value here
    },
  },
};
*/