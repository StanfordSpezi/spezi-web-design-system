//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { useState } from "react";
import {
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/Popover";
import { IconSearchGrid } from "./IconSearchGrid";

const queryClient = new QueryClient();

const meta: Meta<typeof IconSearchGrid> = {
  title: "Components/IconGrid/IconSearchGrid",
  component: IconSearchGrid,
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

type Story = StoryObj<typeof IconSearchGrid>;

export const Default: Story = {};
export const WithPopover: Story = {
  decorators: [
    (Story) => {
      const [value, setValue] = useState<IconName>("apple");
      return (
        <div className="flex-center size-full">
          <PopoverRoot>
            <PopoverTrigger className="hover:bg-muted rounded-md p-2 transition">
              <DynamicIcon name={value} className="size-6" />
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <Story args={{ onValueChange: setValue }} />
            </PopoverContent>
          </PopoverRoot>
        </div>
      );
    },
  ],
};
