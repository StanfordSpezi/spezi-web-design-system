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

interface ConfirmDeleteDialogProps extends ComponentProps<typeof Dialog> {
  /**
   * Name of distinctive item identifier
   * It allows user to see what they're deleting right before confirming
   * @example "example@example.com"
   * */
  itemName?: ReactNode;
  /**
   * Name of deleted entity model name
   * @example "user"
   * */
  entityName?: ReactNode;
  onDelete: MouseEventHandler;
}

export const ConfirmDeleteDialog = ({
  entityName,
  itemName,
  onDelete,
  ...props
}: ConfirmDeleteDialogProps) => (
  <Dialog {...props}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Deleting {entityName}</DialogTitle>
        <DialogDescription>
          Are you sure you want to proceed? This action cannot be undone.
          {itemName && (
            <>
              <br />
              <b className="text-foreground font-medium">{itemName}</b> will be
              deleted forever.
            </>
          )}
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
