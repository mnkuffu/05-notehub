import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number; 
  currentPage: number; 
  onPageChange: (page: number) => void; 
}

function Pagination({ pageCount, currentPage, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null; 

  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={currentPage - 1} 
      onPageChange={({ selected }) => onPageChange(selected + 1)} 
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
    />
  );
}

export default Pagination;