//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { omit, isBoolean, isUndefined } from "es-toolkit";
import { type ReactNode } from "react";
import { ErrorState, type ErrorStateProps } from "@/components/ErrorState";
import { Spinner } from "@/components/Spinner";
import { StateContainer } from "@/components/StateContainer";
import { EmptyState, type EmptyStateProps } from "../EmptyState";

const parseError = (error: AsyncProps["error"]) => {
  if (isUndefined(error))
    return {
      show: false,
    };
  if (isBoolean(error)) return { show: error };
  return error;
};

const parseEmpty = (empty: AsyncProps["empty"]) => {
  if (isBoolean(empty)) return { show: empty };
  if (isUndefined(empty)) return { show: false };
  return empty;
};

export type FullEmptyProps = { show: boolean } & EmptyStateProps;

export type FullErrorProps = {
  show: boolean;
} & ErrorStateProps;

export interface AsyncProps {
  grow?: boolean;
  children?: ReactNode;
  className?: string;
  /**
   * Name of the represented entity
   * Provide pluralized
   * @example "users"
   * */
  entityName?: string;
  empty?: boolean | FullEmptyProps;
  error?: boolean | FullErrorProps;
  loading?: boolean;
  /**
   * Can be used to wrap state with custom container
   * */
  renderState?: (specialState: ReactNode) => ReactNode;
}

/**
 * Generic async container
 * Handles common data states: empty, error and loading
 * */
export const Async = ({
  entityName = "data",
  empty: emptyProp,
  error: errorProp,
  loading,
  renderState,
  children,
  grow,
  className,
}: AsyncProps) => {
  const error = parseError(errorProp);
  const empty = parseEmpty(emptyProp);

  const specialState =
    error.show ?
      <ErrorState entityName={entityName} {...omit(error, ["show"])} />
    : loading ? <Spinner />
    : empty.show ?
      <EmptyState entityName={entityName} {...omit(empty, ["show"])} />
    : null;

  return (
    !specialState ? children
    : renderState ? renderState(specialState)
    : <StateContainer grow={grow} className={className}>
        {specialState}
      </StateContainer>
  );
};
