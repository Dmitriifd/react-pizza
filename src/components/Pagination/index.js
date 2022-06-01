import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

function pagination({ curentPage, onChangePage }) {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			onPageChange={(e) => onChangePage(e.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={curentPage - 1}
			previousLabel='<'
			renderOnZeroPageCount={null}
		/>
	);
}

export default pagination;
