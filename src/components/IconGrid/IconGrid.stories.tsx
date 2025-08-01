//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconGrid } from "./IconGrid";

const queryClient = new QueryClient();

const meta: Meta<typeof IconGrid> = {
  title: "Components/IconGrid",
  component: IconGrid,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="w-96">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof IconGrid>;

export const Default: Story = {};
export const WithCustomIcons: Story = {
  args: {
    icons: [
      { name: "bird", tags: [], categories: [] },
      { name: "cat", tags: [], categories: [] },
      { name: "dog", tags: [], categories: [] },
      { name: "rabbit", tags: [], categories: [] },
      { name: "rat", tags: [], categories: [] },
    ],
  },
};
export const WithCustomDimensions: Story = {
  args: { columns: 6, visibleRows: 6, rowHeight: 36 },
};
