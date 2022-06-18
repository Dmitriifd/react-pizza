import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
	<ContentLoader
		className='pizza-block'
		speed={2}
		width={280}
		height={466}
		viewBox='0 0 280 466'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
		{...props}
        
        >
		<circle cx='141' cy='141' r='113' />
		<rect x='14' y='273' rx='10' ry='10' width='255' height='21' />
		<rect x='14' y='309' rx='10' ry='10' width='255' height='76' />
		<rect x='110' y='377' rx='0' ry='0' width='10' height='3' />
		<rect x='112' y='405' rx='20' ry='20' width='152' height='45' />
		<rect x='17' y='413' rx='10' ry='10' width='84' height='33' />
		<rect x='85' y='436' rx='0' ry='0' width='2' height='11' />
	</ContentLoader>
);

export default Skeleton;
