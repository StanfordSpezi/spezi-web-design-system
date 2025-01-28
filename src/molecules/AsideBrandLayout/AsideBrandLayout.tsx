//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/className";

export interface AsideBrandLayoutProps
  extends ButtonHTMLAttributes<HTMLDivElement> {
  aside?: ReactNode;
}

export const AsideBrandLayout = forwardRef<
  HTMLDivElement,
  AsideBrandLayoutProps
>(({ aside, children, className, ...props }, ref) => (
  <div
    className={cn(
      "w-full lg:grid lg:min-h-screen lg:grid-cols-[450px,1fr] xl:grid-cols-[600px,1fr]",
      className,
    )}
    ref={ref}
    {...props}
  >
    <aside className="hidden flex-col items-center justify-between gap-20 bg-accent py-40 lg:flex">
      {aside}
    </aside>
    <main className="flex min-h-screen items-center justify-center py-12">
      {children}
    </main>
  </div>
));

AsideBrandLayout.displayName = "AsideBrandLayout";
