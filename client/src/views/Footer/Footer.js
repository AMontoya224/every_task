import React from 'react';
import './Footer.css';


function Footer( props ){
    return (
        <div className='footer'>
            <h3>
                EverTask
            </h3>
            <p>
                EverTask es una aplicación diseñada para gestionar mejor su vida diaria. 
                Tareas, listas de tareas pendientes, recordatorios, citas, notas, listas de compras... 
                todo en un solo lugar, para que no necesites gastar dinero extra en otras aplicaciones.
            </p>
            <p className='p'>
                EverTask le ayuda a administrar su vida mediante una vista de calendario responsiva, 
                tareas y listas flexibles y notas potentes. ¿Estás cansado de grabar notas escribiendo? 
                Intente agregar una nota de audio directamente en la aplicación.
            </p>
        </div>
    );
};

export default Footer;