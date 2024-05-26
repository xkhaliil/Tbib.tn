"use client";

import React from "react";

import {
  archiveNotification,
  markNotificationAsRead,
} from "@/actions/notifications";
import { Notification, NotificationType } from "@prisma/client";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, formatDistance } from "date-fns";
import {
  ArchiveIcon,
  BellIcon,
  CheckCheckIcon,
  ClockIcon,
  StarIcon,
  XIcon,
} from "lucide-react";

import { pusherClient } from "@/lib/pusher";
import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface NotificationsFeedProps {
  notifications: Notification[] | undefined;
  patientId: string | undefined;
}

export function NotificationsFeed({
  notifications: intitialNotifications,
  patientId,
}: NotificationsFeedProps) {
  const [isPending, startTransition] = React.useTransition();
  const [notifications, setNotifications] = React.useState<Notification[]>(
    intitialNotifications || [],
  );

  React.useEffect(() => {
    pusherClient.subscribe(`patient-notifications-${patientId}`);

    const notificationHandler = (notification: Notification) => {
      setNotifications((currentNotifications) => {
        if (currentNotifications.some((n) => n.id === notification.id)) {
          return currentNotifications;
        }
        return [...currentNotifications, notification];
      });
    };

    pusherClient.bind("notifications:new", notificationHandler);

    return () => {
      pusherClient.unsubscribe(`patient-notifications-${patientId}`);
      pusherClient.unbind("notifications:new");
    };
  }, [patientId]);

  const newNotifications = notifications.filter((n) => !n.read);

  const archivedNotifications = notifications.filter((n) => n.archived);

  const readNotifications = notifications.filter((n) => n.read);

  const handleArchiveNotification = async (notificationId: string) => {
    startTransition(() => {
      archiveNotification(notificationId).then((archivedNotification) => {
        setNotifications((currentNotifications) =>
          currentNotifications.map((n) =>
            n.id === archivedNotification?.id ? archivedNotification : n,
          ),
        );
      });
    });
  };

  const handleMarkNotificationAsRead = async (notificationId: string) => {
    startTransition(() => {
      markNotificationAsRead(notificationId).then((readNotification) => {
        setNotifications((currentNotifications) =>
          currentNotifications.map((n) =>
            n.id === readNotification?.id ? readNotification : n,
          ),
        );
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            buttonVariants({ variant: "outline" }),
            "relative h-10 w-10 rounded-full p-0",
          )}
        >
          {newNotifications.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-white">
              {newNotifications.length}
            </span>
          )}
          <BellIcon className="h-5 w-5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[550px] rounded-xl p-0">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-semibold text-foreground">
              Notifications
            </h3>
            <div className="flex h-5 w-5 items-center justify-center rounded border bg-muted text-xs font-medium">
              {notifications.length}
            </div>
          </div>
          {notifications.length > 0 && (
            <Button variant="link" size="sm" className="p-0">
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="flex max-h-[400px] flex-1 flex-col">
          {newNotifications.length === 0 && (
            <div className="border-b p-4">
              <p className="text-center text-sm text-muted-foreground">
                You have no new notifications
              </p>
            </div>
          )}
          {newNotifications.map((notification, index) => (
            <div className="p-4" key={index}>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded",
                      notification.type === NotificationType.NEW_APPOINTMENT &&
                        "bg-blue-600",
                      notification.type ===
                        NotificationType.APPOINTMENT_CANCELLED &&
                        "bg-destructive",
                      notification.type ===
                        NotificationType.APPOINTMENT_RESCHEDULED &&
                        "bg-warning",
                      notification.type === NotificationType.REVIEW &&
                        "bg-yellow-500",
                    )}
                  >
                    {notification.type === NotificationType.NEW_APPOINTMENT && (
                      <CalendarIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_CANCELLED && (
                      <XIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_RESCHEDULED && (
                      <ClockIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type === NotificationType.REVIEW && (
                      <StarIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(new Date(notification.date), new Date())}{" "}
                      ago
                    </span>

                    <Card className="mt-2 w-full max-w-sm p-2 shadow-none">
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleArchiveNotification(notification.id)}
                    disabled={isPending}
                  >
                    <ArchiveIcon className="h-4 w-4" />
                  </Button>
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleMarkNotificationAsRead(notification.id)
                      }
                      disabled={isPending}
                    >
                      <CheckCheckIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {readNotifications.length > 0 && newNotifications.length > 0 && (
            <Separator className="border-t" />
          )}

          {readNotifications.map((notification, index) => (
            <div className="border-b p-4" key={index}>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded",
                      notification.type === NotificationType.NEW_APPOINTMENT &&
                        "bg-blue-600",
                      notification.type ===
                        NotificationType.APPOINTMENT_CANCELLED &&
                        "bg-destructive",
                      notification.type ===
                        NotificationType.APPOINTMENT_RESCHEDULED &&
                        "bg-warning",
                      notification.type === NotificationType.REVIEW &&
                        "bg-yellow-500",
                    )}
                  >
                    {notification.type === NotificationType.NEW_APPOINTMENT && (
                      <CalendarIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_CANCELLED && (
                      <XIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_RESCHEDULED && (
                      <ClockIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type === NotificationType.REVIEW && (
                      <StarIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-foreground">
                        {notification.title}
                      </p>
                      <CheckCheckIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(new Date(notification.date), new Date())}{" "}
                      ago
                    </span>

                    <Card className="mt-2 w-full max-w-sm rounded-sm p-2 shadow-none">
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleArchiveNotification(notification.id)}
                    disabled={isPending}
                  >
                    <ArchiveIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {archivedNotifications.map((notification, index) => (
            <div className="border-b p-4" key={index}>
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded",
                      notification.type === NotificationType.NEW_APPOINTMENT &&
                        "bg-blue-600",
                      notification.type ===
                        NotificationType.APPOINTMENT_CANCELLED &&
                        "bg-destructive",
                      notification.type ===
                        NotificationType.APPOINTMENT_RESCHEDULED &&
                        "bg-warning",
                      notification.type === NotificationType.REVIEW &&
                        "bg-yellow-500",
                    )}
                  >
                    {notification.type === NotificationType.NEW_APPOINTMENT && (
                      <CalendarIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_CANCELLED && (
                      <XIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type ===
                      NotificationType.APPOINTMENT_RESCHEDULED && (
                      <ClockIcon className="h-4 w-4 text-white" />
                    )}
                    {notification.type === NotificationType.REVIEW && (
                      <StarIcon className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-foreground">
                      {notification.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistance(new Date(notification.date), new Date())}{" "}
                      ago
                    </span>

                    <Card className="mt-2 w-full max-w-sm p-2 shadow-none">
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="flex justify-center py-2.5">
          <Button variant="link" size="sm" className="p-0">
            View all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
