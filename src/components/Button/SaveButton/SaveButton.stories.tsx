//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta, type StoryObj } from "@storybook/react";
import { useState } from "react";
import { SideLabel } from "@/components/SideLabel";
import { Switch } from "@/components/Switch";
import type { Nil } from "@/utils/misc";
import { SaveButton } from "./SaveButton";

const meta: Meta<typeof SaveButton> = {
  title: "Components/Button/SaveButton",
  component: SaveButton,
};

export default meta;

type Story = StoryObj<typeof SaveButton>;
type ResponseType = "success" | "error";

export const Default: Story = {
  decorators: [
    (Story) => {
      const [isPending, setIsPending] = useState(false);
      const [responseType, setResponseType] = useState<ResponseType>("success");
      const [result, setResult] = useState<Nil<ResponseType>>(null);

      const handleClick = () => {
        setResult(null);
        setIsPending(true);
        setTimeout(() => {
          setIsPending(false);
          setResult(responseType);
        }, 2000);
      };
      return (
        <div className="flex-center flex-col gap-6">
          <SideLabel label="Success" reverse className="pr-6">
            <SideLabel label="Error">
              <Switch
                checked={responseType === "error"}
                onCheckedChange={(checked) =>
                  setResponseType(checked ? "error" : "success")
                }
                className="data-[state=checked]:!bg-destructive data-[state=unchecked]:!bg-success"
              />
            </SideLabel>
          </SideLabel>
          <Story
            args={{
              onClick: handleClick,
              isError: result === "error",
              isSuccess: result === "success",
              isPending,
            }}
          />
        </div>
      );
    },
  ],
};
