//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Separator, SeparatorText } from ".";

describe("Separator", () => {
  it("renders separator element if no children provided", () => {
    render(<Separator />);

    const element = screen.getByRole("separator");
    expect(element).toBeInTheDocument();
  });

  it("renders regular element if children provided", () => {
    render(<Separator>lorem</Separator>);

    const element = screen.queryByRole("separator");
    expect(element).not.toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Separator>
        <SeparatorText>Lorem</SeparatorText>
      </Separator>,
    );

    const element = screen.getByText("Lorem");
    expect(element).toBeInTheDocument();
  });
});
