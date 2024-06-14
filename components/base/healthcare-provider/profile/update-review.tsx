import React from "react";

import {
  getHealthCareProviderById,
  getHealthCareProviderUserAndOpeningHoursAndAbsencesById,
} from "@/actions/healthcare-provider";
import { addNewReview, updateReview } from "@/actions/review";
import { AddNewReviewSchema, AddNewReviewSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import {
  Absence,
  HealthCareProvider,
  OpeningHours,
  Review,
  User,
} from "@prisma/client";
import { PencilIcon } from "lucide-react";
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

interface UpdateReviewProps {
  healthcareProvider: Awaited<
    ReturnType<typeof getHealthCareProviderUserAndOpeningHoursAndAbsencesById>
  >;
  review: Review;
}
export function UpdateReview({
  healthcareProvider,
  review,
}: UpdateReviewProps) {
  const [isPending, startTransition] = React.useTransition();
  const [hover, setHover] = React.useState(-1);

  const updateNewReviewForm = useForm<AddNewReviewSchemaType>({
    resolver: zodResolver(AddNewReviewSchema),
    defaultValues: {
      comment: review.comment || "",
      rating: review.rating,
    },
  });

  const onSubmit = async (data: AddNewReviewSchemaType) => {
    console.log(data);
    startTransition(() => {
      updateReview(review.id, data).then((review) => {
        if (review) {
          toast.success("Review updated successfully!");
        }
      });
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="blue" size="icon">
            <PencilIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              update your review of Dr {healthcareProvider?.user.name}
            </DialogTitle>
            <DialogDescription>
              Your feedback helps others learn about your experience with the
              current healthcare provider.
            </DialogDescription>
          </DialogHeader>
          <Form {...updateNewReviewForm}>
            <form
              className="grid gap-4 py-4"
              onSubmit={updateNewReviewForm.handleSubmit(onSubmit)}
              id="update-review-form"
            >
              <div className="grid gap-2">
                <Label htmlFor="rating">Rating</Label>
                <div className="flex items-center gap-2">
                  <Rating
                    name="hover-feedback"
                    value={updateNewReviewForm.watch("rating")}
                    precision={0.5}
                    getLabelText={getLabelText}
                    onChange={(event, newValue) => {
                      updateNewReviewForm.setValue("rating", newValue ?? 0);
                    }}
                    onChangeActive={(event, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  {updateNewReviewForm.watch("rating") !== null && (
                    <Label>
                      {
                        labels[
                          hover !== -1
                            ? hover
                            : updateNewReviewForm.watch("rating")
                        ]
                      }
                    </Label>
                  )}
                </div>
              </div>
              <FormField
                control={updateNewReviewForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
              form="update-review-form"
              variant="blue"
              disabled={isPending || !updateNewReviewForm.formState.isDirty}
            >
              Update review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
