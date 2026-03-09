//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { act, renderHook } from "@testing-library/react";
import { useOpenState, useStatefulOpenState } from "./useOpenState";

describe("useOpenState", () => {
  it("exposes semantic open state API", () => {
    const { result } = renderHook(() => useOpenState(true));

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.close();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.open();
    });
    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(false);

    act(() => {
      result.current.toggle();
    });
    expect(result.current.isOpen).toBe(true);
  });
});

describe("useStatefulOpenState", () => {
  it("opens with state and closes preserving state", () => {
    const { result } = renderHook(() => useStatefulOpenState<string>());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.state).toBeUndefined();

    act(() => {
      result.current.open("item-1");
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.state).toBe("item-1");

    act(() => {
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
    // State is preserved after closing for exit animations
    expect(result.current.state).toBe("item-1");
  });

  it("updates state when opening with different value", () => {
    const { result } = renderHook(() => useStatefulOpenState<number>());

    act(() => {
      result.current.open(42);
    });
    expect(result.current.state).toBe(42);

    act(() => {
      result.current.open(99);
    });
    expect(result.current.state).toBe(99);
    expect(result.current.isOpen).toBe(true);
  });

  it("supports initial values", () => {
    const { result } = renderHook(() =>
      useStatefulOpenState<string>("initial", true),
    );

    expect(result.current.isOpen).toBe(true);
    expect(result.current.state).toBe("initial");
  });
});
