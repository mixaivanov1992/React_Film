import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Film from './Film/Film';
import Genre from './Genre/Genre';
import ListFilms from './ListFilms/ListFilms';
import Loader from '@components/Loading/Loader';
import Menu from '@components/Menu/Menu';
import Message from './Message/Message';
import { useAppDispatch } from 'src/hooks/redux';
import { useEffect } from 'react';
import { fetchGenre } from 'src/store/actions/GenreAction';
import { fetchFilm } from 'src/store/actions/FilmAction';
import { useState } from 'react';

function App() {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
		(async function(){
			await dispatch(fetchGenre());
			await dispatch(fetchFilm());
			setIsLoading(false);
		})();
  }, [dispatch]);

  if(isLoading){
	return null;
  }

  return (
	<div className="App">
		<Message />
		<Loader/>
		<Menu />
		<Routes>
			<Route path="/" element={ <ListFilms /> } />
			<Route path="/film/:id" element={ <Film /> } />
			<Route path="/genre/:id" element={ <Genre /> } />
		</Routes>
	</div>
  );
}

export default App;
