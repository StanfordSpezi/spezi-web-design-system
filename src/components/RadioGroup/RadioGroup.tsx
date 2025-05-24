//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import { type ComponentProps, type ReactNode } from "react";
import { Radio } from "@/components/Radio";
import { SideLabel } from "@/components/SideLabel";
import { cn } from "@/utils/className";

export interface RadioGroupProps<T extends string>
  extends Omit<
    ComponentProps<typeof RadioGroupPrimitive.Root>,
    "value" | "onValueChange" | "defaultValue" | "onChange"
  > {
  /**
   * Array of options to be displayed in the radio group.
   */
  options: Array<{ label: ReactNode; value: T }>;
  /**
   * The currently selected value.
   */
  value?: T;
  /**
   * Callback fired when the value changes.
   *
   * onChange name is used to keep compatibility with `Field` component.
   */
  onChange?: (value: T) => void;
  /**
   * Default value to be selected initially for un-controlled usage.
   */
  defaultValue?: T;
  /**
   * Direction of the radio group.
   *
   * @default "column"
   */
  direction?: "row" | "column";
  className?: string;
}

/**
 * A component that composes a complete radio group with labeled options.
 *
 * This component renders a list of radio buttons with labels, arranged horizontally or vertically, with appropriate spacing and wrapping behavior.
 * It's recommended to use this component instead of the primitive `RadioGroup` component, unless you need complex custom behavior.
 *
 * @template T The type of the value (string usually, but supports enum)
 *
 * @example
 * // Basic usage with string values
 * <RadioGroup
 *   options={[
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2" }
 *   ]}
 *   onChange={(value) => console.log(value)}
 * />
 *
 * @example
 * // With controlled value
 * const [value, setValue] = useState("option1");
 * <RadioGroup
 *   options={[
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2" }
 *   ]}
 *   value={value}
 *   onChange={setValue}
 * />
 *
 * @example
 * // Horizontal layout
 * <RadioGroup
 *   direction="row"
 *   options={[
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2" }
 *   ]}
 *   onChange={handleChange}
 * />
 */
export const RadioGroup = <T extends string>({
  options,
  onChange,
  className,
  direction = "column",
  ...props
}: RadioGroupProps<T>) => (
  <RadioGroupPrimitive.Root
    className={cn(
      "flex gap-x-4 gap-y-2",
      direction === "column" ? "flex-col" : "flex-wrap",
      className,
    )}
    onValueChange={(newValue) => onChange?.(newValue as T)}
    {...props}
  >
    {options.map((option) => (
      <SideLabel key={option.value} label={option.label}>
        <Radio value={option.value} />
      </SideLabel>
    ))}
  </RadioGroupPrimitive.Root>
);
