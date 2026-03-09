//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Pencil, Trash } from "lucide-react";
import { DataTable } from "./DataTable";
import { dateColumn, dateTimeColumn } from "./DataTable.columns";
import {
  peopleColumns,
  peopleData,
  type Person,
  peopleColumn,
  columnHelper,
} from "./DataTable.mocks";
import { RowDropdownMenu } from "./RowDropdownMenu";
import { Button } from "../Button";
import { DropdownMenuItem } from "../DropdownMenu";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

export const Default: Story = {
  args: {
    columns: peopleColumns,
    data: peopleData,
    entityName: "users",
    className: "m-5",
  },
};

export const Paginated: Story = {
  args: {
    ...Default.args,
    pageSize: 2,
  },
};

export const HeaderAction: Story = {
  args: {
    ...Default.args,
    header: (
      <>
        <Button className="ml-auto" size="sm">
          Action
        </Button>
      </>
    ),
  },
};

/**
 * Click on row.
 */
export const RowAction: Story = {
  args: {
    ...Default.args,
    tableView: {
      onRowClick: (person) => alert(`Clicked row: ${person.name}`),
    },
  },
};

/**
 * Presents some ready-to-use columns, like dateColumn and dateTimeColumn.
 */
export const PremadeColumns: Story = {
  args: {
    ...Default.args,
    columns: [
      peopleColumn.name,
      columnHelper.accessor("updatedAt", {
        header: "Date",
        cell: dateColumn,
      }),
      columnHelper.accessor("updatedAt", {
        header: "Date Time",
        cell: dateTimeColumn,
      }),
    ],
  },
};

/**
 * Row actions via RowDropdownMenu.
 */
export const RowDropdownActions: Story = {
  args: {
    ...Default.args,
    columns: [
      ...peopleColumns,
      columnHelper.display({
        id: "actions",
        header: "",
        cell: (props) => (
          <RowDropdownMenu itemName={props.row.original.name}>
            <DropdownMenuItem>
              <Pencil className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="size-4" />
              Delete
            </DropdownMenuItem>
          </RowDropdownMenu>
        ),
      }),
    ],
  },
};

/**
 * Custom view that replaces standard table view.
 */
export const CustomView = () => (
  <DataTable<Person>
    columns={peopleColumns}
    data={peopleData}
    entityName="users"
    className="m-5"
  >
    {({ rows }) => (
      <div className="grid grid-cols-3 gap-4 p-4">
        {rows.map((row) => {
          const person = row.original;
          return (
            <div key={row.id} className="flex flex-col border p-6">
              <h4 className="text-lg font-medium">{person.name}</h4>
              <span className="text-muted-foreground text-sm">
                {person.age} years old
              </span>
            </div>
          );
        })}
      </div>
    )}
  </DataTable>
);

export const Loading: Story = {
  args: {
    ...Default.args,
    data: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

export const CustomizedEmptyMessage: Story = {
  args: {
    ...Default.args,
    data: [],
    empty: {
      children: "Sorry, no users found. Please try again later.",
    },
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const Minimal: Story = {
  args: {
    ...Default.args,
    minimal: true,
  },
};

export const NoBorder: Story = {
  args: {
    ...Default.args,
    bordered: false,
  },
};

/**
 * Demonstrates custom cell styling using `meta.cellClassName` on column definitions.
 * Includes both a static class applied to an entire column and a dynamic function
 * that computes classes per cell based on the cell value.
 */
export const CustomCellStyling: Story = {
  args: {
    ...Default.args,
    columns: [
      columnHelper.accessor("name", {
        header: "Name",
        id: "name",
        meta: { cellClassName: "font-bold" },
      }),
      columnHelper.accessor("age", {
        header: "Age",
        id: "age",
        meta: {
          cellClassName: (ctx) => {
            const age = ctx.getValue() as number;
            if (age < 18) return "bg-warning/10 text-warning-dark";
            if (age > 40) return "bg-destructive/10 text-destructive";
            return "bg-success/10 text-success";
          },
        },
      }),
    ],
  },
};
