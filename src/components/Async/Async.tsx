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
import {
  StateContainer,
  type StateContainerProps,
} from "@/components/StateContainer";
import { EmptyState, type EmptyStateProps } from "../EmptyState";

/**
 * Converts `error` prop to a FullErrorProps object.
 */
const parseError = (error: AsyncProps["error"]) => {
  if (isUndefined(error))
    return {
      show: false,
    };
  if (isBoolean(error)) return { show: error };
  return error;
};

/**
 * Converts `empty` prop to a FullEmptyProps object.
 */
const parseEmpty = (empty: AsyncProps["empty"]) => {
  if (isBoolean(empty)) return { show: empty };
  if (isUndefined(empty)) return { show: false };
  return empty;
};

export type FullEmptyProps = { show: boolean } & EmptyStateProps;

export type FullErrorProps = {
  show: boolean;
} & ErrorStateProps;

export interface AsyncProps
  extends Pick<StateContainerProps, "grow" | "padding"> {
  /**
   * This is the main content that will be shown when there is no error,
   * loading, or empty state.
   */
  children: ReactNode;
  /**
   * Pluralized name of the represented entity.
   * Used in error and empty state messages.
   * @example "users"
   */
  entityName?: string;
  /**
   * Controls the display of the error state.
   * Can be a boolean to simply show/hide the error state
   * or an object with additional error state configuration.
   * When true or an object with show: true, the error state will be displayed.
   *
   * @example
   * // Simple boolean usage
   * error={true}
   *
   * @example
   * // Object with additional configuration
   * error={{
   *   show: true,
   *   children: "Custom error message",
   * }}
   */
  error?: boolean | FullErrorProps;
  /**
   * Controls the display of the empty state.
   * Can be a boolean to simply show/hide the empty state
   * or an object with additional empty state configuration.
   * When true or an object with show: true, the empty state will be displayed.
   *
   * @example
   * // Simple boolean usage
   * empty={true}
   *
   * @example
   * // Object with additional configuration
   * empty={{
   *   show: true,
   *   children: "No Items Found",
   * }}
   */
  empty?: boolean | FullEmptyProps;
  /**
   * Controls the display of the loading state.
   * When true, a loading spinner will be displayed.
   * Useful for indicating data fetching or processing states.
   *
   * @example
   * loading={true}
   */
  loading?: boolean;
  /**
   * Can be used to wrap state with a custom container.
   * Useful for customizing the layout or styling of error,
   * loading, or empty states.
   *
   * Uses a render prop pattern to conditionally wrap state components only when they are present.
   *
   * @param specialState - The state component to wrap (ErrorState, Spinner, or EmptyState)
   */
  renderState?: (specialState: ReactNode) => ReactNode;
  className?: string;
}

/**
 * Generic container for representing async states.
 * Handles common data states: empty, error and loading.
 * Provides a consistent way to handle loading, error, and empty states
 * across the application.
 *
 * @example
 * // Basic usage with loading state
 * <Async loading={isLoading}>
 *   <div>Content</div>
 * </Async>
 *
 * @example
 * // Usage with queriesToAsyncProps utility that parses query results
 * <Async
 *   {...queriesToAsyncProps([notificationQuery])}
 *   empty={notifications.length === 0}
 *   entityName="unread notifications"
 * >
 *   <div>
 *     {notifications.map((notification) => (
 *       <Notification key={notification.id} notification={notification} />
 *     ))}
 *   </div>
 * </Async>
 *
 * @example
 * // Custom state rendering
 * <Async
 *   loading={isLoading}
 *   renderState={(state) => (
 *     <div className="custom-container">
 *       {state}
 *     </div>
 *   )}
 * >
 *   <div>Content</div>
 * </Async>
 */
export const Async = ({
  entityName = "data",
  empty: emptyProp,
  error: errorProp,
  loading,
  renderState,
  children,
  grow,
  className,
  padding,
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
    : <StateContainer grow={grow} className={className} padding={padding}>
        {specialState}
      </StateContainer>
  );
};
