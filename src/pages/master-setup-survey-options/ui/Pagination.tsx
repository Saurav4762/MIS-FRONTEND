import cn from "@shared/lib";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsCount: number;
  pageSize: number;
  onPrevClick: () => void;
  onNextClick: () => void;
  onPageSelect: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  itemsCount,
  pageSize,
  onPrevClick,
  onNextClick,
  onPageSelect,
}: PaginationProps) {
  const startItem = itemsCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, itemsCount);

  return (
    <div className="flex flex-col gap-4 border-t border-(--mis-color-ink-200) bg-(--mis-color-white) px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-(--mis-color-ink-500)">
        Showing {startItem} to {endItem} of {itemsCount} entries
      </p>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          onClick={onPrevClick}
          disabled={currentPage === 1}
          className="rounded-lg border border-(--mis-color-ink-300) px-3 py-1.5 text-xs font-semibold text-(--mis-color-ink-700) transition-colors hover:bg-(--mis-color-ink-50) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageSelect(page)}
              className={cn(
                "min-w-9 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                page === currentPage
                  ? "bg-(--mis-color-pri-500) text-white"
                  : "border border-(--mis-color-ink-300) text-(--mis-color-ink-700) hover:bg-(--mis-color-ink-50)",
              )}
            >
              {page}
            </button>
          ),
        )}
        <button
          type="button"
          onClick={onNextClick}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-(--mis-color-ink-300) px-3 py-1.5 text-xs font-semibold text-(--mis-color-ink-700) transition-colors hover:bg-(--mis-color-ink-50) disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
