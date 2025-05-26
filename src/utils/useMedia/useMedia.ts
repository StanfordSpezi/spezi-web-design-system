//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useState } from "react";
import { screens } from "@/theme/breakpoints";

/**
 * Hook that subscribes to browser media query changes.
 *
 * @example
 * const isLargeScreen = useMedia('(min-width: 1024px)');
 */
const useMedia = (query: string) => {
  const [state, setState] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const match = window.matchMedia(query);
    setState(match.matches);

    const onChange = () => {
      setState(match.matches);
    };

    match.addEventListener("change", onChange);

    return () => match.removeEventListener("change", onChange);
  }, [query]);

  return state;
};

/**
 * Checks if the user uses a touch device
 */
export const useIsTouchDevice = () => useMedia("(pointer: coarse)");

/**
 * Allows creating a `useIsScreen` hook with provided breakpoints.
 * Use `useIsScreen` directly if you just need default Tailwind's screens.
 *
 * @example
 * const useIsScreen = createUseIsScreen({ sm: '560px', lg: "1200px" });
 * useIsScreen("sm");
 */
export const createUseIsScreen =
  <TBreakpoints extends Record<string, string>>(breakpoints: TBreakpoints) =>
  (key: keyof TBreakpoints) =>
    useMedia(`(min-width: ${breakpoints[key]})`);

/**
 * `useIsScreen` subscribes to media query checking minimal width of screen.
 * Matches default Tailwind's screen sizes and breakpoint methodology.
 *
 * @example
 * const isLg = useIsScreen("lg");
 * if (isLg) // do something on large screens
 *
 * @example
 * // those are equivalents
 * useIsScreen("xl")
 * <div className="xl:flex" />
 *
 */
export const useIsScreen = createUseIsScreen(screens);
