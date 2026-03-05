//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { toast } from "@/components/Toaster";

interface NotImplementedToastOptions {
  description?: string;
  duration?: number;
}

/**
 * Displays a standardized "coming soon" toast for features that are not yet implemented.
 *
 * @example
 * ```ts
 * notImplementedToast("Export to PDF");
 * // Shows: "Coming soon" with description "Export to PDF isn't available yet."
 *
 * notImplementedToast("Dark mode", {
 *   description: "We're working on dark mode support.",
 *   duration: 6000,
 * });
 * ```
 */
export const notImplementedToast = (
  feature: string,
  { description, duration = 4000 }: NotImplementedToastOptions = {},
) => {
  const toastDescription = description ?? `${feature} isn't available yet.`;

  toast.info("Coming soon", {
    description: toastDescription,
    duration,
  });
};
