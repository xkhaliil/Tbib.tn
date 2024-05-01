import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  profilePicture: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  verificationDocument: f({
    "application/pdf": { maxFileSize: "4MB", maxFileCount: 4 },
  }).onUploadComplete(() => {}),
  medicalDocument: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/pdf": { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),
  additionalImages: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  }).onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
