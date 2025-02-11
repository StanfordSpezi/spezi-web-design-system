//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isString } from "es-toolkit";
import { isObject } from "@/utils/misc";

export interface Query {
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export const combineQueries = (queries: Query[]) => ({
  isLoading: queries.some((query) => query.isLoading),
  isError: queries.some((query) => query.isError),
  isSuccess: queries.every((query) => query.isSuccess),
});

export const parseUnknownError = (error: unknown) =>
  isObject(error) && "message" in error && isString(error.message) ?
    error.message
  : isString(error) ? error
  : "Unknown error happened";
