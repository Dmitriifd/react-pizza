import { useWhyDidYouUpdate } from 'ahooks';
import { memo } from 'react';

type Categoriesprops = {
	value: number;
	onChangeCategory: (i: number) => void;
};

const Categories: React.FC<Categoriesprops> = memo(
	({ value, onChangeCategory }) => {
		const categories = [
			'Все',
			'Мясные',
			'Вегетарианская',
			'Гриль',
			'Острые',
			'Закрытые',
		];

		// useWhyDidYouUpdate('Categories', { value, onChangeCategory });

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
	}
);

export default Categories;
