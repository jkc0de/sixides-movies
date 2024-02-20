"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponent({
  totalPages,
}: {
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, String(value));

      return params.toString();
    },
    [searchParams]
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4; // Adjust this number to control how many page numbers are visible

    if (totalPages <= maxVisiblePages) {
      // If there are fewer pages than the max visible pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationLink
              href={pathname + "?" + createQueryString("page", i)}
              className={`${
                currentPage === i
                  ? "underline underline-offset-4 decoration-white decoration-2 decoration"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Otherwise, show a limited range of pages around the current page
      const leftBound = Math.max(
        1,
        currentPage - Math.floor(maxVisiblePages / 2)
      );
      const rightBound = Math.min(totalPages, leftBound + maxVisiblePages - 1);

      if (leftBound > 1) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationLink
              href={pathname + "?" + createQueryString("page", 1)}
            >
              1
            </PaginationLink>
          </PaginationItem>,
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ); // Add the first page and ellipsis
      }

      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationLink
              href={pathname + "?" + createQueryString("page", i)}
              className={`${
                currentPage === i
                  ? "underline underline-offset-4 decoration-white decoration-2 decoration"
                  : ""
              }`}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (rightBound < totalPages) {
        pageNumbers.push(
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>,
          <PaginationItem>
            <PaginationLink
              href={pathname + "?" + createQueryString("page", totalPages)}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        ); // Add ellipsis and last page
      }
    }

    return pageNumbers;
  };
  return (
    <Pagination className="w-full">
      <PaginationContent className="flex flex-col w-full">
        <div className="flex items-center justify-between w-full">
          <PaginationItem
            className={`${
              currentPage > 1 ? "visible" : "invisible"
            } w-1/2 flex items-start`}
          >
            <PaginationPrevious
              className="w-full"
              href={pathname + "?" + createQueryString("page", currentPage - 1)}
            />
          </PaginationItem>

          {
            <PaginationItem
              className={`${
                totalPages > 1 && currentPage !== totalPages
                  ? "visible"
                  : "invisible"
              } w-1/2 flex items-end text-right`}
            >
              <PaginationNext
                className="w-full"
                href={
                  pathname + "?" + createQueryString("page", currentPage + 1)
                }
              />
            </PaginationItem>
          }
        </div>
        <div className="flex items-center">
          {getPageNumbers().map((pageNumber, index) => (
            <React.Fragment key={index}>{pageNumber}</React.Fragment>
          ))}
        </div>
      </PaginationContent>
    </Pagination>
  );
}
