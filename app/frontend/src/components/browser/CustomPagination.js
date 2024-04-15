import { Pagination } from 'react-bootstrap';

function CustomPagination({setPage, currentPage, totalPages, totalItems}) {
    let pages = [];

    if (currentPage < 3) {
        for (let i = 0; i < Math.min(4, totalPages); i++) {
            pages.push(i);
        }
        if (totalPages > 5) {
            pages.push(<Pagination.Ellipsis disabled />);
        }
    } else if (currentPage > totalPages - 5) {
        if (totalPages > 5) {
            pages.push(<Pagination.Ellipsis disabled />);
        }
        for (let i = totalPages - 4; i < totalPages; i++) {
            pages.push(i);
        }
    } else {
        pages.push(<Pagination.Ellipsis disabled />);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
        }
        pages.push(<Pagination.Ellipsis disabled />);
    }

    const pageNumbers = pages.map((page, index) =>
        typeof page === 'number' ? (
            <Pagination.Item key={index} active={page === currentPage} onClick={() => setPage(page)}>
            {page + 1}
            </Pagination.Item>
        ) : (
            page
        )
    );

    return (
        <Pagination className="my-auto mx-3">
            <Pagination.First onClick={() => setPage(0)} disabled={currentPage === 0} />
            <Pagination.Prev onClick={() => setPage(currentPage-1)} disabled={currentPage === 0} />
            {pageNumbers}
            <Pagination.Next onClick={() => setPage(currentPage+1)} disabled={currentPage === totalPages-1} />
            <Pagination.Last onClick={() => setPage(totalPages-1)} disabled={currentPage === totalPages-1} />
        </Pagination>
    )
}

export default CustomPagination;