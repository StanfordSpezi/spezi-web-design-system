//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Check, CircleAlert } from "lucide-react";
import { type ComponentProps } from "react";
import { cn } from "@/utils/className";
import { useTimedFlag } from "@/utils/useTimedFlag";
import { Button } from "../Button";

export interface SaveButtonProps
  extends Omit<ComponentProps<typeof Button>, "children"> {
  /** When true, shows a temporary success state. */
  isSuccess?: boolean;
  /**
   * Duration in ms to keep the success state visible.
   *
   * @default 2000
   */
  successTimeout?: number;
  /** When true, shows a temporary error state. */
  isError?: boolean;
  /**
   * Duration in ms to keep the error state visible.
   *
   * @default 5000
   */
  errorTimeout?: number;
}

/**
 * SaveButton extends Button with built-in transient success and error states.
 * Provide {@link SaveButtonProps#isSuccess|isSuccess} or {@link SaveButtonProps#isSuccess|isError} to trigger the corresponding state.
 *
 * @example
 * ```tsx
 * const [isPending, setIsPending] = useState(false);
 * const [success, setSuccess] = useState(false);
 * const [error, setError] = useState(false);
 *
 * const handleSave = async () => {
 *   setIsPending(true);
 *   try {
 *     await saveData();
 *     setSuccess(true);
 *   } catch {
 *     setError(true);
 *   } finally {
 *     setIsPending(false);
 *   }
 * };
 * return (
 *   <SaveButton
 *     isPending={isPending}
 *     isSuccess={success}
 *     isError={error}
 *     onClick={handleSave}
 *   />
 * );
 * ```
 */
export const SaveButton = ({
  className,
  isPending,
  disabled,
  isSuccess,
  successTimeout = 2000,
  isError,
  errorTimeout = 5000,
  ...props
}: SaveButtonProps) => {
  const localIsSuccess = useTimedFlag(isSuccess, successTimeout);
  const localIsError = useTimedFlag(isError, errorTimeout);

  return (
    <Button
      disabled={disabled ?? isPending}
      isPending={isPending}
      variant={
        localIsSuccess ? "success"
        : localIsError ?
          "destructive"
        : "default"
      }
      className={cn(
        "border-2 border-transparent transition-all",
        localIsSuccess || localIsError ? "w-28" : "w-20",
        className,
      )}
      {...props}
    >
      {localIsSuccess ?
        <div className="flex items-center gap-2">
          <span>Saved</span>
          <Check className="size-4" strokeWidth={3} />
        </div>
      : localIsError ?
        <div className="flex w-full items-center gap-2">
          <CircleAlert className="size-4" />
          Error
        </div>
      : "Save"}
    </Button>
  );
};
