"use server";

import { db } from "@/lib/db";

export async function getAllDoctors() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    return doctors;
  } catch (error) {
    console.error(error);
  }
}
export async function getDoctorById(doctorId: string) {
  try {
    const doctor = await db.healthCareProvider.findUnique({
      where: {
        id: doctorId,
      },
      include: {
        user: true,
      },
    });

    return doctor;
  } catch (error) {
    console.error(error);
  }
}

export async function getDoctorsCount() {
  try {
    const count = await db.healthCareProvider.count();

    return count;
  } catch (error) {
    console.error(error);
  }
}
export async function getTop5RateScoreDoctor() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    const doctorsWithRatings = [];

    for (let i = 0; i < doctors.length; i++) {
      const reviews = await db.review.findMany({
        where: { healthCareProviderId: doctors[i].id },
      });

      let totalRating = 0;
      for (let j = 0; j < reviews.length; j++) {
        totalRating += reviews[j].rating;
      }

      const ratingScore = reviews.length > 0 ? totalRating / reviews.length : 0;

      doctorsWithRatings.push({
        doctor: doctors[i],
        rating: ratingScore,
      });
    }
    const top5Doctors = doctorsWithRatings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);

    return top5Doctors;
  } catch (error) {
    console.error(error);
  }
}
export async function getBestRatedDoctor() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    const doctorsWithRatings = [];

    for (let i = 0; i < doctors.length; i++) {
      const reviews = await db.review.findMany({
        where: { healthCareProviderId: doctors[i].id },
      });

      let totalRating = 0;
      for (let j = 0; j < reviews.length; j++) {
        totalRating += reviews[j].rating;
      }

      const ratingScore = reviews.length > 0 ? totalRating / reviews.length : 0;

      doctorsWithRatings.push({
        doctor: doctors[i],
        rating: ratingScore,
        totalRating: reviews.length,
      });
    }
    const top1Doctor = doctorsWithRatings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 1);

    return top1Doctor;
  } catch (error) {
    console.error(error);
  }
}
export async function getbestRatedDoctorThisWeek() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    const doctorsWithRatings = [];
    let date = new Date();
    for (let i = 0; i < doctors.length; i++) {
      const reviews = await db.review.findMany({
        where: {
          healthCareProviderId: doctors[i].id,

          date: {
            gte: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() - date.getDay(),
            ),
            lte: new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate() - date.getDay() + 6,
            ),
          },
        },
      });

      let totalRating = 0;
      for (let j = 0; j < reviews.length; j++) {
        totalRating += reviews[j].rating;
      }

      const ratingScore = reviews.length > 0 ? totalRating / reviews.length : 0;

      doctorsWithRatings.push({
        doctor: doctors[i],
        rating: ratingScore,
        totalRating: reviews.length,
      });
    }
    const top1Doctor = doctorsWithRatings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 1);

    return top1Doctor;
  } catch (error) {
    console.error(error);
  }
}
export async function getbestRatedDoctorThisMonth() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    const doctorsWithRatings = [];
    let date = new Date();
    for (let i = 0; i < doctors.length; i++) {
      const reviews = await db.review.findMany({
        where: {
          healthCareProviderId: doctors[i].id,
          date: {
            gte: new Date(date.getFullYear(), date.getMonth(), 1),
            lte: new Date(date.getFullYear(), date.getMonth() + 1, 0),
          },
        },
      });

      let totalRating = 0;
      for (let j = 0; j < reviews.length; j++) {
        totalRating += reviews[j].rating;
      }

      const ratingScore = reviews.length > 0 ? totalRating / reviews.length : 0;

      doctorsWithRatings.push({
        doctor: doctors[i],
        rating: ratingScore,
        totalRating: reviews.length,
      });
    }
    const top1Doctor = doctorsWithRatings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 1);

    return top1Doctor;
  } catch (error) {
    console.error(error);
  }
}
export async function getbestRatedDoctorThisYear() {
  try {
    const doctors = await db.healthCareProvider.findMany({
      include: {
        user: true,
      },
    });

    const doctorsWithRatings = [];
    let date = new Date();
    for (let i = 0; i < doctors.length; i++) {
      const reviews = await db.review.findMany({
        where: {
          healthCareProviderId: doctors[i].id,
          date: {
            gte: new Date(date.getFullYear(), 0, 1),
            lte: new Date(date.getFullYear(), 11, 31),
          },
        },
      });

      let totalRating = 0;
      for (let j = 0; j < reviews.length; j++) {
        totalRating += reviews[j].rating;
      }

      const ratingScore = reviews.length > 0 ? totalRating / reviews.length : 0;

      doctorsWithRatings.push({
        doctor: doctors[i],
        rating: ratingScore,
        totalRating: reviews.length,
      });
    }
    const top1Doctor = doctorsWithRatings
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 1);

    return top1Doctor;
  } catch (error) {
    console.error(error);
  }
}
