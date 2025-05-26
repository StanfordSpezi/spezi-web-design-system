//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import {
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible";
import { Button } from "../Button";

const meta: Meta<typeof CollapsibleRoot> = {
  title: "Components/Collapsible",
  component: CollapsibleRoot,
};

export default meta;

type Story = StoryObj<typeof CollapsibleRoot>;

/**
 * Use props to control the state of the component.
 */
export const Default: Story = {
  render: () => (
    <CollapsibleRoot>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content to collapse</CollapsibleContent>
    </CollapsibleRoot>
  ),
};

/**
 * Example usage with basic styling
 */
export const Styled: Story = {
  render: () => (
    <CollapsibleRoot defaultOpen={true} className="flex flex-col gap-4">
      <CollapsibleTrigger asChild>
        <Button>Trigger</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="bg-accent rounded p-4">
          <p>This content can be expanded and collapsed with the button.</p>
          <p className="mt-2">The transition is smooth and performant.</p>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  ),
};
