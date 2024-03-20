"use client";

import React from "react";

import { BellDotIcon, KeyRoundIcon, PaletteIcon, UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useManageAccountDialog } from "@/hooks/use-manage-account-dialog";

import { Button } from "@/components/ui/button";
import { ManageAccountForm } from "@/components/forms/manage-account-form";
import { ManageSecurityForm } from "@/components/forms/manage-security-form";
import { MainDialog } from "@/components/main-dialog";

enum TABS {
  ACCOUNT = "ACCOUNT",
  SECURITY = "SECURITY",
  NOTIFICATIONS = "NOTIFICATIONS",
  ADVANCED = "ADVANCED",
}

export function ManageAccountDialog() {
  const user = useCurrentUser();
  const manageAccountDialog = useManageAccountDialog();
  const [tab, setTab] = React.useState<TABS>(TABS.ACCOUNT);

  let content = null;

  switch (tab) {
    case TABS.ACCOUNT:
      content = (
        <>
          <div className="flex flex-col space-y-1 pb-6">
            <h1 className="text-2xl font-bold">Account</h1>
            <p className="text-muted-foreground">
              Manage your account information.
            </p>
          </div>

          <ManageAccountForm />
        </>
      );
      break;
    case TABS.SECURITY:
      content = (
        <>
          <div className="flex flex-col space-y-1 pb-6">
            <h1 className="text-2xl font-bold">Security</h1>
            <p className="text-muted-foreground">
              Manage your account security settings.
            </p>
          </div>

          <ManageSecurityForm />
        </>
      );
      break;
    case TABS.NOTIFICATIONS:
      content = (
        <>
          <div className="flex flex-col space-y-1 pb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              Configure how you receive notifications.
            </p>
          </div>
        </>
      );
  }

  return (
    <MainDialog
      open={manageAccountDialog.open}
      setOpen={manageAccountDialog.setOpen}
    >
      <div className="flex">
        <div className="mr-6 flex w-full max-w-[16rem] flex-col space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-start space-x-3 px-2.5 text-muted-foreground",
              tab === TABS.ACCOUNT && "bg-accent font-semibold text-foreground",
            )}
            onClick={() => setTab(TABS.ACCOUNT)}
          >
            <UserIcon className="h-5 w-5" />
            <span>Account</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-start space-x-3 px-2.5 text-muted-foreground",
              tab === TABS.SECURITY &&
                "bg-accent font-semibold text-foreground",
            )}
            onClick={() => setTab(TABS.SECURITY)}
            disabled={user?.isOAuth}
          >
            <KeyRoundIcon className="h-5 w-5" />
            <span>Security</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex w-full justify-start space-x-3 px-2.5 text-muted-foreground",
              tab === TABS.NOTIFICATIONS &&
                "bg-accent font-semibold text-foreground",
            )}
            onClick={() => setTab(TABS.NOTIFICATIONS)}
          >
            <BellDotIcon className="h-5 w-5" />
            <span>Notifications</span>
          </Button>
        </div>

        <div className="flex-1 border-l pl-6">{content}</div>
      </div>
    </MainDialog>
  );
}
