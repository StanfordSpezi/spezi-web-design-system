//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { Dialog } from "../Dialog";
import {
  Command,
  CommandDialogContent,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./Command";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};

export default meta;

export const Default = () => (
  <Command className="border md:min-w-[450px]">
    <CommandInput placeholder="Search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>Calendar</CommandItem>
        <CommandItem>Reminders</CommandItem>
        <CommandItem>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          Profile
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
        <CommandItem>
          Billing
          <CommandShortcut>⌘B</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
);

export const InDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button size="sm" variant="outline" onClick={() => setOpen(true)}>
        Open Command Palette
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <CommandDialogContent>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="General">
              <CommandItem>Open File</CommandItem>
              <CommandItem>New Window</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialogContent>
      </Dialog>
    </>
  );
};
