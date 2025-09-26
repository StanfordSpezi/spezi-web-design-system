//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { CircleAlert } from "lucide-react";
import { type ComponentProps, type ReactNode, useEffect } from "react";
import { Button } from "../Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Dialog";

export type BlockerStatus = "idle" | "blocked";

export interface NavigationBlockerProps
  extends Omit<ComponentProps<typeof Dialog>, "open"> {
  /**
   * Controls whether the native browser beforeunload prompt should be enabled.
   * When true and `shouldBlock` is true, a native prompt will appear on page reload/close.
   *
   * @default false
   */
  enableBeforeUnload?: boolean;
  /** Indicates whether there are unsaved changes that should block navigation. */
  shouldBlock?: boolean;
  /** When set to "blocked", the confirmation dialog is shown. */
  status?: BlockerStatus;
  /** When status is blocked, this function allows navigation to continue. */
  proceed?: () => void;
  /** When status is blocked, this function cancels navigation (status will be reset to 'idle') */
  reset?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  stayLabel?: ReactNode;
  leaveLabel?: ReactNode;
}

/**
 * A small confirmation dialog to guard against accidental navigation when there are unsaved changes.
 * This component is router-agnostic. It does not import or depend on any specific router library.
 *
 * @example
 * import { useBlocker } from "@tanstack/react-router";
 * const blocker = useBlocker({
 *   shouldBlockFn: (location, action) => {
 *     // block if there are unsaved changes and the user is trying to navigate away
 *     return formState.isDirty && action !== "replace";
 *   },
 *   withResolver: true,
 *   enableBeforeUnload: true,
 * });
 * return (
 *   <NavigationBlocker
 *     status={blocker.status}
 *     proceed={blocker.proceed}
 *     reset={blocker.reset}
 *   />
 * );
 *
 * @example
 * // The `enableBeforeUnload` prop enables a native browser prompt on page reload/close.
 * const [dirty, setDirty] = useState(false);
 * return (
 *   <>
 *     <NavigationBlocker shouldBlock={dirty} enableBeforeUnload />
 *      <form
 *       onChange={() => setDirty(true)}
 *       onSubmit={(e) => {
 *         e.preventDefault();
 *         // save...
 *         setDirty(false);
 *       }}
 *     >
 *       <input name="displayName" />
 *       <button type="submit">Save</button>
 *     </form>
 *   </>
 * );
 */
export const NavigationBlocker = ({
  status = "idle",
  proceed,
  reset,
  enableBeforeUnload = false,
  shouldBlock = false,
  title = "Leave this page?",
  description = "You have unsaved changes that will be lost.",
  stayLabel = "Stay",
  leaveLabel = "Leave anyway",
  ...dialogProps
}: NavigationBlockerProps) => {
  const shouldEnableBeforeUnload = enableBeforeUnload && shouldBlock;

  useEffect(() => {
    if (!shouldEnableBeforeUnload) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [shouldEnableBeforeUnload]);

  return (
    <Dialog
      // open whenever router reports a blocked transition
      open={status === "blocked"}
      {...dialogProps}
    >
      <DialogContent size="sm">
        <DialogHeader className="items-center sm:items-start">
          <div className="mb-4 size-8 rounded-lg border shadow-xs">
            <div className="flex-center size-full">
              <CircleAlert className="text-muted-foreground size-4" />
            </div>
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="gap-4 pt-2">
          <Button
            onClick={reset}
            variant="outline"
            size="sm"
            className="sm:flex-1"
          >
            {stayLabel}
          </Button>
          <Button
            onClick={proceed}
            variant="default"
            size="sm"
            className="sm:flex-1"
          >
            {leaveLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
