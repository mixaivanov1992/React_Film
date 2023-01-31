import React, { useState } from 'react';
import '@styles/components/Genre.scss';
import { createGenre, updateGenre } from 'src/store/actions/GenreAction';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'src/hooks/redux';

const Genre = () => {
    console.info('Genre')
    const params = useParams();
	const dispatch = useAppDispatch();
    const [nameGenre, setNameGenre] = useState('');

	const id = params.id?+params.id:0;
	const saveGenre = () => {
		if(nameGenre){
			if(id){
				dispatch(updateGenre({id, title: nameGenre}));
			}else{
				dispatch(createGenre(nameGenre));
			}
		}
	}
    return (
		<form className="genre_component" action="#" onSubmit={(e)=>e.preventDefault()}>
			<h3>Ввод данных жанра</h3>
			<div>
				<label className="input_wrapper" htmlFor="name_genre">
					<input value={nameGenre} onChange={(e)=>{setNameGenre(e.currentTarget.value)}} type="text" id="name_genre" required></input>
					{nameGenre ? <span className="raise">Название жанра</span> : <span>Название жанра</span>}
				</label>
			</div>
			<div>
				<button type='submit' onClick={saveGenre}>Сохранить</button>
			</div>
		</form>
    );
}

export default Genre;
