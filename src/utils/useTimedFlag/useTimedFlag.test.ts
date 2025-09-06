//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { act, renderHook } from "@testing-library/react";
import { useTimedFlag } from "./useTimedFlag";

describe("useTimedFlag", () => {
  vi.useFakeTimers();

  it("activates when trigger is true and deactivates after timeout", () => {
    const { result, rerender } = renderHook(
      ({ t, ms }) => useTimedFlag(t, ms),
      {
        initialProps: { t: false, ms: 1000 },
      },
    );

    expect(result.current).toBe(false);

    rerender({ t: true, ms: 1000 });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(false);
  });
});
