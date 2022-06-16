import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useEffect, useRef } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

function Home() {
	const navigate = useNavigate();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	// const categoryId = useSelector((state) => state.filter.categoryId);
	// const sortType = useSelector((state) => state.filter.sort.sortProperty);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);
	const sortType = sort.sortProperty;

	const dispatch = useDispatch();

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
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
				currentPage,
			})
		);

		window.scrollTo(0, 0);
	};

	// Если изменили параметры и был первый рендер
	useEffect(() => {
		console.log(isMounted.current);
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			console.log(queryString);
			// console.log(navigate(`?${queryString}`));
			// navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, currentPage]);

	// Если был первый рендер, то проверяем url параметры и сохраняем в  редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(
				setFilters({
					...params,
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

	const pizzas = items.map((obj) => (
		<Link key={obj.id} to={`/pizza/${obj.id}`}>
			{' '}
			<PizzaBlock {...obj} />
		</Link>
	));
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort />
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
}

export default Home;

