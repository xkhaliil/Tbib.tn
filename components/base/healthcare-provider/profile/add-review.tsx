import React from "react";

import { addNewReview } from "@/actions/review";
import { AddNewReviewSchema, AddNewReviewSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  Patient,
  User,
} from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const labels: { [index: string]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

type AddReviewProps = {
  healthcareProvider:
    | (HealthCareProvider & {
        user: User;
      } & {
        openingHours: OpeningHours[];
      } & {
        absences: Absence[];
      })
    | null;
  HaveConsultation: boolean;
  Patient:
    | (Patient & {
        user: User;
      })
    | null;
};
export function AddReview({
  healthcareProvider,
  HaveConsultation,
  Patient,
}: AddReviewProps) {
  const [isPending, startTransition] = React.useTransition();
  const [hover, setHover] = React.useState(-1);

  const addNewReviewForm = useForm<AddNewReviewSchemaType>({
    resolver: zodResolver(AddNewReviewSchema),
    defaultValues: {
      comment: "",
      rating: 3,
    },
  });

  const onSubmit = async (data: AddNewReviewSchemaType) => {
    startTransition(() => {
      addNewReview(healthcareProvider?.id || "", data).then(() => {
        addNewReviewForm.reset();
        toast.success("Review added successfully!");
      });
    });
  };

  return (
    <div>
      {HaveConsultation === true && Patient?.id !== null ? (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="blue" className="mt-3">
                Add review
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  Add a review to Dr {healthcareProvider?.user.name}
                </DialogTitle>
                <DialogDescription>
                  Your feedback helps others learn about your experience with
                  the current healthcare provider.
                </DialogDescription>
              </DialogHeader>
              <Form {...addNewReviewForm}>
                <form
                  className="grid gap-4 py-4"
                  onSubmit={addNewReviewForm.handleSubmit(onSubmit)}
                  id="add-review-form"
                >
                  <div className="grid gap-2">
                    <Label htmlFor="rating">Rating</Label>
                    <div className="flex items-center gap-2">
                      <Rating
                        name="hover-feedback"
                        value={addNewReviewForm.watch("rating")}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          addNewReviewForm.setValue("rating", newValue ?? 0);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {addNewReviewForm.watch("rating") !== null && (
                        <Label>
                          {
                            labels[
                              hover !== -1
                                ? hover
                                : addNewReviewForm.watch("rating")
                            ]
                          }
                        </Label>
                      )}
                    </div>
                  </div>
                  <FormField
                    control={addNewReviewForm.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comment</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Leave a comment..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <DialogFooter>
                <Button
                  type="submit"
                  form="add-review-form"
                  variant="blue"
                  disabled={isPending || !addNewReviewForm.formState.isDirty}
                >
                  Add review
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <Button variant="blue" className="mt-3" disabled>
                    Add review
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">
                  You need to have a consultation with Dr{" "}
                  {healthcareProvider?.user.name} to add a review.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
}
