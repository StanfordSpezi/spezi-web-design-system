//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { ClipboardCopy } from "lucide-react";
import { type ReactNode } from "react";
import { cn } from "@/utils/className";
import { copyToClipboard } from "../../utils/misc";

type CopyTextProps = (
  | { children: string; value?: string } // children are string = value is optional
  | { children: ReactNode; value: string } // children are ReactNode = value is required, because ReactNode might not be copyable
) & {
  className?: string;
};

/**
 * Displays copiable text
 * Useful for displaying truncated ids in tables
 * */
export const CopyText = ({ children, className, value }: CopyTextProps) => {
  // It's resolved by types
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const copyValue = value ?? String(children);
  return (
    <button
      type="button"
      className={cn(
        "interactive-opacity flex w-full items-center gap-2",
        className,
      )}
      onClick={async () => {
        await copyToClipboard(copyValue);
      }}
      aria-label={`Copy "${copyValue}" to clipboard`}
    >
      <span className="truncate">{children}</span>
      <span className="flex">
        <ClipboardCopy className="text-muted-foreground size-5" />
      </span>
    </button>
  );
};
