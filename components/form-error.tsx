import { AlertTriangleIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div
      className="flex flex-col rounded-lg bg-destructive/15 p-4"
      role="alert"
    >
      <div className="flex items-center space-x-2.5">
        <div className="flex-shrink-0">
          <AlertTriangleIcon
            className="h-4 w-4 text-destructive"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-sm font-medium text-destructive">Error!</h3>
      </div>

      <div>
        <div className="mt-2 text-sm text-muted-foreground">{message}</div>
      </div>
    </div>
  );
}
