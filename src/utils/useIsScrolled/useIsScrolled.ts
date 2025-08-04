//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useState } from "react";

/**
 * Tracks whether the user has scrolled past a specified threshold.
 *
 * This hook is useful for showing/hiding navigation elements, implementing scroll-to-top
 * buttons, or triggering animations based on scroll position.
 *
 * @example
 * ```tsx
 * // Triggers after scrolling 100px
 * const hasScrolledPastHeader = useIsScrolled(100);
 *
 * // Triggers on any scroll
 * const isScrolled = useIsScrolled(0);
 * ```
 */
export const useIsScrolled = (threshold: number) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Check initial scroll position to handle cases where the page is already scrolled on mount
    handleScroll();

    // Use passive listener since we're not calling preventDefault()
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
