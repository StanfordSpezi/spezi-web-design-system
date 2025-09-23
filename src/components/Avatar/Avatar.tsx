//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { cva, type VariantProps } from "class-variance-authority";
import {
  type ComponentProps,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { cn } from "@/utils/className";
import { isEmpty, type Nil } from "@/utils/misc";

type AvatarProps = VariantProps<typeof avatarVariance> &
  ComponentProps<"div"> & {
    /**
     * The source URL of the avatar image.
     * If provided, the image will be displayed.
     * If the image fails to load, the fallback content will be shown.
     */
    src?: Nil<string>;
    /**
     * Custom fallback content to display when:
     * - No src is provided
     * - The image fails to load
     * - The name is not provided
     *
     * Initials from the name will be used as fallback if provided.
     */
    fallback?: ReactNode;
    /**
     * The name associated with the avatar.
     * Used for:
     * - Generating fallback initials when no fallback is provided
     * - Setting the alt text for the image
     */
    name?: Nil<string>;
    /**
     * Overlay content to render on top of the avatar.
     * Can be any ReactNode - badges, status indicators, icons, etc.
     * Positioned absolutely within the avatar container.
     */
    overlay?: ReactNode;
  };

/**
 * Extracts initials from a given name string.
 * For full names, returns first letters of first and last name.
 * For single names, returns first two letters.
 */
export const getInitials = (value: string) => {
  const words = value.trim().split(" ");
  if (isEmpty(words)) return "";
  if (words.length === 1)
    return words.at(0)?.substring(0, 2).toLocaleUpperCase() ?? "";
  const nameLetter = words.at(0)?.at(0) ?? "";
  const surnameLetter = words.at(-1)?.at(0) ?? "";
  return `${nameLetter}${surnameLetter}`.toLocaleUpperCase();
};

export const avatarVariants = {
  /**
   * Affects width, height and font size.
   * - `sm`: 32px with smaller text.
   * - `default`: 48px with base text.
   * - `lg`: 64px with larger text.
   *
   * @default "default"
   */
  size: {
    sm: "size-8 text-xs",
    default: "size-12",
    lg: "size-16 text-xl",
  },
};

export const avatarVariance = cva("relative flex shrink-0", {
  variants: avatarVariants,
  defaultVariants: {
    size: "default",
  },
});

/**
 * Avatar component that displays a user's profile picture or fallback content.
 * Supports different sizes and can show either an image, custom fallback content,
 * or automatically generated initials from a name.
 *
 * @example
 * // Basic usage with image
 * <Avatar src="/path/to/image.jpg" name="John Doe" />
 *
 * @example
 * // With custom fallback
 * <Avatar name="John Doe" fallback={<UserIcon />} />
 *
 * @example
 * // With overlay (e.g., status badge)
 * <Avatar name="John Doe" overlay={<Badge variant="success" />} />
 *
 * @example
 * // Different sizes
 * <Avatar size="sm" name="John Doe" />
 * <Avatar size="default" name="John Doe" />
 * <Avatar size="lg" name="John Doe" />
 */
export const Avatar = ({
  className,
  src,
  fallback,
  size,
  name,
  overlay,
  ...props
}: AvatarProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [src]);

  const fallbackContent =
    isImageLoaded ? null
    : name ? getInitials(name)
    : fallback;

  return (
    <div className={cn(avatarVariance({ size }), className)} {...props}>
      <div className="size-full overflow-hidden rounded-full">
        {src && (
          <img
            className={cn(
              "aspect-square size-full object-cover",
              !isImageLoaded && "opacity-0",
            )}
            src={src}
            onLoad={() => setIsImageLoaded(true)}
            alt={[name, "avatar"].filter(Boolean).join(" ")}
          />
        )}
        {fallbackContent && (
          <div className="flex-center bg-muted size-full rounded-full">
            {fallbackContent}
          </div>
        )}
      </div>
      {overlay && <div className="absolute inset-0">{overlay}</div>}
    </div>
  );
};
