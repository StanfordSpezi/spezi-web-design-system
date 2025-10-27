//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type ComponentProps } from "react";
import { cn } from "@/utils/className";

export interface AsideBrandLayoutRootProps extends ComponentProps<"div"> {}

/**
 * A layout component that provides a branded aside section and main content area.
 * Useful for landing page, sign in, reset password flows.
 *
 * The aside section is only visible on large screens (lg breakpoint and above).
 *
 * @example
 * ```tsx
 * <AsideBrandLayoutRoot>
 *   <AsideBrandLayoutAside>
 *     <BrandLogo />
 *   </AsideBrandLayoutAside>
 *   <AsideBrandLayoutMain>
 *     <SignInForm />
 *   </AsideBrandLayoutMain>
 * </AsideBrandLayoutRoot>
 * ```
 *
 * @example
 * ```tsx
 * // Stanford Branded example
 * <AsideBrandLayoutRoot>
 *   <AsideBrandLayoutAside>
 *     <h1 className="text-2xl font-bold">Spezi Web Design System</h1>
 *     <img
 *       src="https://biodesign.stanford.edu/_jcr_content/local-header/_jcr_content/custom-logo.img.full.high.png"
 *       alt="Stanford Byers Center for Biodesign Logo"
 *       className="w-40"
 *     />
 *   </AsideBrandLayoutAside>
 *   <AsideBrandLayoutMain>
 *     <SignInForm />
 *   </AsideBrandLayoutMain>
 * </AsideBrandLayoutRoot>
 * ```
 *
 */
export const AsideBrandLayoutRoot = ({
  children,
  className,
  ...props
}: AsideBrandLayoutRootProps) => (
  <div
    className={cn(
      "w-full lg:grid lg:min-h-screen lg:grid-cols-[450px_1fr] xl:grid-cols-[600px_1fr]",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

export interface AsideBrandLayoutAsideProps extends ComponentProps<"aside"> {}

/**
 * The aside section of the AsideBrandLayout.
 * This component is only visible on large screens (lg breakpoint and above).
 * It provides a branded section with a light background color and centered content.
 *
 * @example
 * ```tsx
 * <AsideBrandLayoutAside>
 *   <BrandLogo />
 *   <BrandDescription />
 * </AsideBrandLayoutAside>
 * ```
 */
export const AsideBrandLayoutAside = ({
  children,
  className,
  ...props
}: AsideBrandLayoutAsideProps) => (
  <aside
    className={cn(
      "bg-accent hidden flex-col items-center justify-between gap-20 py-40 lg:flex",
      className,
    )}
    {...props}
  >
    {children}
  </aside>
);

export interface AsideBrandLayoutMainProps extends ComponentProps<"main"> {}

/**
 * The main content area of the AsideBrandLayout.
 * This component provides a centered container for the primary content,
 * such as forms, content sections, or other interactive elements.
 *
 * @example
 * ```tsx
 * <AsideBrandLayoutMain>
 *   <LoginForm />
 * </AsideBrandLayoutMain>
 * ```
 */
export const AsideBrandLayoutMain = ({
  children,
  className,
  ...props
}: AsideBrandLayoutMainProps) => (
  <main
    className={cn(
      "flex min-h-screen items-center justify-center py-12",
      className,
    )}
    {...props}
  >
    {children}
  </main>
);
