//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import type { Meta, StoryObj } from "@storybook/react";
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion";

const meta: Meta<typeof AccordionRoot> = {
  title: "Components/Accordion",
  component: AccordionRoot,
};

export default meta;
type Story = StoryObj<typeof AccordionRoot>;

const InnerContent = () => (
  <>
    <AccordionItem value="item-1">
      <AccordionTrigger>Accessibility</AccordionTrigger>
      <AccordionContent>
        It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Styles</AccordionTrigger>
      <AccordionContent>It comes with default styling.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Animation</AccordionTrigger>
      <AccordionContent>It comes with a performant animation.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-4">
      <AccordionTrigger>Interactivity</AccordionTrigger>
      <AccordionContent>It's activatable by keyboard</AccordionContent>
    </AccordionItem>
  </>
);

export const Default: Story = {
  render: () => (
    <AccordionRoot type="single" collapsible>
      <InnerContent />
    </AccordionRoot>
  ),
};

export const Multiple: Story = {
  render: () => (
    <AccordionRoot type="multiple">
      <InnerContent />
    </AccordionRoot>
  ),
};
