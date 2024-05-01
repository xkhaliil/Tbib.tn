"use client";

import React from "react";

import { uploadDocument } from "@/actions/patient";
import { UploadDocumentSchema, UploadDocumentSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUploadMedicalDocumentDialog } from "@/hooks/use-upload-medical-document-dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { UploadDocumentDropzone } from "@/components/base/patient/medical-documents/upload-document-dropzone";
import { MainDialog } from "@/components/main-dialog";

interface UploadDocumentDialogProps {
  patientId: string | undefined;
}

export function UploadDocumentDialog({ patientId }: UploadDocumentDialogProps) {
  const uploadMedicalDocumentDialog = useUploadMedicalDocumentDialog();
  const [isPending, startTransition] = React.useTransition();

  const uploadDocumentForm = useForm<UploadDocumentSchemaType>({
    resolver: zodResolver(UploadDocumentSchema),
    defaultValues: {
      title: "",
      description: "",
      file: "",
    },
  });

  const onSubmit = (values: UploadDocumentSchemaType) => {
    startTransition(() => {
      uploadDocument(values, patientId as string)
        .then((response) => {
          if (response?.success) {
            toast.success(response.success);
            uploadDocumentForm.reset();
            uploadMedicalDocumentDialog.setOpen(false);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Failed to upload document");
        });
    });
  };

  return (
    <MainDialog
      open={uploadMedicalDocumentDialog.open}
      setOpen={uploadMedicalDocumentDialog.setOpen}
    >
      <div className="flex flex-col space-y-1 pb-6">
        <h1 className="text-2xl font-bold">Upload a document</h1>
        <p className="text-muted-foreground">
          Fill in the details below to upload a document.
        </p>
      </div>
      <Form {...uploadDocumentForm}>
        <form
          onSubmit={uploadDocumentForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={uploadDocumentForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Document title"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={uploadDocumentForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Document description"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Document</FormLabel>
            <FormDescription>
              Please upload a document in PDF or image format.
            </FormDescription>
            <FormField
              control={uploadDocumentForm.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <UploadDocumentDropzone
                      value={field.value as string}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2.5 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                uploadMedicalDocumentDialog.setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="blue"
              disabled={isPending || !uploadDocumentForm.formState.isValid}
            >
              {isPending ? (
                <>
                  <Spinner className="mr-2" />
                  <span>Uploading...</span>
                </>
              ) : (
                "Upload Document"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </MainDialog>
  );
}
