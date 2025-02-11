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
 * Handles open/close or similar boolean states
 * Mainly aims to improve readability
 *
 * @example
 * const modal = useOpenState()
 * <button onClick={modal.open} />
 * <Modal isOpen={modal.isOpen}  />
 *
 * */
export const useOpenState = (initialValue: InitialState<boolean> = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const close = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  const toggle = () => setIsOpen(not);

  return { isOpen, setIsOpen, close, open, toggle };
};

/**
 * Stateful open state is suitable for cases where combination of boolean flag and additional state is required
 * State is kept after closing to prevent flickering of exit animations
 * */
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
