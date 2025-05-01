//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { Button } from "@/components/Button";
import { Notification } from "./Notification";

const meta: Meta<typeof Notification> = {
  title: "Molecules/Notifications",
  component: Notification,
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Basic: Story = {
  args: {
    title: "New message",
    message: "You have a new message from Dr. Smith",
    isRead: false,
  },
};

export const Complex: Story = {
  args: {
    title: "Appointment reminder",
    image: "https://avatars.githubusercontent.com/u/133281989",
    message: "Your appointment with Dr. Smith is tomorrow at 2:00 PM",
    time: new Date("2024-07-15T14:00:00"),
    actions: <Button size="xs">Confirm</Button>,
    isRead: false,
  },
};

export const Link: Story = {
  args: {
    ...Basic.args,
    link: "/users",
  },
};

export const Read: Story = {
  args: {
    ...Complex.args,
    isRead: true,
  },
};
