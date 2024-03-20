import { InfoCircledIcon } from "@radix-ui/react-icons";

interface FormInfoProps {
  title?: string;
  message?: string;
}

export function FormInfo({ title, message }: FormInfoProps) {
  if (!message) return null;

  return (
    <div
      className="flex flex-col rounded-lg border border-blue-200 bg-blue-100 p-4 text-foreground"
      role="alert"
    >
      <div className="flex items-center space-x-2.5">
        <div className="flex-shrink-0">
          <InfoCircledIcon
            className="h-4 w-4 text-sky-600"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-sm font-medium text-sky-600">
          {title || "Heads up!"}
        </h3>
      </div>

      <div>
        <div className="mt-2 text-sm text-muted-foreground">{message}</div>
      </div>
    </div>
  );
}
