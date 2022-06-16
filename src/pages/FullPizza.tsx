import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://628a7538e5e5a9ad3224ddfd.mockapi.io/items/${id}`
				);
				setPizza(data);
			} catch (error) {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) return <>'Загрузка...'</>;

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='img' />
			<p>{id}</p>
			<h2>{pizza.title}</h2>
			<p>{pizza.price}</p>
			<h4>250 р.</h4>
		</div>
	);
};

export { FullPizza };
