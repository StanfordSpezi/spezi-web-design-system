//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type ComponentProps, type ReactNode } from "react";
import { Checkbox } from "@/components/Checkbox";
import { SideLabel } from "@/components/SideLabel";
import { cn } from "@/utils/className";

export interface CheckboxOption<T extends string | number = string> {
  /**
   * Label to display next to the checkbox.
   * Can be a string or a ReactNode for more complex labels.
   */
  label: ReactNode;
  /**
   * Value associated with this checkbox option.
   */
  value: T;
  /**
   * Whether this option is disabled.
   */
  disabled?: boolean;
}

export interface CheckboxGroupProps<T extends string | number = string>
  extends Omit<ComponentProps<"div">, "defaultValue" | "onChange"> {
  /**
   * Options to render as checkboxes.
   */
  options: Array<CheckboxOption<T>>;
  /**
   * Currently selected values.
   */
  value?: T[];
  /**
   * Callback fired when the values change.
   */
  onChange?: (values: T[]) => void;
  /**
   * Default values to be selected initially for uncontrolled usage.
   */
  defaultValue?: T[];
  /**
   * Direction of the checkbox group.
   *
   * - `row`: Arranges checkbox horizontally in a row with wrapping if necessary
   * - `column`: Arranges checkbox vertically in a column
   *
   * @default "column"
   */
  direction?: "row" | "column";
}

/**
 * A group of checkboxes for selecting multiple options.
 *
 * @template T The type of the value (string or number, supports enum)
 *
 * @example
 * <CheckboxGroup
 *   options={[
 *     { label: "Option 1", value: "option1" },
 *     { label: "Option 2", value: "option2" },
 *     { label: "Option 3", value: "option3" },
 *   ]}
 *   defaultValue={["option1"]}
 *   onChange={(values) => console.log(values)}
 * />
 */
export const CheckboxGroup = <T extends string | number>({
  options,
  value: valueProp,
  onChange,
  defaultValue = [],
  className,
  direction = "column",
  ...props
}: CheckboxGroupProps<T>) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange,
    caller: "CheckboxGroup",
  });

  const handleChange = (optionValue: T, isChecked: boolean) => {
    const newValue =
      isChecked ?
        [...value, optionValue]
      : value.filter((selectedValue) => selectedValue !== optionValue);
    setValue(newValue);
  };

  return (
    <div
      role="group"
      className={cn(
        "flex gap-x-4 gap-y-2",
        direction === "column" ? "flex-col" : "flex-wrap",
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <SideLabel key={option.value} label={option.label}>
          <Checkbox
            checked={value.includes(option.value)}
            disabled={option.disabled}
            onCheckedChange={(isChecked) =>
              handleChange(option.value, !!isChecked)
            }
          />
        </SideLabel>
      ))}
    </div>
  );
};
