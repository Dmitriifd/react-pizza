import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';
import { useState, useEffect } from 'react';

function App() {
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('https://628a7538e5e5a9ad3224ddfd.mockapi.io/items')
			.then((res) => {
				return res.json();
			})
			.then((arr) => {
				setItems(arr);
			});
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{items.map((obj) => (
							<PizzaBlock key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
