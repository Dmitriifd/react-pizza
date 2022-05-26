import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { useState, useEffect } from 'react';
import Skeleton from '../components/PizzaBlock/Skeleton';

function Home({ searchValue }) {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'Популярности',
		sortProperty: 'rating',
	});

	useEffect(() => {
		setIsLoading(true);

		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';

		fetch(
			`https://628a7538e5e5a9ad3224ddfd.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
		)
			.then((res) => {
				return res.json();
			})
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);
			});
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);

	const pizzas = items
		.filter((obj) => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true;
			}

			return false;
		})
		.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onChangeCategory={(i) => setCategoryId(i)}
					/>
					<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeletons : pizzas}</div>
			</div>
		</>
	);
}

export default Home;
