"use client";

import React from "react";

import { FileIcon, UploadCloudIcon } from "lucide-react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";

import { useUploadThing } from "@/lib/uploadthing";

import { Progress } from "@/components/ui/progress";

interface DocumentsUploadDropzoneProps {
  value: string[] | undefined;
  onChange: (url?: string[]) => void;
}

export function DocumentsUploadDropzone({
  value,
  onChange,
}: DocumentsUploadDropzoneProps) {
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  const { startUpload, isUploading } = useUploadThing("verificationDocument", {
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });
  return (
    <Dropzone
      multiple={true}
      onDrop={async (acceptedFile) => {
        if (value) {
          onChange(undefined);
        }

        const res = await startUpload(acceptedFile);

        if (!res) {
          toast.error("Failed to upload file");
        }

        if (res) {
          onChange(res.map((file) => file.url));
        }
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="h-48 rounded-lg border border-dashed border-gray-300"
        >
          <div className="flex h-full w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg bg-gray-50 transition-all duration-200 ease-in-out hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border bg-white text-blue-600">
                  <UploadCloudIcon className="h-5 w-5" />
                </div>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-blue-600">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  (PDF, max 4MB, up to 4 files)
                </p>
              </div>

              {acceptedFiles.length > 0 ? (
                <div className="flex max-w-xs items-center divide-x divide-zinc-200 overflow-hidden rounded-md bg-white outline outline-[1px] outline-zinc-200">
                  <div className="grid h-full place-items-center px-3 py-2">
                    <FileIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="h-full truncate px-3 py-2 text-sm">
                    {acceptedFiles.map((file) => file.name).join(", ")}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="mx-auto mt-6 w-full max-w-xs">
                  <Progress
                    value={uploadProgress}
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    className="h-1 w-full bg-zinc-200"
                  />
                  <div className="mt-2.5 flex justify-center">
                    <p className="text-xs text-muted-foreground">
                      Uploading {uploadProgress}%
                    </p>
                  </div>
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
                accept="application/pdf"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
