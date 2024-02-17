import { NextApiRequest, NextApiResponse } from "next";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import mime from "mime-types";
import fs from "fs";

import { isAuthenticated } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";

const bucketName = "gm-next-ecommerce";

type ParsedForm = { fields; files };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongooseConnect();
  await isAuthenticated(req, res);

  const form = new multiparty.Form();

  const { fields, files }: ParsedForm = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
  });

  const links = [] as string[];
  for (const file of files.file) {
    const ext = file.originalFilename.split(".").pop();
    const newFileName = Date.now() + "." + ext;
    await client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    links.push(`https://${bucketName}.s3.amazonaws.com/${newFileName}`);
  }

  return res.json({ links });
}

export const config = {
  api: { bodyParser: false },
};
