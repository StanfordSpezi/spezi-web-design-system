//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from "@storybook/react";
import { action } from "storybook/actions";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationItemContainer,
  PaginationNext,
  PaginationNextIcon,
  PaginationPrevious,
  PaginationPreviousIcon,
} from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;

/**
 * Renders buttons by default.
 */
export const Default = () => (
  <Pagination>
    <PaginationContent>
      <PaginationItemContainer>
        <PaginationPrevious onClick={action("previous click")} />
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem onClick={action("page click")}>1</PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem onClick={action("page click")} isActive>
          2
        </PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem onClick={action("page click")}>3</PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationEllipsis />
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationNext onClick={action("next click")} />
      </PaginationItemContainer>
    </PaginationContent>
  </Pagination>
);

/**
 * Opt-in to using links.
 */
export const Links = () => (
  <Pagination>
    <PaginationContent>
      <PaginationItemContainer>
        <PaginationPrevious asChild>
          <a href="/prev">
            <PaginationPreviousIcon />
          </a>
        </PaginationPrevious>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem asChild>
          <a href="/1">1</a>
        </PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem asChild isActive>
          <a href="/2">2</a>
        </PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationItem asChild>
          <a href="/3">3</a>
        </PaginationItem>
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationEllipsis />
      </PaginationItemContainer>
      <PaginationItemContainer>
        <PaginationNext asChild>
          <a href="/next">
            <PaginationNextIcon />
          </a>
        </PaginationNext>
      </PaginationItemContainer>
    </PaginationContent>
  </Pagination>
);
