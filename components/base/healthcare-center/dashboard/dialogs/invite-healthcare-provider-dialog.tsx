"use client";

import React from "react";

import { specialties } from "@/constants";
import { faker } from "@faker-js/faker";
import { CheckIcon } from "@radix-ui/react-icons";

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

const healthcareProviders = Array.from({ length: 5 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  speciality: faker.helpers.arrayElement(
    specialties.flatMap((s) => s.specialties),
  ),
}));

export function InviteHealthcareProviderDialog() {
  const inviteHealthcareProviderDialog = useInviteHealthcareProviderDialog();
  const [selectedHealthcareProviders, setSelectedHealthcareProviders] =
    React.useState<(typeof healthcareProviders)[number][]>([]);

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
              {healthcareProviders.map((healthcareProvider) => (
                <CommandItem
                  key={healthcareProvider.id}
                  className="flex items-center px-2.5"
                  onSelect={() => {
                    if (
                      selectedHealthcareProviders.includes(healthcareProvider)
                    ) {
                      return setSelectedHealthcareProviders(
                        selectedHealthcareProviders.filter(
                          (hp) => hp !== healthcareProvider,
                        ),
                      );
                    }

                    return setSelectedHealthcareProviders(
                      [...healthcareProviders].filter((u) =>
                        [
                          ...selectedHealthcareProviders,
                          healthcareProvider,
                        ].includes(u),
                      ),
                    );
                  }}
                >
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" alt="Image" />
                    <AvatarFallback>
                      {healthcareProvider.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-2.5">
                    <p className="text-sm font-medium leading-none">
                      {healthcareProvider.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {healthcareProvider.email}
                    </p>
                  </div>
                  {selectedHealthcareProviders.includes(healthcareProvider) ? (
                    <CheckIcon className="ml-auto flex h-5 w-5 text-blue-600" />
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
          {selectedHealthcareProviders.length > 0 ? (
            <div className="flex -space-x-2 overflow-hidden">
              {selectedHealthcareProviders.map((user) => (
                <Avatar
                  key={user.email}
                  className="inline-block border-2 border-background"
                >
                  <AvatarImage src="/placeholder.svg" alt="Image" />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select healthcare providers to invite.
            </p>
          )}
          <Button
            variant="blue"
            disabled={selectedHealthcareProviders.length < 1}
          >
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
