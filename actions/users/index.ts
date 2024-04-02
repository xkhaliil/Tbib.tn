"use server";

import { db } from "@/lib/db";

export async function countUsersByMonth() {
  const users = await db.user.findMany({
    select: {
      createdAt: true,
    },
  });

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",  
    "Oct",
    "Nov",
    "Dec",
  ];

  const usersPerMonth = Array(12)
    .fill(0)
    .map((_, index) => ({
      month: monthNames[index],
      totalUsers: users.filter((user) => {
        const date = new Date(user.createdAt);
        return date.getMonth() === index && date.getFullYear() === 2024;
      }).length,
    }));

  return usersPerMonth;
}
