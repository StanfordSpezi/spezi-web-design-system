//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { useIsDocs } from "@/tests/storybook";
import { times } from "@/utils/misc";
import { sizes, type Size } from "@/utils/tailwind";
import { Button } from "../Button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  type SheetSide,
  sheetSides,
  SheetTitle,
  SheetTrigger,
} from ".";

interface FullSheetProps {
  side?: SheetSide;
  size?: Size | null;
}

/**
 * Storybook in Docs view needs couple adjustments to provide good overview behavior.
 */
const useProps = () => {
  const isDocs = useIsDocs();
  return {
    sheet: {
      defaultOpen: !isDocs,
    },
  };
};

const FullSheet = ({ side, size }: FullSheetProps) => {
  const props = useProps();
  return (
    <Sheet {...props.sheet}>
      <SheetTrigger asChild>
        <Button>Trigger</Button>
      </SheetTrigger>
      <SheetContent side={side} size={size}>
        <SheetHeader>
          <SheetTitle>Lorem ipsum</SheetTitle>
          <SheetDescription>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            architecto asperiores atque consectetur.
          </SheetDescription>
        </SheetHeader>
        <div>
          <h1 className="mb-2 text-sm font-bold">Custom content</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            distinctio est facilis illo ipsum iure pariatur perspiciatis
            quibusdam temporibus, vero. Consequatur deserunt, dolorum eum ipsum
            molestias quaerat repellendus reprehenderit sed!
          </p>
        </div>
        <SheetFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Submit</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const meta = {
  title: "Components/Sheet",
  component: FullSheet,
  args: {
    side: "right",
    size: "sm",
  },
  argTypes: {
    side: {
      control: { type: "select" },
      options: sheetSides,
    },
    size: {
      control: { type: "select" },
      options: sizes,
    },
  },
} satisfies Meta<typeof FullSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const createSideStory = (side: SheetSide): Story => ({
  args: { side },
});

const createSizeStory = (size: Size): Story => ({
  args: { size },
});

export const SideTop = createSideStory("top");
export const SideRight = createSideStory("right");
export const SideBottom = createSideStory("bottom");
export const SideLeft = createSideStory("left");

export const SizeXs = createSizeStory("xs");
export const SizeSm = createSizeStory("sm");
export const SizeMd = createSizeStory("md");
export const SizeLg = createSizeStory("lg");
export const SizeXl = createSizeStory("xl");
export const Size2xl = createSizeStory("2xl");
export const Size3xl = createSizeStory("3xl");
export const Size4xl = createSizeStory("4xl");
export const Size5xl = createSizeStory("5xl");
export const Size6xl = createSizeStory("6xl");
export const Size7xl = createSizeStory("7xl");

/**
 * Demonstrates how Sheet behaves when content overflows Sheet placed vertically (left/right).
 */
export const OverflowingContentVertical = () => {
  const props = useProps();
  return (
    <Sheet {...props.sheet}>
      <SheetTrigger asChild>
        <Button>Trigger</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Scroll me</SheetTitle>
        </SheetHeader>
        {times(24, () => (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            distinctio est facilis illo ipsum iure pariatur perspiciatis
            quibusdam temporibus, vero. Consequatur deserunt, dolorum eum ipsum
            molestias quaerat repellendus reprehenderit sed!
          </p>
        ))}
      </SheetContent>
    </Sheet>
  );
};

/**
 * Demonstrates how Sheet behaves when content overflows Sheet placed horizontally (top/bottom).
 */
export const OverflowingContentHorizontal = () => {
  const props = useProps();
  return (
    <Sheet {...props.sheet}>
      <SheetTrigger asChild>
        <Button>Trigger</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Scroll me</SheetTitle>
        </SheetHeader>
        {times(24, () => (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            distinctio est facilis illo ipsum iure pariatur perspiciatis
            quibusdam temporibus, vero. Consequatur deserunt, dolorum eum ipsum
            molestias quaerat repellendus reprehenderit sed!
          </p>
        ))}
      </SheetContent>
    </Sheet>
  );
};
