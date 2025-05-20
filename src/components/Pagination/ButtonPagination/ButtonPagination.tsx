//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Design System open-source project
//
// SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import {
  PaginationItemType,
  usePagination,
  type UsePaginationProps,
} from "@nextui-org/use-pagination";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationItemContainer,
  PaginationNext,
  PaginationPrevious,
} from "../Pagination";

export interface ButtonPaginationProps extends UsePaginationProps {
  total: number;
  /**
   * Currently selected page, 1-based.
   */
  page: number;
  onPageChange: (page: number) => void;
}

/**
 * Complete state-controlled pagination.
 */
export const ButtonPagination = ({
  total,
  page,
  onPageChange,
  siblings = 1,
  showControls = true,
  ...props
}: ButtonPaginationProps) => {
  const { activePage, range } = usePagination({
    total,
    page,
    siblings,
    showControls,
    ...props,
  });

  return (
    <Pagination>
      <PaginationContent>
        {range.map((rangePage, index) => {
          if (rangePage === PaginationItemType.PREV) {
            if (page === 1) return null;
            return (
              <PaginationItemContainer key={rangePage}>
                <PaginationPrevious
                  onClick={() => onPageChange(activePage - 1)}
                />
              </PaginationItemContainer>
            );
          }
          if (rangePage === PaginationItemType.NEXT) {
            if (page === total) return null;
            return (
              <PaginationItemContainer key={rangePage}>
                <PaginationNext onClick={() => onPageChange(activePage + 1)} />
              </PaginationItemContainer>
            );
          }
          if (rangePage === PaginationItemType.DOTS)
            return (
              <PaginationItemContainer key={`${rangePage}-${index}`}>
                <PaginationEllipsis />
              </PaginationItemContainer>
            );
          return (
            <PaginationItemContainer key={rangePage}>
              <PaginationItem
                onClick={() => onPageChange(rangePage)}
                isActive={rangePage === page}
              >
                {rangePage}
              </PaginationItem>
            </PaginationItemContainer>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};
