//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { RouteOff } from "lucide-react";
import { type ComponentProps, type ReactNode } from "react";
import { Button } from "@/components/Button";
import { useSpeziContext } from "@/SpeziProvider";
import { cn } from "@/utils/className";

/**
 * Icon component for the 404 not found state.
 */
export const NotFoundIcon = ({
  className,
  ...props
}: Omit<ComponentProps<"div">, "children">) => (
  <div
    className={cn("flex-center bg-muted mb-2 size-20 rounded-full", className)}
    {...props}
  >
    <RouteOff className="size-7" />
  </div>
);

/**
 * Container component that centers and arranges not found content vertically.
 */
export const NotFoundContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn("flex-center grow flex-col gap-1", className)}
    {...props}
  />
);

/**
 * Title component for the not found state.
 * Displays the main error message.
 */
export const NotFoundTitle = ({
  className,
  ...props
}: ComponentProps<"h1">) => (
  <h1 className={cn("text-2xl font-medium", className)} {...props} />
);

/**
 * Paragraph component for the not found state.
 * Provides additional context and instructions to the user.
 */
export const NotFoundParagraph = ({
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground", className)} {...props} />
);

interface NotFoundActionProps extends ComponentProps<typeof Button> {}

/**
 * Action component that provides navigation options from the not found state.
 * Renders as a small button.
 */
export const NotFoundAction = (props: NotFoundActionProps) => (
  <Button size="sm" className="mt-3" asChild {...props} />
);

export interface NotFoundProps {
  /**
   * Configures where the user should go instead.
   *
   * @example
   * ```ts
   * { name: "users list", href: "/user" }
   * ```
   */
  backPage: {
    name: ReactNode;
    href: string;
  };
  /**
   * Singular name of accessed entity.
   * @example "user"
   */
  entityName: ReactNode;
  className?: string;
}

/**
 * A complete 404 page component for handling non-existent resources.
 *
 * Ensures consistent error messaging and clear navigation options.
 *
 * @example
 * ```ts
 * // Basic usage
 * <NotFound
 *   entityName="user"
 *   backPage={{ name: "users list", href: "/users" }}
 * />
 * ```
 */
export const NotFound = ({
  backPage,
  entityName,
  className,
}: NotFoundProps) => {
  const {
    router: { Link },
  } = useSpeziContext();
  return (
    <NotFoundContainer className={className}>
      <NotFoundIcon />
      <NotFoundTitle>This {entityName} doesn't exist</NotFoundTitle>
      <NotFoundParagraph>
        Please check your URL or return to {backPage.name}
      </NotFoundParagraph>
      <NotFoundAction>
        <Link href={backPage.href}>Go to {backPage.name}</Link>
      </NotFoundAction>
    </NotFoundContainer>
  );
};
