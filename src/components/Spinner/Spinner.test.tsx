//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Spinner } from ".";

describe("Spinner", () => {
  it("renders accessible loader", () => {
    render(<Spinner />);

    const element = screen.getByRole("status");
    expect(element).toBeInTheDocument();
  });
});
