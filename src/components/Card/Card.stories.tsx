//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  args: { children: "Lorem ipsum" },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {};

export const WithTitle: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
      </>
    ),
  },
};

export const WithTitleAndDescription: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>A short description of this card.</CardDescription>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
      </>
    ),
  },
};

export const Full: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Patient Overview</CardTitle>
          <CardDescription>Last updated 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          Heart rate, blood pressure, and oxygen levels are all within normal
          range. No alerts triggered in the last 24 hours.
        </CardContent>
        <CardFooter>Synced from Apple Health</CardFooter>
      </>
    ),
  },
};
