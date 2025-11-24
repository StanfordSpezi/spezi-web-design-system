//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { defaultFilter, useCommandState } from "cmdk";
import { isBoolean, isUndefined } from "es-toolkit";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { VisuallyHidden } from "radix-ui";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type ComponentProps,
  useCallback,
} from "react";
import { cn } from "@/utils/className";
import { reactNodeToText } from "@/utils/react";
import { Button } from "../Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../Command";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../Popover";

type SelectContextType = ReturnType<typeof useSelectProvider>;

const SelectContext = createContext<SelectContextType | null>(null);

/**
 * Hook to access the Select context. Must be used within a Select component.
 * @throws {Error} If used outside a Select component.
 */
export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (context === null) {
    throw new Error("useSelectContext must be used within a SelectContext");
  }
  return context;
};

interface SelectContextProps {
  /**
   * Controlled selected value. If provided, the component acts in a controlled manner.
   */
  value?: string;
  /**
   * Default selected value for uncontrolled usage.
   */
  defaultValue?: string;
  /**
   * Callback fired when the selected value changes.
   * @param value - The newly selected value
   */
  onValueChange?: (value: string) => void;
  /**
   * Enable or disable the search input. Accepts three possible values:
   * - `true`: shows a search input with default placeholder and empty message.
   * - `false`: disables the search input.
   * - `object`: allows customizing the `placeholder` and `emptyMessage`.
   *
   * @default false
   */
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  /**
   * Enable creation of new options. Accepts three possible values:
   * - `true`: enables the create option with default behavior.
   * - `false`: disables the create option.
   * - `object`: allows customizing via `onCreateOption` callback and `render` function.
   *
   * @default false
   */
  create?: boolean | CreateProp;
  /**
   * Function to format how value without a label appears when selected in the trigger and select options.
   * Usually, it's useful when value is created or option no longer exists in the list.
   *
   * @param value - The value of the created option
   * @returns ReactNode to display
   */
  formatValue?: (value: string) => ReactNode;
  disabled?: boolean;
}

interface SelectProps extends SelectContextProps {
  /**
   * Child components that compose the Select (SelectTrigger, SelectContent, etc.)
   */
  children: ReactNode;
}

/**
 * Transform the {@link SelectProps#search|search} prop into a normalized object with default values for
 * placeholder and emptyMessage. Returns null if search is false.
 * @param search - The search prop to normalize
 * @returns Normalized search object with placeholder and emptyMessage, or null if search is disabled
 * @internal
 */
const normalizeSearchProp = (search: SelectProps["search"]) => {
  const defaultSearchParams = {
    placeholder: "Search...",
    emptyMessage: "No results found.",
  };

  if (isUndefined(search)) return null;
  if (isBoolean(search)) {
    if (search) return defaultSearchParams;
    return null;
  }

  return {
    ...defaultSearchParams,
    ...search,
  };
};

/**
 * Transform the {@link SelectProps#create|create} prop into a normalized object.
 * @returns Normalized create object, null if create is false.
 */
const normalizeCreateProp = (create: SelectProps["create"]) => {
  if (isUndefined(create) || create === false) return null;
  if (create === true) return {};
  return create;
};

interface ItemsMapValue {
  label: ReactNode;
  itemText?: string;
}

/**
 * Hook that manages Select component state and behavior.
 */
export const useSelectProvider = ({
  value,
  defaultValue,
  onValueChange,
  create,
  search,
  disabled,
  formatValue,
}: SelectContextProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value ?? defaultValue,
  );
  const [items, setItems] = useState(new Map<string, ItemsMapValue>());

  const selectValue = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  const onItemAdded = useCallback((itemValue: string, value: ItemsMapValue) => {
    setItems((prev) => {
      const prevItem = prev.get(itemValue);
      if (
        prevItem &&
        prevItem.label === prevItem.label &&
        prevItem.itemText === value.itemText
      ) {
        return prev;
      }
      return new Map(prev).set(itemValue, value);
    });
  }, []);

  return {
    open,
    setOpen,
    selectedValue: value ?? selectedValue,
    selectValue,
    items,
    onItemAdded,
    create: normalizeCreateProp(create),
    search: normalizeSearchProp(search),
    disabled,
    formatValue,
  };
};

/**
 * Root component that provides context for building a single-select input with search and create capabilities.
 *
 * Compose with {@link SelectTrigger}, {@link SelectValue}, and {@link SelectContent}.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Select>
 *   <SelectTrigger className="w-full max-w-[400px]">
 *     <SelectValue placeholder="Select fruit..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectItem value="apple">Apple</SelectItem>
 *       <SelectItem value="banana">Banana</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example
 * ```tsx
 * // With search enabled
 * <Select search>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Search fruits..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectGroup>
 *       <SelectItem value="apple">Apple</SelectItem>
 *       <SelectItem value="banana">Banana</SelectItem>
 *       <SelectItem value="orange">Orange</SelectItem>
 *     </SelectGroup>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example
 * ```tsx
 * // With custom search configuration
 * <Select
 *   search={{
 *     placeholder: "Type to search...",
 *     emptyMessage: "No fruits found."
 *   }}
 * >
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select fruit..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example
 * ```tsx
 * // With create option enabled
 * <Select
 *   search
 *   create
 * >
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select or create..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example
 * ```tsx
 * // With custom create option and formatValue
 * <Select
 *   search
 *   create={{
 *     onCreateOption: (value) => console.log("Created:", value),
 *     render: (search) => `Add "${search}" as new option`
 *   }}
 *   formatValue={(value) => `Custom: ${value}`}
 * >
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select or create..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="existing">Existing Option</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled usage
 * const [value, setValue] = useState("apple");
 *
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select fruit..." />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
export const Select = ({ children, ...props }: SelectProps) => {
  const state = useSelectProvider(props);
  return (
    <SelectContext.Provider value={state}>
      <PopoverRoot open={state.open} onOpenChange={state.setOpen}>
        {children}
      </PopoverRoot>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps
  extends Omit<ComponentProps<typeof Button>, "size" | "variant"> {}

/**
 * Clickable trigger element that opens the selection popover.
 *
 * Renders like an input using the Button component. Place `SelectValue` inside to show selected item.
 *
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="Choose an option..." />
 * </SelectTrigger>
 * ```
 */
export const SelectTrigger = ({
  role = "combobox",
  "aria-expanded": propsAriaExpanded,
  className,
  children,
  ...props
}: SelectTriggerProps) => {
  const { open, disabled } = useSelectContext();

  return (
    <PopoverTrigger asChild>
      <Button
        {...props}
        role={role}
        size={null}
        variant={null}
        aria-expanded={propsAriaExpanded ?? open}
        disabled={disabled}
        className={cn(
          "group border-input bg-surface-primary ring-offset-surface placeholder:text-muted-foreground focus-ring flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
          "[&>span]:line-clamp-1 [&>span]:text-left",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 opacity-50 transition group-hover:opacity-80" />
      </Button>
    </PopoverTrigger>
  );
};

interface SelectValueProps extends Omit<ComponentProps<"span">, "children"> {
  /**
   * Placeholder text to show when no item is selected.
   */
  placeholder?: string;
}

/**
 * Displays the current selection inside the trigger.
 *
 * @example
 * ```tsx
 * <SelectTrigger>
 *   <SelectValue placeholder="Select a tag..." />
 * </SelectTrigger>
 * ```
 */
export const SelectValue = ({
  placeholder,
  className,
  ...props
}: SelectValueProps) => {
  const { selectedValue, items, formatValue } = useSelectContext();

  if (!selectedValue) {
    return (
      <span
        className={cn(
          "text-muted-foreground w-full min-w-0 overflow-hidden font-normal",
          className,
        )}
        {...props}
      >
        {placeholder}
      </span>
    );
  }

  return (
    <span
      className={cn("w-full min-w-0 overflow-hidden", className)}
      {...props}
    >
      {items.get(selectedValue)?.itemText ??
        items.get(selectedValue)?.label ??
        formatValue?.(selectedValue) ??
        selectedValue}
    </span>
  );
};

interface CreateProp {
  /**
   * Callback fired when a new option is created.
   * @param value - The value of the newly created option
   */
  onCreateOption?: (value: string) => void;
  /**
   * Function to customize how the "create" option appears in the list.
   * @param search - The current search term
   * @returns ReactNode to display
   */
  render?: (search: string) => ReactNode;
}

interface SelectContentProps
  extends Omit<ComponentProps<typeof Command>, "children"> {
  /**
   * Child components, typically SelectGroup, SelectItem, and SelectSeparator
   */
  children: ReactNode;
}

/**
 * Unique key used internally to identify the "create new option" item.
 * @internal
 */
const selectCreateKey = "CREATE-NEW-OPTION:select-unique-key-123";

/**
 * Popover content that renders the `Command`-based searchable list of items.
 *
 * Automatically includes search input and create option if enabled via the parent Select component.
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectGroup>
 *     <SelectItem value="apple">Apple</SelectItem>
 *     <SelectItem value="banana">Banana</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 *
 * @example
 * ```tsx
 * // With groups and separator
 * <SelectContent>
 *   <SelectGroup heading="Fruits">
 *     <SelectItem value="apple">Apple</SelectItem>
 *   </SelectGroup>
 *   <SelectSeparator />
 *   <SelectGroup heading="Vegetables">
 *     <SelectItem value="carrot">Carrot</SelectItem>
 *   </SelectGroup>
 * </SelectContent>
 * ```
 */
export const SelectContent = ({ children, ...props }: SelectContentProps) => {
  const { create, search, items } = useSelectContext();

  return (
    <>
      {/* Render a hidden list of children, so the useEffect on the SelectItem fires */}
      <div className="hidden" aria-hidden="true">
        <Command aria-hidden="true" tabIndex={-1}>
          <CommandList aria-hidden="true" tabIndex={-1}>
            {children}
          </CommandList>
        </Command>
      </div>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] !p-0">
        <Command
          {...props}
          filter={(value, searchTerm, keywords) => {
            if (value === selectCreateKey) return 0.0001;
            const item = items.get(value);
            const childrenToText = reactNodeToText(item?.label);
            const string = `${value}${item?.itemText}${childrenToText}`;
            return defaultFilter(string, searchTerm, keywords);
          }}
        >
          {search ?
            <CommandInput placeholder={search.placeholder} />
          : <button autoFocus className="sr-only" />}
          <CommandList>
            {search && <CommandEmpty>{search.emptyMessage}</CommandEmpty>}
            {children}
            {create && <SelectCreateItem {...create} />}
          </CommandList>
        </Command>
      </PopoverContent>
    </>
  );
};

interface SelectItemProps
  extends Omit<ComponentProps<typeof CommandItem>, "value" | "onSelect"> {
  /**
   * Provide itemText only if `children` is a complex ReactNode element.
   */
  itemText?: string;
  /**
   * The unique value for this item within the selection.
   */
  value: string;
  /**
   * Optional callback fired when this item is selected.
   * @param value - The value of the selected item
   */
  onSelect?: (value: string) => void;
  /**
   * Whether to register this item in the Select's internal items map.
   * Set to false for internal items like the create option.
   * @default true
   */
  addToItems?: boolean;
}

/**
 * Selectable item within the list.
 *
 * Displays a checkmark when selected and handles selection state automatically.
 *
 * @example
 * ```tsx
 * <SelectItem value="apple">Apple</SelectItem>
 * ```
 *
 * @example
 * ```tsx
 * <SelectItem
 *   value="banana"
 *   onSelect={(value) => console.log("Selected:", value)}
 * >
 *   Banana
 * </SelectItem>
 * ```
 */
export const SelectItem = ({
  value,
  children,
  onSelect,
  addToItems = true,
  itemText,
  ...props
}: SelectItemProps) => {
  const { selectValue, selectedValue, onItemAdded, formatValue } =
    useSelectContext();
  const isSelected = selectedValue === value;

  useEffect(() => {
    if (addToItems) {
      onItemAdded(value, { label: children, itemText: itemText });
    }
  }, [value, children, onItemAdded, addToItems, itemText]);

  return (
    <CommandItem
      {...props}
      value={value}
      onSelect={() => {
        selectValue(value);
        onSelect?.(value);
      }}
    >
      <VisuallyHidden.Root>{itemText}</VisuallyHidden.Root>
      <CheckIcon
        className={cn("size-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {children ?? formatValue?.(value) ?? value}
    </CommandItem>
  );
};

/**
 * Group wrapper for grouping related `SelectItem`s under a heading.
 *
 * @example
 * ```tsx
 * <SelectGroup heading="Fruits">
 *   <SelectItem value="apple">Apple</SelectItem>
 * </SelectGroup>
 * ```
 */
export const SelectGroup = (props: ComponentProps<typeof CommandGroup>) => (
  <CommandGroup {...props} />
);

/**
 * Visual separator between groups or sections in the list.
 *
 * @example
 * ```tsx
 * <>
 *   <SelectGroup heading="A" />
 *   <SelectSeparator />
 *   <SelectGroup heading="B" />
 * </>
 * ```
 */
export const SelectSeparator = (
  props: ComponentProps<typeof CommandSeparator>,
) => <CommandSeparator {...props} />;

interface SelectCreateItemProps extends CreateProp {}

/**
 * Component that renders the "create new option" item when the create feature is enabled.
 */
export const SelectCreateItem = ({
  onCreateOption,
  render,
}: SelectCreateItemProps) => {
  const search = useCommandState((state) => state.search);
  const { selectValue, items, selectedValue, formatValue } = useSelectContext();

  const isOptionCreated = selectedValue && !items.has(selectedValue);

  return (
    <>
      {isOptionCreated && (
        <SelectItem addToItems={false} value={selectedValue}>
          {formatValue?.(selectedValue) ?? selectedValue}
        </SelectItem>
      )}
      {search && (
        <SelectItem
          value={selectCreateKey}
          addToItems={false}
          onSelect={() => {
            selectValue(search);
            onCreateOption?.(search);
          }}
        >
          {render?.(search) ?? `Create "${search}"`}
        </SelectItem>
      )}
    </>
  );
};
