//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button", () => {
  it("renders element with button role", () => {
    render(<Button />);

    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
  });

  it("renders children", () => {
    render(<Button>Lorem</Button>);

    const element = screen.getByText("Lorem");
    expect(element).toBeInTheDocument();
  });

  it("supports asChild property to render other type of elements with button classes", () => {
    render(
      <Button asChild>
        <a href="http://example.com" />
      </Button>,
    );

    const button = screen.queryByRole("button");
    expect(button).not.toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("class");
  });

  it("supports isPending", () => {
    const queryButtonPending = () =>
      screen.queryByTestId("buttonPendingLoader");
    const { rerender } = render(<Button isPending={false}>Lorem</Button>);

    expect(queryButtonPending()).not.toBeInTheDocument();

    rerender(<Button isPending>Lorem</Button>);

    expect(queryButtonPending()).toBeInTheDocument();
    const loadingButton = screen.getByRole("button");
    // Button should still render it's underlying content, but invisible
    // To maintain buttons width
    expect(loadingButton).toHaveTextContent("Lorem");
  });
});
