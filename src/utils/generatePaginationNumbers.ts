export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // If total pages is 7 or less
  // show total pages without ellipses
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
  }

  // If the current page is between the first 3 pages
  // show the first 3, ellipses, and the last 2
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]; // [1,2,3,'...',49,50]
  }

  // If the current page is between the last 3 pages
  // show the first 2, ellipses, the last 3 pages.

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is elsewhere in the middle
  // show the first page, ellipses, the current page and neighbours
  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};
