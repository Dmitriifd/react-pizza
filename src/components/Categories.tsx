
type Categoriesprops = {
	value: number;
	onChangeCategory: any
};


const Categories: React.FC<Categoriesprops> = ({ value, onChangeCategory }) => {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	// const onClickCategory = (index) => {
	//     setActiveIndex(index)
	// }

	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, i) => (
					<li
						key={i}
						onClick={() => onChangeCategory(i)}
						className={value === i ? 'active' : ''}
					>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;