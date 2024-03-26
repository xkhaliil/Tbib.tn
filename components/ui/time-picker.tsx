import * as React from "react";
import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import type { Options } from "timescape";
import { useTimescape, type DateType } from "timescape/react";

import { cn } from "@/lib/utils";

export type TimePickerProps = HTMLAttributes<HTMLDivElement> & {
  value?: Date;
  onChange: (date?: Date) => void;
  children: ReactNode;
  options?: Omit<Options, "date" | "onChangeDate">;
};
type TimePickerContextValue = ReturnType<typeof useTimescape>;
const TimePickerContext = createContext<TimePickerContextValue | null>(null);

const useTimepickerContext = (): TimePickerContextValue => {
  const context = useContext(TimePickerContext);
  if (!context) {
    throw new Error(
      "Unable to access TimePickerContext. This component should be wrapped by a TimePicker component",
    );
  }
  return context;
};

const TimePicker = forwardRef<React.ElementRef<"div">, TimePickerProps>(
  ({ value, onChange, options, className, ...props }, ref) => {
    const timePickerContext = useTimescape({
      date: value,
      onChangeDate: onChange,
      ...options,
    });
    return (
      <TimePickerContext.Provider value={timePickerContext}>
        <div
          ref={ref}
          {...props}
          className={cn(
            "flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
            "focus-within:outline-none focus-within:ring-1 focus-within:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        ></div>
      </TimePickerContext.Provider>
    );
  },
);
TimePicker.displayName = "TimePicker";

type TimePickerSegmentProps = Omit<
  HTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> & {
  segment: DateType;
  inputClassName?: string;
};

const TimePickerSegment = forwardRef<
  React.ElementRef<"input">,
  TimePickerSegmentProps
>(({ segment, inputClassName, className, ...props }, ref) => {
  const { getInputProps } = useTimepickerContext();
  const { ref: timePickerInputRef } = getInputProps(segment);
  return (
    <div
      className={cn(
        "rounded-md px-2 py-[3px] text-accent-foreground focus-within:bg-accent",
      )}
    >
      <input
        ref={(node) => {
          if (typeof ref === "function") {
            ref(node);
          } else {
            if (ref) ref.current = node;
          }
          timePickerInputRef(node);
        }}
        {...props}
        className={cn(
          "tabular-nums caret-transparent",
          "border-transparent bg-transparent outline-none ring-0 ring-offset-0 focus-visible:border-transparent focus-visible:ring-0",
          inputClassName,
        )}
      />
    </div>
  );
});
TimePickerSegment.displayName = "TimePickerSegment";

type TimePickerSeparatorProps = HTMLAttributes<HTMLSpanElement>;
const TimePickerSeparator = forwardRef<
  React.ElementRef<"span">,
  TimePickerSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <span
      ref={ref}
      {...props}
      className={cn("px-1 py-[3px] text-[12px]", className)}
    ></span>
  );
});
TimePickerSeparator.displayName = "TimePickerSeparator";

export { TimePicker, TimePickerSegment, TimePickerSeparator };
