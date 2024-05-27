import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div
      className="flex w-full flex-col rounded-lg border border-green-200 bg-green-100 p-4"
      role="alert"
    >
      <div className="flex items-center space-x-2.5">
        <div className="flex-shrink-0">
          <CheckCircledIcon
            className="h-4 w-4 text-green-600"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-sm font-medium text-green-600">Success!</h3>
      </div>

      <div>
        <div className="mt-2 text-sm text-muted-foreground">{message}</div>
      </div>
    </div>
  );
}
