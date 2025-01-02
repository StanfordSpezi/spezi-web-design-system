//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isObject } from '@/utils/misc'
import { combineQueries, type Query } from '@/utils/query'
import { type FullErrorProps } from './Async'

/**
 * Parses queries to Async component props
 * */
export const queriesToAsyncProps = (
  queries: Query[],
  props?: {
    loading?: boolean
    error?: boolean | Partial<FullErrorProps>
  },
) => {
  const combinedQueries = combineQueries(queries)
  return {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    loading: props?.loading || combinedQueries.isLoading,
    error:
      isObject(props?.error) ?
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        { ...props.error, show: props.error.show || combinedQueries.isError }
      : combinedQueries.isError,
  }
}
