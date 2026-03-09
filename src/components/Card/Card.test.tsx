//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle } from ".";

describe("Card", () => {
  it("renders element", () => {
    render(<Card>Lorem</Card>);

    const element = screen.getByText("Lorem");
    expect(element).toBeInTheDocument();
  });

  it("renders with asChild", () => {
    render(
      <Card asChild>
        <article>Content as article</article>
      </Card>,
    );

    const article = screen.getByRole("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent("Content as article");
  });

  it("renders CardHeader", () => {
    render(
      <Card>
        <CardHeader>Header content</CardHeader>
      </Card>,
    );

    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("renders CardTitle with asChild", () => {
    render(
      <CardTitle asChild>
        <h2>Custom heading</h2>
      </CardTitle>,
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Custom heading");
  });
});
