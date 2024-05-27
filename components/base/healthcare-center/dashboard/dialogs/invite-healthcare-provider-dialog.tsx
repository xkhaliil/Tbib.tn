"use client";

import React from "react";

import {
  getAllHealthcareProvidersWithoutHealthcareCenter,
  inviteHealthcareProvider,
} from "@/actions/healthcare-center";
import { HealthCareProvider } from "@/types";
import { CheckIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";

import { useInviteHealthcareProviderDialog } from "@/hooks/use-invite-healthcare-provider-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

interface InviteHealthcareProviderDialogProps {
  healthcareProviders: Awaited<
    ReturnType<typeof getAllHealthcareProvidersWithoutHealthcareCenter>
  >;
}

export function InviteHealthcareProviderDialog({
  healthcareProviders,
}: InviteHealthcareProviderDialogProps) {
  const [isPending, startTransition] = React.useTransition();
  const inviteHealthcareProviderDialog = useInviteHealthcareProviderDialog();
  const [selectedHealthcareProvider, setSelectedHealthcareProvider] =
    React.useState<HealthCareProvider | null>(null);

  const handleInviteHealthcareProvider = async () => {
    startTransition(() => {
      inviteHealthcareProvider(selectedHealthcareProvider?.id || "").then(
        () => {
          toast.success("Healthcare provider invited successfully");
          inviteHealthcareProviderDialog.setOpen(false);
        },
      );
    });
  };

  return (
    <Dialog
      open={inviteHealthcareProviderDialog.open}
      onOpenChange={inviteHealthcareProviderDialog.setOpen}
    >
      <DialogContent className="max-w-3xl gap-0 p-0 outline-none">
        <DialogHeader className="px-4 pb-4 pt-5">
          <DialogTitle className="text-blue-600">
            Invite Healthcare Provider
          </DialogTitle>
          <DialogDescription>
            Invite a healthcare provider to join your team.
          </DialogDescription>
        </DialogHeader>
        <Command className="overflow-hidden rounded-t-none border-t bg-transparent">
          <CommandInput placeholder="Search for a healthcare provider..." />
          <CommandList>
            <CommandEmpty>
              No healthcare providers found. Try searching for another provider.
            </CommandEmpty>
            <CommandGroup className="p-2">
              {healthcareProviders?.map((healthcareProvider) => (
                <CommandItem
                  key={healthcareProvider.id}
                  className="flex items-center px-2.5"
                  onSelect={() => {
                    setSelectedHealthcareProvider(healthcareProvider);
                  }}
                >
                  <Avatar>
                    <AvatarImage
                      src={healthcareProvider.user.image || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {healthcareProvider.user.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2.5">
                    <p className="text-sm font-medium leading-none">
                      {healthcareProvider.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {healthcareProvider.user.email}
                    </p>
                  </div>
                  {selectedHealthcareProvider?.id === healthcareProvider.id ? (
                    <CheckIcon className="ml-auto flex h-5 w-5 text-blue-600" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter className="flex items-center justify-end border-t p-4">
          <Button
            variant="blue"
            onClick={handleInviteHealthcareProvider}
            disabled={!selectedHealthcareProvider || isPending}
          >
            {isPending && <Spinner className="mr-2" />}
            Invite Healthcare Provider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
