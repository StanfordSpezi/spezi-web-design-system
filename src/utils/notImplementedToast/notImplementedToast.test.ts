//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2026 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { vi } from "vitest";
import { toast } from "@/components/Toaster";
import { notImplementedToast } from "./notImplementedToast";

vi.mock("@/components/Toaster", () => ({
  toast: {
    info: vi.fn(),
  },
}));

describe("notImplementedToast", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a toast with default description", () => {
    notImplementedToast("Export to PDF");
    expect(toast.info).toHaveBeenCalledWith("Coming soon", {
      description: "Export to PDF isn't available yet.",
      duration: 4000,
    });
  });

  it("shows a toast with custom description", () => {
    notImplementedToast("Dark mode", {
      description: "We're working on dark mode support.",
    });
    expect(toast.info).toHaveBeenCalledWith("Coming soon", {
      description: "We're working on dark mode support.",
      duration: 4000,
    });
  });

  it("shows a toast with custom duration", () => {
    notImplementedToast("Feature X", { duration: 6000 });
    expect(toast.info).toHaveBeenCalledWith("Coming soon", {
      description: "Feature X isn't available yet.",
      duration: 6000,
    });
  });
});
