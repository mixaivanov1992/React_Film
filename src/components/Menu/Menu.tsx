import React from 'react';
import '@styles/components/Menu.scss';
import { Link } from 'react-router-dom';

const Menu = () => {
    console.info('Menu')
    return (
		<div className='menu_component'>
			<div className='home'>
				<Link to={`/`}>Главная страница</Link>
			</div>
			<div className='add_film'>
				<Link to={`/film/0`}>Добавить новый фильм</Link>
			</div>
			<div className='add_genre'>
				<Link to={`/genre/0`}>Добавить новый жанр</Link>
			</div>
		</div>
    );
}

export default Menu;
