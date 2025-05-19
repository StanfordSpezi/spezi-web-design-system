//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isObject } from "@/utils/misc";
import { combineQueries, type Query } from "@/utils/query";
import { type FullErrorProps } from "./Async";

/**
 * Parses an array of queries into `Async` component props.
 * Combines multiple query states into a single loading and error state.
 *
 * @param queries - Array of Query object results to parse
 * @param props - Optional additional props to override the parsed states
 * @returns Object containing loading and error states for the Async component
 *
 * @example
 * // Multiple queries with custom error handling
 * const usersQuery = useQuery(...)
 * const postsQuery = useQuery(...)
 * <Async
 *   {...queriesToAsyncProps(
 *     [usersQuery, postsQuery],
 *     { error: { children: "Failed to load data" } }
 *   )}
 * >
 *   <UserList users={usersQuery.data} posts={postsQuery.data} />
 * </Async>
 */
export const queriesToAsyncProps = (
  queries: Query[],
  props?: {
    loading?: boolean;
    error?: boolean | Partial<FullErrorProps>;
  },
) => {
  const combinedQueries = combineQueries(queries);
  return {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    loading: props?.loading || combinedQueries.isLoading,
    error:
      isObject(props?.error) ?
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        { ...props.error, show: props.error.show || combinedQueries.isError }
      : combinedQueries.isError,
  };
};
