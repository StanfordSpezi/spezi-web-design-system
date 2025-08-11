//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { times } from "@/utils/misc";
import { ScrollArea, ScrollBar } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-40 w-80 rounded-lg border p-4">
      <div className="space-y-4">
        {times(20, (i) => (
          <p key={i} className="text-sm">
            Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const NoScrolling: Story = {
  render: () => (
    <ScrollArea className="h-40 w-80 rounded-lg border p-4">
      <p>
        This is a basic ScrollArea with content that fits within the container.
        No scrolling is needed here.
      </p>
    </ScrollArea>
  ),
};

export const HorizontalScrolling: Story = {
  render: () => (
    <ScrollArea className="h-40 w-80 rounded-lg border p-4">
      <div className="flex h-full gap-4">
        {times(10, (i) => (
          <div
            key={i}
            className="bg-muted flex-center h-28 w-32 rounded text-sm"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  render: () => (
    <ScrollArea className="h-40 w-80 rounded-lg border p-4">
      <div className="space-y-2">
        {times(15, (i) => (
          <div key={i} className="flex gap-4">
            {times(8, (j) => (
              <div
                key={j}
                className="flex-center h-16 w-24 rounded bg-blue-100 text-xs"
              >
                {i + 1}-{j + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
};

export const AlwaysVisible: Story = {
  render: () => (
    <ScrollArea type="always" className="h-40 w-80 rounded-lg border p-4">
      <div className="space-y-2">
        {times(15, (i) => (
          <p key={i} className="text-sm">
            Line {i + 1}: Content with always visible scrollbars for better
            accessibility and user awareness.
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};
