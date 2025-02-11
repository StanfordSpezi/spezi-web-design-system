//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { render, screen } from "@testing-library/react";
import { Async, queriesToAsyncProps } from ".";

describe("Async", () => {
  it("renders special state if any provided", () => {
    render(<Async loading>Lorem</Async>);
    const content = screen.queryByText("Lorem");
    expect(content).not.toBeInTheDocument();
    const loading = screen.getByLabelText(/Loading/);
    expect(loading).toBeInTheDocument();
  });

  it("renders content if no special state", () => {
    render(<Async loading={false}>Lorem</Async>);
    const loading = screen.queryByLabelText(/Loading/);
    expect(loading).not.toBeInTheDocument();
    const content = screen.getByText("Lorem");
    expect(content).toBeInTheDocument();
  });

  it("allows wrapping special state with container", () => {
    render(
      <Async
        loading
        renderState={(state) => (
          <div>
            <p>Title</p>
            {state}
          </div>
        )}
      >
        Lorem
      </Async>,
    );
    const title = screen.getByText("Title");
    expect(title).toBeInTheDocument();
  });

  it("renders error", () => {
    render(<Async error>Lorem</Async>);

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });

  it("renders loading", () => {
    render(<Async loading>Lorem</Async>);

    const status = screen.getByRole("status");
    expect(status).toBeInTheDocument();
  });

  it("renders empty", () => {
    render(<Async empty>Lorem</Async>);

    const status = screen.getByText(/No data found/);
    expect(status).toBeInTheDocument();
  });

  it("prioritizes error", () => {
    render(
      <Async error loading empty>
        Lorem
      </Async>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
  });
});

describe("utils", () => {
  describe("queriesToAsync", () => {
    it("combines loading state", () => {
      expect(
        queriesToAsyncProps([{ isLoading: false }, { isLoading: true }]),
      ).toHaveProperty("loading", true);
      expect(
        queriesToAsyncProps([{ isLoading: false }, { isLoading: false }]),
      ).toHaveProperty("loading", false);
    });

    it("supports loading prop that can override result", () => {
      expect(
        queriesToAsyncProps([{ isLoading: false }, { isLoading: false }], {
          loading: true,
        }),
      ).toHaveProperty("loading", true);
      expect(
        queriesToAsyncProps([{ isLoading: true }, { isLoading: false }], {
          loading: false,
        }),
      ).toHaveProperty("loading", true);
      expect(
        queriesToAsyncProps([{ isLoading: false }, { isLoading: false }], {
          loading: false,
        }),
      ).toHaveProperty("loading", false);
    });

    it("combines error state", () => {
      expect(
        queriesToAsyncProps([{ isError: false }, { isError: true }]),
      ).toHaveProperty("error", true);
      expect(
        queriesToAsyncProps([{ isError: false }, { isError: false }]),
      ).toHaveProperty("error", false);
    });

    it("supports error prop that can override result", () => {
      expect(
        queriesToAsyncProps([{ isError: false }, { isError: false }], {
          error: { children: "Example", show: true },
        }),
      ).toHaveProperty("error", { children: "Example", show: true });

      expect(
        queriesToAsyncProps([{ isError: true }, { isError: false }], {
          error: false,
        }),
      ).toHaveProperty("error", true);
    });
  });
});
