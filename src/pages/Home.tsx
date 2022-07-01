import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import { useCallback, useEffect, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/index';
import { useSelector } from 'react-redux';

import qs from 'qs';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';

const Home: React.FC = () => {
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	 const { categoryId, sort, currentPage, searchValue } =
			useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);
	const sortType = sort.sortProperty;

	const dispatch = useAppDispatch();

	const onChangeCategory = useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
	}, []);

	const onChangePage = (page: number) => {
		dispatch(setCurrentPage(page));
	};

	const getPizzas = async () => {
		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			})
		);

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			// console.log(navigate(`?${queryString}`));
			// navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, currentPage]);

	// Если был первый рендер, то проверяем url параметры и сохраняем в  редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(
				window.location.search.substring(1)
			) as unknown as SearchPizzaParams;
			const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

			dispatch(
				setFilters({
					...params,
					// @ts-ignore
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	// Если был первый рендер, то запрашиваем пиццы
	useEffect(() => {
		getPizzas();
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort value={sort} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				{status === 'error' ? (
					<div className='content__error-info'>
						<h2>Произошла ошибка :(</h2>
					</div>
				) : (
					<div className='content__items'>
						{status === 'loading' ? skeletons : pizzas}
					</div>
				)}
				<Pagination curentPage={currentPage} onChangePage={onChangePage} />
			</div>
		</>
	);
};

function selectPizzaData(selectPizzaData: any): { items: any; status: any; } {
    throw new Error('Function not implemented.');
}

export default Home;
