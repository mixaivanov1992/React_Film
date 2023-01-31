import React, {useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '@styles/components/Film.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { createFilm, updateFilm } from 'src/store/actions/FilmAction';
import Select, {MultiValue} from "react-select";
import { PayloadAction } from '@reduxjs/toolkit';
import { FilmState } from 'src/assets/models/Film';


const Film: React.FC = () => {
    console.info('Film')
    const params = useParams();
	const navigate = useNavigate();
	const id = params.id?+params.id:0;

	const dispatch = useAppDispatch();
	const genres = useAppSelector(state=>state.genreReducer.genres);
	const film = useAppSelector(state=>state.filmReducer.films[id]);
	
    const [nameFilm, setNameFilm] = useState(film?.title || '');
    const [yearFilm, setYearFilm] = useState(film?.year || '');

	const genreData: Array<{value: number, label: string}> = [];
	genres.forEach(element=>{
		if(film?.tags.includes(element.id)){
			genreData.push({ value: element.id, label: element.title });
		}
	});
    const [genreFilm, setGenreFilm] = useState<MultiValue<{value: number, label: string}>>(genreData);

	if(!film && id !== 0){
		return <h3 className="film_component">Данные не найдены</h3>;
	}
	const saveFilm = async () => {
		if(nameFilm && yearFilm && genreFilm?.length){
			const tags = genreFilm.map(element=>(element.value));
			if(id){
				await dispatch(updateFilm({id, title: nameFilm, year: yearFilm, tags}));
			}else{
				const result = await dispatch(createFilm({title: nameFilm, year: yearFilm, tags}));
				if(result.type === 'film/create/fulfilled'){
					const newId = Object.keys(result.payload as PayloadAction<FilmState>);
					navigate(`/film/${newId}`);
				}
			}
		}
	}
	const onChangeGenre = (data: MultiValue<{value: number, label: string}>) => {
		setGenreFilm(data)
	};

	const onInputYear = (e: React.FormEvent<HTMLInputElement>) => {
		if(/^[0-9]{1,4}$/.test(e.currentTarget.value) || e.currentTarget.value === ''){
			setYearFilm(e.currentTarget.value)
		}
	}

	const optionList = genres.map(element=>({ value: element.id, label: element.title }));
    return (
		<form className="film_component" action="#" onSubmit={(e)=>e.preventDefault()}>
			<h3>Ввод данных о фильме</h3>
			<div>
				<label className="input_wrapper" htmlFor="name_film">
					<input value={nameFilm} onChange={(e)=>{setNameFilm(e.currentTarget.value)}} type="text" id="name_film" required></input>
					{nameFilm ? <span className="raise">Название фильма</span> : <span>Название фильма</span>}
				</label>
			</div>
			<div>
				<label className="input_wrapper" htmlFor="year_film">
					<input value={yearFilm} onInput={onInputYear} type="text" id="year_film" required></input>
					{yearFilm ? <span className="raise">Год</span> : <span>Год</span>}
				</label>
			</div>
			<div className="genre_film">
				<Select value={genreFilm} onChange={onChangeGenre} isSearchable={true} isMulti options={optionList} placeholder="Выберите жанр"/>
				{genreFilm?.length ? '' : <div className="danger">Выберите жанр</div>}
			</div>			
			<div className="save">
				<button type='submit' onClick={saveFilm}>Сохранить</button>
			</div>
		</form>
    );
}

export default Film;
