//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isBoolean, isUndefined } from "es-toolkit";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/utils/className";
import { Badge } from "../Badge";
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

interface MultiSelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValues: Set<string>;
  toggleValue: (value: string) => void;
  items: Map<string, ReactNode>;
  onItemAdded: (value: string, label: ReactNode) => void;
}

const MultiSelectContext = createContext<MultiSelectContextType | null>(null);

const useMultiSelectContext = () => {
  const context = useContext(MultiSelectContext);
  if (context == null) {
    throw new Error(
      "useMultiSelectContext must be used within a MultiSelectContext",
    );
  }
  return context;
};

interface MultiSelectProps {
  children: ReactNode;
  /**
   * Controlled selected values. If provided, the component acts in a controlled manner.
   */
  values?: string[];
  /**
   * Default selected values for uncontrolled usage.
   */
  defaultValues?: string[];
  /**
   * Callback fired when the selected values change.
   */
  onValuesChange?: (values: string[]) => void;
}

/**
 * Root component that provides context for building a multi-select input.
 *
 * Compose with `MultiSelectTrigger`, `MultiSelectValue`, and `MultiSelectContent`.
 *
 * @example
 * <MultiSelect>
 *   <MultiSelectTrigger className="w-full max-w-[400px]">
 *     <MultiSelectValue placeholder="Select fruit..." />
 *   </MultiSelectTrigger>
 *   <MultiSelectContent>
 *     <MultiSelectGroup>
 *       <MultiSelectItem value="apple">Apple</MultiSelectItem>
 *       <MultiSelectItem value="banana">Banana</MultiSelectItem>
 *     </MultiSelectGroup>
 *   </MultiSelectContent>
 * </MultiSelect>
 */
export const MultiSelect = ({
  children,
  values,
  defaultValues,
  onValuesChange,
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    new Set(values ?? defaultValues),
  );
  const [items, setItems] = useState(new Map<string, ReactNode>());

  const toggleValue = (value: string) => {
    const newSet = new Set(selectedValues);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setSelectedValues(newSet);
    onValuesChange?.(Array.from(newSet));
  };

  const onItemAdded = (value: string, label: ReactNode) => {
    setItems((prev) => {
      if (prev.get(value) === label) return prev;
      return new Map(prev).set(value, label);
    });
  };

  return (
    <MultiSelectContext.Provider
      value={{
        open,
        setOpen,
        selectedValues: values ? new Set(values) : selectedValues,
        toggleValue,
        items,
        onItemAdded,
      }}
    >
      <PopoverRoot open={open} onOpenChange={setOpen}>
        {children}
      </PopoverRoot>
    </MultiSelectContext.Provider>
  );
};

interface MultiSelectTriggerProps
  extends Omit<ComponentPropsWithoutRef<typeof Button>, "size" | "variant"> {}

/**
 * Clickable trigger element that opens the selection popover.
 *
 * Renders like an input using the Button component. Place `MultiSelectValue` inside to show selected items.
 *
 * @example
 * <MultiSelectTrigger>
 *   <MultiSelectValue placeholder="Choose options..." />
 * </MultiSelectTrigger>
 */
export const MultiSelectTrigger = ({
  role = "combobox",
  "aria-expanded": propsAriaExpanded,
  className,
  children,
  ...props
}: MultiSelectTriggerProps) => {
  const { open } = useMultiSelectContext();

  return (
    <PopoverTrigger asChild>
      <Button
        {...props}
        role={role}
        size={null}
        variant={null}
        aria-expanded={propsAriaExpanded ?? open}
        className={cn(
          "group border-input bg-surface-primary ring-offset-surface placeholder:text-muted-foreground focus-ring flex h-auto min-h-10 w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm",
          "[&>span]:line-clamp-1 [&>span]:text-left",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {children}
        <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50 transition group-hover:opacity-80" />
      </Button>
    </PopoverTrigger>
  );
};

interface MultiSelectValueProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /**
   * Placeholder text to show when no items are selected.
   */
  placeholder?: string;
  /**
   * If true, clicking a badge removes that item from the selection.
   *
   * @default true
   */
  clickToRemove?: boolean;
  /**
   * Controls layout of badges:
   * - "wrap": always wrap to multiple lines as needed.
   * - "wrap-when-open": wrap only when the popover is open.
   * - "cutoff": single line with a "+N" badge for overflow.
   *
   * @default "wrap-when-open"
   */
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
}

/**
 * Displays the current selection inside the trigger, with badges for each selected item.
 *
 * @example
 * <MultiSelectTrigger>
 *   <MultiSelectValue placeholder="Select tags..." overflowBehavior="cutoff" />
 * </MultiSelectTrigger>
 */
export const MultiSelectValue = ({
  placeholder,
  clickToRemove = true,
  className,
  overflowBehavior = "wrap-when-open",
  ...props
}: MultiSelectValueProps) => {
  const { selectedValues, toggleValue, items, open } = useMultiSelectContext();
  const [overflowAmount, setOverflowAmount] = useState(0);
  const valueRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement>(null);

  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && open);

  const checkOverflow = useCallback(() => {
    if (valueRef.current == null) return;

    const containerElement = valueRef.current;
    const overflowElement = overflowRef.current;
    const items = containerElement.querySelectorAll<HTMLElement>(
      "[data-selected-item]",
    );

    if (overflowElement != null) overflowElement.style.display = "none";
    items.forEach((child) => child.style.removeProperty("display"));
    let amount = 0;
    for (let i = items.length - 1; i >= 0; i--) {
      const child = items[i];
      if (containerElement.scrollWidth <= containerElement.clientWidth) {
        break;
      }
      amount = items.length - i;
      child.style.display = "none";
      overflowElement?.style.removeProperty("display");
    }
    setOverflowAmount(amount);
  }, []);

  useLayoutEffect(() => {
    checkOverflow();
  }, [selectedValues, checkOverflow, shouldWrap]);

  const handleResize = (node: HTMLDivElement) => {
    valueRef.current = node;

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(node);

    return () => {
      observer.disconnect();
      valueRef.current = null;
    };
  };

  if (selectedValues.size === 0 && placeholder) {
    return (
      <span className="text-muted-foreground w-full min-w-0 overflow-hidden font-normal">
        {placeholder}
      </span>
    );
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "flex w-full gap-1.5 overflow-hidden",
        shouldWrap && "h-full flex-wrap",
        className,
      )}
    >
      {Array.from(selectedValues)
        .filter((value) => items.has(value))
        .map((value) => (
          <Badge
            variant="secondary"
            data-selected-item
            className={cn(
              "group/badge flex items-center gap-1 transition",
              "active:scale-95",
            )}
            key={value}
            onClick={
              clickToRemove ?
                (event) => {
                  event.stopPropagation();
                  toggleValue(value);
                }
              : undefined
            }
          >
            {items.get(value)}
            {clickToRemove && (
              <XIcon className="size-2.5 stroke-3 opacity-50 transition group-hover/badge:opacity-100" />
            )}
          </Badge>
        ))}
      <Badge
        variant="secondary"
        ref={overflowRef}
        className={cn((overflowAmount <= 0 || shouldWrap) && "hidden")}
      >
        +{overflowAmount}
      </Badge>
    </div>
  );
};

interface MultiSelectContentProps
  extends Omit<ComponentPropsWithoutRef<typeof Command>, "children"> {
  /**
   * Enable or disable the search input. Accepts three possible values:
   * - `true`: shows a search input with default placeholder and empty message.
   * - `false`: disables the search input.
   * - `object`: allows customizing the `placeholder` and `emptyMessage`.
   *
   * @default true
   */
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  children: ReactNode;
}

/**
 * Transform the `search` prop into a normalized object with default values for
 * placeholder and emptyMessage. Returns null if search is false.
 */
const normalizeSearchProp = (search: MultiSelectContentProps["search"]) => {
  const defaultSearchParams = {
    placeholder: "Search...",
    emptyMessage: "No results found.",
  };

  if (isUndefined(search)) return defaultSearchParams;
  if (isBoolean(search)) {
    if (search) return defaultSearchParams;
    return null;
  }

  return {
    placeholder: search.placeholder ?? defaultSearchParams.placeholder,
    emptyMessage: search.emptyMessage ?? defaultSearchParams.emptyMessage,
  };
};

/**
 * Popover content that renders the `Command`-based searchable list of items.
 *
 * @example
 * <MultiSelectContent search={{ placeholder: "Search fruits...", emptyMessage: "Nothing found" }}>
 *   <MultiSelectGroup>
 *     <MultiSelectItem value="apple">Apple</MultiSelectItem>
 *   </MultiSelectGroup>
 * </MultiSelectContent>
 *
 * @example
 * // Without search field
 * <MultiSelectContent search={false}>
 *   <MultiSelectItem value="a">A</MultiSelectItem>
 * </MultiSelectContent>
 */
export const MultiSelectContent = ({
  search = true,
  children,
  ...props
}: MultiSelectContentProps) => {
  const searchObject = normalizeSearchProp(search);
  return (
    <>
      {/* Render a hidden list of children, so the useEffect on the MultiSelectItem fires */}
      <div className="hidden">
        <Command>
          <CommandList>{children}</CommandList>
        </Command>
      </div>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] !p-0">
        <Command {...props}>
          {searchObject ?
            <CommandInput placeholder={searchObject.placeholder} />
          : <button autoFocus className="sr-only" />}
          <CommandList>
            {searchObject && (
              <CommandEmpty>{searchObject.emptyMessage}</CommandEmpty>
            )}
            {children}
          </CommandList>
        </Command>
      </PopoverContent>
    </>
  );
};

interface MultiSelectItemProps
  extends Omit<ComponentPropsWithoutRef<typeof CommandItem>, "value"> {
  /**
   * The unique value for this item within the selection.
   */
  value: string;
  /**
   * Optional custom label to show in the trigger badge (different from the list label).
   */
  badgeLabel?: ReactNode;
  /**
   * Optional callback fired when this item is selected or deselected.
   */
  onSelect?: (value: string) => void;
}

/**
 * Selectable item within the list. Toggles inclusion in the selection.
 *
 * @example
 * <MultiSelectItem value="apple">Apple</MultiSelectItem>
 *
 * @example
 * <MultiSelectItem value="us" badgeLabel={<span>United States</span>}>
 *   USA
 * </MultiSelectItem>
 */
export const MultiSelectItem = ({
  value,
  children,
  badgeLabel,
  onSelect,
  ...props
}: MultiSelectItemProps) => {
  const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext();
  const isSelected = selectedValues.has(value);

  useEffect(() => {
    onItemAdded(value, badgeLabel ?? children);
  }, [value, children, onItemAdded, badgeLabel]);

  return (
    <CommandItem
      {...props}
      onSelect={() => {
        toggleValue(value);
        onSelect?.(value);
      }}
    >
      <CheckIcon
        className={cn("size-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {children}
    </CommandItem>
  );
};

/**
 * Group wrapper for grouping related `MultiSelectItem`s under a heading.
 *
 * @example
 * <MultiSelectGroup heading="Fruits">
 *   <MultiSelectItem value="apple">Apple</MultiSelectItem>
 * </MultiSelectGroup>
 */
export const MultiSelectGroup = (
  props: ComponentPropsWithoutRef<typeof CommandGroup>,
) => {
  return <CommandGroup {...props} />;
};

/**
 * Visual separator between groups or sections in the list.
 *
 * @example
 * <>
 *   <MultiSelectGroup heading="A" />
 *   <MultiSelectSeparator />
 *   <MultiSelectGroup heading="B" />
 * </>
 */
export const MultiSelectSeparator = (
  props: ComponentPropsWithoutRef<typeof CommandSeparator>,
) => {
  return <CommandSeparator {...props} />;
};
