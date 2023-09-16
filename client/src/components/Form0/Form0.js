import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list'
import './Form0.css';


function Form0( props ){
    const {onSubmitProp, serverValidation, onSubmitCode, onClose, initialEmail, initialCountry} = props;
    const options = useMemo(() => countryList().getData(), []);

    const [email, setEmail] = useState( initialEmail );
    const [confirm, setConfirm] = useState( '' );
    const [country, setCountry] = useState( initialCountry )
    const [checkShown, setCheckShown] = useState( false );

    const [emailError, setEmailError] = useState( ' ' );
    const [confirmError, setConfirmError] = useState( ' ' );

    const [codeForm, setCodeForm] = useState( '' );

    const toggleCheck = () => setCheckShown(!checkShown);

    const handleEmail = e => {
        setEmail( e.target.value );
        ( e.target.value.length >= 1 ) ? setEmailError( ' ' ) :
                       setEmailError( 'Correo electronico es requerido.' );
        ( /.+@.+\.[A-Za-z]+$/.test( e.target.value ) ) ? setEmailError( ' ' ) :
                       setEmailError( 'Por favor introduzca un correo electrónico válido.' );
    };

    const handleConfirm = e => {
        setConfirm( e.target.value );
        ( e.target.value === email ) ? setConfirmError( ' ' ) :
                     setConfirmError( 'Los correos electrónicos deben ser los mismos.' );
    };

    const handleCountry = e => {
        setCountry( e.target.value );
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmitProp( {email, country} );
    };

    const handleCodeForm = e => {
        setCodeForm( e.target.value );
    };

    const onSubmitValidation = e => {
        e.preventDefault();
        onSubmitCode( {codeForm} );
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
                        <label htmlFor='email' className='inp'>
                            <input type='text' id='email' className='inp-input' placeholder=' ' value={email} 
                                onChange={handleEmail}/>
                            <span className='inp-label'>Correo electrónico</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{emailError}</p>
                        </label>
                    </div>
                    <div className='inp-container'>
                        <label htmlFor='confirm' className='inp'>
                            <input type='text' id='confirm' className='inp-input' placeholder=' ' value={confirm} 
                                onChange={handleConfirm}/>
                            <span className='inp-label'>Confirmar correo electrónico</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{confirmError}</p>
                        </label>
                    </div>
                    <div className='select-container'>
                        <select defaultValue={'-- Select a country --'} onChange={handleCountry}>
                            <option hidden>-- Seleccionar un país --</option>
                            {options.map( ( country, idx ) => <option key={idx}>{country.label}</option> )}
                        </select>
                    </div>
                    <div className='row'>
                        <span className='material-icons-outlined' onClick={toggleCheck}>{checkShown ? 'check_box' : 'check_box_outline_blank'}</span>
                        <p>
                            Tengo 13 años o más y acepto el <a href='/' target='_blank' className='link'>Términos y condiciones</a> 
                            y la <a href='/' target='_blank' className='link'>política de privacidad</a>
                        </p>
                    </div>
                    <button type={( email.length < 1 || confirm.length < 1 || country.length < 1 || emailError.length > 1 || 
                                    confirmError.length > 1 || !checkShown ) ? 'reset' : 'submit'}
                    className={( email.length < 1 || confirm.length < 1 || country.length < 1 || emailError.length > 1 || 
                                    confirmError.length > 1 || !checkShown ) ? 'submit not-submit' : 'submit'}>
                            Continuar
                    </button>
                </div>
            </form>
            {( serverValidation === ' ' ) ? 
                <></> 
            : ( serverValidation === 'Send code to email.' ) ? 
                <div className='container-server'>
                    <div className='sub-server'>
                        <form onSubmit={onSubmitValidation} className='col'>
                            <div className='title-server'>
                                <h1>
                                    ¡Hola!
                                </h1>
                                <button className='close-server' onClick={onSubmitClose}><span className="material-icons-round">remove_circle</span></button>
                            </div>
                            <p>
                                Como medida de seguridad adicional tendrás que confirmar la dirección de correo electrónico, 
                                para ello te hemos enviado un código de seguridad a la dirección de correo electrónico introducida.
                            </p>
                            <div className='inp-container'>
                                <label htmlFor='codeForm' className='inp'>
                                    <input type='text' id='codeForm' className='inp-input' placeholder=' ' value={codeForm} 
                                        onChange={handleCodeForm}/>
                                    <span className='inp-label'>Introduce tu código aquí</span>
                                    <span className='inp-focus'></span>
                                </label>
                            </div>
                            <button type={( codeForm.length < 8 ) ? 'reset' : 'submit'}
                                    className={( codeForm.length < 8 ) ? 'submit not-submit' : 'submit'}>
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            : ( serverValidation === 'err' ) ?
                <div className='container-server'>
                    <div className='sub-server'>
                        <form onSubmit={onSubmitValidation}>
                            <div className='title-server'>
                                <h1>
                                    ¡Ups!
                                </h1>
                                <button className='close-server' onClick={onSubmitClose}><span className="material-icons-round">remove_circle</span></button>
                            </div>
                            <p>
                                Lo sentimos pero el código introducido no es correcto.
                            </p>
                            <div className='inp-container'>
                                <label htmlFor='codeForm' className='inp'>
                                    <input type='text' id='codeForm' className='inp-input' placeholder=' ' value={codeForm} 
                                        onChange={handleCodeForm}/>
                                    <span className='inp-label'>Introduce tu código aquí</span>
                                    <span className='inp-focus'></span>
                                </label>
                            </div>
                            <button type={( codeForm.length < 8 ) ? 'reset' : 'submit'}
                                    className={( codeForm.length < 8 ) ? 'submit not-submit' : 'submit'}>
                                Enviar de nuevo
                            </button>
                        </form>
                    </div>
                </div>
            : 
                <div className='container-server'>
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

export default Form0;