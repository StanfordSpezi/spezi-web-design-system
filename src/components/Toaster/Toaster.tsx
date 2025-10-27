//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { ReactNode } from "react";
import {
  type ExternalToast,
  Toaster as ToasterBase,
  type ToasterProps as ToasterPropsBase,
  toast as sonnerToast,
} from "sonner";

interface ToasterProps extends ToasterPropsBase {}

/**
 * Toaster context provider.
 */
export const Toaster = (props: ToasterProps) => (
  <ToasterBase position="bottom-center" {...props} />
);

type ToastTitle = (() => ReactNode) | ReactNode;

/**
 * A thin wrapper around the Sonner `toast` function that preserves the original API
 * while customizing the default behavior for error toasts.
 *
 * @example
 * ```ts
 * toast('Saved successfully');
 * toast({ title: 'Saved', description: 'Your changes were saved.' });
 * toast.error('Failed to save'); // displays for 5000ms by default
 * toast.error('Failed to save', { duration: 3000 }); // overrides default duration
 * ```
 */
export const toast: typeof sonnerToast = Object.assign(
  (message: ToastTitle, data?: ExternalToast) => sonnerToast(message, data), // Base callable function
  {
    // eslint-disable-next-line @typescript-eslint/no-misused-spread
    ...sonnerToast, // Spread all original properties/methods
    error: (message: ToastTitle, options?: ExternalToast) =>
      sonnerToast.error(message, {
        duration: 5000,
        ...options,
      }),
  },
);
