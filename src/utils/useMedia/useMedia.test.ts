//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { renderHook, act } from "@testing-library/react";
import { screens } from "@/theme/breakpoints";
import { useIsTouchDevice, useIsScreen } from "./useMedia";

describe("useMedia", () => {
  const createMediaQueryList = (matches: boolean) => ({
    matches,
    media: "",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  const mockMatchMedia = (matches: boolean) => {
    const mediaQueryList = createMediaQueryList(matches);
    window.matchMedia = vi.fn().mockImplementation(() => mediaQueryList);
    return mediaQueryList;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("useIsTouchDevice", () => {
    it("returns true for touch devices", () => {
      mockMatchMedia(true);
      const { result } = renderHook(() => useIsTouchDevice());
      expect(result.current).toBe(true);
    });

    it("returns false for non-touch devices", () => {
      mockMatchMedia(false);
      const { result } = renderHook(() => useIsTouchDevice());
      expect(result.current).toBe(false);
    });

    it("updates when media query changes", () => {
      const mediaQueryList = mockMatchMedia(false);
      const { result } = renderHook(() => useIsTouchDevice());

      expect(result.current).toBe(false);

      // Simulate media query change
      act(() => {
        mediaQueryList.matches = true;
        // this is onChange handler
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        mediaQueryList.addEventListener.mock.calls[0][1]();
      });

      expect(result.current).toBe(true);
    });
  });

  describe("useIsScreen", () => {
    it("returns true when screen width matches breakpoint", () => {
      mockMatchMedia(true);
      const { result } = renderHook(() => useIsScreen("md"));
      expect(result.current).toBe(true);
    });

    it("returns false when screen width is below breakpoint", () => {
      mockMatchMedia(false);
      const { result } = renderHook(() => useIsScreen("md"));
      expect(result.current).toBe(false);
    });

    it("uses correct breakpoint value", () => {
      mockMatchMedia(false);
      renderHook(() => useIsScreen("md"));

      expect(window.matchMedia).toHaveBeenCalledWith(
        `(min-width: ${screens.md})`,
      );
    });

    it("updates when media query changes", () => {
      const mediaQueryList = mockMatchMedia(false);
      const { result } = renderHook(() => useIsScreen("md"));

      expect(result.current).toBe(false);

      // Simulate media query change
      act(() => {
        mediaQueryList.matches = true;
        // this is onChange handler
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        mediaQueryList.addEventListener.mock.calls[0][1]();
      });

      expect(result.current).toBe(true);
    });

    it("cleans up event listeners on unmount", () => {
      const mediaQueryList = mockMatchMedia(false);
      const { unmount } = renderHook(() => useIsScreen("md"));

      unmount();

      expect(mediaQueryList.removeEventListener).toHaveBeenCalled();
    });
  });
});
