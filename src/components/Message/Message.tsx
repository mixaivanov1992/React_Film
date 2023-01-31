import React from 'react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { filmSlice } from 'src/store/redux/reducers/FilmSlice';
import { genreSlice } from 'src/store/redux/reducers/GenreSlice';
import '@styles/components/Message.scss';

const Message = () => {
    console.info('Message')
	const messageGenre = useAppSelector(state=>state.genreReducer.message);
	const messageFilm = useAppSelector(state=>state.filmReducer.message);
	const dispatch = useAppDispatch();
    const message = messageGenre || messageFilm;
    const root = document.createElement('div');

    useEffect(() => {
        if (messageGenre || messageFilm) {
            const main = document.body;
            main.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
            document.body.appendChild(root);
            return () => {
                main.style.overflow = 'inherit';
                document.body.style.overflow = 'inherit';
                document.body.removeChild(root);
            };
        }
        return () => {};
    }, [root, messageGenre, messageFilm]);

    const onClickClose = () => {
        if(messageGenre){
            dispatch(genreSlice.actions.clearMessage());
        }else if(messageFilm){
            dispatch(filmSlice.actions.clearMessage());
        }
    }
	return (
        <>
            {
                ReactDOM.createPortal(
                   <div className='message_component'>
                        <div className='content'>
                            <div>{message}</div>
                            <div className='footer'>
                                <button type='button' onClick={onClickClose}>ОК</button>
                            </div>
                        </div>
                   </div>,
                    root,
                )
            }
        </>
    );
    
}

export default Message;
