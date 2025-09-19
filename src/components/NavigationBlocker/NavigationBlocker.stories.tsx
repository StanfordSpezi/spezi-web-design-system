//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { useState } from "react";
import { Button } from "../Button";
import { NavigationBlocker, type BlockerStatus } from ".";

const meta: Meta<typeof NavigationBlocker> = {
  title: "Components/NavigationBlocker",
  component: NavigationBlocker,
};

export default meta;

export const Default = () => {
  const [status, setStatus] = useState<BlockerStatus>("idle");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => setStatus("blocked")}>
          Simulate navigation
        </Button>
      </div>
      <NavigationBlocker
        status={status}
        shouldBlock={status !== "idle"}
        enableBeforeUnload={false}
        proceed={() => setStatus("idle")}
        reset={() => setStatus("idle")}
      />
    </div>
  );
};

export const BeforeUnload = () => {
  const [status, setStatus] = useState<BlockerStatus>("idle");

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Click “Enable protection”, then try refreshing/closing the tab to see
        the native prompt.
      </p>
      <div className="flex gap-2">
        <Button onClick={() => setStatus("blocked")}>Enable protection</Button>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Disable protection
        </Button>
      </div>
      <NavigationBlocker
        status={status}
        shouldBlock={status !== "idle"}
        enableBeforeUnload={true}
        proceed={() => setStatus("idle")}
        reset={() => setStatus("idle")}
      />
    </div>
  );
};
