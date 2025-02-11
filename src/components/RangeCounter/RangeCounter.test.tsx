//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { RangeCounter } from ".";

describe("RangeCounter", () => {
  it("shows range", () => {
    render(<RangeCounter start={1} end={9} all={20} />);

    const text = screen.getByText("1-9 of 20");
    expect(text).toBeInTheDocument();
  });
});
