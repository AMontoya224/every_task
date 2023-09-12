import React, { useState } from 'react';
import './Form2.css';


function Form2( props ){
    const {onSubmitProp, serverValidation, initialPicture} = props;
    const [picture, setPicture] = useState( initialPicture );

    function handlePicture( e ){
        setPicture( e );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {picture} );
    };

    return (
        <form onSubmit={onSubmitHandler} className='row'>
            <div className='container'>
            <div className='container-profile'>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/dinotocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/dinotocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/dinotocat.png' alt='picture_1'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/yogitocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/yogitocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/yogitocat.png' alt='picture_2'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/snowtocat_final.jpg')}>
                        <img className={( picture === 'https://octodex.github.com/images/snowtocat_final.jpg' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/snowtocat_final.jpg' alt='picture_3'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/manufacturetocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/manufacturetocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/manufacturetocat.png' alt='picture_4'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/scubatocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/scubatocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/scubatocat.png' alt='picture_5'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/skatetocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/skatetocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/skatetocat.png' alt='picture_6'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/saint_nictocat.jpg')}>
                        <img className={( picture === 'https://octodex.github.com/images/saint_nictocat.jpg' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/saint_nictocat.jpg' alt='picture_7'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/mcefeeline.jpg')}>
                        <img className={( picture === 'https://octodex.github.com/images/mcefeeline.jpg' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/mcefeeline.jpg' alt='picture_8'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/justicetocat.jpg')}>
                        <img className={( picture === 'https://octodex.github.com/images/justicetocat.jpg' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/justicetocat.jpg' alt='picture_9'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/luchadortocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/luchadortocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/luchadortocat.png' alt='picture_10'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/mona-lovelace.jpg')}>
                        <img className={( picture === 'https://octodex.github.com/images/mona-lovelace.jpg' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/mona-lovelace.jpg' alt='picture_11'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/Robotocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/Robotocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/Robotocat.png' alt='picture_12'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/dunetocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/dunetocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/dunetocat.png' alt='picture_13'/>
                    </button>
                    <button type='button' className='btn-profile' onClick={() => handlePicture('https://octodex.github.com/images/saritocat.png')}>
                        <img className={( picture === 'https://octodex.github.com/images/saritocat.png' ) ? 'picture-profile picture-profile-active ' : 'picture-profile'} 
                         src='https://octodex.github.com/images/saritocat.png' alt='picture_14'/>
                    </button>
                </div>
                <p className='error-server'>
                    {serverValidation}
                </p>
                <button type={( picture.length < 1 ) ? 'reset' : 'submit'}
                   className={( picture.length < 1 ) ? 'submit not-submit' : 'submit'}>
                       Register
                </button>
            </div>
        </form>
    );
};

export default Form2;