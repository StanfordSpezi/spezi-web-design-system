//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from '@storybook/react'
import { DataTable } from './DataTable'
import { dateColumn, dateTimeColumn } from './DataTable.columns'
import {
  peopleColumns,
  peopleData,
  type Person,
  peopleColumn,
  columnHelper,
} from './DataTable.mocks'
import { Button } from '../Button'

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof DataTable<Person>>

export const Default: Story = {
  args: {
    columns: peopleColumns,
    data: peopleData,
    entityName: 'users',
    className: 'm-5',
  },
}

export const Paginated: Story = {
  args: {
    ...Default.args,
    pageSize: 2,
  },
}

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
}

/**
 * Click on row
 * */
export const RowAction: Story = {
  args: {
    ...Default.args,
    tableView: {
      onRowClick: (person) => alert(`Clicked row: ${person.name}`),
    },
  },
}

/**
 * Presents some ready-to-use columns, like dateColumn and dateTimeColumn
 * */
export const PremadeColumns: Story = {
  args: {
    ...Default.args,
    columns: [
      peopleColumn.name,
      columnHelper.accessor('updatedAt', {
        header: 'Date',
        cell: dateColumn,
      }),
      columnHelper.accessor('updatedAt', {
        header: 'Date Time',
        cell: dateTimeColumn,
      }),
    ],
  },
}

/**
 * Custom view that replaces standard table view
 * */
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
          const person = row.original
          return (
            <div key={row.id} className="flex flex-col border p-6">
              <h4 className="text-lg font-medium">{person.name}</h4>
              <span className="text-sm text-muted-foreground">
                {person.age} years old
              </span>
            </div>
          )
        })}
      </div>
    )}
  </DataTable>
)

export const Minimal: Story = {
  args: {
    ...Default.args,
    minimal: true,
  },
}

export const NoBorder: Story = {
  args: {
    ...Default.args,
    bordered: false,
  },
}
