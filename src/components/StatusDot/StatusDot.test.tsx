//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { StatusDot } from "./StatusDot";

describe("StatusDot", () => {
  it("renders status dot element", () => {
    render(<StatusDot />);

    const element = screen.getByRole("img");

    expect(element).toBeInTheDocument();
  });

  it("applies custom className correctly", () => {
    render(<StatusDot className="custom-class" />);
    expect(screen.getByRole("img")).toHaveClass("custom-class");
  });

  it("renders all status variants without errors", () => {
    const statuses = [
      "default",
      "primary",
      "success",
      "warning",
      "destructive",
    ] as const;
    statuses.forEach((status) => {
      render(<StatusDot status={status} />);
    });
  });

  it("applies the correct aria label", () => {
    render(<StatusDot status="success" />);

    const element = screen.getByRole("img");

    expect(element).toHaveAttribute("aria-label", "Success status");
  });

  it("removes the aria label, if aria-hidden is true", () => {
    render(<StatusDot status="success" aria-hidden />);

    const element = screen.getByRole("img", { hidden: true });

    expect(element).not.toHaveAttribute("aria-label");
  });
});
