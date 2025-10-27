//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useState } from "react";
import { type InitialState, not } from "../misc";

/**
 * Handles open/close or similar boolean states.
 * Mainly aims to improve readability.
 *
 * @example
 * ```tsx
 * const modal = useOpenState()
 * <button onClick={modal.open} />
 * <Modal isOpen={modal.isOpen} />
 * ```
 *
 */
export const useOpenState = (initialValue: InitialState<boolean> = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  const toggle = () => setIsOpen(not);

  return { isOpen, setIsOpen, close, open, toggle };
};

/**
 * Implements a stateful open/closed mechanism that preserves component state between transitions.
 *
 * @remarks
 * This pattern is particularly useful in scenarios requiring:
 * - A boolean flag to control visibility (open/closed state)
 * - Separate state to determine opened entity
 * - Saving state even after closing, which prevents flickering during exit animations
 */
export const useStatefulOpenState = <T>(
  initialStateValue?: T,
  initialValue?: InitialState<boolean>,
) => {
  const [state, setState] = useState(initialStateValue);
  const openState = useOpenState(initialValue);

  const close = openState.close;

  const open = (state: T) => {
    setState(state);
    openState.open();
  };

  const isOpen = !!state && openState.isOpen;

  return { isOpen, close, open, state };
};
