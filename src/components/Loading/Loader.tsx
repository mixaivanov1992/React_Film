import React from 'react';
import '@styles/components/Loader.scss';
import { useAppSelector } from 'src/hooks/redux';

const Loader = () => {
    console.info('Loader')
	const {isLoading: isLoadingGenre} = useAppSelector(state=>state.genreReducer);
	const {isLoading: isLoadingFilm} = useAppSelector(state=>state.filmReducer);

	if(isLoadingGenre || isLoadingFilm){
		return <h1 className='loader_component'>Идет загрузка...</h1>;
	}
	return null;
}

export default Loader;
