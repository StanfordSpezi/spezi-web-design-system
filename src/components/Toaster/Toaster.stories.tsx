//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { action } from "@storybook/addon-actions";
import { type Meta } from "@storybook/react";
import { Button } from "../Button";
import { Toaster, toast } from ".";

const meta: Meta = {
  title: "Components/Toaster",
};

export default meta;

export const Default = () => (
  <>
    <Toaster />
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast("Copied to clipboard")}>Default</Button>
      <Button
        onClick={() => toast.info("Event will be publicly available soon")}
      >
        Info
      </Button>
      <Button onClick={() => toast.error("Event creation failed")}>
        Error
      </Button>
      <Button onClick={() => toast.success("Event created successfully")}>
        Success
      </Button>
      <Button
        onClick={() => toast.warning("Event cannot be created in the past")}
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toast("Event created successfully", {
            action: { label: "Undo", onClick: action("undo") },
          })
        }
      >
        Action
      </Button>
      <Button
        onClick={() =>
          toast("Event created successfully", {
            description: "Today at 4:00pm",
          })
        }
      >
        Description
      </Button>
      <Button
        onClick={() => {
          const promise = () =>
            new Promise<{ name: string }>((resolve) =>
              setTimeout(() => resolve({ name: "Example" }), 2000),
            );

          toast.promise(promise, {
            loading: "Creating event...",
            success: (result) => `Event "${result.name}" created successfully`,
            error: "Event creation failed",
          });
        }}
      >
        Promise
      </Button>
      <Button
        onClick={() =>
          toast(
            <>
              Event <b>"Example"</b> will be ready to publish soon
            </>,
          )
        }
      >
        JSX
      </Button>
      <Button
        onClick={() => toast("Copied to clipboard", { position: "top-center" })}
      >
        Top-center position
      </Button>
    </div>
  </>
);
