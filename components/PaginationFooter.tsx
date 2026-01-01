"use client";
import {
  ChevronLeft,
  ChevronRight,
  List,
  ArrowUpDown,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface PaginationFooterProps {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  perPage: number;
  sortDirection: "asc" | "desc";
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (perPage: number) => void;
  onSortDirectionChange: (sortDir: "asc" | "desc") => void;
  isLoading?: boolean;
}

export default function PaginationFooter({
  currentPage,
  totalItems,
  totalPages,
  perPage,
  sortDirection,
  onPageChange,
  onItemsPerPageChange,
  onSortDirectionChange,
  isLoading = false,
}: PaginationFooterProps) {
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-xs animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-6 bg-gray-100 rounded-md w-20"></div>
          <div className="h-6 bg-gray-100 rounded-md w-6"></div>
          <div className="h-6 bg-gray-100 rounded-md w-6"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 bg-gray-100 rounded-lg w-28"></div>
          <div className="h-7 bg-gray-100 rounded-lg w-28"></div>
        </div>
      </div>
    );
  }

  if (totalItems === 0) {
    return null;
  }

  const itemsText = totalItems === 1 ? "item" : "items";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-xs">
      {/* Left side - Info and navigation */}
      <div className="flex items-center gap-3">
        {/* Total items */}
        <div className="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-lg">
          {totalItems.toLocaleString()} {itemsText}
        </div>

        {/* Page info and navigation */}
        <div className="flex items-center gap-1">
          <div className="text-xs text-gray-500 mx-1">
            <span className="font-semibold text-gray-800">{currentPage}</span>
            <span className="text-gray-400">/{totalPages}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!hasPrevPage}
              className="p-1.5 rounded-lg border border-gray-300 bg-white disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed hover:bg-green-50 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
              title="Previous page"
              onMouseEnter={() => setHoveredControl("prev")}
              onMouseLeave={() => setHoveredControl(null)}
            >
              <ChevronLeft
                className={`h-3.5 w-3.5 ${
                  hasPrevPage
                    ? "text-gray-700 group-hover:text-green-600"
                    : "text-gray-400"
                }`}
              />
            </button>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!hasNextPage}
              className="p-1.5 rounded-lg border border-gray-300 bg-white disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed hover:bg-green-50 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
              title="Next page"
              onMouseEnter={() => setHoveredControl("next")}
              onMouseLeave={() => setHoveredControl(null)}
            >
              <ChevronRight
                className={`h-3.5 w-3.5 ${
                  hasNextPage
                    ? "text-gray-700 group-hover:text-green-600"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-2">
        {/* Items per page selector */}
        <div
          className="relative group"
          onMouseEnter={() => setHoveredControl("perPage")}
          onMouseLeave={() => setHoveredControl(null)}
        >
          <div
            className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              hoveredControl === "perPage" ? "text-green-600" : "text-gray-500"
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </div>
          <select
            title="Items per page"
            value={perPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="pl-8 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer bg-white hover:border-gray-400 transition-all duration-200 appearance-none disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <option value={5}>5/page</option>
            <option value={10}>10/page</option>
            <option value={20}>20/page</option>
            <option value={30}>30/page</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
        </div>

        {/* Sort direction selector */}
        <div
          className="relative group"
          onMouseEnter={() => setHoveredControl("sort")}
          onMouseLeave={() => setHoveredControl(null)}
        >
          <div
            className={`absolute left-2.5 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              hoveredControl === "sort" ? "text-green-600" : "text-gray-500"
            }`}
          >
            <ArrowUpDown className="h-3.5 w-3.5" />
          </div>
          <select
            title="Sort direction"
            value={sortDirection}
            onChange={(e) =>
              onSortDirectionChange(e.target.value as "asc" | "desc")
            }
            className="pl-8 pr-8 py-1.5 border border-gray-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none cursor-pointer bg-white hover:border-gray-400 transition-all duration-200 appearance-none disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}