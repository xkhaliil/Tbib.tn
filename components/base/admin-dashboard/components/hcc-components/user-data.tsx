import { getSelectedHealthcareCenter } from "@/actions/admin";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

type hccType = Awaited<ReturnType<typeof getSelectedHealthcareCenter>>;
interface HealthcareCenterDetailsPageParams {
  hcc: hccType;
}
export function UserData({ hcc }: HealthcareCenterDetailsPageParams) {
  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Account data</legend>
        <Avatar className="h-[5.5rem] w-[5.5rem]">
          <AvatarImage src={hcc?.user.image ?? ""} />
          <AvatarFallback>
            <span className="text-3xl">{hcc?.user.name.charAt(0)}</span>
          </AvatarFallback>
        </Avatar>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.name}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.email}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4"></div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.phone}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="state">State</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.state}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="city">City</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.city}
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="pc">Postal code</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.postalCode}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Bio</Label>
            <div className="font-mono rounded-md border px-4 py-3 text-sm">
              {hcc?.user.bio}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="name">Email verification</Label>
          {/* <Badge variant="success">Verified</Badge> */}
          {hcc?.user.emailVerified ? (
            <Badge variant="success">Verified</Badge>
          ) : (
            <Badge variant="destructive">Not verified</Badge>
          )}
        </div>
      </fieldset>
    </form>
  );
}
