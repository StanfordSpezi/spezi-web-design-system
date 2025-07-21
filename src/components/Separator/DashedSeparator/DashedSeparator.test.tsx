//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { SeparatorText } from "../SeparatorText";
import { DashedSeparator } from ".";

describe("DashedSeparator", () => {
  it("renders separator element if no children provided", () => {
    render(<DashedSeparator />);

    const element = screen.getByRole("separator");
    expect(element).toBeInTheDocument();
  });

  it("renders regular element if children provided", () => {
    render(<DashedSeparator>lorem</DashedSeparator>);

    const element = screen.queryByRole("separator");
    expect(element).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <DashedSeparator>
        <SeparatorText>Lorem</SeparatorText>
      </DashedSeparator>,
    );

    const element = screen.getByText("Lorem");
    expect(element).toBeInTheDocument();
  });

  it("renders separator with custom style props", () => {
    render(
      <DashedSeparator
        dashColor="var(--color-primary)"
        dashSize="8px"
        dashGap="10%"
      />,
    );

    const element = screen.getByRole("separator");
    expect(element).toBeInTheDocument();
    expect(element).toHaveStyle({
      "--dash-color": "var(--color-primary)",
      "--dash-size": "8px",
      "--dash-gap": "10%",
    });
  });

  it("renders separator with custom style classes", () => {
    render(
      <DashedSeparator className="[--dash-color:theme(colors.red-500)] [--dash-gap:theme(spacing.3)] [--dash-size:theme(spacing.4)]" />,
    );

    const element = screen.getByRole("separator");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass(
      "[--dash-color:theme(colors.red-500)]",
      "[--dash-size:theme(spacing.4)]",
      "[--dash-gap:theme(spacing.3)]",
    );
  });
});
