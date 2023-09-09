import React, { useState } from 'react';
import './Form_4.css';


function Form_4( props ){
    const {onSubmitProp, serverValidation, initialTitle, initialContents} = props;
    const [title, setTitle] = useState( initialTitle );
    const [contents, setContents] = useState( initialContents );

    const [titleError, setTitleError] = useState( ' ' )
    const [contentsError, setContentsError] = useState( ' ' );

    const handleTitle = e => {
        setTitle( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 3 ) ? setTitleError( ' ' ) :
                             setTitleError( 'Title must be at least 3 characters long.' );
    };

    const handleContents = e => {
        setContents( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 5 ) ? setContentsError( ' ' ) :
                          setContentsError( 'Task content must be at least 3 characters long.' );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {title, contents} );
    };

    return (
        <form onSubmit={onSubmitHandler} className='row'>
            <div className='container'>
                <div className='inp-container'>
                    <label htmlFor='title' className='inp'>
                        <input type='text' id='title' className='inp-input' placeholder=' ' value={title} 
                            onChange={handleTitle}/>
                        <span className='inp-label'>Task title</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{titleError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='contents' className='inp'>
                        <input type='text' id='contents' className='inp-input' placeholder=' ' value={contents} 
                            onChange={handleContents}/>
                        <span className='inp-label'>Task content</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{contentsError}</p>
                    </label>
                </div>
                <p className='error-server'>
                    {serverValidation}
                </p>
                <button type={( title.length < 1 || contents.length < 1 || titleError.length > 1 || 
                                contentsError.length > 1 ) ? 'reset' : 'submit'}
                        className={( title.length < 1 || contents.length < 1 || titleError.length > 1 || 
                                contentsError.length > 1 ) ? 'submit not-submit' : 'submit'}>
                        Add
                </button>
            </div>
        </form>
    );
};

export default Form_4;