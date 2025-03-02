//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { RadioGroup, Radio } from "./Radio";

describe("Radio", () => {
  it("renders radio inputs", () => {
    const onSelectedChange1 = vitest.fn();
    const onSelectedChange2 = vitest.fn();

    render(
      <RadioGroup defaultValue="option1" aria-label="Example Radio Input">
        <Radio
          value="option1"
          id="option1"
          onChange={onSelectedChange1}
          data-testid="option1"
        />
        <Radio
          value="option2"
          id="option2"
          onChange={onSelectedChange2}
          data-testid="option2"
        />
      </RadioGroup>,
    );

    const option1 = screen.getByTestId("option1");
    const option2 = screen.getByTestId("option2");

    fireEvent.click(option1);
    expect(option1).toBeChecked();
    expect(option2).not.toBeChecked();

    fireEvent.click(option2);
    expect(option2).toBeChecked();
    expect(option1).not.toBeChecked();
  });
});
