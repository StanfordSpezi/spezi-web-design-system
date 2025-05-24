//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import {
  AsideBrandLayoutRoot,
  AsideBrandLayoutAside,
  AsideBrandLayoutMain,
} from ".";

describe("AsideBrandLayout", () => {
  it("renders aside and main elements", () => {
    render(
      <AsideBrandLayoutRoot>
        <AsideBrandLayoutAside>Aside</AsideBrandLayoutAside>
        <AsideBrandLayoutMain>Main</AsideBrandLayoutMain>
      </AsideBrandLayoutRoot>,
    );

    const aside = screen.getByText("Aside");
    expect(aside).toBeInTheDocument();

    const main = screen.getByText("Main");
    expect(main).toBeInTheDocument();
  });
});
