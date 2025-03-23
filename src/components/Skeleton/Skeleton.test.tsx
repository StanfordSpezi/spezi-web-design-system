//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Skeleton } from ".";

describe("Skeleton", () => {
  it("renders empty decorative skeleton element", () => {
    render(<Skeleton data-testid="skeleton" />);

    const element = screen.getByTestId("skeleton");

    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent("");
  });
});
