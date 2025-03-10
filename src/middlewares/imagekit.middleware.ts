import { NextFunction, Response } from "express";
import ImageKit from "imagekit";
import { ExtendedRequest } from "../utils/interfaces";

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadImage(
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) {
  const files = request.files;
  const file: any = files?.file;
  if (file) {
    const fileName = file?.name;
    try {
      const fileUpload = await imagekit.upload({
        file: file?.data,
        fileName,
      });

      if (fileUpload) {
        request.fileUploaded = { url: fileUpload?.url, id: fileUpload.fileId };
        return next();
      }
    } catch (error) {
      return response.status(500).json({ error: "Failed to upload file" });
    }
  }
  return response.status(400).json({ error: "Invalid request" });
}

export async function deleteImage(
  request: ExtendedRequest,
  response: Response,
  next: NextFunction
) {
  const { id } = request.body;
  if (id) {
    try {
      const fileDeleted = await imagekit.deleteFile(id);
      if (fileDeleted) {
        return next();
      }
    } catch (error) {
      return response.status(500).json({ error: "Failed to delete file" });
    }
  }
  return response.status(400).json({ error: "Invalid request" });
}
