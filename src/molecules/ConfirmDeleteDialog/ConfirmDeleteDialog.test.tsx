//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import { ConfirmDeleteDialog } from ".";

describe("ConfirmDeleteDialog", () => {
  it("renders dialog with confirm delete button", () => {
    const onDelete = vitest.fn();
    render(
      <ConfirmDeleteDialog
        open={true}
        onOpenChange={vitest.fn()}
        onDelete={onDelete}
        entityName="user"
      />,
    );

    const deleteButton = screen.getByRole("button", { name: "Delete user" });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });

  it("renders single item name", () => {
    render(
      <ConfirmDeleteDialog
        open={true}
        onOpenChange={vitest.fn()}
        onDelete={vitest.fn()}
        entityName="user"
        itemName="alice@example.com"
      />,
    );

    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText(/will be deleted forever/)).toBeInTheDocument();
  });

  it("renders multiple item names", () => {
    render(
      <ConfirmDeleteDialog
        open={true}
        onOpenChange={vitest.fn()}
        onDelete={vitest.fn()}
        entityName="3 users"
        itemName={["alice@example.com", "bob@example.com", "carol@example.com"]}
      />,
    );

    expect(screen.getByText("Deleting 3 users")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("carol@example.com")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete 3 users" }),
    ).toBeInTheDocument();
  });

  it("truncates when more than 4 items", () => {
    render(
      <ConfirmDeleteDialog
        open={true}
        onOpenChange={vitest.fn()}
        onDelete={vitest.fn()}
        entityName="6 users"
        itemName={[
          "alice@example.com",
          "bob@example.com",
          "carol@example.com",
          "dave@example.com",
          "eve@example.com",
          "frank@example.com",
        ]}
      />,
    );

    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.queryByText("carol@example.com")).not.toBeInTheDocument();
    expect(screen.getByText(/and 4 more/)).toBeInTheDocument();
  });
});
