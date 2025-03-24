//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { type Size, sizes } from "@/utils/tailwind/helpers";
import { Button } from "../Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ".";

interface FullDialogProps {
  size?: Size;
}

const FullDialog = ({ size }: FullDialogProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Trigger</Button>
    </DialogTrigger>
    <DialogContent size={size}>
      <DialogHeader>
        <DialogTitle>Lorem ipsum</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          architecto asperiores atque consectetur.
        </DialogDescription>
      </DialogHeader>
      <div>
        <h1 className="mb-2 text-sm font-bold">Custom content</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          distinctio est facilis illo ipsum iure pariatur perspiciatis quibusdam
          temporibus, vero. Consequatur deserunt, dolorum eum ipsum molestias
          quaerat repellendus reprehenderit sed!
        </p>
      </div>
      <DialogFooter>
        <Button>Action</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const meta = {
  title: "Components/Dialog",
  component: FullDialog,
  args: {
    size: "lg",
  },
  argTypes: {
    size: {
      control: { type: "select" },
      options: sizes,
    },
  },
} satisfies Meta<typeof FullDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const createMaxWidthStory = (size: Size): Story => ({
  args: { size },
});

export const SizeXs = createMaxWidthStory("xs");
export const SizeSm = createMaxWidthStory("sm");
export const SizeMd = createMaxWidthStory("md");
export const SizeLg = createMaxWidthStory("lg");
export const SizeXl = createMaxWidthStory("xl");
export const Size2xl = createMaxWidthStory("2xl");
export const Size3xl = createMaxWidthStory("3xl");
export const Size4xl = createMaxWidthStory("4xl");
export const Size5xl = createMaxWidthStory("5xl");
export const Size6xl = createMaxWidthStory("6xl");
export const Size7xl = createMaxWidthStory("7xl");
