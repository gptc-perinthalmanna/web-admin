import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { ImageType } from "../../../server/db";
import { createImage } from "../../../server/files";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  try {
    form.parse(req, async function (err, fields, files) {
      const data = await saveFile(files.file);
      return res.status(201).send(data);
    });
  } catch (e) {
    return res.status(400).send("Seems there is an error");
  }
};

const saveFile = async (file: formidable.File | formidable.File[]) => {
  if (Array.isArray(file)) return;
  const imgbbUploader = require("imgbb-uploader");
  try {
    const res = (await imgbbUploader(
      process.env.IMGBB_API_KEY,
      file.filepath
    )) as ImageType;
    return await createImage(res);
  } catch (error) {
    console.log(error);
    return { message: "An error occured" };
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.method === "POST"
    ? post(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? console.log("DELETE")
    : req.method === "GET"
    ? console.log("GET")
    : res.status(404).send("");
}
