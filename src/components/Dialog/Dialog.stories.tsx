//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
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

const meta: Meta = {
  title: "Components/Dialog",
};

export default meta;

export const Default = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Trigger</Button>
    </DialogTrigger>
    <DialogContent>
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
