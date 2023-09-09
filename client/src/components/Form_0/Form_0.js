import React, { useState, useMemo } from 'react';
import countryList from 'react-select-country-list'
import './Form_0.css';


function Form_0( props ){
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
                       setEmailError( 'Email is required.' );
        ( /.+@.+\.[A-Za-z]+$/.test( e.target.value ) ) ? setEmailError( ' ' ) :
                       setEmailError( 'Please enter a valid email.' );
    };

    const handleConfirm = e => {
        setConfirm( e.target.value );
        ( e.target.value === email ) ? setConfirmError( ' ' ) :
                     setConfirmError( 'Emails must be the same.' );
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
                            <span className='inp-label'>Email address</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{emailError}</p>
                        </label>
                    </div>
                    <div className='inp-container'>
                        <label htmlFor='confirm' className='inp'>
                            <input type='text' id='confirm' className='inp-input' placeholder=' ' value={confirm} 
                                onChange={handleConfirm}/>
                            <span className='inp-label'>Confirm email address</span>
                            <span className='inp-focus'></span>
                            <p className='inp-error'>{confirmError}</p>
                        </label>
                    </div>
                    <div className='select-container'>
                        <select defaultValue={'-- Select a country --'} onChange={handleCountry}>
                            <option hidden>-- Select a country --</option>
                            {options.map( ( country, idx ) => <option key={idx}>{country.label}</option> )}
                        </select>
                    </div>
                    <div className='row'>
                        <span className='material-icons-outlined' onClick={toggleCheck}>{checkShown ? 'check_box' : 'check_box_outline_blank'}</span>
                        <p>
                            I am 13 years old or older and I accept the <a href='/' target='_blank' className='link'>terms and conditions</a> 
                            and the <a href='/' target='_blank' className='link'>privacy policy</a>
                        </p>
                    </div>
                    <button type={( email.length < 1 || confirm.length < 1 || country.length < 1 || emailError.length > 1 || 
                                    confirmError.length > 1 || !checkShown ) ? 'reset' : 'submit'}
                    className={( email.length < 1 || confirm.length < 1 || country.length < 1 || emailError.length > 1 || 
                                    confirmError.length > 1 || !checkShown ) ? 'submit not-submit' : 'submit'}>
                            Continue
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
                                    Hi!
                                </h1>
                                <button className='close-server' onClick={onSubmitClose}><span className="material-icons-round">remove_circle</span></button>
                            </div>
                            <p>
                                As an additional security measure, you will have to confirm the email address, 
                                for this we have sent you a security code to the email address entered.
                            </p>
                            <div className='inp-container'>
                                <label htmlFor='codeForm' className='inp'>
                                    <input type='text' id='codeForm' className='inp-input' placeholder=' ' value={codeForm} 
                                        onChange={handleCodeForm}/>
                                    <span className='inp-label'>Enter your code here</span>
                                    <span className='inp-focus'></span>
                                </label>
                            </div>
                            <button type={( codeForm.length < 8 ) ? 'reset' : 'submit'}
                                    className={( codeForm.length < 8 ) ? 'submit not-submit' : 'submit'}>
                                Send
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
                                    Ups!
                                </h1>
                                <button className='close-server' onClick={onSubmitClose}><span className="material-icons-round">remove_circle</span></button>
                            </div>
                            <p>
                                We are sorry but the entered code is not correct.
                            </p>
                            <div className='inp-container'>
                                <label htmlFor='codeForm' className='inp'>
                                    <input type='text' id='codeForm' className='inp-input' placeholder=' ' value={codeForm} 
                                        onChange={handleCodeForm}/>
                                    <span className='inp-label'>Enter your code here</span>
                                    <span className='inp-focus'></span>
                                </label>
                            </div>
                            <button type={( codeForm.length < 8 ) ? 'reset' : 'submit'}
                                    className={( codeForm.length < 8 ) ? 'submit not-submit' : 'submit'}>
                                Send again
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

export default Form_0;