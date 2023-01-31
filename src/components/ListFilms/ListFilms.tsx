import React from 'react';
import '@styles/components/ListFilms.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { deleteFilm } from 'src/store/actions/FilmAction';

const ListFilms = () => {
	console.info('ListFilms')
	const dispatch = useAppDispatch();
	const films = useAppSelector(state=>state.filmReducer.films);
	const genres = useAppSelector(state=>state.genreReducer.genres);

	const onClickDelete = (id: number) => {
		dispatch(deleteFilm(id));
	}
    return (
		<div className='list_films_component'>
			<h3>Список фильмов</h3>
			{genres.map((genre) => {
				const indexes = Object.keys(films);
				const elements = indexes.map(index=>{
					const {tags, title, year} = films[+index];
					if(tags.includes(genre.id)){
						return (
							<div className='film' key={uuidv4()}>
								<div className='name_film'>{title}</div>
								<div className='year_film'>{year}</div>
								<div className='tags_film'>{genres.map(element=>tags.includes(element.id) && `${element.title};`)}</div>
								<div className='settings'>
									<button type="button" onClick={()=>onClickDelete(+index)}>Удалить</button>
									<Link to={`/film/${+index}`}><button type="button">Редактировать</button></Link>
								</div>
							</div>
						);
					}
					return null;
				});
				return (
					<React.Fragment key={uuidv4()}>
						<div className='genre'>{genre.title}</div>
						{elements}
					</React.Fragment>
				);
			})}
		</div>
    );
}

export default ListFilms;
