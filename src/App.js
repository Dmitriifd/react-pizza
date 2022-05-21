import Categories from './components/Categories';
import Header from './components/Header';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import './scss/app.scss';

const data = [
    {
        title: 'Мексиканская пицца',
        price: '500'
    },
    {
        title: 'Пеперонни',
        price: '600'
    },
    {
        title: 'Гавайская',
        price: '700'
    },
    {
        title: 'Пицца 4 сыра',
        price: '800'
    },
]

function App() {
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
						{data.map(({title, price}) => (
							<PizzaBlock title={title} price={price}/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
