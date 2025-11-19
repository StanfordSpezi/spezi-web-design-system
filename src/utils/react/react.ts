//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { isString } from "es-toolkit";
import { isNumber } from "es-toolkit/compat";
import { type ReactNode, isValidElement } from "react";

/**
 * Converts a React node to its string representation by extracting all text content.
 *
 * @param node - The React node to convert to text
 * @returns The text content of the node. Returns an empty string if the node is null, undefined, or boolean.
 *
 * @example
 * ```tsx
 * reactNodeToText("Hello") // "Hello"
 * reactNodeToText(42) // "42"
 * reactNodeToText(<div>Hello World</div>) // "Hello World"
 * reactNodeToText([<span>A</span>, <span>B</span>]) // "AB"
 * ```
 */
export const reactNodeToText = (node: ReactNode): string => {
  if (!node) return "";

  if (isString(node) || isNumber(node)) {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map((nodeItem) => reactNodeToText(nodeItem as ReactNode))
      .join("");
  }

  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return reactNodeToText(props.children);
  }

  return "";
};
