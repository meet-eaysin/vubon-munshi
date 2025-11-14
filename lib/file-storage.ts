import { v2 as cloudinary } from "cloudinary";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure R2
const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export class FileStorageService {
  // Cloudinary for images and videos
  static async uploadToCloudinary(
    file: Buffer | string,
    folder: string,
    publicId?: string
  ): Promise<{ secure_url: string; public_id: string }> {
    try {
      const result = await new Promise<{
        secure_url: string;
        public_id: string;
      }>((resolve, reject) => {
        cloudinary.uploader.upload(
          file as any,
          {
            folder,
            public_id: publicId,
            resource_type: "auto",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as { secure_url: string; public_id: string });
          }
        );
      });

      return result;
    } catch (error) {
      throw new Error("Failed to upload to Cloudinary");
    }
  }

  static getCloudinaryUrl(publicId: string, transformations?: string) {
    return cloudinary.url(publicId, { transformation: transformations });
  }

  static async deleteFromCloudinary(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error("Failed to delete from Cloudinary");
    }
  }

  // R2 for PDFs and secure files
  static async uploadToR2(file: Buffer, key: string, contentType: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: file,
        ContentType: contentType,
      });

      await r2Client.send(command);
      return `https://${process.env.R2_BUCKET_NAME}.r2.cloudflarestorage.com/${key}`;
    } catch (error) {
      throw new Error("Failed to upload to R2");
    }
  }

  static async generateSecureDownloadUrl(key: string, expiresIn = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      });

      const signedUrl = await getSignedUrl(r2Client, command, { expiresIn });
      return signedUrl;
    } catch (error) {
      throw new Error("Failed to generate signed URL");
    }
  }

  static async deleteFromR2(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      });

      await r2Client.send(command);
    } catch (error) {
      throw new Error("Failed to delete from R2");
    }
  }

  // Helper methods for specific use cases
  static async uploadCourseThumbnail(file: Buffer, courseId: string) {
    const publicId = `courses/${courseId}/thumbnail`;
    const result = await this.uploadToCloudinary(file, "courses", publicId);
    return result.secure_url;
  }

  static async uploadNotePreview(file: Buffer, noteId: string, index: number) {
    const publicId = `notes/${noteId}/preview-${index}`;
    const result = await this.uploadToCloudinary(file, "notes", publicId);
    return result.secure_url;
  }

  static async uploadNotePDF(file: Buffer, noteId: string) {
    const key = `notes/${noteId}.pdf`;
    return await this.uploadToR2(file, key, "application/pdf");
  }

  static async getNoteDownloadUrl(noteId: string) {
    const key = `notes/${noteId}.pdf`;
    return await this.generateSecureDownloadUrl(key);
  }
}
