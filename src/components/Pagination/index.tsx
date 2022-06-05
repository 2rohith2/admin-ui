import React, { Dispatch, SetStateAction } from 'react';
import './index.scss';

interface Props {
  currentPageIndex: number;
  rowsPerPage: number;
  setCurrentPageIndex: Dispatch<SetStateAction<number>>;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  totalCount: number;
}

export default function PaginationComponent(props: Props): JSX.Element {
  const totalPages = Math.ceil(props.totalCount / props.rowsPerPage);
  const currentPageIndex = props.currentPageIndex;

  const pages = [];
  let startIndex = 0;
  let endIndex = 0;

  if ((currentPageIndex - 2) <= 0) {
    startIndex = 1;
    endIndex = (totalPages >= 5 ? 5 : totalPages);
  } else if ((currentPageIndex + 2) > totalPages) {
    startIndex = currentPageIndex - 2;
    endIndex = totalPages;
  } else {
    startIndex = currentPageIndex - 2;
    endIndex = currentPageIndex + 2;
  }

  for (let index = startIndex; index <= endIndex; index++) {
    pages.push(
      <button
        type='button'
        key={index}
        className={`pages__page-number ${(index - 1) === currentPageIndex ? 'active-page' : ''}`}
        onClick={(): void => props.setCurrentPageIndex(index - 1)}
      >
        {index}
      </button>
    );
  }

  return (
    <>
      {
        props.totalCount !== 0 &&
        <div className='pages'>
          <div>
            <button
              type='button'
              className='pages__page-number'
              onClick={(): void => props.setCurrentPageIndex(0)}
              disabled={currentPageIndex === 0}
            >
              <i className='bi bi-chevron-double-left'></i>
            </button>

            <button
              type='button'
              className='pages__page-number'
              onClick={(): void => props.setCurrentPageIndex(currentPageIndex - 1)}
              disabled={currentPageIndex === 0}
            >
              <i className='bi bi-chevron-left'></i>
            </button>

            {pages}

            <button
              type='button'
              className='pages__page-number'
              onClick={(): void => props.setCurrentPageIndex(currentPageIndex + 1)}
              disabled={currentPageIndex === (totalPages - 1)}
            >
              <i className='bi bi-chevron-right'></i>
            </button>

            <button
              type='button'
              className='pages__page-number'
              onClick={(): void => props.setCurrentPageIndex((totalPages - 1))}
              disabled={currentPageIndex === (totalPages - 1)}
            >
              <i className='bi bi-chevron-double-right'></i>
            </button>
          </div>

          <div className='dropdown'>
            <button className='btn btn-secondary dropdown-toggle' type='button' id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
              Rows
            </button>
            <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
              <li>
                <a className='dropdown-item' href='#'
                  onClick={(): void => {
                    props.setRowsPerPage(5);
                    props.setCurrentPageIndex(0);
                  }}
                >
                  5
                </a></li>
              <li>
                <a className='dropdown-item' href='#'
                  onClick={(): void => {
                    props.setRowsPerPage(10);
                    props.setCurrentPageIndex(0);
                  }}
                >
                  10
                </a></li>
              <li>
                <a className='dropdown-item' href='#'
                  onClick={(): void => {
                    props.setRowsPerPage(15);
                    props.setCurrentPageIndex(0);
                  }}
                >
                  15
                </a></li>
            </ul>
          </div>
        </div>
      }
    </>
  );
}