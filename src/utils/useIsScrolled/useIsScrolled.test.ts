//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { act, renderHook } from "@testing-library/react";
import { useIsScrolled } from "./useIsScrolled";

describe("useIsScrolled", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 0,
    });
  });

  const mockScrollEvent = (scrollY: number) => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: scrollY,
    });
    window.dispatchEvent(new Event("scroll"));
  };

  it("returns false initially when scroll position is 0", () => {
    const { result } = renderHook(() => useIsScrolled());
    expect(result.current).toBe(false);
  });

  it("returns true initially when page is already scrolled on mount", () => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      value: 100,
    });

    const { result } = renderHook(() => useIsScrolled());
    expect(result.current).toBe(true);
  });

  it("returns true when scrolled past default threshold (0)", () => {
    const { result } = renderHook(() => useIsScrolled());

    act(() => mockScrollEvent(1));
    expect(result.current).toBe(true);
  });

  it("returns false when scroll position equals threshold", () => {
    const { result } = renderHook(() => useIsScrolled(100));

    act(() => mockScrollEvent(100));
    expect(result.current).toBe(false);
  });

  it("returns true when scrolled past custom threshold", () => {
    const { result } = renderHook(() => useIsScrolled(100));

    act(() => mockScrollEvent(101));
    expect(result.current).toBe(true);
  });

  it("updates state when crossing threshold in both directions", () => {
    const { result } = renderHook(() => useIsScrolled(50));

    expect(result.current).toBe(false);

    act(() => mockScrollEvent(100));
    expect(result.current).toBe(true);

    act(() => mockScrollEvent(25));
    expect(result.current).toBe(false);
  });

  it("updates when threshold prop changes", () => {
    let threshold = 50;
    const { result, rerender } = renderHook(() => useIsScrolled(threshold));

    act(() => mockScrollEvent(75));
    expect(result.current).toBe(true);

    threshold = 100;
    rerender();
    expect(result.current).toBe(false);
  });

  it("handles negative threshold values", () => {
    const { result } = renderHook(() => useIsScrolled(-10));
    expect(result.current).toBe(true);
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useIsScrolled());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
  });
});
