//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  type ComponentProps,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { Button } from "../../components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/Dialog";

const maxVisibleItems = 4;

export interface ConfirmDeleteDialogProps
  extends ComponentProps<typeof Dialog> {
  /**
   * Name of the entity type being deleted.
   * Provide in singular or plural form as appropriate for the context.
   * @example "user" — when deleting a single user
   * @example "3 users" — when deleting multiple users
   */
  entityName?: ReactNode;
  /**
   * Distinctive item identifier(s) shown before confirming deletion.
   * Pass a single value or an array for bulk deletion.
   * When more than 4 items are provided, only the first 2 are listed
   * followed by "and N more".
   * @example "example@example.com"
   * @example ["alice@example.com", "bob@example.com"]
   */
  itemName?: ReactNode | ReactNode[];
  onDelete: MouseEventHandler;
}

interface ItemNamesProps {
  itemNames: ReactNode[];
}

const ItemNames = ({ itemNames }: ItemNamesProps) => {
  const showTruncated = itemNames.length > maxVisibleItems;
  const visibleItems = showTruncated ? itemNames.slice(0, 2) : itemNames;
  const remainingCount = itemNames.length - visibleItems.length;

  return (
    <>
      <br />
      {visibleItems.map((name, index) => (
        <span key={index}>
          {index > 0 && ", "}
          <b className="text-foreground font-medium">{name}</b>
        </span>
      ))}
      {showTruncated && ` and ${remainingCount} more`} will be deleted forever.
    </>
  );
};

/**
 * A dialog component for confirming destructive actions like deletion.
 * Built on top of the Dialog component, it provides a consistent interface
 * for confirming irreversible actions.
 *
 * Supports both single and bulk deletion via the `itemName` prop.
 *
 * @example Single item
 * ```tsx
 * <ConfirmDeleteDialog
 *   entityName="user"
 *   itemName="john@example.com"
 *   onDelete={handleDelete}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 *
 * @example Multiple items
 * ```tsx
 * <ConfirmDeleteDialog
 *   entityName="3 users"
 *   itemName={["alice@example.com", "bob@example.com", "carol@example.com"]}
 *   onDelete={handleDelete}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 */
export const ConfirmDeleteDialog = ({
  entityName,
  itemName,
  onDelete,
  ...props
}: ConfirmDeleteDialogProps) => {
  const itemNames =
    !itemName ? null
    : Array.isArray(itemName) ? itemName
    : [itemName];

  return (
    <Dialog {...props}>
      <DialogContent data-slot="confirm-delete-dialog">
        <DialogHeader>
          <DialogTitle>Deleting {entityName}</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed? This action cannot be undone.
            {itemNames && <ItemNames itemNames={itemNames} />}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onDelete} variant="destructive">
            Delete {entityName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
