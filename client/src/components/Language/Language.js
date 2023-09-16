import React from 'react';
import './Language.css';


function Language(props){
    const {selectLan, onSelectLan} = props;

    const onBtnLan = () => {
        if(!selectLan){
            onSelectLan( true );
        }
        else{
            onSelectLan( false );
        }
    };

    return (
        <button className='language' onClick={onBtnLan}>
            <span className='material-icons-round'>translate</span>
        </button>
    )
};

export default Language;