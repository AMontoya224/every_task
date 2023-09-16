import React, { useState } from 'react';
import axios from 'axios';
import './Form1.css';


function Form1( props ){
    const {onSubmitProp, initialFirstName, initialLastName, initialUsertName, initialPhone, url } = props;
    const [firstName, setFirstName] = useState( initialFirstName );
    const [lastName, setLastName] = useState( initialLastName );
    const [userName, setUserName] = useState( initialUsertName );
    const [phone, setPhone] = useState( initialPhone );
    const [password, setPassword] = useState( '' );
    const [confirm, setConfirm] = useState( '' );

    const [firstNameError, setFirstNameError] = useState( ' ' );
    const [lastNameError, setLastNameError] = useState( ' ' );
    const [userNameError, setUserNameError] = useState( ' ' );
    const [phoneError, setPhoneError] = useState( ' ' );
    const [passwordError, setPasswordError] = useState( ' ' );
    const [confirmError, setConfirmError] = useState( ' ' );

    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmShown, setConfirmShown] = useState(false);

    const togglePassword = () => setPasswordShown(!passwordShown);
    const toggleConfirm = () => setConfirmShown(!confirmShown);

    const handleFirstName = e => {
        setFirstName( e.target.value );
        ( !( e.target.value.length === 0 || e.target.value.length >= 2 ) ) ? setFirstNameError( 'El nombre debe tener al menos 2 caracteres.' ) :
        ( !( /^[a-zA-Z]+$/.test( e.target.value ) ) ) ? setFirstNameError( 'Por favor ingrese solo letras.' ) :
            setFirstNameError( ' ' );
    };

    const handleLastName = e => {
        setLastName( e.target.value );
        ( !( e.target.value.length === 0 || e.target.value.length >= 2 ) ) ? setLastNameError( 'El apellido debe tener al menos 2 caracteres.' ) :
        ( !( /^[a-zA-Z]+$/.test( e.target.value ) ) ) ? setLastNameError( 'Por favor ingrese solo letras.' ) :
            setLastNameError( ' ' );
    };

    const handleUserName = e => {
        setUserName( e.target.value );
        ( !( e.target.value.length === 0 || e.target.value.length >= 7 ) ) ? setUserNameError( 'El nombre de usuario debe tener al menos 7 caracteres.' ) :
        axios.get( `${url}/api/users/register/userName/${e.target.value}` )
            .then( res =>{
                if( res.data === null ){
                    setUserNameError( 'Nombre de usuario disponible.' );
                }
                else{
                    setUserNameError( 'Nombre de usuario no disponible.' );
                }
            })
            .catch( err => {
                setUserNameError( 'Error inesperado.' );
            });
    };

    const handlePhone = e => {
        setPhone( e.target.value );
        ( e.target.value.length === 0 || e.target.value.length >= 9 ) ? setPhoneError( ' ' ) :
                   setPhoneError( 'El teléfono debe tener al menos 9 caracteres.' );
    };

    const handlePassword = e => {
        setPassword( e.target.value );
        ( !( /(?=.*?[A-Z])/.test( e.target.value ) ) ) ? setPasswordError( 'La contraseña debe tener al menos una mayúscula.' ) :
        ( !( /(?=.*?[a-z])/.test( e.target.value ) ) ) ? setPasswordError( 'La contraseña debe tener al menos una minúscula.' ) :
        ( !( /(?=.*?[0-9])/.test( e.target.value ) ) ) ? setPasswordError( 'La contraseña debe tener al menos un dígito.' ) :
        ( !( /(?=.*?[#?!@$%^&*-\.\_\+\/])/.test( e.target.value ) ) ) ? setPasswordError( 'La contraseña debe tener al menos un carácter especial.' ) :
        ( !( /.{8,}/.test( e.target.value ) ) ) ? setPasswordError( 'La contraseña debe tener al menos 8 caracteres.' ) :
            setPasswordError( ' ' );
    };

    const handleConfirm = e => {
        setConfirm( e.target.value );
        ( e.target.value === password ) ? setConfirmError( ' ' ) :
        setConfirmError( 'La contraseña debe coincidir con la contraseña confirmada.' );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {firstName, lastName, userName, phone, password} );
    };

    return (
        <form onSubmit={onSubmitHandler} className='row'>
            <div className='container'>
                <div className='inp-container'>
                    <label htmlFor='firstName' className='inp'>
                        <input type='text' id='firstName' className='inp-input' placeholder=' ' value={firstName} 
                               onChange={handleFirstName}/>
                        <span className='inp-label'>Nombres</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{firstNameError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='lastName' className='inp'>
                        <input type='text' id='lastName' className='inp-input' placeholder=' ' value={lastName} 
                               onChange={handleLastName}/>
                        <span className='inp-label'>Apellidos</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{lastNameError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='userName' className='inp'>
                        <input type='text' id='userName' className='inp-input' placeholder=' ' value={userName} 
                               onChange={handleUserName}/>
                        <span className='inp-label'>Nombre de usuario</span>
                        <span className='inp-focus'></span>
                        <p className={( userNameError === 'Nombre de usuario disponible.' ) ? 'inp-available' : 'inp-error'}>{userNameError}</p>
                    </label>
                </div>
                <div className='inp-container'>
                    <label htmlFor='phone' className='inp'>
                        <input type='number' id='phone' className='inp-input' placeholder=' ' value={phone} 
                               onChange={handlePhone}/>
                        <span className='inp-label'>Teléfono</span>
                        <span className='inp-focus'></span>
                        <p className='inp-error'>{phoneError}</p>
                    </label>
                </div>
                <div>
                    <div className='inp-container'>
                        <label htmlFor='password' className='inp'>
                            <input type={passwordShown ? 'text' : 'password'} id='password' className='inp-input' 
                                placeholder=' ' value={password} onChange={handlePassword} />
                            <span className='inp-label inp-label-p'>Contraseña</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{passwordError}</p>
                        </label>
                        <span className='material-icons-outlined inp-icons' onClick={togglePassword}>{passwordShown ? 'visibility' : 'visibility_off'}</span>
                    </div>
                </div>
                <div>
                    <div className='inp-container'>
                        <label htmlFor='confirm' className='inp'>
                            <input type={confirmShown ? 'text' : 'password'} id='confirm' className='inp-input' 
                                placeholder=' ' value={confirm} onChange={handleConfirm} />
                            <span className='inp-label inp-label-p'>Confirmar contraseña</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{confirmError}</p>
                        </label> 
                        <span className='material-icons-outlined inp-icons' onClick={toggleConfirm}>{confirmShown ? 'visibility' : 'visibility_off'}</span>
                    </div>
                </div>
                <button type={( firstName.length < 1 || lastName.length < 1 || userName.length < 1 || 
                                phone.length < 1 || password.length < 1 || confirm.length < 1 || 
                                firstNameError.length > 1 || lastNameError.length > 1 || userNameError !== 'Nombre de usuario disponible.' || 
                                phoneError.length > 1 || passwordError.length > 1 || confirmError.length > 1 ) ? 'reset' : 'submit'}
                   className={( firstName.length < 1 || lastName.length < 1 || userName.length < 1 || 
                                phone.length < 1 || password.length < 1 || confirm.length < 1 || 
                                firstNameError.length > 1 || lastNameError.length > 1 || userNameError !== 'Nombre de usuario disponible.' || 
                                phoneError.length > 1 || passwordError.length > 1 || confirmError.length > 1 ) ? 'submit not-submit' : 'submit'}>
                       Continuar
                </button>
            </div>
        </form>
    );
};

export default Form1;