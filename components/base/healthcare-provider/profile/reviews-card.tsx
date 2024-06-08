"use client";

import React from "react";

import { getPatientByUserId } from "@/actions/auth";
import { getHealthCareProviderUserAndOpeningHoursAndAbsencesById } from "@/actions/healthcare-provider";
import { deleteReview } from "@/actions/review";
import Rating from "@mui/material/Rating";
import { format } from "date-fns";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import { AddReview } from "./add-review";
import { UpdateReview } from "./update-review";

type ReviewscardProps = {
  healthcareProvider: Awaited<
    ReturnType<typeof getHealthCareProviderUserAndOpeningHoursAndAbsencesById>
  >;
  patient: Awaited<ReturnType<typeof getPatientByUserId>>;
  HaveConsultation: boolean;
};

export function Reviewscard({
  healthcareProvider,
  patient,
  HaveConsultation,
}: ReviewscardProps) {
  const calculateAverageRating = () => {
    if (healthcareProvider?.reviews) {
      const total = healthcareProvider.reviews.length || 1;
      return (
        healthcareProvider.reviews.reduce(
          (acc, review) => acc + review.rating,
          0,
        ) / total
      );
    }
    return 0;
  };
  const getPercentageByRating = (rating: number) => {
    const total = healthcareProvider?.reviews?.length || 1;
    const ratingCount = healthcareProvider?.reviews?.filter(
      (review) => Math.floor(review.rating) === rating,
    ).length;
    return ((ratingCount || 0) / total) * 100;
  };
  return (
    <>
      <section>
        <div className="rounded-xl border p-7">
          <div className=" mx-10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold ">
                {calculateAverageRating().toFixed(1)}
              </div>
              <div className="flex items-center justify-center">
                <Rating
                  value={calculateAverageRating()}
                  readOnly
                  precision={0.5}
                />
              </div>
              <div className="mt-2 text-sm font-light">
                {healthcareProvider?.reviews.length} reviews
              </div>
              <AddReview
                healthcareProvider={healthcareProvider}
                HaveConsultation={HaveConsultation}
                Patient={patient}
              />
            </div>
            <Separator orientation="vertical" className="mx-10 h-40" />
            <div className="flex w-full flex-1 flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Rating value={calculateAverageRating()} readOnly />
                  <p className="ml-2 text-sm font-medium text-muted-foreground">
                    {calculateAverageRating().toFixed(1)} out of 5
                  </p>
                </div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  {healthcareProvider?.reviews.length} ratings
                </p>
              </div>

              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-nowrap text-sm font-medium text-muted-foreground">
                    5 stars
                  </p>
                  <Progress
                    value={getPercentageByRating(5)}
                    className="h-6 w-3/4 rounded-sm"
                    indicatorColor="bg-yellow-500"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getPercentageByRating(5).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-nowrap text-sm font-medium text-muted-foreground">
                    4 stars
                  </p>
                  <Progress
                    value={getPercentageByRating(4)}
                    className="h-6 w-3/4 rounded-sm"
                    indicatorColor="bg-yellow-500"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getPercentageByRating(4).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-nowrap text-sm font-medium text-muted-foreground">
                    3 stars
                  </p>
                  <Progress
                    value={getPercentageByRating(3)}
                    className="h-6 w-3/4 rounded-sm"
                    indicatorColor="bg-yellow-500"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getPercentageByRating(3).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-nowrap text-sm font-medium text-muted-foreground">
                    2 stars
                  </p>
                  <Progress
                    value={getPercentageByRating(2)}
                    className="h-6 w-3/4 rounded-sm"
                    indicatorColor="bg-yellow-500"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getPercentageByRating(2).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <p className="mr-2.5 text-nowrap text-sm font-medium text-muted-foreground">
                    1 star
                  </p>
                  <Progress
                    value={getPercentageByRating(1)}
                    className="h-6 w-3/4 rounded-sm"
                    indicatorColor="bg-yellow-500"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {getPercentageByRating(1).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex items-center justify-between">
          <h2 className="text-lg font-bold lg:text-2xl">
            Reviews ({healthcareProvider?.reviews.length})
          </h2>
        </div>

        {healthcareProvider?.reviews.map((review, idx) => (
          <div className="mt-6 rounded-xl border bg-muted/40 p-6" key={idx}>
            <div className="gap-3 sm:flex sm:items-start">
              <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                <div className="flex items-center gap-0.5">
                  <Rating value={review.rating} readOnly />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={review.patient.user.image || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {review.patient.user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <p className="text-base font-semibold">
                      {review.patient.user.name}
                    </p>
                  </div>
                  <p className="pt-2 text-sm font-normal text-muted-foreground">
                    {format(new Date(review.date), "MMMM dd, yyyy hh:mm a")}
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1 space-y-4 sm:mt-0">
                {patient?.id === review.patientId ? (
                  <div className="flex items-center justify-end gap-2">
                    {" "}
                    <UpdateReview
                      healthcareProvider={healthcareProvider}
                      review={review}
                    />
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your review.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="mt-2"
                            onClick={() => {
                              deleteReview(
                                review.id,
                                healthcareProvider.id,
                              ).then(() => {
                                toast.success("Your review has been deleted");
                              });
                            }}
                          >
                            Yes, delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ) : null}
                <p className="text-base font-normal text-muted-foreground">
                  {review.comment}
                </p>
              </div>
            </div>
          </div>
        ))}

        {healthcareProvider?.reviews.length === 0 && (
          <div className="mt-6 rounded-xl border bg-muted/40 p-6">
            <div className="text-center">
              <p className="text-lg font-medium text-muted-foreground">
                No reviews available for this healthcare provider
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
