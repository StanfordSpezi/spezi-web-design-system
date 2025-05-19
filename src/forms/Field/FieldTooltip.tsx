//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Info } from "lucide-react";
import { Tooltip, type TooltipProps } from "@/components/Tooltip";
import { type FieldProps } from "@/forms";
import { ensureString } from "@/utils/misc";

interface FieldTooltipProps extends TooltipProps, Pick<FieldProps, "label"> {
  id: string;
}

/**
 * Info tooltip to be used within Field context.
 */
export const FieldTooltip = ({ label, id, ...props }: FieldTooltipProps) => (
  <Tooltip {...props}>
    <button
      type="button"
      className="focus-ring rounded-md"
      aria-label={[
        "More information about the",
        ensureString(label) ?? id,
        "field",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Info className="text-muted-foreground size-4" />
    </button>
  </Tooltip>
);
