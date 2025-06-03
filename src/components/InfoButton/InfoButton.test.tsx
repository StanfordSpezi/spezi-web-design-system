//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen, fireEvent } from "@testing-library/react";
import { InfoButton } from ".";

describe("InfoButton", () => {
  it("renders an info icon button", () => {
    render(<InfoButton />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("passes additional props to button element", () => {
    const onClickMock = vi.fn();
    render(<InfoButton onClick={onClickMock} data-testid="info-button" />);

    const button = screen.getByTestId("info-button");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
