import { Link, useNavigate } from "react-router-dom";

export default function Pagination({
  currentPage,
  totalPages,
  pageLinks,
  onPageChange,
  nextPage,
  previousPage,
}) {

  const links = pageLinks?.map((page) => parseInt(page.split("=")[1]));
  const navigate = useNavigate()
  const step = 1

  function handleClick(event, page) {
    event?.preventDefault()
    page && onPageChange && onPageChange(page);

    if (page) {
        const currentSearchParams = new URLSearchParams(window.location.search)
        currentSearchParams.set('page', page.toString())

        navigate({
          search: currentSearchParams.toString(),
        })
    }
  }

  const renderPageNumbers = () => {
    let newLinks = links
    newLinks = newLinks?.filter(page => (page >= currentPage - step) && (page <= currentPage + step)) 
    
    return newLinks?.map((page, index) => (
      <li key={index} className="page-item">
        <a className={"page-link " + (currentPage == page ? "active" : "")}
          onClick={(event) => handleClick(event, page)}
        >
          {page}
        </a>
      </li>
    ))
  }


  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item" onClick={(event) => handleClick(event, previousPage)}>
            <a className="page-link" href="#">
              Prev
            </a>
          </li>
          {
            currentPage > step+1 &&
            <>
              <li className="page-item">
                <a className={"page-link"}
                  onClick={(event) => handleClick(event, 1)}
                >
                  {1}
                </a>
              </li>
              <li className="page-item">
                <a className={"page-link"}>
                  ...
                </a>
              </li>
            </>
          }

          {renderPageNumbers()}

          {
            currentPage < totalPages-step &&
            <>
            <li className="page-item">
                <a className={"page-link"}>
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className={"page-link"}
                  onClick={(event) => handleClick(event, totalPages)}
                >
                  {totalPages}
                </a>
              </li>
            </>
          }

          <li className="page-item" onClick={(event) => handleClick(event, nextPage)}>
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
