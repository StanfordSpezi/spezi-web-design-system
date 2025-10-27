//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useEffect, useRef, useState } from "react";

/**
 * Hook that sets a flag to true when triggered, then automatically resets it after a timeout.
 *
 * @example
 * ```ts
 * const showSuccess = useTimedFlag(isSuccess, 2000);
 * ```
 */
export const useTimedFlag = (trigger: boolean | undefined, timeout: number) => {
  const [isActive, setIsActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (trigger) {
      setIsActive(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsActive(false), timeout);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [trigger, timeout]);

  return isActive;
};
