import React, { useState } from 'react';
import './Form5.css';


function Form5( props ){
    const {onSubmitProp, serverValidation, initialTitle, initialDate, initialContents} = props;
    const [title, setTitle] = useState( initialTitle );
    const [date, setDate] = useState( initialDate );
    const [contents, setContents] = useState( initialContents );

    const [titleError, setTitleError] = useState( ' ' )
    const [dateError, setDateError] = useState( ' ' )
    const [contentsError, setContentsError] = useState( ' ' );

    const handleTitle = e => {
        setTitle( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 3 ) ? setTitleError( ' ' ) :
                             setTitleError( 'El título debe tener al menos 3 caracteres.' );
    };

    const handleDate = e => {
        const currentDate = new Date();
        const newDate = new Date( (e.target.value).substr(0, 4) + '-' + (e.target.value).substr(5, 2) + '-' + (e.target.value).substr(8, 2) );
        setDate( e.target.value );
        ( currentDate.getTime() <= newDate.getTime() ) ? setDateError( ' ' ) : 
                                setDateError( 'La fecha no puede estar en el pasado.' );
    };

    const handleContents = e => {
        setContents( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 5 ) ? setContentsError( ' ' ) :
                          setContentsError( 'El contenido de la tarea debe tener al menos 3 caracteres.' );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {title, date, contents} );
    };

    return (
        <form onSubmit={onSubmitHandler} className='row'>
            <div className='container'>
                <div className='inp-container'>
                    <label htmlFor='title' className='inp'>
                        <input type='text' id='title' className='inp-input' placeholder=' ' value={title} 
                            onChange={handleTitle}/>
                        <span className='inp-label'>Título de la actividad</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{titleError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='date' className='inp'>
                        <input type='datetime-local' id='date' className='inp-input' placeholder=' ' value={date} 
                            onChange={handleDate}/>
                        <span className='inp-label'>Fecha</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{dateError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='contents' className='inp'>
                        <input type='text' id='contents' className='inp-input' placeholder=' ' value={contents} 
                            onChange={handleContents}/>
                        <span className='inp-label'>Contenido</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{contentsError}</p>
                    </label>
                </div>
                <p className='error-server'>
                    {serverValidation}
                </p>
                <button type={( title.length < 1 || contents.length < 1 || date.length < 1 || titleError.length > 1 || 
                                dateError.length > 1 || contentsError.length > 1 ) ? 'reset' : 'submit'}
                        className={( title.length < 1 || contents.length < 1 || date.length < 1 || titleError.length > 1 || 
                                     dateError.length > 1 || contentsError.length > 1 ) ? 'submit not-submit' : 'submit'}>
                        Añadir
                </button>
            </div>
        </form>
    );
};

export default Form5;