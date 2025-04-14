//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/className";

export interface AsideBrandLayoutProps extends ComponentProps<"div"> {
  aside?: ReactNode;
}

export const AsideBrandLayout = ({
  aside,
  children,
  className,
  ...props
}: AsideBrandLayoutProps) => (
  <div
    className={cn(
      "w-full lg:grid lg:min-h-screen lg:grid-cols-[450px_1fr] xl:grid-cols-[600px_1fr]",
      className,
    )}
    {...props}
  >
    <aside className="bg-accent hidden flex-col items-center justify-between gap-20 py-40 lg:flex">
      {aside}
    </aside>
    <main className="flex min-h-screen items-center justify-center py-12">
      {children}
    </main>
  </div>
);
