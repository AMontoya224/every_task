import React, { useState } from 'react';
import './Form3.css';


function Form3( props ){
    const {onSubmitProp, serverValidation, onClose} = props;
    const [userName, setUserName] = useState( '' );
    const [password, setPassword] = useState( '' );

    const [userNameError, setUserNameError] = useState( ' ' )
    const [passwordError, setPasswordError] = useState( ' ' );

    const [passwordShown, setPasswordShown] = useState( false );

    const togglePassword = () => setPasswordShown( !passwordShown );

    const handleUserName = e => {
        setUserName( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 7 ) ? setUserNameError( ' ' ) :
                         setUserNameError( 'The user name must be at least 7 characters long.' );
    };

    const handlePassword = e => {
        setPassword( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 8 ) ? setPasswordError( ' ' ) :
                         setPasswordError( 'Password must have at least minumum 8 characters.' );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {userName, password} );
    };

    const onSubmitClose = e => {
        e.preventDefault();
        onClose();
    };

    return (
        <div>
            <form onSubmit={onSubmitHandler} className='row'>
                <div className='container'>
                    <div className='inp-container'>
                        <label htmlFor='userName' className='inp'>
                            <input type='text' id='userName' className='inp-input' placeholder=' ' value={userName} 
                                onChange={handleUserName}/>
                            <span className='inp-label'>Enter your username</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{userNameError}</p>
                        </label>
                    </div>
                    <div>
                        <div className='inp-container'>
                            <label htmlFor='password' className='inp'>
                                <input type={passwordShown ? 'text' : 'password'} id='password' className='inp-input' 
                                    placeholder=' ' value={password} onChange={handlePassword} />
                                <span className='inp-label inp-label-p'>Enter your password</span>
                                <span className='inp-focus'></span>
                                <p className='inp-error'>{passwordError}</p>
                            </label>
                            <span className='material-icons-outlined inp-icons' onClick={togglePassword}>{passwordShown ? 'visibility' : 'visibility_off'}</span>
                        </div>
                    </div>
                    <button type={( userName.length < 1 || password.length < 1 || userNameError.length > 1 || 
                                    passwordError.length > 1 ) ? 'reset' : 'submit'}
                            className={( userName.length < 1 || password.length < 1 || userNameError.length > 1 || 
                                        passwordError.length > 1 ) ? 'submit not-submit' : 'submit'}>
                            Login
                    </button>
                </div>
            </form>
            {( serverValidation === ' ' ) ? 
                <></> 
            :   <div className='container-server'>
                    <div className='sub-server'>
                        <button className='close-server' onClick={onSubmitClose}><span className="material-icons-round">remove_circle</span></button>
                        <p>
                            {serverValidation}
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default Form3;