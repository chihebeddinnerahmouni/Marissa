// import React, { useEffect, useState } from "react";
// import ReactPaginate from "react-paginate";

// // Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }: any) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item: any) => (
//           <div>
//             <h3>Item #{item}</h3>
//           </div>
//         ))}
//     </>
//   );
// }

// function PaginatedItems({ itemsPerPage }: any) {
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   // Simulate fetching items from another resources.
//   // (This could be items from props; or items loaded in a local state
//   // from an API endpoint with useEffect and useState)
//   const endOffset = itemOffset + itemsPerPage;
//   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event: any) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="next >"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={5}
//         pageCount={pageCount}
//         previousLabel="< previous"
//         renderOnZeroPageCount={null}
//       />
//     </>
//   );
// }

// export default PaginatedItems;

import { useTranslation } from 'react-i18next';
import React from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {

  const { t, i18n } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 3) {
      if (currentPage === 1) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage === totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`w-[35px] h-[35px] rounded-[5px] flex items-center justify-center mx-1 ${i === currentPage ? 'border border-main' : 'hover:bg-emptyInput'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center w-full">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className=" w-[90px] h-[35px] mx-1 flex items-center justify-center rounded-[5px] gap-1 hover:bg-emptyInput"
      >
        {i18n.language === "en" ? <FaAngleLeft /> : <FaAngleRight />}{" "}
        {t("previous")}
      </button>
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="w-[90px] h-[35px] mx-1 flex items-center justify-center rounded-[5px] gap-1 hover:bg-emptyInput"
      >
        {t("next")}{" "}
        {i18n.language === "en" ? <FaAngleRight /> :<FaAngleLeft /> }
      </button>
    </div>
  );
};

export default Pagination;
